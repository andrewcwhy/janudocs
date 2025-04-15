import { createFileRoute, Outlet } from '@tanstack/react-router'
import Sidebar from '@/components/Sidebar'

export const Route = createFileRoute('/docs/__layout')({
    component: DocsWrapper,
})

function DocsWrapper() {
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}
