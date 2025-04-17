import { createFileRoute } from "@tanstack/react-router";
import { useManifest } from "@/hooks";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/category/$category")({
	component: CategoryTOC,
});

function CategoryTOC() {
	const { category } = Route.useParams();
	const { manifest, loading, error } = useManifest();

	if (loading) return <div className="p-4">Loading...</div>;
	if (error || !manifest)
		return (
			<div className="p-4 text-red-500">{error || "Manifest not found."}</div>
		);

	const group = manifest.categorizedDocs.find((g) =>
		g.categoryGeneratedIndex.slug.endsWith(`/${category}`),
	);

	if (!group) {
		return <div className="p-4 text-red-500">Category not found.</div>;
	}

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-4">
				{group.categoryGeneratedIndex.title}
			</h1>
			{group.categoryGeneratedIndex.description && (
				<p className="text-gray-600 mb-6">
					{group.categoryGeneratedIndex.description}
				</p>
			)}
			<ul className="space-y-4">
				{group.files.map((doc) => {
					const docId = doc.id.split("/").pop();
					const docSlug = docId ? docId.replace(/\.(mdx?|md)$/, "") : "";

					return (
						<li key={doc.id}>
							<Link
								to="/docs/$category/$doc"
								params={{ category, doc: docSlug }}
								className="text-blue-600 hover:underline"
							>
								{doc.title}
							</Link>
							<p className="text-sm text-gray-500">{doc.description}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
