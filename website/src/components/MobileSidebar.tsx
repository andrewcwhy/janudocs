import { FiMenu, FiX } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io'
import { useState } from 'react'
import { useParams } from 'react-router'
import Sidebar from '@/components/Sidebar'

function formatName(str: string | undefined) {
    if (!str) return ''
    return str.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, '')
}

export default function MobileSidebarHeader() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { category, doc } = useParams()

    const categoryName = formatName(category)
    const fileName = formatName(doc)

    return (
        <>
            <header className="flex h-16 p-4 border-t border-gray-200 bg-white items-center md:hidden relative z-40">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Toggle Sidebar"
                    className="mr-4"
                >
                    {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
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

            {sidebarOpen && (
                <div className="absolute top-16 inset-x-0 z-30 md:hidden">
                    <Sidebar />
                </div>
            )}
        </>
    )
}
