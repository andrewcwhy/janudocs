import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io'
import clsx from 'clsx'

import { useToggle } from '@/hooks'
import { useLockBodyScroll } from '@/hooks'
import { useDocsManifest } from '@/hooks'
import { formatFileName, removeFileExtension } from '@/utils'
import config from '../../janudocs.config'

export default function MobileSidebar() {
    const [isSidebarOpen, toggleSidebar] = useToggle()
    const { manifest } = useDocsManifest()
    const [openCategories, setOpenCategories] = useState<
        Record<string, boolean>
    >({})
    const location = useLocation()
    const { category, doc } = useParams()

    useLockBodyScroll(isSidebarOpen)

    const categoryName = formatFileName(category)
    const fileName = formatFileName(doc)

    const {
        categories: {
            collapsible: categoriesCollapsible,
            initialState,
            descriptions,
            textStyle: categoryTextStyle,
        },
        items: { highlightActive, textStyle: itemTextStyle },
    } = config.sidebar

    useEffect(() => {
        const initialOpen: Record<string, boolean> = {}
        manifest.categories.forEach((cat) => {
            initialOpen[cat.path] = initialState === 'expanded'
        })
        setOpenCategories(initialOpen)
    }, [manifest.categories, initialState])

    const toggleCategory = (path: string) => {
        if (!categoriesCollapsible) return
        setOpenCategories((prev) => ({ ...prev, [path]: !prev[path] }))
    }

    return (
        <>
            <header className="flex h-16 p-4 border-t border-gray-200 bg-white items-center md:hidden relative z-10">
                <button
                    onClick={toggleSidebar}
                    aria-label="Toggle Sidebar"
                    className="mr-4"
                >
                    {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>
                <div className="flex items-center gap-2 truncate">
                    <p className="truncate text-sm text-gray-800">
                        {categoryName || 'Category'}
                    </p>
                    <IoIosArrowForward size={16} className="text-gray-500" />
                    <p className="truncate text-sm text-gray-800">
                        {fileName || 'Document'}
                    </p>
                </div>
            </header>

            {isSidebarOpen && (
                <div className="absolute top-16 inset-x-0 z-30 md:hidden bg-white shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-gray-200">
                    <nav className="p-4 flex flex-col gap-4">
                        {manifest.categories.map((cat) => {
                            if (!cat.files?.length) return null
                            const isOpen = openCategories[cat.path]

                            return (
                                <div
                                    key={cat.path}
                                    className="flex flex-col gap-2"
                                >
                                    <button
                                        onClick={() => toggleCategory(cat.path)}
                                        className={`w-full flex justify-between items-center text-sm font-medium text-gray-700 hover:text-blue-600 ${categoryTextStyle?.textTransform}`}
                                        disabled={!categoriesCollapsible}
                                    >
                                        <span
                                            title={cat.description || undefined}
                                        >
                                            {cat.label}
                                        </span>
                                        {categoriesCollapsible &&
                                            (isOpen ? (
                                                <FiChevronDown />
                                            ) : (
                                                <FiChevronRight />
                                            ))}
                                    </button>

                                    {descriptions.enabled &&
                                        cat.description && (
                                            <p
                                                className={`text-xs text-gray-500 ${descriptions.textStyle?.textTransform}`}
                                            >
                                                {cat.description}
                                            </p>
                                        )}

                                    {isOpen && (
                                        <ul className="pl-4 flex flex-col gap-2">
                                            {cat.files.map((file) => {
                                                const routePath = `/docs/${cat.path}/${removeFileExtension(file)}`
                                                const isActive =
                                                    location.pathname ===
                                                    routePath
                                                const displayName =
                                                    formatFileName(file)

                                                return (
                                                    <li key={file}>
                                                        <Link
                                                            to={routePath}
                                                            onClick={
                                                                toggleSidebar
                                                            }
                                                            className={clsx(
                                                                'block text-sm border-l-2 pl-2 transition-colors',
                                                                itemTextStyle?.textTransform,
                                                                highlightActive &&
                                                                    isActive
                                                                    ? 'border-blue-600 text-blue-600 font-medium'
                                                                    : 'border-gray-200 text-gray-700 hover:text-blue-600 hover:border-gray-300'
                                                            )}
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
                            <ul className="pl-2 flex flex-col gap-2">
                                {manifest.looseFiles[0].files.map((file) => {
                                    const routePath = `/docs/${removeFileExtension(file)}`
                                    const isActive =
                                        location.pathname === routePath
                                    const displayName = formatFileName(file)

                                    return (
                                        <li key={file}>
                                            <Link
                                                to={routePath}
                                                onClick={toggleSidebar}
                                                className={clsx(
                                                    'block text-sm pl-2 transition-colors',
                                                    itemTextStyle?.textTransform,
                                                    highlightActive && isActive
                                                        ? 'text-blue-600 font-medium'
                                                        : 'text-gray-700 hover:text-blue-600'
                                                )}
                                            >
                                                {displayName}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </nav>
                </div>
            )}
        </>
    )
}
