import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const DOCS_DIR = path.resolve('docs')
const OUTPUT_FILE = path.join(DOCS_DIR, 'manifest.json')
const SUPPORTED_EXTENSIONS = ['.md', '.mdx']

type DocEntry = {
    id: string
    title: string
    description: string
    path: string
    slug: string
    permalink: string
}

type CategoryManifest = {
    label: string
    position: number
    categoryGeneratedIndex: {
        title: string
        description: string
        slug: string
        permalink: string
    }
    files: DocEntry[]
}

type FinalManifest = {
    categorizedDocs: CategoryManifest[]
    looseDocs: DocEntry[]
}

function isDocFile(filename: string) {
    return SUPPORTED_EXTENSIONS.includes(path.extname(filename))
}

function readFrontmatter(filePath: string): {
    title: string
    description: string
} {
    const raw = fs.readFileSync(filePath, 'utf8')
    const parsed = matter(raw)
    return {
        title:
            parsed.data.title ||
            path.basename(filePath, path.extname(filePath)),
        description: parsed.data.description || '',
    }
}

function toDocEntry(filePath: string, relativePath: string): DocEntry {
    const { title, description } = readFrontmatter(filePath)
    const id = relativePath.replace(/\\/g, '/').replace(/\.(mdx|md)$/, '')
    const slug = `/${id}`
    const permalink = `/docs${slug}`
    return { id, title, description, path: slug, slug, permalink }
}

function generateManifest(): FinalManifest {
    const entries = fs.readdirSync(DOCS_DIR, { withFileTypes: true })

    const categorizedDocs: CategoryManifest[] = []
    const looseDocs: DocEntry[] = []

    for (const entry of entries) {
        const fullPath = path.join(DOCS_DIR, entry.name)

        if (entry.isDirectory()) {
            const categoryDir = entry.name
            const files = fs.readdirSync(fullPath).filter(isDocFile)
            const _categoryPath = path.join(fullPath, '_category.json')
            const meta = fs.existsSync(_categoryPath)
                ? JSON.parse(fs.readFileSync(_categoryPath, 'utf8'))
                : { label: categoryDir, position: 999, description: '' }

            const docs: DocEntry[] = files.map((file) => {
                const filePath = path.join(fullPath, file)
                const relativePath = `${categoryDir}/${file}`
                return toDocEntry(filePath, relativePath)
            })

            categorizedDocs.push({
                label: meta.label,
                position: meta.position ?? 999,
                categoryGeneratedIndex: {
                    title: meta.label,
                    description: meta.description || '',
                    slug: `/category/${categoryDir}`,
                    permalink: `/docs/category/${categoryDir}`,
                },
                files: docs,
            })
        }

        if (entry.isFile() && isDocFile(entry.name)) {
            const filePath = path.join(DOCS_DIR, entry.name)
            looseDocs.push(toDocEntry(filePath, entry.name))
        }
    }

    categorizedDocs.sort((a, b) => a.position - b.position)

    return { categorizedDocs, looseDocs }
}

// Generate and write to docs/manifest.json
const manifest = generateManifest()

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2), 'utf8')
console.log('✅ docs/manifest.json written successfully')
