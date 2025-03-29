import { Outlet } from 'react-router'
import Nav from '@/components/NavBar'
import Footer from '@/components/Footer'
import { useScrollDirection } from '../hooks/useScrollDirection'

export default function Layout() {
    const scrollDirection = useScrollDirection()

    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <div
                className={`sticky top-0 z-40 transition-transform duration-300 ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}`}
            ></div>
            <Outlet />
            <Footer />
        </div>
    )
}
