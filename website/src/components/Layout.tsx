import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { Outlet } from 'react-router'

export default function Layout() {
    return (
        <>
            <div className="border-b border-gray-200 fixed inset-x-0 z-10">
                <NavBar />
            </div>
            <main className="flex pt-16 flex-grow">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
