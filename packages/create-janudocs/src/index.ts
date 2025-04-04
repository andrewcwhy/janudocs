import {
    text,
    select,
    multiselect,
    intro,
    outro,
    isCancel,
    cancel,
    spinner,
} from '@clack/prompts'
import pc from 'picocolors'
import { existsSync, mkdirSync, cpSync } from 'fs'
import { resolve } from 'path'
import { installDependencies } from '@/setupDependencies'

// Helper to check for cancellation after a prompt.
function ensure<T>(result: T | symbol): T {
    if (isCancel(result)) {
        cancel('Operation cancelled.')
        process.exit(0)
    }
    return result as T
}

// Helper to run a task with a spinner.
function runTask(taskDescription: string, task: () => void) {
    const s = spinner()
    s.start(taskDescription)
    try {
        task()
        s.stop(`${taskDescription} completed successfully.`)
    } catch (err) {
        s.stop(`${taskDescription} failed.`)
        console.error(err)
        process.exit(1)
    }
}

async function main() {
    intro(pc.inverse('create-janudocs'))

    const cwd = process.cwd()
    const projectName = ensure(
        await text({
            message: 'What is your project name?',
            placeholder: 'my-janudocs',
            validate: (input) => {
                const projectDir = resolve(cwd, input)
                return existsSync(projectDir)
                    ? `Directory "${input}" already exists. Choose a different name.`
                    : undefined
            },
        })
    )

    const projectDir = resolve(cwd, projectName)

    const template = ensure(
        await select({
            message: 'Choose a starter template:',
            options: [
                { label: 'Default', value: 'default' },
                { label: 'Full', value: 'full' },
                { label: 'Vite', value: 'vite' },
            ],
        })
    )

    const devTools = ensure(
        await multiselect({
            message: 'Add optional developer tools.',
            options: [
                { label: 'ESLint', value: 'eslint', hint: 'recommended' },
                { label: 'Prettier', value: 'prettier' },
                { label: 'Tailwind CSS', value: 'tailwindcss' },
            ],
        })
    )

    const packageManager = ensure(
        await select({
            message: 'Which package manager do you want to use?',
            options: [
                { label: 'bun', value: 'bun' },
                { label: 'npm', value: 'npm' },
                { label: 'pnpm', value: 'pnpm' },
                { label: 'yarn', value: 'yarn' },
            ],
        })
    )

    const templateDir = resolve(import.meta.dir, '../templates', template)

    runTask('Scaffolding project', () => {
        mkdirSync(projectDir, { recursive: true })
        cpSync(templateDir, projectDir, { recursive: true })
    })

    installDependencies(
        projectDir,
        devTools as ('eslint' | 'prettier' | 'tailwindcss')[],
        packageManager as any
    )

    outro(pc.green(`Project setup complete at: ${projectDir}`))
    console.log()
}

export { main }
