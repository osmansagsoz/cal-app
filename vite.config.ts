import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: "../dist",
  },
  plugins: [react(), svgr()],
  publicDir: "../public",
  root: "./src",
});
