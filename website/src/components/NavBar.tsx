import { useCallback, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { FiGithub, FiMoreVertical, FiX, FiSearch } from 'react-icons/fi'
import SearchBar from '@/components/SearchBar'
import { useToggle } from '@/hooks'

import { useJanudocsContext } from '@/core/useJanudocsContext'

import clsx from 'clsx'

interface LinkProps {
    label: string
    path: string
}

const links: LinkProps[] = [
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Docs', path: '/docs' },
]

export default function NavBar() {
    const [isMenuOpen, toggleMenu] = useToggle()
    const [isSearchOpen, toggleSearch] = useToggle()
    const routerState = useRouterState()

    const { siteConfig } = useJanudocsContext()

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                toggleSearch()
            }
            if (e.key === 'Escape') {
                if (isSearchOpen) toggleSearch()
            }
        },
        [isSearchOpen, toggleSearch]
    )

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    const menuLinks = links.map((link) => (
        <li key={link.label}>
            <Link
                to={link.path}
                className={clsx(
                    'hover:text-amber-400 transition-colors',
                    routerState.location.pathname.startsWith('/docs')
                )}
                activeProps={{ className: 'text-amber-400' }}
                onClick={toggleMenu}
            >
                {link.label}
            </Link>
        </li>
    ))

    const DesktopMenu = () => (
        <ul className="hidden md:flex gap-6 text-slate-300 text-sm">
            {menuLinks}
        </ul>
    )

    const MobileMenu = () =>
        isMenuOpen && (
            <ul className="absolute top-full inset-x-0 z-40 bg-slate-800 border-t border-slate-700 shadow-lg text-slate-100 flex flex-col gap-4 p-4 md:hidden">
                {menuLinks}
            </ul>
        )

    const SearchButton = () => (
        <>
            {/* Desktop */}
            <button
                aria-label="Open Search"
                className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white text-sm border border-slate-600 px-3 py-1 rounded shadow-sm"
                onClick={toggleSearch}
            >
                <FiSearch /> Search{' '}
                <span className="text-xs text-slate-400">(Ctrl + K)</span>
            </button>

            {/* Mobile */}
            <button
                aria-label="Open Search"
                className="md:hidden text-slate-300 hover:text-white"
                onClick={toggleSearch}
            >
                <FiSearch size={22} />
            </button>
        </>
    )

    return (
        
        <>
            <nav className="bg-slate-900/90 backdrop-blur-lg px-6 py-4 flex items-center justify-between border-b border-slate-700 h-16 z-50 relative">
                {/* Left: Logo + Links */}
                <div className="flex items-center gap-8">
                    <Link
                        to="/"
                        className="text-xl font-bold text-amber-400 hover:text-white transition"
                    >
                        {siteConfig.componentsConfig.navbar.title}
                    </Link>
                    <DesktopMenu />
                </div>

                {/* Right: Buttons */}
                <div className="flex items-center gap-4">
                    <SearchButton />

                    <a
                        href="https://github.com/andrewcwhy/janudocs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-white transition"
                        title="GitHub Repository"
                        aria-label="Visit GitHub Repository"
                    >
                        <FiGithub size={20} />
                    </a>

                    <button
                        className="md:hidden text-slate-300 hover:text-white"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <FiX size={24} />
                        ) : (
                            <FiMoreVertical size={24} />
                        )}
                    </button>
                </div>

                {/* Mobile nav */}
                <MobileMenu />
            </nav>

            {/* Global Search Modal */}
            <SearchBar isOpen={isSearchOpen} onClose={toggleSearch} />
        </>
    )
}
