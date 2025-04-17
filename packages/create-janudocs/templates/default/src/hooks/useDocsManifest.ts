import { useEffect, useState } from "react";

// Define the structure of a documentation category
interface DocCategory {
	label: string;
	description: string;
	path: string;
	files: string[];
	count: number;
}

// Define the structure of a loose file group
interface Miscellaneous {
	files: string[];
	count: number;
}

// Define the structure of the documentation manifest
interface DocsManifest {
	categories: DocCategory[];
	looseFiles: Miscellaneous[];
}

// Custom hook to fetch and manage the documentation manifest
export function useDocsManifest() {
	// State to store the manifest data
	const [manifest, setManifest] = useState<DocsManifest>({
		categories: [],
		looseFiles: [],
	});
	// State to track loading status
	const [loading, setLoading] = useState(true);
	// State to track errors
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		fetch("/docs/manifest.json")
			.then((res) => {
				if (!res.ok) throw new Error(`HTTP error ${res.status}`);
				return res.json();
			})
			.then((data) => {
				setManifest({
					categories: data.categories ?? [],
					looseFiles: data.looseFiles ?? [],
				});
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load docs manifest:", err);
				setError(err);
				setLoading(false);
			});
	}, []);

	return { manifest, loading, error };
}
