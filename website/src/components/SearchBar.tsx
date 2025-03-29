import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useNavigate } from 'react-router'
import {
    FiSearch,
    FiArrowUp,
    FiArrowDown,
    FiCornerDownLeft,
} from 'react-icons/fi'
import { useDocsManifest } from '@/hooks/useDocsManifest'

interface SearchResult {
    name: string
    path: string
    score: number
}

interface SearchBarProps {
    isOpen: boolean
    onClose: () => void
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
    const { manifest } = useDocsManifest()
    const [query, setQuery] = useState('')
    const [groupedResults, setGroupedResults] = useState<
        Record<string, SearchResult[]>
    >({})
    const [activeIndex, setActiveIndex] = useState(0)
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            document.body.style.width = '100%'
        } else {
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.width = ''
        }
        return () => {
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.width = ''
        }
    }, [isOpen])

    const normalizedQuery = useMemo(
        () => query.toLowerCase().replace(/[-_]/g, ' ').trim(),
        [query]
    )

    const searchTerms = useMemo(
        () => normalizedQuery.split(/\s+/).filter((t) => t.length > 0),
        [normalizedQuery]
    )

    useEffect(() => {
        if (!query.trim()) {
            setGroupedResults({})
            return
        }

        const grouped: Record<string, SearchResult[]> = {}

        // Search category files
        manifest.categories.forEach((cat) => {
            const matches = cat.files
                .map((file): SearchResult | null => {
                    const fileName = file.replace('.md', '')
                    const normalized = fileName
                        .replace(/[-_]/g, ' ')
                        .toLowerCase()

                    if (!searchTerms.every((term) => normalized.includes(term)))
                        return null

                    let score = 0
                    searchTerms.forEach((term) => {
                        if (normalized.includes(term)) score += 3
                    })

                    return {
                        name: fileName,
                        path: `/docs/${cat.path}/${fileName}`,
                        score,
                    }
                })
                .filter((r): r is SearchResult => r !== null)
                .sort((a, b) => b.score - a.score)

            if (matches.length > 0) grouped[cat.label] = matches
        })

        // Search loose files
        if (manifest.looseFiles?.[0]?.files?.length) {
            const matches = manifest.looseFiles[0].files
                .map((file): SearchResult | null => {
                    const fileName = file.replace('.md', '')
                    const normalized = fileName
                        .replace(/[-_]/g, ' ')
                        .toLowerCase()

                    if (!searchTerms.every((term) => normalized.includes(term)))
                        return null

                    let score = 0
                    searchTerms.forEach((term) => {
                        if (normalized.includes(term)) score += 3
                    })

                    return {
                        name: fileName,
                        path: `/docs/${fileName}`,
                        score,
                    }
                })
                .filter((r): r is SearchResult => r !== null)
                .sort((a, b) => b.score - a.score)

            if (matches.length > 0) grouped['Miscellaneous'] = matches
        }

        setGroupedResults(grouped)
        setActiveIndex(0)
    }, [query, manifest, searchTerms])

    const flatResults = Object.values(groupedResults).flat()

    const highlightMatches = (text: string) => {
        if (searchTerms.length === 0) return text
        const regex = new RegExp(`(${searchTerms.join('|')})`, 'gi')
        return text.split(regex).map((part, index) =>
            index % 2 === 1 ? (
                <mark key={index} className="bg-yellow-100 font-semibold">
                    {part}
                </mark>
            ) : (
                part
            )
        )
    }

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
                className="relative bg-white rounded-none md:rounded-2xl shadow-2xl w-full max-w-full md:max-w-2xl h-full md:h-auto md:max-h-[80vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <header className="flex items-center border-b border-gray-200 p-4">
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
                </header>

                {/* Results */}
                <main className="flex-1 overflow-auto">
                    {Object.keys(groupedResults).length > 0 ? (
                        <div className="p-4 flex flex-col gap-6">
                            {Object.entries(groupedResults).map(
                                ([section, items]) => (
                                    <section
                                        key={section}
                                        className="flex flex-col gap-2"
                                    >
                                        <div className="font-semibold text-gray-800 text-base">
                                            {section}
                                        </div>
                                        <ul className="flex flex-col gap-1">
                                            {items.map((item, idx) => {
                                                const globalIdx =
                                                    flatResults.findIndex(
                                                        (r) =>
                                                            r.path === item.path
                                                    )
                                                const isActive =
                                                    activeIndex === globalIdx
                                                return (
                                                    <li
                                                        key={idx}
                                                        className={`rounded cursor-pointer ${
                                                            isActive
                                                                ? 'bg-blue-100'
                                                                : ''
                                                        } transition`}
                                                        onMouseEnter={() =>
                                                            setActiveIndex(
                                                                globalIdx
                                                            )
                                                        }
                                                    >
                                                        <Link
                                                            to={item.path}
                                                            className={`block px-4 py-2 text-sm ${
                                                                isActive
                                                                    ? 'font-medium text-blue-700'
                                                                    : 'text-gray-700'
                                                            }`}
                                                            onClick={
                                                                handleClose
                                                            }
                                                        >
                                                            {highlightMatches(
                                                                item.name.replace(
                                                                    /[-_]/g,
                                                                    ' '
                                                                )
                                                            )}
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </section>
                                )
                            )}
                        </div>
                    ) : query.trim() ? (
                        <section className="p-6 text-center text-sm text-gray-500 flex flex-col items-center gap-3">
                            <FiSearch size={48} className="text-gray-400" />
                            <p>
                                No results found for "
                                <span className="font-medium">{query}</span>"
                            </p>
                        </section>
                    ) : (
                        <p className="p-6 text-center text-sm text-gray-400">
                            Start typing to search documentation
                        </p>
                    )}
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-200 p-3 bg-gray-50 flex items-center justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <FiArrowUp />
                        <FiArrowDown />
                        <span>to navigate</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiCornerDownLeft />
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
}
