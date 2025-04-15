import { Outlet } from '@tanstack/react-router'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <Sidebar />
            <Outlet />
            <Footer />
        </div>
    )
}
