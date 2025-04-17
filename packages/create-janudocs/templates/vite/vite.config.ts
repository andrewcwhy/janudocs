import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";
import mdx from "@mdx-js/rollup";
import tailwindCSS from "@tailwindcss/vite";
import viteReactSWC from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		mdx(),
		TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
		viteReactSWC(),
		tailwindCSS(),
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
});
