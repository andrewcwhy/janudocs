import { readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

const docsPath = path.resolve('docs')
const outputPath = path.join(docsPath, 'manifest.json')

interface Category {
    label: string
    description: string
    path: string
    files: string[]
    count: number
    position?: number
}

export async function generateDocsManifest() {
    const entries = await readdir(docsPath, { withFileTypes: true })

    const categories: Category[] = []
    const looseFilesList: string[] = []

    for (const entry of entries) {
        const fullPath = path.join(docsPath, entry.name)

        if (entry.isDirectory()) {
            const categoryMetaPath = path.join(fullPath, 'category.json')
            let label = entry.name
            let description = ''
            let position: number | undefined

            try {
                const json = await readFile(categoryMetaPath, 'utf-8')
                const meta = JSON.parse(json)
                label = meta.label ?? label
                description = meta.description ?? ''
                position =
                    typeof meta.position === 'number'
                        ? meta.position
                        : undefined
            } catch (err) {
                console.warn(
                    `⚠️ Could not load category.json for "${entry.name}":`,
                    (err as Error).message
                )
            }

            const files = (await readdir(fullPath)).filter((f) =>
                f.endsWith('.md')
            )
            if (files.length === 0) continue

            categories.push({
                label,
                description,
                path: entry.name,
                files,
                count: files.length,
                position,
            })
        }

        if (entry.isFile() && entry.name.endsWith('.md')) {
            looseFilesList.push(entry.name)
        }
    }

    categories.sort(
        (a, b) => (a.position ?? Infinity) - (b.position ?? Infinity)
    )

    const manifest = {
        categories: categories.map(({ position, ...rest }) => rest),
        looseFiles: [
            {
                files: looseFilesList,
                count: looseFilesList.length,
            },
        ],
    }

    await writeFile(outputPath, JSON.stringify(manifest, null, 2))
    console.log(
        `✅ Manifest created with ${categories.length} categories and ${looseFilesList.length} loose files.`
    )
}
