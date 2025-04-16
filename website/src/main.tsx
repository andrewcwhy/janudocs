import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { JanudocsContextProvider } from '@janudocs/core'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import '@/styles/index.css'

// Set up a Router instance
const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const rootElement = document.getElementById('app')!

if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <JanudocsContextProvider>
                <RouterProvider router={router} />
            </JanudocsContextProvider>
        </StrictMode>
    )
}
