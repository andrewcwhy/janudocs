// packages/core/src/context/JanudocsContext.tsx

import React, { type ReactNode, useState, useEffect } from 'react'
import type { JanudocsContext, JanudocsConfig } from '../types/context'
import { loadUserConfig } from '../config/loadUserConfig'
import { JSX } from 'react'

// Create a default config
const defaultConfig: JanudocsConfig = {
    // Add required default properties of JanudocsConfig here
}

// Create a default context value
const defaultContextValue: JanudocsContext = {
    siteConfig: defaultConfig,
}

export const Context = React.createContext<JanudocsContext>(defaultContextValue)

export function JanudocsContextProvider({
    children,
}: {
    children: ReactNode
}): JSX.Element {
    const [config, setConfig] = useState<JanudocsConfig>(defaultConfig)

    useEffect(() => {
        // Load the config when the component mounts
        loadUserConfig()
            .then((loadedConfig) => {
                setConfig(loadedConfig)
            })
            .catch((error) => {
                console.error('Failed to load user config:', error)
            })
    }, [])

    const contextValue: JanudocsContext = {
        siteConfig: config,
    }

    return <Context.Provider value={contextValue}>{children}</Context.Provider>
}
