import { Outlet } from '@tanstack/react-router'
import Sidebar from '@/components/Sidebar'
import MobileSidebar from '@/components/MobileHeader'
import { useScrollDirection } from '@/hooks'
import Pagination from '@/components/docs/Pagination'

export default function DocsLayout() {
    const scrollDirection = useScrollDirection()

    return (
        <>
            {/* Mobile top bar */}
            <div
                className={`sticky top-16 z-10 transition-transform duration-300 md:hidden ${
                    scrollDirection === 'down'
                        ? '-translate-y-full'
                        : 'translate-y-0'
                }`}
            >
                <MobileSidebar />
            </div>

            {/* Sidebar + Main Content Layout */}
            <div className="flex flex-row w-full">
                <Sidebar />
                <main className="p-6 max-w-4xl mx-auto w-full">
                    <Outlet />
                    <Pagination />
                </main>
            </div>
        </>
    )
}
