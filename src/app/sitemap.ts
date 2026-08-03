import type { MetadataRoute } from "next";
import { cases } from "@/config/cases";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";

/**
 * The sitemap.
 *
 * Derived from config rather than hand-listed, so that changing the service
 * index — which this site is about to do, from eight disciplines to four —
 * cannot leave the sitemap advertising URLs that no longer exist. Anything that
 * becomes config-driven later (case studies, insights) should be spread in here
 * the same way.
 *
 * `priority` and `changeFrequency` are hints, not instructions; Google largely
 * ignores them. They are set to something honest rather than to all-1.0, which
 * is the usual tell of a sitemap nobody thought about.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...routes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...cases.map((entry) => ({
      url: `${base}/work/${entry.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
