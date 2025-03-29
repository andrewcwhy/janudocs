import { FiMenu, FiX } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io'
import { useParams } from 'react-router'
import Sidebar from '@/components/Sidebar'
import { useToggle } from '@/hooks/useToggle'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { formatFileName } from '@/utils/stringUtils'

export default function MobileSidebarHeader() {
    const [isSidebarOpen, toggleSidebar] = useToggle()
    const { category, doc } = useParams()

    useLockBodyScroll(isSidebarOpen)

    const categoryName = formatFileName(category)
    const fileName = formatFileName(doc)

    return (
        <>
            <header className="flex h-16 p-4 border-t border-gray-200 bg-white items-center md:hidden relative z-40">
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
                <div className="absolute top-16 inset-x-0 z-30 md:hidden">
                    <Sidebar />
                </div>
            )}
        </>
    )
}
