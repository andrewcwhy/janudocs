import { defineConfig } from "vite";
import mdx from '@mdx-js/rollup'
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [mdx(), react(), tailwindcss()],
});
