import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { cases } from "@/config/cases";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";

/**
 * When the source behind a route last actually changed, from git.
 *
 * This replaced `lastModified: new Date()`, which stamped every URL on the site
 * with the moment of the build. That is not a small inaccuracy — Google's
 * documented position is that it uses `lastmod` only when the value is
 * consistently and verifiably accurate, and a sitemap where all 15 URLs claim
 * to have changed simultaneously, again, on every deploy, is the exact pattern
 * that gets the field ignored for the whole site. A redeploy is not an edit.
 *
 * Runs at build time, in the Node runtime, while the working tree is present.
 *
 * Fails safe and deliberately: if git is unavailable, the checkout is shallow
 * enough to have no history for the path, or the build runs from an exported
 * tarball, this returns undefined and the entry ships with no `lastmod` at all.
 * An absent `lastmod` is handled gracefully by every crawler; a wrong one is
 * actively counterproductive. Never substitute `new Date()` here.
 */
function lastChanged(...paths: string[]): Date | undefined {
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", ...paths],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();

    if (!iso) return undefined;

    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
}

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

  // Each route is dated from the files that actually render it — the page
  // component plus the config it reads. A copy edit in services.ts is a real
  // change to every service page, and this is what says so.
  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    sources: string[];
  }> = [
    {
      path: "",
      priority: 1,
      changeFrequency: "weekly",
      sources: ["src/app/page.tsx", "src/components/home", "src/config"],
    },
    {
      path: "/services",
      priority: 0.9,
      changeFrequency: "monthly",
      sources: ["src/app/services/page.tsx", "src/config/services.ts"],
    },
    {
      path: "/work",
      priority: 0.9,
      changeFrequency: "weekly",
      sources: ["src/app/work/page.tsx", "src/config/cases.ts"],
    },
    {
      path: "/about",
      priority: 0.7,
      changeFrequency: "monthly",
      sources: ["src/app/about/page.tsx", "src/config/team.ts"],
    },
    {
      path: "/contact",
      priority: 0.8,
      changeFrequency: "monthly",
      sources: ["src/app/contact/page.tsx", "src/components/contact"],
    },
    {
      path: "/privacy",
      priority: 0.2,
      changeFrequency: "yearly",
      sources: ["src/app/privacy/page.tsx"],
    },
    {
      path: "/terms",
      priority: 0.2,
      changeFrequency: "yearly",
      sources: ["src/app/terms/page.tsx"],
    },
  ];

  const serviceSources = ["src/app/services/[slug]/page.tsx", "src/config/services.ts"];
  const caseSources = ["src/app/work/[slug]/page.tsx", "src/config/cases.ts"];

  return [
    ...routes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: lastChanged(...route.sources),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: lastChanged(...serviceSources),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...cases.map((entry) => ({
      url: `${base}/work/${entry.slug}`,
      lastModified: lastChanged(...caseSources),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
