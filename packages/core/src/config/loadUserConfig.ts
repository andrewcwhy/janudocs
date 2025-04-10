import path from 'path'
import { pathToFileURL } from 'url'
import { defaultConfig } from '@/config/defaultConfig'
import type { JanudocsConfig } from '@/types/config'

export async function loadUserConfig(
    configFile: string = 'janudocs.config.ts'
): Promise<JanudocsConfig> {
    const absPath = path.resolve(process.cwd(), configFile)
    const fileUrl = pathToFileURL(absPath)

    try {
        const mod = await import(fileUrl.href)
        const userConfig = mod.default as Partial<JanudocsConfig>

        return {
            ...defaultConfig,
            ...userConfig,
            sidebar: {
                ...defaultConfig.sidebar,
                ...userConfig.sidebar,
                categories: {
                    ...defaultConfig.sidebar.categories,
                    ...userConfig.sidebar?.categories,
                    descriptions: {
                        ...defaultConfig.sidebar.categories.descriptions,
                        ...userConfig.sidebar?.categories?.descriptions,
                        textStyle: {
                            ...defaultConfig.sidebar.categories.descriptions
                                .textStyle,
                            ...userConfig.sidebar?.categories?.descriptions
                                ?.textStyle,
                        },
                    },
                    textStyle: {
                        ...defaultConfig.sidebar.categories.textStyle,
                        ...userConfig.sidebar?.categories?.textStyle,
                    },
                },
                items: {
                    ...defaultConfig.sidebar.items,
                    ...userConfig.sidebar?.items,
                    textStyle: {
                        ...defaultConfig.sidebar.items.textStyle,
                        ...userConfig.sidebar?.items?.textStyle,
                    },
                },
            },
        }
    } catch {
        return defaultConfig
    }
}
