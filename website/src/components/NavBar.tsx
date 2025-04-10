import { useCallback, useEffect } from 'react'
import { NavLink } from 'react-router'
import { FiGithub, FiMoreVertical, FiX, FiSearch } from 'react-icons/fi'
import SearchBar from '@/components/SearchBar'
import { useToggle } from '@/hooks/ui/useToggle'

interface LinkProps {
    label: string
    path: string
}

// Links for the navigation bar
const links: LinkProps[] = [
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Docs', path: '/docs/getting-started/installation' },
]

export default function NavBar() {
    const [isMenuOpen, toggleMenu] = useToggle()
    const [isSearchOpen, toggleSearch] = useToggle()

    // Hot keys for search
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                toggleSearch()
            }
            if (e.key === 'Escape') {
                // Only close if it's open
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
            <NavLink
                to={link.path}
                className="hover:text-blue-600"
                onClick={toggleMenu}
            >
                {link.label}
            </NavLink>
        </li>
    ))

    // Desktop menu component
    const DesktopMenu = () => (
        <ul className="hidden md:flex gap-6 text-gray-700 text-sm">
            {menuLinks}
        </ul>
    )

    // Mobile menu component
    const MobileMenu = () =>
        isMenuOpen && (
            <ul className="absolute top-full inset-x-0 z-40 bg-white shadow-md border-t border-gray-200 flex flex-col gap-4 p-4 md:hidden">
                {menuLinks}
            </ul>
        )

    // Search button components
    const SearchButton = () => (
        <>
            {/* Desktop */}
            <button
                aria-label="Open Search"
                className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm border px-3 py-1 rounded shadow-sm"
                onClick={toggleSearch}
            >
                <FiSearch /> Search{' '}
                <span className="text-xs text-gray-400">(Ctrl + K)</span>
            </button>

            {/* Mobile */}
            <button
                aria-label="Open Search"
                className="md:hidden text-gray-600 hover:text-gray-800"
                onClick={toggleSearch}
            >
                <FiSearch size={22} />
            </button>
        </>
    )

    return (
        <>
            <nav
                className="bg-white/60 backdrop-blur p-4 flex items-center justify-between
             h-16"
            >
                {/* Left section */}
                <div className="flex items-center gap-8">
                    <NavLink
                        to="/"
                        className="text-xl font-bold text-gray-800 hover:text-blue-600"
                    >
                        Janudocs
                    </NavLink>
                    <DesktopMenu />
                </div>

                {/* Right section */}
                <div className="flex items-center gap-4">
                    {/* Search button */}
                    <SearchButton />

                    {/* GitHub link */}
                    <a
                        href="https://github.com/andrewcwhy/janudocs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <FiGithub size={20} />
                    </a>

                    {/* Mobile menu toggle button */}
                    <button
                        className="md:hidden text-gray-600 hover:text-gray-800"
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

                {/* Mobile Menu */}
                <MobileMenu />
            </nav>

            {/* Search bar modal */}
            <SearchBar isOpen={isSearchOpen} onClose={toggleSearch} />
        </>
    )
}
