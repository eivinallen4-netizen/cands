import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/content/nav";
import { abs } from "@/lib/seo";

// Last content change. Bump when pages change (a real date, not "now" on every request).
const LAST_MODIFIED = new Date("2026-11-18");

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((r) => ({
    url: abs(r.href),
    lastModified: LAST_MODIFIED,
    priority: r.priority,
  }));
}
