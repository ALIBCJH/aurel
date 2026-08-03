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
  location: "Nyeri & Nairobi, Kenya",
  copyright: "© 2026 Aurel — Nyeri & Nairobi, Kenya",
} as const;

/**
 * Name / address / phone — the details search engines use to treat a business
 * as a real, local one.
 *
 * These are empty on purpose rather than filled with plausible-looking
 * placeholders: a wrong phone number or a fake street address in structured
 * data is worse than no structured data, because Google cross-checks it against
 * your Google Business Profile and directory listings, and a mismatch actively
 * suppresses local ranking.
 *
 * `buildLocalBusinessSchema` (see components/seo/json-ld.tsx) returns null
 * while `telephone` is blank, so the site emits Organization schema only until
 * these are real. Fill them in and LocalBusiness starts emitting automatically.
 */
export type BusinessInfo = {
  /** e.g. "+254712345678" — E.164, no spaces. Required for LocalBusiness. */
  telephone: string;
  /** Digits only, no leading + — e.g. "254712345678". Powers wa.me links. */
  whatsapp: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  postalCode: string;
  /** Opening hours in schema.org format, e.g. "Mo-Fr 09:00-17:00". */
  openingHours: string;
  priceRange: string;
  /** Public profiles — feeds schema.org `sameAs`. */
  profiles: string[];
};

// Deliberately typed rather than `as const`: these fields are placeholders
// waiting to be filled, and `as const` would give the empty ones the literal
// type `""`, which TypeScript then knows can never be truthy — breaking the
// conditional spreads that omit them from the schema while they are blank.
export const businessInfo: BusinessInfo = {
  telephone: "+254797942186",
  whatsapp: "254797942186",
  streetAddress: "",
  addressLocality: "Nairobi",
  addressRegion: "Nairobi County",
  addressCountry: "KE",
  postalCode: "",
  openingHours: "Mo-Fr 09:00-17:00",
  priceRange: "$$",
  profiles: [],
};

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
