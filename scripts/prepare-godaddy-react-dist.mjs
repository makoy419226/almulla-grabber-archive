import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const outDir = path.join(rootDir, "godaddy-dist");
const indexPath = path.join(outDir, "index.html");
const nestedIndexPath = path.join(outDir, "godaddy-react", "index.html");
const htaccessSource = path.join(rootDir, "godaddy-public", ".htaccess");
const htaccessTarget = path.join(outDir, ".htaccess");

const fallbackRoutes = [
  "about-us",
  "contact-us",
  "privacy-policy",
  "businesses/healthcare",
  "businesses/hospitality",
  "businesses/strategic-investment",
  "businesses/education",
  "businesses/real-estate",
  "businesses/energy",
];

const indexHtml = await readFile(nestedIndexPath, "utf8").catch(() => readFile(indexPath, "utf8"));

const requiredSnippets = ['id="root"', "/assets/"];

for (const snippet of requiredSnippets) {
  if (!indexHtml.includes(snippet)) {
    throw new Error(`GoDaddy React build is missing required snippet: ${snippet}`);
  }
}

await copyFile(htaccessSource, htaccessTarget);
await writeFile(indexPath, indexHtml);
await rm(path.join(outDir, "godaddy-react"), { recursive: true, force: true });

for (const route of fallbackRoutes) {
  const routeDir = path.join(outDir, route);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), indexHtml);
}

console.log(`GoDaddy React app prepared at ${path.relative(rootDir, outDir)}/`);
