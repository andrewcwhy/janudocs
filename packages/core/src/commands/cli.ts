import { Command } from 'commander'
import { generateDocsManifest } from '@/commands/generate'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { version } = require('package.json')

export function setupCLI() {
    const program = new Command()

    program.name('janudocs')
    .description('The Janudocs CLI')
    .version(version)

    program
        .command('generate')
        .alias('gen')
        .description('Generate the docs manifest')
        .action(generateDocsManifest)

    return program
}
