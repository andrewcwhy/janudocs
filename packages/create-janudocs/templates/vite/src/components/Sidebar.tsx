import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { useDocsManifest } from '@/hooks/useDocsManifest'
import config from '../../janudocs.config'
import { formatFileName, removeFileExtension } from '@/utils/stringUtils'

export default function Sidebar() {
    const { manifest } = useDocsManifest()
    const [openCategories, setOpenCategories] = useState<
        Record<string, boolean>
    >({})
    const location = useLocation()

    const { sidebar } = config
    const {
        togglable,
        viewState,
        descriptions,
        textStyle: categoryTextStyle,
    } = sidebar.categories
    const { highlightActive, textStyle: itemTextStyle } = sidebar.items

    useEffect(() => {
        const initialOpen: Record<string, boolean> = {}
        manifest.categories.forEach((cat) => {
            initialOpen[cat.path] = viewState === 'expanded'
        })
        setOpenCategories(initialOpen)
    }, [manifest.categories, viewState])

    const toggleCategory = (path: string) => {
        if (!togglable) return
        setOpenCategories((prev) => ({ ...prev, [path]: !prev[path] }))
    }

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
        <aside className="w-2xs h-full flex flex-col gap-8 p-6 bg-white border-r border-gray-200 sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {manifest.categories.map((cat) => {
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
                            {descriptions.show && (
                                <p
                                    className={`text-sm text-gray-500 ${getTextTransformClass(descriptions.textStyle.textTransform)}`}
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
                                    const displayName = formatFileName(file)

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
            {manifest.looseFiles?.[0]?.files?.length > 0 && (
                <ul className="flex flex-col gap-2">
                    {manifest.looseFiles[0].files.map((file) => {
                        const routePath = `/docs/${removeFileExtension(file)}`
                        const isActive = location.pathname === routePath
                        const displayName = formatFileName(file)

                        return (
                            <li key={file}>
                                <Link
                                    to={routePath}
                                    className={`transition-colors ${getTextTransformClass(
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
