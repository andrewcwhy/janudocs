import type { JanudocsConfig } from "./config";

export const defaultConfig: JanudocsConfig = {
	metaData: {
		title: "My Janudocs Site",
		description: "This is a sample site description.",
		url: "https://my-janudocs-site.com",
	},

	themeConfig: {
		navbar: {
			title: "My Janudocs Site",
			logo: {
				alt: "My Site Logo",
				src: "",
			},
			items: {
				highlightActive: true,
				textStyle: {
					textTransform: "capitalize",
				},
			},
		},

		sidebar: {
			position: "left",
			collapsible: true,
			categories: {
				collapsible: true,
				initialState: "expanded",
				descriptions: {
					enabled: true,
					textStyle: {
						textTransform: "capitalize",
					},
				},
				textStyle: {
					textTransform: "capitalize",
				},
			},
			items: {
				highlightActive: true,
				textStyle: {
					textTransform: "capitalize",
				},
			},
		},

		footer: {
			copyright: `© ${new Date().getFullYear()} My Janudocs Site. Built with ❤️ using Janudocs by ACY.`,
		},
	},

	socialLinks: [
		{
			platform: "GitHub",
			icon: "FiGithub",
			url: "",
		},
	],

	docs: {
		/*
		 * Change this to match your repository.
		 * Remove this to remove the "Edit this page" link on documenation pages.
		 */
		editUrl:
			"https://github.com/andrewcwhy/janudocs/tree/main/packages/create-janudocs/templates/shared/",
	},
};
