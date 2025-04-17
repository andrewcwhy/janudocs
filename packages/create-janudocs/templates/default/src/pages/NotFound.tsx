import { Link } from "react-router";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen text-center max-w-xl px-6">
			<h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
			<h2 className="text-2xl font-semibold text-gray-700 mb-6">
				Janus looked both ways... but this page wasn’t found.
			</h2>
			<p className="text-gray-600 mb-8">
				Like the god Janus guarding transitions, Janudocs guides you through the
				realm of code — but even Janus can’t see what’s not written.
			</p>
			<Link
				to="/"
				className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition"
			>
				Back to Home
			</Link>
		</div>
	);
}
