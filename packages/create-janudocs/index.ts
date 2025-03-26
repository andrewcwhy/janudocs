import { $ } from 'bun'
import path from 'path'
import fs from 'fs-extra'

export async function main() {
	const args = Bun.argv.slice(2)
	const targetDir = args[0] || 'my-janudocs-site'

	console.log(`Creating a new Janudocs site in ${targetDir}...`)

	const templateDir = path.resolve(import.meta.dir, 'templates/default')
	await fs.copy(templateDir, targetDir)

	console.log(`✅ Done! Now run:
  cd ${targetDir}
  bun install
  bun dev`)
}
