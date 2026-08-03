import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * robots.txt.
 *
 * Everything public is crawlable. `/api/` is disallowed: the contact route
 * accepts POST only and has nothing to index, so letting crawlers walk it just
 * spends crawl budget and fills the server log with 405s.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
