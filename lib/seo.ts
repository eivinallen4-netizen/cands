import type { Metadata } from "next";
import { business, areas } from "@/content/site";

/**
 * Canonical origin, no trailing slash. Used by metadataBase, canonicals, Open Graph, the sitemap,
 * robots.txt and JSON-LD. Development falls back to localhost; a production build or server
 * refuses to start without NEXT_PUBLIC_SITE_URL, so search engines never see localhost URLs.
 */
function resolveSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set. Set it to the live origin (for example https://www.example.com) " +
        "before building; canonical URLs, the sitemap, robots.txt and JSON-LD are built from it. See .env.example.",
    );
  }
  return "http://localhost:3040";
}
export const siteUrl = resolveSiteUrl();

/** Absolute URL for a site path. The home page is the bare origin, matching Next's canonical output. */
export const abs = (path: string) => (path === "/" ? siteUrl : `${siteUrl}${path}`);

/** Open Graph / Twitter defaults. Next merges metadata shallowly, so every page must repeat these. */
export const ogDefaults = {
  type: "website" as const,
  siteName: "C&S Collision LLC",
  locale: "en_US",
  images: [{ url: "/images/og.png", width: 1200, height: 630, alt: "C&S Collision LLC, auto body shop in Las Vegas" }],
};

export const businessId = `${siteUrl}/#business`;
export const websiteId = `${siteUrl}/#website`;

/**
 * Per-page metadata with its own canonical. Use `absoluteTitle` when the title already
 * contains the brand (the root layout's template adds " | C&S Collision").
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  noindex,
}: {
  title?: string;
  absoluteTitle?: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const t = absoluteTitle ? { absolute: absoluteTitle } : title;
  const ogTitle = absoluteTitle ?? (title ? `${title} | C&S Collision` : undefined);
  return {
    title: t,
    description,
    alternates: { canonical: path },
    openGraph: { ...ogDefaults, title: ogTitle, description, url: path },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: ["/images/og.png"] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Site-wide graph: one AutoBodyShop with a stable @id, plus WebSite. Facts from content/site.ts only. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutoBodyShop",
        "@id": businessId,
        name: business.name,
        url: abs("/"),
        image: abs("/images/shop-front.jpg"),
        logo: abs("/images/logo-mark.png"),
        telephone: "+1-725-293-3544",
        address: {
          "@type": "PostalAddress",
          streetAddress: business.street,
          addressLocality: business.city,
          addressRegion: business.state,
          postalCode: business.zip,
          addressCountry: "US",
        },
        hasMap: business.mapsUrl,
        areaServed: areas.map((a) => ({ "@type": "Place", name: `${a}, NV` })),
        foundingDate: String(business.since),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "17:00",
          },
        ],
        sameAs: [business.instagram],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: business.name,
        url: abs("/"),
        publisher: { "@id": businessId },
        inLanguage: "en-US",
      },
    ],
  };
}
