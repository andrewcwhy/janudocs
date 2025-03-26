import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join, resolve } from 'path'

const docsDir = resolve('./docs')
const output = {
    categories: [] as {
        label: string
        description: string
        path: string
        files: string[]
        position?: number
    }[],
    looseFiles: [] as string[],
}

const generateIndex = () => {
    // ✅ Grab loose .md files directly inside /docs (not in any category folder)
    const looseFiles = readdirSync(docsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.md'))
        .map((dirent) => dirent.name)

    // ✅ Grab category folders
    const categories = readdirSync(docsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => {
            const catPath = join(docsDir, dirent.name)
            const categoryJsonPath = join(catPath, 'category.json')

            let label = dirent.name
            let description = ''
            let position: number | undefined = undefined

            if (statSync(categoryJsonPath).isFile()) {
                const categoryMeta = JSON.parse(
                    readFileSync(categoryJsonPath, 'utf-8')
                )
                label = categoryMeta.label || label
                description = categoryMeta.description || ''
                position = categoryMeta.position
            }

            const files = readdirSync(catPath).filter((file) =>
                file.endsWith('.md')
            )

            return {
                label,
                description,
                path: dirent.name,
                files,
                position,
            }
        })

    // ✅ Sort categories by 'position' (undefined positions go last)
    categories.sort(
        (a, b) => (a.position ?? Infinity) - (b.position ?? Infinity)
    )

    // ✅ Build the output object
    output.categories = categories
    output.looseFiles = looseFiles

    writeFileSync(
        join(docsDir, 'manifest.json'),
        JSON.stringify(output, null, 2)
    )
    console.log('✅ docs/manifest.json generated')
}

generateIndex()
