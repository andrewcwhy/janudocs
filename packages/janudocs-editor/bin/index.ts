import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

// This file is located at: packages/janudocs-editor/bin/index.ts
// We want to run:         packages/janudocs-editor/src/server.ts

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ Join from /bin to /src/server.ts
const serverPath = path.join(__dirname, '../src/server.ts')

// Run the Bun server
spawn('bun', [serverPath], {
    stdio: 'inherit',
    cwd: process.cwd(),
})
