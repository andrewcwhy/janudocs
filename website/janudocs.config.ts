import { defineConfig } from "@/core/defineConfig";

export default defineConfig({
	metaData: {
		title: "Janudocs",
		description: "Janudocs for documentation.",
		url: "https://janudocs.com",
	},

	themeConfig: {
		navbar: {
			title: "Janudocs",
			logo: {
				alt: "Janudocs Logo",
				src: "",
			},
			items: {
				textStyle: { textTransform: "capitalize" },
			},
		},

		sidebar: {
			position: "left",
			collapsible: true,
			categories: {
				collapsible: true,
				initialState: "expanded",
				descriptions: {
					enabled: false,
					textStyle: {
						textTransform: "capitalize",
					},
				},
				textStyle: {
					textTransform: "capitalize",
				},
			},
			items: {
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
			url: "https://github.com/andrewcwhy/janudocs",
		},
		{
			platform: "LinkedIn",
			icon: "FaLinkedIn",
			url: "https://www.linkedin.com/in/youngandrewchristian",
		},
	],

	presets: [
		{
			blog: {
				/*
				 * Change this to match your repository.
				 * Remove this to remove the "Edit this page" link on documentation pages.
				 */
				editUrl:
					"https://github.com/andrewcwhy/janudocs/tree/main/packages/create-janudocs/templates/shared/",
			},
		},
		{
			docs: {
				/*
				 * Change this to match your repository.
				 * Remove this to remove the "Edit this page" link on documentation pages.
				 */
				editUrl:
					"https://github.com/andrewcwhy/janudocs/tree/main/packages/create-janudocs/templates/shared/",
			},
		},
	],
});
