import { serve } from 'bun'
import { stat, readdir, unlink, writeFile, rename, readFile } from 'fs/promises'
import path from 'path'

const rootDir = process.cwd() // Use user's working directory
const publicDir = path.join(import.meta.dir, '../public')
const port = 3001

serve({
    port,
    async fetch(req) {
        const url = new URL(req.url)
        const pathname = decodeURIComponent(url.pathname)

        if (pathname.startsWith('/api/files')) {
            const method = req.method
            const fileParam = url.searchParams.get('path') || ''
            const fullPath = path.join(rootDir, fileParam)

            try {
                if (method === 'GET') {
                    const fileStat = await stat(fullPath)
                    if (fileStat.isDirectory()) {
                        const files = await readdir(fullPath)
                        return Response.json({ files })
                    } else {
                        const content = await readFile(fullPath, 'utf8')
                        return Response.json({ content })
                    }
                }

                if (method === 'POST') {
                    const { content } = await req.json()
                    await writeFile(fullPath, content || '', 'utf8')
                    return new Response('Saved')
                }

                if (method === 'DELETE') {
                    await unlink(fullPath)
                    return new Response('Deleted')
                }

                if (method === 'PATCH') {
                    const { newPath } = await req.json()
                    const newFullPath = path.join(rootDir, newPath)
                    await rename(fullPath, newFullPath)
                    return new Response('Renamed')
                }

                if (method === 'PUT') {
                    await writeFile(fullPath, '', 'utf8')
                    return new Response('Created')
                }
            } catch (err) {
                return new Response('File operation failed', { status: 500 })
            }
        }

        // Static file serving
        const filePath = path.join(
            publicDir,
            pathname === '/' ? 'index.html' : pathname
        )
        const file = Bun.file(filePath)

        try {
            const isHTML = filePath.endsWith('.html')

            if (isHTML) {
                return new Response(file, {
                    headers: { 'Content-Type': 'text/html' },
                })
            } else {
                return new Response(file) // No headers — browser auto-detects
            }
        } catch {
            // Fallback for SPA routing
            const fallback = Bun.file(path.join(publicDir, 'index.html'))
            return new Response(fallback, {
                headers: { 'Content-Type': 'text/html' },
            })
        }
    },
})

console.log(`📝 Janudocs Editor running at http://localhost:${port}`)
