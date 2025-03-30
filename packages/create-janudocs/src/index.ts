import { Command } from 'commander'
import prompts from 'prompts'
import pc from 'picocolors'
import { existsSync, mkdirSync, cpSync } from 'fs'
import { join, resolve } from 'path'

const program = new Command()

program
  .name('create-janudocs')
  .description('Create a new Janudocs documentation project')
  .version('0.1.0')
  .action(async () => {
    console.log(pc.cyan('Welcome to create-janudocs CLI!\n'))

    const response = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'What is the name of your documentation project?',
        initial: 'my-janudocs',
      },
      {
        type: 'select',
        name: 'template',
        message: 'Choose a starter template',
        choices: [{ title: 'Default', value: 'default' }],
      },
    ])

    const { projectName, template } = response

    if (!projectName) {
      console.log(pc.red('✖ Project name is required.'))
      process.exit(1)
    }

    const cwd = process.cwd()
    const projectDir = resolve(cwd, projectName)
    const templateDir = resolve(import.meta.dir, '../templates', template)

    if (existsSync(projectDir)) {
      console.log(pc.red(`✖ Directory "${projectName}" already exists.`))
      process.exit(1)
    }

    console.log(pc.green(`\n✅ Creating project: ${projectName}`))
    mkdirSync(projectDir, { recursive: true })

    try {
      cpSync(templateDir, projectDir, { recursive: true })
      console.log(pc.green(`🎉 Project created in ${pc.bold(projectDir)}`))
    } catch (err) {
      console.error(pc.red('Failed to copy template files:'), err)
    }
  })

export const run = () => {
  program.parse(process.argv)
}
