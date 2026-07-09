import { cp, mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourceDir = path.join(rootDir, "godaddy");
const publicDir = path.join(rootDir, "godaddy-public");
const outDir = path.join(rootDir, "godaddy-dist");

const requiredHomepageSnippets = [
  "legacy-hero-grid",
  "hero-1280.webp",
  "sector-healthcare.webp",
  "responsive-nav.js",
];

const forbiddenHomepageSnippets = [
  'id="root"',
  "src/godaddy-main.tsx",
  'type="module"',
  "/assets/index-",
];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await cp(publicDir, outDir, { recursive: true, force: true });
await cp(sourceDir, outDir, { recursive: true, force: true });

const homepagePath = path.join(outDir, "index.html");
const homepage = await readFile(homepagePath, "utf8");

for (const snippet of requiredHomepageSnippets) {
  if (!homepage.includes(snippet)) {
    throw new Error(`GoDaddy static homepage is missing required snippet: ${snippet}`);
  }
}

for (const snippet of forbiddenHomepageSnippets) {
  if (homepage.includes(snippet)) {
    throw new Error(`GoDaddy static homepage still contains React build snippet: ${snippet}`);
  }
}

console.log(`GoDaddy static site generated at ${path.relative(rootDir, outDir)}/`);
