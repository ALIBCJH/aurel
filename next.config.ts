import type { NextConfig } from "next";

/**
 * Retired service URLs.
 *
 * The service index has been rebuilt around what Mojah actually sells — ICT
 * supply and repair, networks, software, migration and CCTV, plus websites.
 * Every discipline the previous owner published except `/services/websites`
 * has stopped existing, so anything Google had already crawled, or any link
 * sent in a proposal, would otherwise land on a 404. Permanent redirects pass
 * the accumulated signals to the page that absorbed the topic rather than
 * throwing them away.
 *
 * Each target is the page that genuinely covers the old topic, not a blanket
 * redirect to /services: sending every retired URL to a hub is a well-known way
 * to have Google treat the redirect as a soft 404 and drop it anyway. Where no
 * single page inherited the topic, /services is the honest destination and the
 * soft-404 risk is accepted rather than papered over with a false match.
 */
const RETIRED_SERVICE_SLUGS: Array<{ from: string; to: string }> = [
  // ---- retired in the Mojah rebuild ----
  // Mobile apps are not sold as a discipline of their own; where an app is the
  // right answer it is built under Software Development.
  { from: "/services/mobile-apps", to: "/services/software-development" },
  // SEO is no longer sold separately. Search setup is part of a website build,
  // which is the page that inherits the topic.
  { from: "/services/seo", to: "/services/websites" },
  // The "get your business online" packages went with it, for the same reason.
  { from: "/services/online-presence", to: "/services/websites" },
  // Strategy and analytics were consultancy products with no successor here.
  // The index is the honest destination.
  { from: "/services/digital-strategy", to: "/services" },
  { from: "/services/analytics-growth", to: "/services" },

  // ---- retired before the rebuild, re-pointed ----
  // These already redirected once. Their old targets have themselves been
  // retired, so each is re-pointed at a live page — a redirect to a redirect
  // to a 404 is worse than the 404 on its own.
  { from: "/services/software", to: "/services/software-development" },
  { from: "/services/branding", to: "/services/websites" },
  { from: "/services/process", to: "/services/software-development" },
  { from: "/services/ai-automation", to: "/services/software-development" },
  { from: "/services/strategy", to: "/services" },
  { from: "/services/immersive", to: "/services" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return RETIRED_SERVICE_SLUGS.map(({ from, to }) => ({
      source: from,
      destination: to,
      permanent: true,
    }));
  },
};

export default nextConfig;
