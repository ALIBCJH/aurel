import type { SVGProps } from "react";

/**
 * Custom line icons for the eight services.
 *
 * One consistent geometric system: 24×24 grid, ~1.5px gold strokes (via
 * currentColor), round joins, no fills. Minimal and abstract — no photos,
 * cartoons, gears, or robots.
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

const iconBySlug = {
  websites: WebsitesIcon,
  software: SoftwareIcon,
  "ai-automation": AiIcon,
  strategy: StrategyIcon,
  branding: BrandingIcon,
  seo: SeoIcon,
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
