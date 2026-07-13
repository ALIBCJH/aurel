/**
 * Central site configuration.
 *
 * Navigation, footer, and contact details live here so every page renders from
 * a single source of truth.
 */

export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Aurel",
  tagline: "Digital transformation studio",
  description:
    "Aurel is a premium digital transformation studio helping ambitious businesses modernise, grow, and lead — custom software, AI, and design, crafted end to end.",
  url: "https://aurel.studio",
  email: "hello@aurel.studio",
  location: "Kenya · Working worldwide",
  copyright: "© 2026 Aurel — Kenya & worldwide",
} as const;

/** Primary navigation — shared by desktop nav and the mobile menu. */
export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Primary call-to-action, reused across the site. */
export const primaryCta: NavItem = {
  label: "Start a project",
  href: "/contact",
};

/** Condensed footer navigation. */
export const footerNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];
