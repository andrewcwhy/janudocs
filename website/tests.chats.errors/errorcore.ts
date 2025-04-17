Instructions:

Read the commments I added.
Read every single line of code I gave you.
Somewhere Im doing wrong naming or imports. fix namings or imports and change the imports and naming but keep the structure i basically provided
Utilize the examples I provide.
Use relative paths.

Example:
janudocs/website/src/routes/index.tsx:

import { useJanudocsContext } from '@janudocs/core'
import { useManifest } from '@janudocs/core'

const { //something goes here but I dont know what } = useJanudocsContext()

{//something goes here but I dont know what .footer.copyright}
{//something goes here but I dont know what.navbar.title}

Also create a janudocs/packages/core/src/index.ts


Provided codes and comments inside code:


// File: janudocs/packages/core/src/index.ts


export { useManifest } from './hooks/useManifest'
export { useJanudocsContext } from './hooks/useJanudocsContext'
export { JanudocsContextProvider } from './context/JanudocsContext'
export type { JanudocsConfig } from './types/config'
export type { JanudocsContext } from './types/context'


// File: janudocs/packages/core/src/context/JanudocsContext.tsx


import React, { type ReactNode } from 'react'
import type { JanudocsContext } from '@/types/context'
// import { // What do I even import here } from '../config/ I dont know what goes here'

const contextValue: JanudocsContext = {
    // I dont know what to add here for the config
}
export const Context = React.createContext<JanudocsContext>(contextValue)

export function JanudocsContextProvider({
  children,
}: {
  children: ReactNode
}): ReactNode {
  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
}


// File: janudocs/packages/core/src/hooks/useJanudocsContext.ts


import { useContext } from 'react'
import { Context } from '../context/JanudocsContext'
import type { JanudocsContext } from '../types/context'

export function useJanudocsContext(): JanudocsContext {
    return useContext(Context)
}


// File: janudocs/packages/core/src/types/config.ts


type CollapseState = 'expanded' | 'collapsed'
type TextTransform = 'capitalize' | 'uppercase' | 'lowercase'
type SidebarPosition = 'left' | 'right'

interface TextStyleConfig {
    textTransform: TextTransform
}

interface DescriptionConfig {
    enabled: boolean
    textStyle: TextStyleConfig
}

interface NavBarConfig {
    title: string
    items: {
        highlightActive: boolean
        textStyle: {
            textTransform: TextTransform
        }
    }
}

interface SidebarConfig {
    position: SidebarPosition
    collapsible: boolean
    categories: {
        collapsible: boolean
        initialState: CollapseState
        descriptions: DescriptionConfig
        textStyle: TextStyleConfig
    }
    items: {
        highlightActive: boolean
        textStyle: {
            textTransform: TextTransform
        }
    }
}

interface FooterConfig {
    copyright: string
}

export interface JanudocsConfig {
    title: string
    url: string
    navbar: NavBarConfig
    sidebar: SidebarConfig
    footer: FooterConfig
}


// File: janudocs/packages/core/src/types/context.ts


import type { JanudocsConfig } from '../types/config'

export type JanudocsContext = {
    siteConfig: JanudocsConfig
}


// File: janudocs/packages/core/src/config/defaultConfig.ts


import type { JanudocsConfig } from '../types/config'

export const defaultConfig: JanudocsConfig = {
    title: 'My Janudocs Site',
    url: 'https://my-janudocs-site.com',

    navbar: {
        title: 'My Janudocs Site',
        items: {
            highlightActive: true,
            textStyle: {
                textTransform: 'capitalize',
            },
        },
    },

    sidebar: {
        position: 'left',
        collapsible: true,
        categories: {
            collapsible: true,
            initialState: 'expanded',
            descriptions: {
                enabled: true,
                textStyle: {
                    textTransform: 'capitalize',
                },
            },
            textStyle: {
                textTransform: 'capitalize',
            },
        },
        items: {
            highlightActive: true,
            textStyle: {
                textTransform: 'capitalize',
            },
        },
    },

    footer: {
        copyright: `© {new Date().getFullYear()} My Janudocs Site. Built with ❤️ using Janudocs by ACY.`,
    },
}



// File: janudocs/packages/core/src/config/loadUserConfig.ts


import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { defaultConfig } from '../config/defaultConfig'
import type { JanudocsConfig } from '../types/config'

export async function loadUserConfig(
    configFile = 'janudocs.config.ts'
): Promise<JanudocsConfig> {
    const absPath = path.resolve(process.cwd(), configFile)
    const fileUrl = pathToFileURL(absPath)

    try {
        const mod = await import(fileUrl.href)
        const userConfig = mod.default as Partial<JanudocsConfig>

        return {
            ...defaultConfig,
            ...userConfig,

            title: userConfig.title ?? defaultConfig.title,
            url: userConfig.url ?? defaultConfig.url,

            navbar: {
                ...defaultConfig.navbar,
                ...userConfig.navbar,
                items: {
                    ...defaultConfig.navbar.items,
                    ...userConfig.navbar?.items,
                    textStyle: {
                        ...defaultConfig.navbar.items.textStyle,
                        ...userConfig.navbar?.items?.textStyle,
                    },
                },
            },

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

            footer: {
                ...defaultConfig.footer,
                ...userConfig.footer,
            },
        }
    } catch {
        return defaultConfig
    }
}
    "name": "@janudocs/core",
    "author": "Andrew Christian Young",
    "version": "0.0.0",
    "type": "module",
    "exports": 
        ".": 
            "import": "./dist/index.js",
            "types": "./dist/index.d.ts",
    "bin": 
        "janudocs": "bin/index.ts",
    "types": "./dist/index.d.ts",
    "scripts": 
        "build": "bun build src/index.ts --outdir dist --target node && tsc --emitDeclarationOnly",
    "dependencies": 
        "commander": "^13.1.0",
        "gray-matter": "^4.0.3",
    "devDependencies": 
        "@types/react-dom": "^19.1.2",
    "peerDependencies": 
        "react": "^19.1.0",
        "react-dom": "^19.1.0"


// File: janudocs/website/janudocs.config.ts


import { defineConfig } from '@janudocs/core'

export default defineConfig({
    title: 'Janudocs',
    url: 'https://janudocs.com',

    navbar: {
        title: 'My Janudocs Site',
        items: {
            highlightActive: true,
            textStyle: { textTransform: 'capitalize' },
        },
    },

    sidebar: {
        position: 'left',
        collapsible: true,
        categories: {
            collapsible: true,
            initialState: 'expanded',
            descriptions: {
                enabled: false,
                textStyle: {
                    textTransform: 'capitalize',
                },
            },
            textStyle: {
                textTransform: 'capitalize',
            },
        },
        items: {
            highlightActive: true,
            textStyle: {
                textTransform: 'capitalize',
            },
        },
    },

    footer: {
        copyright: `© {new Date().getFullYear()} Janudocs. Built with ❤️ using Janudocs by ACY.`,
    },
})


// File: janudocs/website/src/components/Footer.tsx


import { Link } from '@tanstack/react-router'

import { useJanudocsContext } from '@janudocs/core'

export default function Footer() {
    const { //something here } = useJanudocsContext()
 
    return (
        <footer className="bg-slate-950 border-t border-slate-800 text-sm text-gray-400 px-6 py-8">
            <div className="text-center mb-4">{// something here.footer.copyright}</div>

            <ul className="flex justify-center gap-6 text-gray-500">
                <li>
                    <a
                        href="https://github.com/andrewcwhy/janudocs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#8C7853] transition"
                    >
                        GitHub
                    </a>
                </li>
                <li>
                    <Link
                        to="/privacy"
                        className="hover:text-[#8C7853] transition"
                    >
                        Privacy
                    </Link>
                </li>
                <li>
                    <Link
                        to="/terms"
                        className="hover:text-[#8C7853] transition"
                    >
                        Terms
                    </Link>
                </li>
            </ul>
        </footer>
    )
}


// File: janudocs/packages/core/src/config/defineConfig.ts


import type { JanudocsConfig } from '../types/config'

export function defineConfig(config: Partial<JanudocsConfig>) {
    return config
}
