import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

const serverPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'server.ts'
)

spawn('bun', [serverPath], {
    stdio: 'inherit',
    cwd: process.cwd(),
})
