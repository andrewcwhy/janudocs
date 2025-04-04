import { execSync } from 'child_process'
import { intro, log, note, spinner } from '@clack/prompts'
import pc from 'picocolors'
import fs from 'fs'
import path from 'path'

type PackageManager = 'bun' | 'npm' | 'yarn' | 'pnpm'
type DevTools = ('eslint' | 'prettier' | 'tailwindcss')[]

export function installDependencies(
    projectDir: string,
    devTools: DevTools = [],
    packageManager: PackageManager
) {
    // Begin the installation session
    intro(pc.bold(pc.cyan('Installing Dependencies...')))

    const usingEslint = devTools.includes('eslint')
    const usingPrettier = devTools.includes('prettier')
    const usingTailwind = devTools.includes('tailwindcss')

    const deps = []
    const devDeps = []

    if (usingEslint) {
        devDeps.push(
            '@eslint/js',
            'eslint',
            'eslint-plugin-react',
            'globals',
            'typescript-eslint'
        )
    }

    if (usingPrettier) {
        devDeps.push('prettier')
        if (usingEslint) {
            devDeps.push('eslint-config-prettier')
        }
    }

    if (usingTailwind) {
        deps.push('tailwindcss')
    }

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

    log.step(`Package manager selected: ${pc.bold(pc.blue(packageManager))}`)

    const s = spinner()
    s.start(pc.cyan('Installing dependencies'))

    try {
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

        execSync(commands[packageManager].deps, {
            cwd: projectDir,
            stdio: 'inherit',
        })

        execSync(commands[packageManager].devDeps, {
            cwd: projectDir,
            stdio: 'inherit',
        })

        // Update package.json scripts if ESLint or Prettier is selected
        if (usingEslint || usingPrettier) {
            const pkgJsonPath = path.join(projectDir, 'package.json')
            if (fs.existsSync(pkgJsonPath)) {
                const packageJson = JSON.parse(
                    fs.readFileSync(pkgJsonPath, 'utf-8')
                )
                packageJson.scripts = packageJson.scripts || {}

                if (usingEslint) {
                    packageJson.scripts.lint = 'eslint .'
                }
                if (usingPrettier) {
                    packageJson.scripts.format = 'prettier --write .'
                }

                fs.writeFileSync(
                    pkgJsonPath,
                    JSON.stringify(packageJson, null, 2)
                )
            }
        }

        s.stop(pc.green('All dependencies installed successfully.'))
    } catch (err) {
        s.stop(pc.red('Failed to install dependencies.'))
        console.error(err)
    }
}
