import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import config from '../../janudocs.config'

interface DocCategory {
    label: string
    description: string
    path: string
    files: string[]
}

export default function SideBar() {
    const [categories, setCategories] = useState<DocCategory[]>([])
    const [looseFiles, setLooseFiles] = useState<string[]>([])
    const [openCategories, setOpenCategories] = useState<
        Record<string, boolean>
    >({})
    const location = useLocation()

    const { sidebar } = config
    const {
        togglable,
        defaultState,
        descriptions,
        textStyle: categoryTextStyle,
    } = sidebar.categories
    const { highlightActive, textStyle: itemTextStyle } = sidebar.items

    useEffect(() => {
        fetch('/docs/manifest.json')
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.categories)
                setLooseFiles(data.looseFiles || [])
                const initialOpen: Record<string, boolean> = {}
                data.categories.forEach((cat: DocCategory) => {
                    initialOpen[cat.path] = defaultState === 'expanded'
                })
                setOpenCategories(initialOpen)
            })
            .catch((err) => console.error('Failed to load manifest:', err))
    }, [defaultState])

    const toggleCategory = (path: string) => {
        if (!togglable) return
        setOpenCategories((prev) => ({ ...prev, [path]: !prev[path] }))
    }

    const formatName = (str: string) => str.replace(/[-_]/g, ' ')

    // Helper to apply textTransform from config
    const getTextTransformClass = (transform: string) => {
        switch (transform) {
            case 'capitalize':
                return 'capitalize'
            case 'uppercase':
                return 'uppercase'
            case 'lowercase':
                return 'lowercase'
            default:
                return ''
        }
    }

    return (
        <aside className="w-2xs flex flex-col gap-8 p-6 bg-white border-r border-gray-200 sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {categories.map((cat) => {
                if (!cat.files?.length) return null
                const isOpen = openCategories[cat.path]
                return (
                    <div key={cat.path} className="flex flex-col gap-3">
                        <div>
                            <button
                                onClick={() => toggleCategory(cat.path)}
                                className={`w-full flex justify-between items-center text-left font-medium text-gray-700 hover:text-blue-600 transition-colors ${
                                    !togglable ? 'cursor-default' : ''
                                } ${getTextTransformClass(categoryTextStyle.textTransform)}`}
                                disabled={!togglable}
                            >
                                <span>{cat.label}</span>
                                {togglable &&
                                    (isOpen ? (
                                        <FiChevronDown />
                                    ) : (
                                        <FiChevronRight />
                                    ))}
                            </button>
                            {descriptions.show && cat.description && (
                                <p
                                    className={`text-xs text-gray-500 ${getTextTransformClass(descriptions.textStyle.textTransform)}`}
                                >
                                    {cat.description}
                                </p>
                            )}
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
                                                className={`block pl-4 text-sm border-l-2 transition-colors ${getTextTransformClass(
                                                    itemTextStyle.textTransform
                                                )} ${
                                                    highlightActive && isActive
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

            {/* Render loose files */}
            {looseFiles.length > 0 && (
                <ul className="flex flex-col gap-2">
                    {looseFiles.map((file) => {
                        const routePath = `/docs/${file.replace('.md', '')}`
                        const isActive = location.pathname === routePath
                        const displayName = formatName(file.replace('.md', ''))

                        return (
                            <li key={file}>
                                <Link
                                    to={routePath}
                                    className={`font-medium transition-colors ${getTextTransformClass(
                                        itemTextStyle.textTransform
                                    )} ${
                                        highlightActive && isActive
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
        </aside>
    )
}
