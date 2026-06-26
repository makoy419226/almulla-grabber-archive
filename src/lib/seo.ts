export const SITE_ORIGIN = "https://almullaholding.com";
export const SITE_NAME = "AlMulla Holding Group";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;
export const LOGO_URL = `${SITE_ORIGIN}/logo.png`;

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
    title: "AlMulla Holding Group - Dubai Healthcare and Hospitality Holding Company",
    description:
      "AlMulla Holding Group is a Dubai-based holding company with focused investments in healthcare and hospitality.",
  },
  "/about-us": {
    path: "/about-us",
    title: "About AlMulla Holding Group - Dubai Holding Company",
    description:
      "Learn about AlMulla Holding Group, chaired by Mr. Abdulla Mohamed Saeed AlMulla and focused on healthcare and hospitality investments.",
  },
  "/businesses/healthcare": {
    path: "/businesses/healthcare",
    title: "Chicago Healthcare - AlMulla Holding Group",
    description:
      "Chicago Healthcare invests in and operates premium healthcare ventures in Dubai with leading medical specialists and modern facilities.",
  },
  "/businesses/hospitality": {
    path: "/businesses/hospitality",
    title: "AlMulla Hospitality - AlMulla Holding Group",
    description:
      "AlMulla Hospitality creates modern hotel and hospitality experiences for business travelers, families, and conscious lifestyle guests.",
  },
  "/contact-us": {
    path: "/contact-us",
    title: "Contact AlMulla Holding Group - Business Bay, Dubai",
    description:
      "Contact AlMulla Holding Group in Business Bay, Dubai for business enquiries, partnerships, and corporate requests.",
  },
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_ORIGIN,
  logo: LOGO_URL,
  image: DEFAULT_OG_IMAGE,
  email: "info@almullaholding.co",
  telephone: "+97142249662",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office no. 1405, Aspect Tower Zone B, Business Bay",
    addressLocality: "Dubai",
    postalCode: "413155",
    addressCountry: "AE",
  },
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
        "The requested AlMulla Holding Group page is not available. Visit the official website for healthcare, hospitality, and contact information.",
      robots: "noindex, follow",
    }
  );
}
