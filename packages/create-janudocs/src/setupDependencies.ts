import { intro, log, note, spinner } from '@clack/prompts'
import pc from 'picocolors'
import fs from 'node:fs/promises'
import path from 'node:path'
import execa from 'execa'
import _ from 'lodash-es'

// User must select a package manager
type PackageManager = 'bun' | 'npm' | 'yarn' | 'pnpm' 
// Optional tools for the project
type DevTools = ('bifront' | 'biome')[]

type CLIOptions = {
    packageManager?: PackageManager; // Package manager to use (bun, npm, yarn, pnpm)
    skipInstall?: boolean; // Ask user if they want to install dependencies
}

// The default package manager is Bun
const defaultPackageManager: PackageManager = 'bun'

const lockfileNames: Record<PackageManager, string> = {
    bun: 'bun.lock',
    npm: 'package-lock.json',
    yarn: 'yarn.lock',
    pnpm: 'pnpm-lock.yaml',
}

// Thesse are the default dependencies for a Janudocs project
const defaultDependencies: {
    @janudocs/core,
    @janudocs/mdx,
    @tanstack/react-router,
    clsx,
    react,
    react-dom,
}

// These are the default devDependencies for a Janudocs project
const defaultDevDependencies: {
    @janudocs/tsconfig,
    @tanstack/router-plugin,
    typescript,
}

export function installDependencies(
    projectDir: string,
    devTools: DevTools = [],
    packageManager: PackageManager
) {
    intro(pc.bold(pc.cyan('Installing Dependencies...')))

    const deps: string[] = []
    const devDeps: string[] = []

    if (packageManager === 'bun') {
        log.step('Detected Bun — adding @types/bun to devDependencies.')
        devDeps.push('@types/bun')
    }


    log.step(`Package manager selected: ${pc.bold(pc.blue(packageManager))}`)

    if (!deps.length && !devDeps.length) {
        log.info(
            pc.dim('No optional dependencies selected. Skipping install step.')
        )
        return
    }

    const s = spinner()
    s.start(pc.cyan('Installing dependencies'))

    try {
        const pkgJsonPath = path.join(projectDir, 'package.json')
        if (!fs.existsSync(pkgJsonPath)) {
            throw new Error(`package.json not found in ${projectDir}`)
        }

        const packageJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))

        // Add dependencies
        packageJson.dependencies = {
            ...(packageJson.dependencies || {}),
            ...deps.reduce((acc, dep) => ({ ...acc, [dep]: 'latest' }), {}),
        }

        packageJson.devDependencies = {
            ...(packageJson.devDependencies || {}),
            ...devDeps.reduce((acc, dep) => ({ ...acc, [dep]: 'latest' }), {}),
        }

        // Add scripts
        packageJson.scripts = packageJson.scripts || {}
        if (using.eslint) {
            packageJson.scripts.lint = 'eslint .'
        }
        if (using.prettier) {
            packageJson.scripts.format = 'prettier --write .'
        }

        fs.writeFileSync(pkgJsonPath, JSON.stringify(packageJson, null, 2))

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

        // Now install
        const installCmd =
            packageManager === 'bun'
                ? 'bun install'
                : `${packageManager} install`

        log.info(pc.dim(`Running: ${installCmd}`))
        execSync(installCmd, {
            cwd: projectDir,
            stdio: 'inherit',
        })

        s.stop(pc.green('All dependencies installed successfully.'))
    } catch (err) {
        s.stop(pc.red('Failed to install dependencies.'))
        console.error(err)
    }
}
