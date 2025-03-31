import path from 'path'
import { pathToFileURL } from 'url'
export async function loadUserConfig(configFile = 'janudocs.config.ts') {
    const absPath = path.resolve(process.cwd(), configFile)
    const fileUrl = pathToFileURL(absPath)
    const mod = await import(fileUrl.href)
    return mod.default
}
