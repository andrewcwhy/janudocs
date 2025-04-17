import { StrictMode } from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { JanudocsContextProvider } from '@/core/JanudocsContext'
import ReactDOM from 'react-dom/client'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import '@/styles/index.css'

// Create a new router instance
const router = createRouter({
    routeTree,
    context: {},
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
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
