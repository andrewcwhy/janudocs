// packages/core/src/context/JanudocsContext.tsx

import React, { type ReactNode } from 'react'
import type { JanudocsContext } from './context'
import { defaultConfig } from './defaultConfig'

// Create a single Context instance with a real default value
const contextValue: JanudocsContext = {
    siteConfig: defaultConfig,
}

export const Context = React.createContext<JanudocsContext>(contextValue)

export function JanudocsContextProvider({
    children,
}: {
    children: ReactNode
}): ReactNode {
    return <Context.Provider value={contextValue}>{children}</Context.Provider>
}
