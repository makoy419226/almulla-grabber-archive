export const SITE_ORIGIN = "https://almullaholding.com";
export const SITE_NAME = "AlMulla Holding Group";
export const SITE_SHORT_NAME = "Almullah";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image-v2.jpg`;
export const LOGO_URL = `${SITE_ORIGIN}/logo.png`;
export const FAVICON_URL = `${SITE_ORIGIN}/favicon.png`;

export type SeoEntry = {
  path: string;
  title: string;
  description: string;
  image?: string;
  robots?: string;
};

export const seoEntries: Record<string, SeoEntry> = {
  "/": {
    path: "/",
    title: "AlMulla Holding Group - Diversified Holding Company",
    description:
      "AlMulla Holding Group is a diversified holding company with focused investments across strategic investment, healthcare, hospitality, education, and energy.",
  },
  "/about-us": {
    path: "/about-us",
    title: "About AlMulla Holding Group",
    description:
      "Learn about AlMulla Holding Group and its long-term approach to quality, resilience, and sector-focused growth.",
  },
  "/businesses/healthcare": {
    path: "/businesses/healthcare",
    title: "Chicago Healthcare - AlMulla Holding Group",
    description:
      "Chicago Healthcare invests in and operates premium healthcare ventures with leading medical specialists and modern facilities.",
    robots: "noindex, follow",
  },
  "/businesses/strategic-investment": {
    path: "/businesses/strategic-investment",
    title: "Strategic Investment - AlMulla Holding Group",
    description:
      "Strategic Investment at AlMulla Holding Group focuses on disciplined capital allocation, regional partnerships, and long-term value creation across resilient sectors.",
    robots: "noindex, follow",
  },
  "/businesses/education": {
    path: "/businesses/education",
    title: "Education - AlMulla Holding Group",
    description:
      "AlMulla Holding Group backs education ventures built around strong learning environments, future-ready campuses, and long-term community value.",
    robots: "noindex, follow",
  },
  "/businesses/real-estate": {
    path: "/businesses/real-estate",
    title: "Real-estate - AlMulla Holding Group",
    description:
      "AlMulla Holding Group develops and manages resilient real-estate assets shaped by site quality, tenant experience, and durable demand.",
    robots: "noindex, follow",
  },
  "/businesses/energy": {
    path: "/businesses/energy",
    title: "Energy - AlMulla Holding Group",
    description:
      "AlMulla Holding Group invests in energy platforms spanning solar, infrastructure, and practical future-ready systems built for reliability and growth.",
    robots: "noindex, follow",
  },
  "/businesses/hospitality": {
    path: "/businesses/hospitality",
    title: "AlMulla Hospitality - AlMulla Holding Group",
    description:
      "AlMulla Hospitality creates modern hotel and hospitality experiences for business travelers, families, and conscious lifestyle guests.",
    robots: "noindex, follow",
  },
  "/contact-us": {
    path: "/contact-us",
    title: "Contact AlMulla Holding Group",
    description:
      "Contact AlMulla Holding Group for business enquiries, partnerships, and corporate requests.",
  },
  "/privacy-policy": {
    path: "/privacy-policy",
    title: "Privacy Policy - AlMulla Holding Group",
    description:
      "Learn how AlMulla Holding Group handles website data, enquiries, and cookie preferences.",
  },
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_ORIGIN,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 284,
    height: 99,
  },
  image: DEFAULT_OG_IMAGE,
  email: "info@almullaholding.com",
  telephone: "+97142249662",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  url: SITE_ORIGIN,
};

export function normalizeSeoPath(pathname: string) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

export function absoluteUrl(path: string) {
  return `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
}

export function getSeoEntry(pathname: string): SeoEntry {
  const path = normalizeSeoPath(pathname);
  return (
    seoEntries[path] ?? {
      path,
      title: `${SITE_NAME} - Page Not Found`,
      description:
        "The requested AlMulla Holding Group page is not available. Visit the official website for strategic investment, healthcare, hospitality, education, real-estate, energy, and contact information.",
      robots: "noindex, follow",
    }
  );
}
