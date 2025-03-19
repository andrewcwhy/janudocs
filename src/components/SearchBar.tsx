import { useState, useEffect, forwardRef, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiArrowUp, FiArrowDown, FiCornerDownLeft } from 'react-icons/fi'

interface DocCategory {
    label: string
    description: string
    path: string
    files: string[]
}

interface SearchBarProps {
    isOpen: boolean
    onClose: () => void
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({ isOpen, onClose }, ref) => {
    const [query, setQuery] = useState('')
    const [categories, setCategories] = useState<DocCategory[]>([])
    const [groupedResults, setGroupedResults] = useState<Record<string, { name: string; path: string }[]>>({})
    const [activeIndex, setActiveIndex] = useState(0)
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        fetch('/docs/manifest.json')
            .then((res) => res.json())
            .then((data) => setCategories(data.categories))
            .catch((err) => console.error('Failed to load docs manifest:', err))
    }, [])

    useEffect(() => {
        if (!query.trim()) {
            setGroupedResults({})
            return
        }
        const lowerQuery = query.toLowerCase()
        const grouped: Record<string, { name: string; path: string }[]> = {}

        categories.forEach((cat) => {
            const matches = cat.files
                .map((file) => {
                    const fileName = file.replace('.md', '').replace(/[-_]/g, ' ')
                    if (
                        fileName.toLowerCase().includes(lowerQuery) ||
                        cat.label.toLowerCase().includes(lowerQuery) ||
                        cat.description.toLowerCase().includes(lowerQuery)
                    ) {
                        return {
                            name: fileName,
                            path: `/docs/${cat.path}/${file.replace('.md', '')}`
                        }
                    }
                    return null
                })
                .filter(Boolean) as { name: string; path: string }[]
            if (matches.length > 0) {
                grouped[cat.label] = matches
            }
        })

        setGroupedResults(grouped)
        setActiveIndex(0)
    }, [query, categories])

    const flatResults = Object.values(groupedResults).flat()

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((prev) => Math.min(prev + 1, flatResults.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((prev) => Math.max(prev - 1, 0))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (flatResults[activeIndex]) {
                navigate(flatResults[activeIndex].path)
                handleClose()
            }
        }
    }

    const handleClose = () => {
        setQuery('')
        onClose()
    }

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleClose}
        >
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top Bar with Search and ESC */}
                <div className="flex items-center border-b border-gray-200 p-4">
                    <div className="flex items-center gap-3 flex-grow bg-gray-50 rounded-lg px-4 py-2 shadow-inner">
                        <FiSearch className="text-gray-500" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search documentation..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
                        />
                    </div>
                    <button
                        className="ml-4 text-gray-500 hover:text-gray-800 text-xs border px-3 py-1 rounded transition"
                        onClick={handleClose}
                    >
                        ESC
                    </button>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-auto">
                    {Object.keys(groupedResults).length > 0 ? (
                        <div className="p-4 flex flex-col gap-6">
                            {Object.entries(groupedResults).map(([category, items]) => (
                                <section key={category} className="flex flex-col gap-2">
                                    <div className="font-semibold text-gray-800 text-base">{category}</div>
                                    <ul className="flex flex-col gap-1">
                                        {items.map((item, idx) => {
                                            const globalIdx = flatResults.findIndex(r => r.path === item.path)
                                            const isActive = activeIndex === globalIdx
                                            return (
                                                <li
                                                    key={idx}
                                                    className={`rounded hover:bg-gray-100 ${isActive ? 'bg-blue-100' : ''} transition`}
                                                >
                                                    <Link
                                                        to={item.path}
                                                        className={`block px-4 py-2 text-sm ${isActive ? 'font-medium text-blue-700' : 'text-gray-700'}`}
                                                        onClick={handleClose}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </section>
                            ))}
                        </div>
                    ) : query.trim() ? (
                        <div className="p-6 text-center text-sm text-gray-500">
                            No results found for "<span className="font-medium">{query}</span>"
                        </div>
                    ) : (
                        <div className="p-6 text-center text-sm text-gray-400">
                            Start typing to search documentation
                        </div>
                    )}
                </div>

                {/* Footer with Commands */}
                <footer className="border-t border-gray-200 p-3 bg-gray-50 flex items-center justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <FiArrowUp className="text-gray-600" />
                        <FiArrowDown className="text-gray-600" />
                        <span>to navigate</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiCornerDownLeft className="text-gray-600" />
                        <span>to select</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>ESC</span>
                        <span>to close</span>
                    </div>
                </footer>
            </div>
        </div>
    )
})

export default SearchBar