import manifest from "../../../docs/manifest.json";

export interface RouteProps {
	href: string;
	path: string;
	title: string;
}

export function getDocsRoutes(): RouteProps[] {
	const routes: RouteProps[] = [];

	for (const category of manifest.categories) {
		for (const file of category.files) {
			if (!isMarkdown(file)) continue;

			const slug = stripExtension(file);
			const path = `${category.path}/${slug}`;
			routes.push({
				href: `/docs/${path}`,
				path,
				title: formatTitle(slug),
			});
		}
	}

	for (const loose of manifest.looseFiles) {
		for (const file of loose.files) {
			if (!isMarkdown(file)) continue;

			const slug = stripExtension(file);
			routes.push({
				href: `/docs/${slug}`,
				path: slug,
				title: formatTitle(slug),
			});
		}
	}

	return routes;
}

function isMarkdown(file: string): boolean {
	return file.endsWith(".md") || file.endsWith(".mdx");
}

function stripExtension(file: string): string {
	return file.replace(/\.mdx?$/, "");
}

function formatTitle(slug: string): string {
	return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
