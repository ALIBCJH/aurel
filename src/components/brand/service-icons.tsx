import type { SVGProps } from "react";

/**
 * Custom line icons for the six services.
 *
 * One consistent geometric system: 24×24 grid, ~1.5px gold strokes (via
 * currentColor), round joins, no fills. Minimal and abstract — no photos,
 * cartoons, gears, or robots.
 *
 * Several icons here are keyed to slugs that no longer exist. They are kept on
 * purpose: `next.config.ts` still redirects those URLs, and an old link that
 * reaches a redirect should not lose its icon on the way through.
 */
const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

type IconProps = SVGProps<SVGSVGElement>;

// Custom websites — browser frame
function WebsitesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9h18" />
      <circle cx="6" cy="6.75" r="0.4" fill="currentColor" />
      <circle cx="8.2" cy="6.75" r="0.4" fill="currentColor" />
    </svg>
  );
}

// Custom software — code brackets
function SoftwareIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 8l-4 4 4 4" />
      <path d="M15 8l4 4-4 4" />
      <path d="M13 7l-2 10" />
    </svg>
  );
}

// AI automation — spark node
function AiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 8.5l2 1.5-2 1.5-2-1.5z" />
      <path d="M12 3v2.5M12 14.5V17M5 12h2.5M16.5 12H19" />
      <path d="M6.5 6.5l1.6 1.6M17.5 6.5l-1.6 1.6M6.5 17.5l1.6-1.6M17.5 17.5l-1.6-1.6" />
    </svg>
  );
}

// Digital strategy — target + heading
function StrategyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="13" r="7" />
      <circle cx="11" cy="13" r="3" />
      <path d="M11 13l7-7M15 4h4v4" />
    </svg>
  );
}

// Branding — faceted gem
function BrandingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 5.5-7 12.5L5 8.5z" />
      <path d="M5 8.5h14M12 3v18" />
    </svg>
  );
}

// SEO — magnifier with trend
function SeoIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5" />
      <path d="M7.5 12l2-2.5 1.8 1.4 2.2-3" />
    </svg>
  );
}

// Process optimisation — connected nodes
function ProcessIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="6.5" height="5" rx="1.2" />
      <rect x="14.5" y="15" width="6.5" height="5" rx="1.2" />
      <path d="M9.5 6.5h4.5a2 2 0 0 1 2 2V15" />
    </svg>
  );
}

// Immersive experiences — isometric cube
function ImmersiveIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </svg>
  );
}


// Mobile applications — handset with a live surface
function MobileAppsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M10.6 5.2h2.8" />
      <path d="M9.5 9.5h5M9.5 12.5h5M9.5 15.5h3" />
    </svg>
  );
}

// Google Maps & business presence — a pin over ground
function PresenceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

// Analytics & growth — a rising series, not a decorative squiggle
function AnalyticsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 20h17" />
      <path d="M6.5 20v-5M11 20v-9M15.5 20v-4M20 20v-12" />
    </svg>
  );
}

// Hardware supply & repair — a monitor and a screwdriver crossing it. The
// tool is what separates this from a generic "computer" icon: the discipline
// is supply *and* repair, and the repair half is the harder sell.
function HardwareIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4" width="19" height="12" rx="1.6" />
      <path d="M9 20h6M12 16v4" />
      <path d="M8 12.5l3.2-3.2M11.2 9.3l2-2a2 2 0 1 1 2.6 2.6l-2 2z" />
    </svg>
  );
}

// Networks — a switch feeding three points. Deliberately hierarchical rather
// than a mesh of dots: the thing being sold is structured cabling from a known
// centre, which is exactly what an office's tangle of ad-hoc links is not.
function NetworkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="8.5" y="2.5" width="7" height="4.5" rx="1" />
      <rect x="2" y="17" width="5" height="4.5" rx="1" />
      <rect x="9.5" y="17" width="5" height="4.5" rx="1" />
      <rect x="17" y="17" width="5" height="4.5" rx="1" />
      <path d="M12 7v5M4.5 17v-2.5h15V17M12 12v2.5" />
    </svg>
  );
}

// System migration & integration — two stores with traffic in both directions.
// Two arrows, not one: the discipline covers integration (systems that keep
// talking) as well as migration (a one-way move), and a single arrow would
// picture only half of it.
function MigrationIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 6.5c0-1.4 1.6-2.5 3.5-2.5s3.5 1.1 3.5 2.5-1.6 2.5-3.5 2.5-3.5-1.1-3.5-2.5z" />
      <path d="M2.5 6.5v5c0 1.4 1.6 2.5 3.5 2.5s3.5-1.1 3.5-2.5v-5" />
      <path d="M14.5 17.5c0-1.4 1.6-2.5 3.5-2.5s3.5 1.1 3.5 2.5-1.6 2.5-3.5 2.5-3.5-1.1-3.5-2.5z" />
      <path d="M13 6.5h5.5M16.5 4.5l2 2-2 2" />
      <path d="M11 17.5H5.5M7.5 15.5l-2 2 2 2" />
    </svg>
  );
}

// Security systems & CCTV — a body-and-lens camera on its bracket, aimed
// downward. The aim is the whole argument of that service page, so the icon
// shows a camera pointing somewhere rather than a symmetrical box.
function CctvIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6.5l13.5-3 1.4 5.2-13.5 3z" />
      <path d="M18.5 6.2l2.6-.6.9 3.4-2.6.6" />
      <path d="M8.5 11.2l1 3.6" />
      <path d="M6 20.5a3.2 3.2 0 0 1 6.2-1.2" />
      <circle cx="9.5" cy="16" r="1.2" />
    </svg>
  );
}

/**
 * Keyed by slug. The live disciplines come first; everything below them is a
 * retired slug still reachable through a redirect.
 */
const iconBySlug = {
  // Live disciplines.
  hardware: HardwareIcon,
  networks: NetworkIcon,
  "software-development": SoftwareIcon,
  websites: WebsitesIcon,
  "system-migration": MigrationIcon,
  "security-systems": CctvIcon,
  // Retired, still reachable through redirects.
  software: SoftwareIcon,
  "mobile-apps": MobileAppsIcon,
  seo: SeoIcon,
  "online-presence": PresenceIcon,
  "digital-strategy": StrategyIcon,
  "analytics-growth": AnalyticsIcon,
  "ai-automation": AiIcon,
  strategy: StrategyIcon,
  branding: BrandingIcon,
  process: ProcessIcon,
  immersive: ImmersiveIcon,
} as const;

export type ServiceSlug = keyof typeof iconBySlug;

/** Resolve a service icon by slug (falls back to the gem/branding icon). */
export function ServiceIcon({
  slug,
  ...props
}: IconProps & { slug: string }) {
  const Icon = iconBySlug[slug as ServiceSlug] ?? BrandingIcon;
  return <Icon {...props} />;
}
