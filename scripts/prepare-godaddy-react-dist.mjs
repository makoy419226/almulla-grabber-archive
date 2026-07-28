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
const siteOrigin = "https://almullaholding.com";

for (const snippet of requiredSnippets) {
  if (!indexHtml.includes(snippet)) {
    throw new Error(`GoDaddy React build is missing required snippet: ${snippet}`);
  }
}

function withRouteUrl(html, route) {
  const routeUrl = `${siteOrigin}/${route}`;
  const canonicalPattern = /<link rel="canonical" href="[^"]*" \/>/;
  const openGraphUrlPattern = /<meta property="og:url" content="[^"]*" \/>/;

  if (!canonicalPattern.test(html) || !openGraphUrlPattern.test(html)) {
    throw new Error(`GoDaddy React build is missing URL metadata for /${route}`);
  }

  return html
    .replace(canonicalPattern, `<link rel="canonical" href="${routeUrl}" />`)
    .replace(openGraphUrlPattern, `<meta property="og:url" content="${routeUrl}" />`);
}

await copyFile(htaccessSource, htaccessTarget);
await writeFile(indexPath, indexHtml);
await rm(path.join(outDir, "godaddy-react"), { recursive: true, force: true });

for (const route of fallbackRoutes) {
  const routeDir = path.join(outDir, route);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), withRouteUrl(indexHtml, route));
}

console.log(`GoDaddy React app prepared at ${path.relative(rootDir, outDir)}/`);
