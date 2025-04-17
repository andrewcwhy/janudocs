// External Imports
import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import {
	FiSearch,
	FiArrowUp,
	FiArrowDown,
	FiCornerDownLeft,
} from "react-icons/fi";

// Internal Imports
import { useDocsManifest } from "@/hooks/useDocsManifest";
import { useClickAway } from "@/hooks/useClickAway";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { formatFileName } from "@/utils/stringUtils";

// Interfaces
interface SearchResult {
	name: string;
	path: string;
	score: number;
}

interface SearchBarProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
	// Refs
	const inputRef = useRef<HTMLInputElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	// State
	const [query, setQuery] = useState("");
	const [groupedResults, setGroupedResults] = useState<
		Record<string, SearchResult[]>
	>({});
	const [activeIndex, setActiveIndex] = useState(0);

	// Hooks
	const { manifest } = useDocsManifest();
	const navigate = useNavigate();

	// Disable body scroll when modal is open
	useLockBodyScroll(isOpen);

	// Close modal when clicking outside
	useClickAway(modalRef, () => {
		if (isOpen) onClose();
	});

	// Focus input when modal is open
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	// Memoized search helper functions
	const normalizedQuery = useMemo(
		() => query.toLowerCase().replace(/[-_]/g, " ").trim(),
		[query],
	);

	const searchTerms = useMemo(
		() => normalizedQuery.split(/\s+/).filter((t) => t.length > 0),
		[normalizedQuery],
	);

	const flatResults = useMemo(
		() => Object.values(groupedResults).flat(),
		[groupedResults],
	);

	// Search logic
	useEffect(() => {
		if (!query.trim()) {
			setGroupedResults({});
			return;
		}

		const grouped: Record<string, SearchResult[]> = {};

		const processFile = (
			file: string,
			basePath: string,
		): SearchResult | null => {
			const displayName = formatFileName(file);

			if (!searchTerms.every((term) => displayName.includes(term))) return null;

			let score = 0;
			searchTerms.forEach((term) => {
				if (displayName.includes(term)) score += 3;
			});

			return {
				name: displayName,
				path: `${basePath}/${displayName}`,
				score,
			};
		};

		// Search categorized files
		manifest.categories.forEach((cat) => {
			const matches = cat.files
				.map((file) => processFile(file, `/docs/${cat.path}`))
				.filter((r): r is SearchResult => r !== null)
				.sort((a, b) => b.score - a.score);

			if (matches.length > 0) grouped[cat.label] = matches;
		});

		// Search loose files
		const loose = manifest.looseFiles?.[0]?.files ?? [];
		const looseMatches = loose
			.map((file) => processFile(file, "/docs"))
			.filter((r): r is SearchResult => r !== null)
			.sort((a, b) => b.score - a.score);

		if (looseMatches.length > 0) {
			grouped["Miscellaneous"] = looseMatches;
		}

		setGroupedResults(grouped);
		setActiveIndex(0);
	}, [query, manifest, searchTerms]);

	// Highlight matching terms
	const highlightMatches = (text: string) => {
		if (searchTerms.length === 0) return text;
		const regex = new RegExp(`(${searchTerms.join("|")})`, "gi");
		return text.split(regex).map((part, index) =>
			index % 2 === 1 ? (
				<mark key={index} className="bg-yellow-100 font-semibold">
					{part}
				</mark>
			) : (
				part
			),
		);
	};

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((prev) => Math.max(prev - 1, 0));
		} else if (e.key === "Enter") {
			e.preventDefault();
			if (flatResults[activeIndex]) {
				navigate(flatResults[activeIndex].path);
				handleClose();
			}
		}
	};

	const handleClose = () => {
		setQuery("");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
			<div
				className="relative bg-white rounded-none md:rounded-2xl shadow-2xl w-full max-w-full md:max-w-2xl h-full md:h-auto md:max-h-[80vh] flex flex-col overflow-hidden"
				ref={modalRef}
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
							{Object.entries(groupedResults).map(([section, items]) => (
								<section key={section} className="flex flex-col gap-2">
									<div className="font-semibold text-gray-800 text-base">
										{section}
									</div>
									<ul className="flex flex-col gap-1">
										{items.map((item, idx) => {
											const globalIdx = flatResults.findIndex(
												(r) => r.path === item.path,
											);
											const isActive = activeIndex === globalIdx;
											return (
												<li
													key={idx}
													className={`rounded cursor-pointer ${
														isActive ? "bg-blue-100" : ""
													} transition`}
													onMouseEnter={() => setActiveIndex(globalIdx)}
												>
													<Link
														to={item.path}
														className={`block px-4 py-2 text-sm ${
															isActive
																? "font-medium text-blue-700"
																: "text-gray-700"
														}`}
														onClick={handleClose}
													>
														{highlightMatches(item.name.replace(/[-_]/g, " "))}
													</Link>
												</li>
											);
										})}
									</ul>
								</section>
							))}
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
	);
}
