import { Outlet } from 'react-router'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <Outlet />
            <Footer />
        </div>
    )
}
