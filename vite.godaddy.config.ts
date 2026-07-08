import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const input = {
  main: fileURLToPath(new URL("./godaddy/index.html", import.meta.url)),
  contact: fileURLToPath(new URL("./godaddy/contact-us/index.html", import.meta.url)),
  privacyPolicy: fileURLToPath(new URL("./godaddy/privacy-policy/index.html", import.meta.url)),
};

export default defineConfig({
  root: "godaddy",
  publicDir: "../godaddy-public",
  build: {
    outDir: "../godaddy-dist",
    emptyOutDir: true,
    rollupOptions: {
      input,
    },
  },
});
