// scripts/generateDocsIndex.ts
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join, resolve } from 'path'

const docsDir = resolve('./docs')
const output = {
    categories: [] as {
        label: string
        description: string
        path: string
        files: string[]
    }[],
}

const generateIndex = () => {
    const categories = readdirSync(docsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => {
            const catPath = join(docsDir, dirent.name)
            const categoryJsonPath = join(catPath, 'category.json')

            let label = dirent.name
            let description = ''
            if (statSync(categoryJsonPath).isFile()) {
                const categoryMeta = JSON.parse(
                    readFileSync(categoryJsonPath, 'utf-8')
                )
                label = categoryMeta.label || label
                description = categoryMeta.description || ''
            }

            const files = readdirSync(catPath).filter((file) =>
                file.endsWith('.md')
            )

            return {
                label,
                description,
                path: dirent.name,
                files,
            }
        })

    output.categories = categories
    writeFileSync(join(docsDir, 'manifest.json'), JSON.stringify(output, null, 2))
    console.log('✅ docs/manifest.json generated')
}

generateIndex()
