import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import viteReactSWC from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdx(),
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    viteReactSWC(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
