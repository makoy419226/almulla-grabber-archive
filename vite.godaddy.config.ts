import { defineConfig } from "vite";

export default defineConfig({
  root: "godaddy",
  publicDir: "../godaddy-public",
  build: {
    outDir: "../godaddy-dist",
    emptyOutDir: true,
  },
});
