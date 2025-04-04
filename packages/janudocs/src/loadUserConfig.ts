import path from 'path'
import { pathToFileURL } from 'url'
import type { JanudocsConfig } from '@/types/config'

export async function loadUserConfig(
    configFile: string = 'janudocs.config.ts'
): Promise<JanudocsConfig> {
    const absPath = path.resolve(process.cwd(), configFile)
    const fileUrl = pathToFileURL(absPath)
    const mod = await import(fileUrl.href)
    return mod.default
}
