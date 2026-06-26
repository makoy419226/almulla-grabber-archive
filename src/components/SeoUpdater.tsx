import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
  getSeoEntry,
  organizationJsonLd,
} from "@/lib/seo";

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function setJsonLd() {
  let element = document.head.querySelector<HTMLScriptElement>("#organization-json-ld");

  if (!element) {
    element = document.createElement("script");
    element.id = "organization-json-ld";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.text = JSON.stringify(organizationJsonLd);
}

export function SeoUpdater() {
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    const seo = getSeoEntry(pathname);
    const canonical = absoluteUrl(seo.path);
    const image = seo.image ?? DEFAULT_OG_IMAGE;

    document.title = seo.title;
    setCanonical(canonical);
    setJsonLd();

    setMeta('meta[name="description"]', { name: "description", content: seo.description });
    setMeta('meta[name="robots"]', { name: "robots", content: seo.robots ?? "index, follow" });
    setMeta('meta[name="author"]', { name: "author", content: SITE_NAME });

    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seo.description,
    });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    setMeta('meta[property="og:image"]', { property: "og:image", content: image });
    setMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: SITE_NAME,
    });

    setMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    setMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seo.description,
    });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
  }, [pathname]);

  return null;
}
