import type { NextConfig } from "next";

/**
 * Retired service URLs.
 *
 * The service index went from eight disciplines to four. Four slugs stopped
 * existing, and anything Google had already crawled — or any link sent in a
 * proposal — would otherwise land on a 404. Permanent redirects pass the
 * accumulated signals to the page that absorbed the discipline rather than
 * throwing them away.
 *
 * Each target is the page that genuinely covers the old topic, not a blanket
 * redirect to /services: sending every retired URL to a hub is a well-known way
 * to have Google treat the redirect as a soft 404 and drop it anyway.
 */
const RETIRED_SERVICE_SLUGS: Array<{ from: string; to: string }> = [
  // "Custom software" covered web and mobile apps; mobile apps is the successor.
  { from: "/services/software", to: "/services/mobile-apps" },
  // Branding is now a section inside the Websites engagement.
  { from: "/services/branding", to: "/services/websites" },
  // Process optimisation is now part of the automation offer.
  { from: "/services/process", to: "/services/ai-automation" },
  // Strategy became a discovery phase in every engagement — the index is the
  // honest destination, since no single page inherited it.
  { from: "/services/strategy", to: "/services" },
  // Immersive/AR/VR is parked rather than sold.
  { from: "/services/immersive", to: "/services" },
  // AI & automation was retired from the service list in the 2026-08-10
  // repositioning. The page had accumulated real content and real search
  // signals, so this is a redirect rather than a deletion — Digital strategy
  // is where that conversation now starts. The retired copy is preserved in
  // git history if the discipline is ever brought back.
  { from: "/services/ai-automation", to: "/services/digital-strategy" },
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
