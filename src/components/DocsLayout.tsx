import SideBar from '@/components/Sidebar'
import { Outlet } from 'react-router'

export default function DocsLayout() {
    return (
        <div className="flex flex-grow relative">
            <SideBar />

            {/* Docs Content */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    )
}
