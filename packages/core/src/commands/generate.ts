import { readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

const docsPath = path.resolve('docs')
const outputPath = path.join(docsPath, 'manifest.json')

export async function generateDocsManifest() {
    const entries = await readdir(docsPath, { withFileTypes: true })

    const docs: any[] = []

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

            const files = (await readdir(fullPath))
                .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
                .map((f) => f.replace(/\.(mdx|md)$/, ''))

            if (files.length === 0) continue

            docs.push({
                type: 'category',
                label,
                description,
                link: {
                    type: 'toc',
                    title,
                },
                files,
                position,
            })
        }

        if (
            entry.isFile() &&
            (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))
        ) {
            const filename = entry.name.replace(/\.(mdx|md)$/, '')
            docs.push({
                type: 'doc',
                label: filename,
                file: [filename],
            })
        }
    }

    // sort categories by position, push docs after
    const sorted = [
        ...docs
            .filter((d) => d.type === 'category')
            .sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity))
            .map(({ position, ...rest }) => rest),
        ...docs.filter((d) => d.type === 'doc'),
    ]

    const manifest = {
        docs: sorted,
    }

    await writeFile(outputPath, JSON.stringify(manifest, null, 2))
    console.log(`✅ Manifest created with ${sorted.length} entries.`)
}
