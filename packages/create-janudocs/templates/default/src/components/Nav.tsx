import { useCallback, useEffect } from "react";
import { NavLink } from "react-router";
import { FiGithub, FiMoreVertical, FiX, FiSearch } from "react-icons/fi";
import SearchBar from "@/components/SearchBar";
import { useToggle } from "@/hooks/useToggle";

const navLinks = [
	{ label: "About", path: "/about" },
	{ label: "Contact", path: "/contact" },
	{ label: "Docs", path: "/docs/getting-started/installation" },
];

export default function NavBar() {
	const [isMenuOpen, toggleMenu] = useToggle();
	const [isSearchOpen, toggleSearch] = useToggle();

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				toggleSearch();
			}
			if (e.key === "Escape") {
				// Only close if it's open
				if (isSearchOpen) toggleSearch();
			}
		},
		[isSearchOpen, toggleSearch],
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	return (
		<>
			<nav
				className="bg-white/60 backdrop-blur p-4 flex items-center justify-between
             h-16"
			>
				<div className="flex items-center gap-8">
					<NavLink
						to="/"
						className="text-xl font-bold text-gray-800 hover:text-blue-600"
					>
						Janudocs
					</NavLink>

					{/* Desktop Links */}
					<ul className="hidden md:flex gap-6 text-gray-700 text-sm">
						{navLinks.map((link) => (
							<li key={link.label}>
								<NavLink
									key={link.label}
									to={link.path}
									className="hover:text-blue-600"
								>
									{link.label}
								</NavLink>
							</li>
						))}
					</ul>
				</div>

				<div className="flex items-center gap-4">
					{/* Desktop Search */}
					<button
						onClick={toggleSearch}
						className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm border px-3 py-1 rounded shadow-sm"
					>
						<FiSearch /> Search{" "}
						<span className="text-xs text-gray-400">(Ctrl + K)</span>
					</button>

					{/* Mobile Search Icon */}
					<button
						onClick={toggleSearch}
						className="md:hidden text-gray-600 hover:text-gray-800"
						aria-label="Open Search"
					>
						<FiSearch size={22} />
					</button>

					<a
						href="https://github.com/andrewcwhy/janudocs"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-600 hover:text-gray-800"
					>
						<FiGithub size={20} />
					</a>

					{/* Mobile Men */}
					<button
						className="md:hidden text-gray-600 hover:text-gray-800"
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						{isMenuOpen ? <FiX size={24} /> : <FiMoreVertical size={24} />}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<ul className="absolute top-full inset-x-0 bg-white shadow-md border-t border-gray-200 flex flex-col gap-4 p-4 md:hidden">
						{navLinks.map((link) => (
							<li key={link.label}>
								<NavLink
									key={link.label}
									to={link.path}
									className="hover:text-blue-600"
									onClick={toggleMenu}
								>
									{link.label}
								</NavLink>
							</li>
						))}
					</ul>
				)}
			</nav>

			{/* Render SearchBar with Modal */}
			<SearchBar isOpen={isSearchOpen} onClose={toggleSearch} />
		</>
	);
}
