import { generateDocsManifest } from '@janudocs/core'
import { writeFile } from 'fs/promises'
import path from 'path'

async function main() {
    const docsDir = path.resolve('./docs')
    const outPath = path.join(docsDir, 'manifest.json')

    const manifest = await generateDocsManifest(docsDir)
    await writeFile(outPath, JSON.stringify(manifest, null, 2))

    console.log('✅ docs/manifest.json generated')
}

main()
