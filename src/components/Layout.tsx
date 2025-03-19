import NavBar from './NavBar'
import SideBar from './SideBar'
import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Layout() {
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // Show Sidebar only on /docs routes
    const isDocsPage = location.pathname.startsWith('/docs')

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />

            <div className="flex pt-16 flex-grow relative">
                {/* Mobile Sidebar Toggle Button */}
                {isDocsPage && (
                    <button
                        className="md:hidden absolute left-4 top-4 z-20 bg-white border border-gray-300 rounded p-2 shadow"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? 'Close' : 'Menu'}
                    </button>
                )}

                {/* Sidebar - visible on md+ screens or when toggled on mobile */}
                {isDocsPage && (
                    <div
                        className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}
                    >
                        <SideBar />
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-8 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
