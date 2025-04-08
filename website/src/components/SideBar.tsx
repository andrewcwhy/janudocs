import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import clsx from 'clsx'

import config from '../../janudocs.config'
import { useDocsManifest } from '@/hooks'
import { useToggle } from '@/hooks'

import {
    FiChevronDown,
    FiChevronRight,
    FiArrowLeftCircle,
    FiArrowRightCircle,
} from 'react-icons/fi'
import type { IconType } from 'react-icons'

import { formatFileName, removeFileExtension } from '@/utils'

interface SidebarCategory {
    label: string
    description: string
}

export default function Sidebar() {
    const { manifest } = useDocsManifest()
    const [openCategories, setOpenCategories] = useState<
        Record<string, boolean>
    >({})
    const [isSidebarCollapsed, toggleSidebar] = useToggle()
    const location = useLocation()

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
        items: { highlightActive, textStyle: itemTextStyle },
    } = sidebar

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
        // Sidebar component
        <aside
            className={clsx(
                'hidden md:flex sticky top-16 h-[calc(100vh-4rem)] z-30 w-2xs flex-col justify-between bg-white',
                sidebarPositionClass
            )}
        >
            {/* Sidebar navigation */}
            <nav className="flex-1 flex overflow-y-auto p-6 flex-col gap-6">
                {manifest.categories.map((cat) => {
                    if (!cat.files?.length) return null
                    const isOpen = openCategories[cat.path]

                    return (
                        <div key={cat.path} className="flex flex-col gap-3">
                            {/* Category header */}
                            <header title="Toggle category">
                                {/* Category toggle button */}
                                <button
                                    onClick={() => toggleCategory(cat.path)}
                                    className={`w-full flex justify-between items-center font-medium text-gray-700 hover:text-blue-600 transition-colors ${categoryTextStyle?.textTransform}`}
                                    disabled={!categoriesCollapsible}
                                >
                                    {/* Category label */}
                                    <span title={cat.description || undefined}>
                                        {cat.label}
                                    </span>
                                    {/* Toggle icon */}
                                    {categoriesCollapsible &&
                                        (isOpen ? (
                                            <FiChevronDown />
                                        ) : (
                                            <FiChevronRight />
                                        ))}
                                </button>

                                {/* Render category description if enabled */}
                                {descriptions.enabled && cat.description && (
                                    <p
                                        className={`text-sm text-gray-500 ${descriptions.textStyle?.textTransform}`}
                                    >
                                        {cat.description}
                                    </p>
                                )}
                            </header>

                            {/* Render category files if the category is open */}
                            {isOpen && (
                                <ul className="flex flex-col gap-3">
                                    {cat.files.map((file) => {
                                        const routePath = `/docs/${cat.path}/${removeFileExtension(file)}`
                                        const isActive =
                                            location.pathname === routePath
                                        const displayName = formatFileName(file)

                                        return (
                                            <li key={file}>
                                                <Link
                                                    to={routePath}
                                                    className={clsx(
                                                        'block pl-4 text-sm border-l-2 transition-colors',
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

                {/* Render loose files if they exist */}
                {manifest.looseFiles?.[0]?.files?.length > 0 && (
                    <ul className="flex flex-col gap-3">
                        {manifest.looseFiles[0].files.map((file) => {
                            const routePath = `/docs/${removeFileExtension(file)}`
                            const isActive = location.pathname === routePath
                            const displayName = formatFileName(file)

                            return (
                                <li key={file}>
                                    <Link
                                        to={routePath}
                                        className={clsx(
                                            'block text-sm transition-colors',
                                            itemTextStyle?.textTransform,
                                            highlightActive && isActive
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
            </nav>

            {/* Collapse button */}
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
