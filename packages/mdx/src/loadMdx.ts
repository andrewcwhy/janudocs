import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";
import { VFile } from "vfile";

const DOCS_ROOT = path.resolve("docs"); // ✅ base path

export async function loadMdx(filepath: string): Promise<{
	code: string;
	frontmatter: Record<string, unknown>;
}> {
	const fullPath = path.join(DOCS_ROOT, filepath);
	console.log("Resolved MDX path:", fullPath);

	const raw = await readFile(fullPath, "utf8");
	const { content, data } = matter(raw);

	const compiled = await compile(
		new VFile({ path: fullPath, value: content }),
		{
			outputFormat: "function-body",
			providerImportSource: "@mdx-js/react",
			remarkPlugins: [remarkGfm, remarkEmoji],
			rehypePlugins: [rehypeRaw],
		},
	);

	return {
		code: String(compiled.value),
		frontmatter: data,
	};
}
