import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiChevronDown, FiChevronRight, FiBookOpen } from 'react-icons/fi'

interface DocCategory {
    label: string
    description: string
    path: string
    files: string[]
}

export default function SideBar() {
    const [categories, setCategories] = useState<DocCategory[]>([])
    const [openCategories, setOpenCategories] = useState<{
        [key: string]: boolean
    }>({})
    const location = useLocation()

    useEffect(() => {
        ;(async () => {
            const res = await fetch('/docs/index.json')
            const data = await res.json()
            setCategories(data.categories)

            // Expand all categories by default on initial load
            const initialOpen: { [key: string]: boolean } = {}
            data.categories.forEach((cat: DocCategory) => {
                initialOpen[cat.path] = true
            })
            setOpenCategories(initialOpen)
        })()
    }, [])

    const toggleCategory = (path: string) => {
        setOpenCategories((prev) => ({ ...prev, [path]: !prev[path] }))
    }

    // Utility to replace dashes/underscores with spaces for display
    const formatName = (str: string) => str.replace(/[-_]/g, ' ')

    return (
        <aside className="w-72 p-5 bg-white border-r border-gray-200 sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin">
            <div className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <FiBookOpen className="text-gray-600" />
                Documentation
            </div>

            <div className="flex flex-col gap-8">
                {/* Map over categories, but skip rendering those without files */}
                {categories.map((cat) => {
                    if (!cat.files || cat.files.length === 0) {
                        // If category has no files, render nothing
                        return null
                    }

                    const isOpen = openCategories[cat.path]

                    return (
                        // Wrapper div for each category
                        <div key={cat.path} className="flex flex-col gap-3">
                            <div>
                                <button
                                    onClick={() => toggleCategory(cat.path)}
                                    className="w-full flex justify-between items-center text-left font-medium text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <span>{cat.label}</span>
                                    {isOpen ? (
                                        <FiChevronDown />
                                    ) : (
                                        <FiChevronRight />
                                    )}
                                </button>

                                <p className="text-gray-500 text-xs mt-1">
                                    {cat.description}
                                </p>
                            </div>

                            {isOpen && (
                                <ul className="flex flex-col gap-2">
                                    {cat.files.map((file) => {
                                        const routePath = `/docs/${cat.path}/${file.replace('.md', '')}`
                                        const isActive =
                                            location.pathname === routePath
                                        const displayName = formatName(
                                            file.replace('.md', '')
                                        )

                                        return (
                                            <li key={file}>
                                                <Link
                                                    to={routePath}
                                                    className={`block pl-4 text-sm transition-colors border-l-2 ${
                                                        isActive
                                                            ? 'border-blue-600 text-blue-600 font-medium'
                                                            : 'border-gray-200 text-gray-700 hover:text-blue-600 hover:border-gray-300'
                                                    }`}
                                                >
                                                    {displayName}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </div>
                    )
                })}
            </div>
        </aside>
    )
}
