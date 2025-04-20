import path from "node:path";
import { pathToFileURL } from "node:url";
import type { JanudocsConfig } from "./config";

export async function loadUserConfig(
	configFile = "janudocs.config.ts",
): Promise<JanudocsConfig> {
	const absPath = path.resolve(process.cwd(), configFile);
	const fileUrl = pathToFileURL(absPath);

	try {
		const mod = await import(fileUrl.href);
		const userConfig = mod.default as Partial<JanudocsConfig>;

		return {
			...userConfig,

			metaData: {
				title: userConfig.title ?? defaultConfig.title,
				description: userConfig.description ?? defaultConfig.description,
				url: userConfig.url ?? defaultConfig.url,
			},

			themeConfig: {
				navbar: {
					...userConfig.themeConfig?.navbar,
					items: {
						...userConfig.themeConfig?.navbar?.items,
						textStyle: {
							...userConfig.themeConfig?.navbar?.items?.textStyle,
						},
					},
				},

				sidebar: {
\					...userConfig.themeConfig?.sidebar,
					categories: {
						...userConfig.themeConfig?.sidebar?.categories,
						descriptions: {
							...userConfig.themeConfig?.sidebar?.categories?.descriptions,
							textStyle: {
								...defaultConfig.themeConfig.sidebar.categories.descriptions
									.textStyle,
								...userConfig.themeConfig?.sidebar?.categories?.descriptions
									?.textStyle,
							},
						},
						textStyle: {
							...defaultConfig.themeConfig.sidebar.categories.textStyle,
							...userConfig.themeConfig?.sidebar?.categories?.textStyle,
						},
					},
					items: {
						...defaultConfig.themeConfig.sidebar.items,
						...userConfig.themeConfig?.sidebar?.items,
						textStyle: {
							...defaultConfig.themeConfig.sidebar.items.textStyle,
							...userConfig.themeConfig?.sidebar?.items?.textStyle,
						},
					},
				},

				footer: {
					...defaultConfig.themeConfig.footer,
					...userConfig.themeConfig?.footer,
				},
			},

			socialLinks: [
				...(userConfig.socialLinks ?? []),
				...(defaultConfig.socialLinks ?? []),
			],

			presets: [
			blog: {
				...defaultConfig.blog,
				...userConfig.blog,
			},

			docs: {
				...defaultConfig.docs,
				...userConfig.docs,
			},
		],
		};
	} catch {
		return defaultConfig;
	}
}
