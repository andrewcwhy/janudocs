import { Outlet } from 'react-router'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}
