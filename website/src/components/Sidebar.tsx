// External Imports
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'

// Internal Imports
import config from '../../janudocs.config'
import { useManifest, useToggle } from '@/hooks'
import {
    FiChevronDown,
    FiChevronRight,
    FiArrowLeftCircle,
    FiArrowRightCircle,
} from 'react-icons/fi'
import { formatFileName, removeFileExtension } from '@/utils'

export default function Sidebar() {
    const { manifest } = useManifest()
    const [openCategories, setOpenCategories] = useState<
        Record<string, boolean>
    >({})
    const [isSidebarCollapsed, toggleSidebar] = useToggle()

    const { sidebar } = config
    const {
        position,
        collapsible: sidebarCollapsible,
        categories: {
            collapsible: categoriesCollapsible,
            initialState,
            descriptions,
            textStyle: categoryTextStyle,
        },
        items: { textStyle: itemTextStyle },
    } = sidebar

    useEffect(() => {
        const initialOpen: Record<string, boolean> = {}
        manifest?.categorizedDocs?.forEach((cat) => {
            initialOpen[
                cat.categoryGeneratedIndex.slug.replace('/category/', '')
            ] = initialState === 'expanded'
        })
        setOpenCategories(initialOpen)
    }, [manifest, initialState])

    const toggleCategory = (path: string) => {
        if (!categoriesCollapsible) return
        setOpenCategories((prev) => ({ ...prev, [path]: !prev[path] }))
    }

    const sidebarPositionClass =
        position === 'right'
            ? 'border-l border-gray-200 order-last'
            : 'border-r border-gray-200'

    if (isSidebarCollapsed) {
        return (
            <button
                onClick={toggleSidebar}
                aria-label="Expand sidebar"
                title="Expand sidebar"
                className={clsx(
                    'hidden md:flex sticky p-2 top-16 h-[calc(100vh-4rem)] z-30 flex-col justify-center items-center bg-white text-gray-600 hover:text-blue-600 transition-colors',
                    sidebarPositionClass
                )}
            >
                {position === 'right' ? (
                    <FiArrowLeftCircle className="w-5 h-5" />
                ) : (
                    <FiArrowRightCircle className="w-5 h-5" />
                )}
            </button>
        )
    }

    return (
        <aside
            className={clsx(
                'hidden md:flex sticky top-16 h-[calc(100vh-4rem)] z-30 w-2xs flex-col justify-between bg-white',
                sidebarPositionClass
            )}
        >
            <nav className="flex-1 flex overflow-y-auto p-6 flex-col gap-6">
                {/* Categorized Docs */}
                {manifest?.categorizedDocs?.map((cat) => {
                    const key = cat.categoryGeneratedIndex.slug.replace(
                        '/category/',
                        ''
                    )
                    const isOpen = openCategories[key]

                    return (
                        <div key={key} className="flex flex-col gap-3">
                            <header className="flex items-start justify-between gap-2">
                                <Link
                                    to="/docs/category/$category"
                                    params={{
                                        category:
                                            cat.categoryGeneratedIndex.slug.replace(
                                                '/category/',
                                                ''
                                            ),
                                    }}
                                    className={clsx(
                                        'flex-1 font-medium text-gray-700 hover:text-blue-600 transition-colors',
                                        categoryTextStyle?.textTransform
                                    )}
                                    title={
                                        cat.categoryGeneratedIndex
                                            .description || undefined
                                    }
                                >
                                    {cat.label}
                                </Link>

                                {categoriesCollapsible && (
                                    <button
                                        onClick={() => toggleCategory(key)}
                                        aria-label="Toggle category"
                                        title="Toggle category"
                                        className="p-1 text-gray-500 hover:text-blue-600"
                                    >
                                        {isOpen ? (
                                            <FiChevronDown />
                                        ) : (
                                            <FiChevronRight />
                                        )}
                                    </button>
                                )}
                            </header>

                            {descriptions.enabled &&
                                cat.categoryGeneratedIndex.description && (
                                    <p
                                        className={`text-sm text-gray-500 ${descriptions.textStyle?.textTransform}`}
                                    >
                                        {cat.categoryGeneratedIndex.description}
                                    </p>
                                )}

                            {isOpen && (
                                <ul className="flex flex-col gap-3">
                                    {cat.files.map((file) => (
                                        <li key={file.id}>
                                            <Link
                                                to="/docs/$category/$doc"
                                                params={{
                                                    category: key,
                                                    doc: removeFileExtension(
                                                        file.id
                                                            .split('/')
                                                            .pop()!
                                                    ),
                                                }}
                                                className={clsx(
                                                    'block pl-4 text-sm border-l-2 transition-colors border-gray-200 hover:text-blue-600 hover:border-gray-300',
                                                    itemTextStyle?.textTransform
                                                )}
                                                activeProps={{
                                                    className:
                                                        'border-blue-600 text-blue-600 font-medium',
                                                }}
                                            >
                                                {formatFileName(file.title)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )
                })}

                {/* Loose Docs */}
                {(manifest?.looseDocs ?? []).length > 0 && (
                    <ul className="flex flex-col gap-3">
                        {manifest?.looseDocs.map((file) => (
                            <li key={file.id}>
                                <Link
                                    to="/docs/$doc"
                                    params={{
                                        doc: removeFileExtension(file.id),
                                    }}
                                    className={clsx(
                                        'block text-sm transition-colors border-gray-200 text-gray-700 hover:text-blue-600 hover:border-gray-300',
                                        itemTextStyle?.textTransform
                                    )}
                                    activeProps={{
                                        className:
                                            'border-blue-600 text-blue-600 font-medium',
                                    }}
                                >
                                    {formatFileName(file.title)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>

            {sidebarCollapsible && (
                <button
                    onClick={toggleSidebar}
                    aria-label="Collapse sidebar"
                    title="Collapse sidebar"
                    className="w-full p-4 border-t border-gray-200 flex justify-center items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                    {position === 'right' ? (
                        <FiArrowRightCircle className="w-5 h-5" />
                    ) : (
                        <FiArrowLeftCircle className="w-5 h-5" />
                    )}
                </button>
            )}
        </aside>
    )
}
