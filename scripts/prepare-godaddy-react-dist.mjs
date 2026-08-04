import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const outDir = path.join(rootDir, "godaddy-dist");
const indexPath = path.join(outDir, "index.html");
const nestedIndexPath = path.join(outDir, "godaddy-react", "index.html");
const htaccessSource = path.join(rootDir, "godaddy-public", ".htaccess");
const htaccessTarget = path.join(outDir, ".htaccess");

const pages = [
  {
    route: "",
    title: "AlMulla Holding Group - Diversified Holding Company",
    description:
      "AlMulla Holding Group is a diversified holding company with focused investments across strategic investment, healthcare, hospitality, education, and energy.",
    heading: "AlMulla Holding Group",
    body:
      "AlMulla Holding Group builds long-term value through focused investments, operating partnerships, and resilient platforms across strategic investment, healthcare, hospitality, education, real-estate, and energy.",
  },
  {
    route: "about-us",
    title: "About AlMulla Holding Group",
    description:
      "Learn about AlMulla Holding Group and its long-term approach to quality, resilience, and sector-focused growth.",
    heading: "About AlMulla Holding Group",
    body:
      "AlMulla Holding Group is guided by a long-term approach to quality, resilience, and sector-focused growth. The group develops opportunities where trusted partnerships and operating discipline can create enduring value.",
  },
  {
    route: "contact-us",
    title: "Contact AlMulla Holding Group",
    description:
      "Contact AlMulla Holding Group for business enquiries, partnerships, and corporate requests.",
    heading: "Contact AlMulla Holding Group",
    body:
      "Contact AlMulla Holding Group for business enquiries, partnerships, and corporate requests. Email info@almullaholding.com or call +971 4 224 9688.",
  },
  {
    route: "privacy-policy",
    title: "Privacy Policy - AlMulla Holding Group",
    description:
      "Learn how AlMulla Holding Group handles website data, enquiries, and cookie preferences.",
    heading: "Privacy Policy",
    body:
      "Learn how AlMulla Holding Group handles website data, enquiries, and cookie preferences.",
  },
  {
    route: "businesses/healthcare",
    title: "Chicago Healthcare - AlMulla Holding Group",
    description:
      "Chicago Healthcare invests in and operates premium healthcare ventures with leading medical specialists and modern facilities.",
    heading: "Chicago Healthcare",
    body:
      "Chicago Healthcare invests in and manages high-quality healthcare projects with leading medical experts. Its approach combines advanced facilities, modern equipment, measurable patient outcomes, and uncompromising clinical standards.",
  },
  {
    route: "businesses/hospitality",
    title: "AlMulla Hospitality - AlMulla Holding Group",
    description:
      "AlMulla Hospitality creates modern hotel and hospitality experiences for business travelers, families, and conscious lifestyle guests.",
    heading: "AlMulla Hospitality",
    body:
      "AlMulla Hospitality creates hotel and hospitality experiences defined by thoughtful service, modern comfort, and dependable brand standards for business travelers, families, and lifestyle guests.",
  },
  {
    route: "businesses/strategic-investment",
    title: "Strategic Investment - AlMulla Holding Group",
    description:
      "Strategic Investment at AlMulla Holding Group focuses on disciplined capital allocation, regional partnerships, and long-term value creation across resilient sectors.",
    heading: "Strategic Investment",
    body:
      "Strategic Investment guides how AlMulla Holding Group allocates capital across resilient sectors, regional partnerships, and long-term growth platforms. Every opportunity is assessed for strategic fit, operating clarity, and durable value creation.",
  },
  {
    route: "businesses/education",
    title: "Education - AlMulla Holding Group",
    description:
      "AlMulla Holding Group backs education ventures built around strong learning environments, future-ready campuses, and long-term community value.",
    heading: "Education",
    body:
      "AlMulla Holding Group supports education ventures with strong learning environments, future-ready campuses, academic quality, and sustainable institutional value for students, families, and communities.",
  },
  {
    route: "businesses/real-estate",
    title: "Real-estate - AlMulla Holding Group",
    description:
      "AlMulla Holding Group develops and manages resilient real-estate assets shaped by site quality, tenant experience, and durable demand.",
    heading: "Real-estate",
    body:
      "AlMulla Holding Group develops and manages real-estate assets through disciplined site selection, build quality, occupier experience, lifecycle management, and a long-term approach to demand.",
  },
  {
    route: "businesses/energy",
    title: "Energy - AlMulla Holding Group",
    description:
      "AlMulla Holding Group invests in energy platforms spanning solar, infrastructure, and practical future-ready systems built for reliability and growth.",
    heading: "Energy",
    body:
      "AlMulla Holding Group invests in energy platforms spanning solar, infrastructure, reliable supply, and practical transition systems designed for long-term resilience and growth.",
  },
];

const indexHtml = await readFile(nestedIndexPath, "utf8").catch(() => readFile(indexPath, "utf8"));

const requiredSnippets = ['id="root"', "/assets/"];
const siteOrigin = "https://almullaholding.com";

for (const snippet of requiredSnippets) {
  if (!indexHtml.includes(snippet)) {
    throw new Error(`GoDaddy React build is missing required snippet: ${snippet}`);
  }
}

function withPageHtml(html, page) {
  const routeUrl = `${siteOrigin}/${page.route}`;
  const canonicalPattern = /<link rel="canonical" href="[^"]*" \/>/;
  const openGraphUrlPattern = /<meta property="og:url" content="[^"]*" \/>/;
  const titlePattern = /<title>[^<]*<\/title>/;
  const descriptionPattern = /<meta\s+name="description"\s+content="[^"]*"\s*\/>/;
  const openGraphTitlePattern = /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/;
  const openGraphDescriptionPattern = /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/;
  const twitterTitlePattern = /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/;
  const twitterDescriptionPattern = /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/;
  const rootPattern = /<div id="root">[\s\S]*?<\/div>/;

  if (
    !canonicalPattern.test(html) ||
    !openGraphUrlPattern.test(html) ||
    !titlePattern.test(html) ||
    !descriptionPattern.test(html) ||
    !rootPattern.test(html)
  ) {
    throw new Error(`GoDaddy React build is missing SEO markup for /${page.route}`);
  }

  return html
    .replace(titlePattern, `<title>${page.title}</title>`)
    .replace(descriptionPattern, `<meta name="description" content="${page.description}" />`)
    .replace(openGraphTitlePattern, `<meta property="og:title" content="${page.title}" />`)
    .replace(openGraphDescriptionPattern, `<meta property="og:description" content="${page.description}" />`)
    .replace(twitterTitlePattern, `<meta name="twitter:title" content="${page.title}" />`)
    .replace(
      twitterDescriptionPattern,
      `<meta name="twitter:description" content="${page.description}" />`,
    )
    .replace(canonicalPattern, `<link rel="canonical" href="${routeUrl}" />`)
    .replace(openGraphUrlPattern, `<meta property="og:url" content="${routeUrl}" />`)
    .replace(
      rootPattern,
      `<div id="root"><main><h1>${page.heading}</h1><p>${page.body}</p><nav aria-label="Main navigation"><a href="/">Home</a><a href="/about-us">About us</a><a href="/businesses/strategic-investment">Strategic investment</a><a href="/businesses/healthcare">Healthcare</a><a href="/businesses/hospitality">Hospitality</a><a href="/businesses/education">Education</a><a href="/businesses/real-estate">Real-estate</a><a href="/businesses/energy">Energy</a><a href="/contact-us">Contact us</a></nav></main></div>`,
    );
}

await copyFile(htaccessSource, htaccessTarget);
await writeFile(indexPath, withPageHtml(indexHtml, pages[0]));
await rm(path.join(outDir, "godaddy-react"), { recursive: true, force: true });

for (const page of pages.slice(1)) {
  const routeDir = path.join(outDir, page.route);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), withPageHtml(indexHtml, page));
}

console.log(`GoDaddy React app prepared at ${path.relative(rootDir, outDir)}/`);
