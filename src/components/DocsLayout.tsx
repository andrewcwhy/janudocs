import Sidebar from '@/components/Sidebar'
import { Outlet } from 'react-router'

export default function DocsLayout() {
    return (
        <div className="flex flex-grow relative">
            <Sidebar />

            {/* Docs Content */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    )
}
