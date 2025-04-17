import path from "node:path";
import { pathToFileURL } from "node:url";
import { defaultConfig } from "./defaultConfig";
import type { JanudocsConfig } from "../types/config";

export async function loadUserConfig(
	configFile = "janudocs.config.ts",
): Promise<JanudocsConfig> {
	const absPath = path.resolve(process.cwd(), configFile);
	const fileUrl = pathToFileURL(absPath);

	try {
		const mod = await import(fileUrl.href);
		const userConfig = mod.default as Partial<JanudocsConfig>;

		return {
			...defaultConfig,
			...userConfig,

			title: userConfig.title ?? defaultConfig.title,
			url: userConfig.url ?? defaultConfig.url,

			componentsConfig: {
				navbar: {
					...defaultConfig.componentsConfig.navbar,
					...userConfig.componentsConfig?.navbar,
					items: {
						...defaultConfig.componentsConfig.navbar.items,
						...userConfig.componentsConfig?.navbar?.items,
						textStyle: {
							...defaultConfig.componentsConfig.navbar.items.textStyle,
							...userConfig.componentsConfig?.navbar?.items?.textStyle,
						},
					},
				},

				sidebar: {
					...defaultConfig.componentsConfig.sidebar,
					...userConfig.componentsConfig?.sidebar,
					categories: {
						...defaultConfig.componentsConfig.sidebar.categories,
						...userConfig.componentsConfig?.sidebar?.categories,
						descriptions: {
							...defaultConfig.componentsConfig.sidebar.categories.descriptions,
							...userConfig.componentsConfig?.sidebar?.categories?.descriptions,
							textStyle: {
								...defaultConfig.componentsConfig.sidebar.categories
									.descriptions.textStyle,
								...userConfig.componentsConfig?.sidebar?.categories
									?.descriptions?.textStyle,
							},
						},
						textStyle: {
							...defaultConfig.componentsConfig.sidebar.categories.textStyle,
							...userConfig.componentsConfig?.sidebar?.categories?.textStyle,
						},
					},
					items: {
						...defaultConfig.componentsConfig.sidebar.items,
						...userConfig.componentsConfig?.sidebar?.items,
						textStyle: {
							...defaultConfig.componentsConfig.sidebar.items.textStyle,
							...userConfig.componentsConfig?.sidebar?.items?.textStyle,
						},
					},
				},

				footer: {
					...defaultConfig.componentsConfig.footer,
					...userConfig.componentsConfig?.footer,
				},
			},
		};
	} catch {
		return defaultConfig;
	}
}
