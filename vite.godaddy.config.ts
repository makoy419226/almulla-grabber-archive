import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: ".",
  publicDir: "godaddy-public",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: "godaddy-dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("./godaddy-react/index.html", import.meta.url)),
      },
    },
  },
});
