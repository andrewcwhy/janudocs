import { FiMenu, FiX } from "react-icons/fi"
import { IoIosArrowForward } from "react-icons/io"
import { useState } from "react"

export default function MobileSidebar() {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<>
			<header className="flex h-16 p-4 border-t border-gray-200 bg-white items-center md:hidden">
				{/* Toggle button */}
				<button onClick={() => setSidebarOpen(!sidebarOpen)}>
					{sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
				</button>
				<div className="flex items-center gap-2">
					{/* Category label */}
					<p className="truncate">Category</p>
					{/* Arrow icon */}
					<IoIosArrowForward size={20} />
					{/* File name */}
					<p className="truncate">Document</p>
				</div>
			</header>
		</>
	)
}
