import { Outlet } from 'react-router'
import SideBar from '@/components/Sidebar'
import MobileSidebar from '@/components/MobileSidebar'
import { useScrollDirection } from '@/hooks/useScrollDirection'

export default function DocsLayout() {
    const scrollDirection = useScrollDirection()

    return (
        <>
            {/* Mobile header that hides with Nav */}
            <div
                className={`sticky top-16 z-30 transition-transform duration-300 md:hidden ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}`}
            >
                <MobileSidebar />
            </div>

            <div className="flex flex-1">
                {/* Sidebar only for larger screens */}
                <div className="hidden md:block">
                    <SideBar />
                </div>

                {/* Main content */}
                <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
                    <Outlet />
                </main>
            </div>
        </>
    )
}
