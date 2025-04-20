import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { ComponentType } from "react";

export async function mdxToReact(code: string): Promise<ComponentType> {
	const result = await run(code, {
		baseUrl: import.meta.url,
		...runtime,
	});

	return result.default;
}
