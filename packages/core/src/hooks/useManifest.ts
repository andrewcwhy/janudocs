import { useEffect, useState } from "react";

export interface DocEntry {
	id: string;
	title: string;
	description: string;
	path: string;
	slug: string;
	permalink: string;
}

export interface CategoryGeneratedIndex {
	title: string;
	description: string;
	slug: string;
	permalink: string;
}

export interface CategorizedDocGroup {
	label: string;
	position: number;
	categoryGeneratedIndex: CategoryGeneratedIndex;
	docs: DocEntry[];
}

export interface Manifest {
	categorizedDocs: CategorizedDocGroup[];
	looseDocs: DocEntry[];
}

export function useManifest(): {
	manifest: Manifest | null;
	loading: boolean;
	error: string | null;
} {
	const [manifest, setManifest] = useState<Manifest | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadManifest() {
			setLoading(true);
			try {
				const res = await fetch("/docs/manifest.json");
				if (!res.ok) throw new Error("Failed to load manifest.json");
				const data: Manifest = await res.json();
				setManifest(data);
				setError(null);
			} catch (err: any) {
				console.error("Failed to load docs/manifest.json:", err);
				setError(err.message || "Unknown error");
				setManifest(null);
			} finally {
				setLoading(false);
			}
		}

		loadManifest();
	}, []);

	return { manifest, loading, error };
}
