import { execSync } from 'child_process'
import { intro, log, note, spinner } from '@clack/prompts'
import pc from 'picocolors'
import fs from 'fs'
import path from 'path'

type PackageManager = 'bun' | 'npm' | 'yarn' | 'pnpm'
type DevTools = ('eslint' | 'prettier')[]

const defaultPackageManager: PackageManager = 'bun'

export function installDependencies(
    projectDir: string,
    devTools: DevTools = [],
    packageManager: PackageManager
) {
    // Begin the installation session
    intro(pc.bold(pc.cyan('Installing Dependencies...')))

    const deps: string[] = []
    const devDeps: string[] = []

    const using = {
        eslint: devTools.includes('eslint'),
        prettier: devTools.includes('prettier'),
    }

    if (packageManager === 'bun') {
        log.step('Detected Bun — adding @types/bun to devDependencies.')
        devDeps.push('@types/bun')
    }

    if (using.eslint) {
        devDeps.push(
            '@eslint/js',
            'eslint',
            'eslint-plugin-react',
            'globals',
            'typescript-eslint'
        )
    }

    if (using.prettier) {
        devDeps.push('prettier')
        if (using.eslint) {
            devDeps.push('eslint-config-prettier')
        }
    }

    log.step(`Package manager selected: ${pc.bold(pc.blue(packageManager))}`)

    const commands = {
        bun: {
            deps: `bun add ${deps.join(' ')}`,
            devDeps: `bun add -d ${devDeps.join(' ')}`,
        },
        npm: {
            deps: `npm install ${deps.join(' ')}`,
            devDeps: `npm install ${devDeps.join(' ')} -D`,
        },
        yarn: {
            deps: `yarn add ${deps.join(' ')}`,
            devDeps: `yarn add -D ${devDeps.join(' ')}`,
        },
        pnpm: {
            deps: `pnpm add ${deps.join(' ')}`,
            devDeps: `pnpm add -D ${devDeps.join(' ')}`,
        },
    }

    const s = spinner()
    s.start(pc.cyan('Installing dependencies'))

    try {
        const packageJSONPath = path.join(projectDir, 'package.json')

        execSync(commands[packageManager].deps, {
            cwd: projectDir,
            stdio: 'inherit',
        })

        execSync(commands[packageManager].devDeps, {
            cwd: projectDir,
            stdio: 'inherit',
        })

        const packageJSON = JSON.parse(
            fs.readFileSync(packageJSONPath, 'utf-8')
        )

        // Add scripts to package.json
        packageJSON.scripts = packageJSON.scripts || {}
        // Add ESLint script
        if (using.eslint) {
            packageJSON.scripts.lint = 'eslint .'
        }
        // Add Prettier script
        if (using.prettier) {
            packageJSON.scripts.format = 'prettier --write .'
        }

        fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2))

        if (deps.length) {
            note(
                deps.map((dep) => `- ${dep}`).join('\n'),
                pc.yellow('Dependencies')
            )
        }

        if (devDeps.length) {
            note(
                devDeps.map((dep) => `- ${dep}`).join('\n'),
                pc.magenta('Dev Dependencies')
            )
        }

        s.stop(pc.green('All dependencies installed successfully.'))
    } catch (err) {
        s.stop(pc.red('Failed to install dependencies.'))
        console.error(err)
    }
}
