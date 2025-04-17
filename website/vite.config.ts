import { resolve } from "node:path";

import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindCSS from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

import mdx from "@mdx-js/rollup";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		mdx(),
		TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
		react(),
		tailwindCSS(),
	],
	build: {
		cssMinify: "lightningcss",
	},
	css: {
		transformer: "lightningcss",
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 9705,
	},
});
