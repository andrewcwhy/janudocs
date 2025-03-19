import { useState, useEffect, forwardRef, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

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
    const [results, setResults] = useState<{ name: string; path: string }[]>([])
    const [categories, setCategories] = useState<DocCategory[]>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        fetch('/docs/index.json')
            .then((res) => res.json())
            .then((data) => setCategories(data.categories))
            .catch((err) => console.error('Failed to load docs index:', err))
    }, [])

    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            return
        }

        const lowerQuery = query.toLowerCase()
        const matched: { name: string; path: string }[] = []

        categories.forEach((cat) => {
            cat.files.forEach((file) => {
                const fileName = file.replace('.md', '').replace(/[-_]/g, ' ')
                if (
                    fileName.toLowerCase().includes(lowerQuery) ||
                    cat.label.toLowerCase().includes(lowerQuery) ||
                    cat.description.toLowerCase().includes(lowerQuery)
                ) {
                    matched.push({
                        name: `${cat.label} - ${fileName}`,
                        path: `/docs/${cat.path}/${file.replace('.md', '')}`,
                    })
                }
            })
        })

        setResults(matched)
        setActiveIndex(0) // Auto-highlight the first result
    }, [query, categories])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((prev) => Math.min(prev + 1, results.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((prev) => Math.max(prev - 1, 0))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (results[activeIndex]) {
                navigate(results[activeIndex].path)
                handleClose()
            }
        }
    }

    const handleClose = () => {
        setQuery('') // Clear the query when closing
        onClose() // Call the onClose prop
    }

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-300 ease-out"
            onClick={handleClose}
        >
            <div
                className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-2xl transform transition-all duration-300 ease-out scale-95"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-sm border px-2 py-1 rounded"
                    onClick={handleClose}
                >
                    ESC
                </button>

                <div className="relative w-full" onKeyDown={handleKeyDown}>
                    <div className="flex items-center gap-2 border rounded-lg p-2 bg-white shadow">
                        <FiSearch className="text-gray-500" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search documentation..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full outline-none text-sm"
                        />
                    </div>

                    {results.length > 0 ? (
                        <ul className="absolute bg-white shadow-lg mt-2 rounded-lg border w-full z-50 max-h-64 overflow-auto">
                            {results.map((result, idx) => (
                                <li
                                    key={idx}
                                    className={`border-b last:border-none ${
                                        activeIndex === idx ? 'bg-gray-200' : ''
                                    }`}
                                >
                                    <Link
                                        to={result.path}
                                        className="block px-4 py-2 hover:bg-gray-100 text-sm"
                                        onClick={handleClose}
                                    >
                                        {result.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : query.trim() ? (
                        <div className="absolute bg-white shadow-lg mt-2 rounded-lg border w-full z-50 p-4 text-sm text-gray-500">
                            No results found for "{query}"
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
})

export default SearchBar