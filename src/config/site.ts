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

/**
 * The canonical origin, with no trailing slash.
 *
 * Read from the environment so the production domain is a deploy-time decision
 * rather than a code change. This matters more than it looks: the origin is the
 * root of every canonical link, every sitemap URL, and every schema.org `@id`
 * on the site. Hardcode it and the day the domain is settled, one missed
 * constant leaves Google indexing one hostname while the pages declare
 * themselves canonical at another — the fastest way to have a site quietly
 * deindex itself.
 *
 * `NEXT_PUBLIC_` because canonical URLs are rendered into client-visible HTML.
 * The fallback is the current working domain, so nothing breaks while unset.
 *
 * ON THE DOMAIN ITSELF: a `.co.ke` address is a real ranking signal for
 * Kenya-targeted queries — Google reads a country-code domain as an explicit
 * geographic target, which a generic `.studio` cannot express. If the domain is
 * still open, that is the cheapest local-SEO decision available here.
 */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurel.studio"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Nexora",
  // The tagline is the default page title after the studio name, so it has to
  // be a phrase somebody would actually type into Google. "Digital
  // transformation studio" was neither searched for nor understood — it told a
  // business owner nothing about what they could buy here.
  tagline: "Websites, apps and software for Kenyan businesses",
  description:
    "Nexora builds websites, mobile apps, AI automation and SEO for businesses in Kenya. Based in Nyeri and Nairobi. Clear prices, work you own, and a reply within one business day.",
  url: SITE_URL,
  email: "hello@aurel.studio",
  location: "Nyeri & Nairobi, Kenya",
  copyright: "© 2026 Nexora — Nyeri & Nairobi, Kenya",
  /**
   * BCP-47 tag for `<html lang>`.
   *
   * `en-KE`, not bare `en`. The region subtag states which English-speaking
   * market this site is written for, and on a query where a Kenyan and an
   * American page are topically identical it is part of what separates them.
   * It also gives screen readers and browsers the right locale for dates and
   * numbers.
   */
  locale: "en-KE",
  /** The same tag in the underscore form Open Graph expects. */
  ogLocale: "en_KE",
} as const;

/**
 * Name / address / phone — the details search engines use to treat a business
 * as a real, local one.
 *
 * Anything not yet true is left blank rather than filled with a
 * plausible-looking placeholder. A wrong phone number or invented street
 * address in structured data is worse than no structured data at all: Google
 * cross-checks these against your Google Business Profile and against directory
 * listings, and a mismatch actively suppresses local ranking rather than merely
 * failing to help it.
 *
 * `streetAddress` and `postalCode` are blank on purpose — this is a
 * service-area business, not a shopfront. `buildLocalBusinessSchema` (see
 * components/seo/json-ld.tsx) handles that case properly: it advertises the
 * towns served via `areaServed` and omits the street line entirely, which is
 * the shape Google documents for a business that travels to its customers.
 * Fill the address in only if a real, staffed, visitable office exists — and if
 * one does, make it byte-identical to the Google Business Profile.
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
  /**
   * The towns and counties served, most specific first.
   *
   * This is what makes the studio findable without a shopfront. A business with
   * no published street address cannot enter Google's local pack on proximity,
   * so the towns it serves have to be stated explicitly instead — as
   * `areaServed` in structured data and in the visible copy. "Nairobi" alone
   * would forfeit every Nyeri and Mount Kenya query, which is exactly the
   * ground a Nairobi-based competitor is not contesting.
   */
  serviceAreas: string[];
  /**
   * Languages the studio can actually do business in, as BCP-47 tags.
   *
   * Honest, not aspirational: it is a claim a caller can test in one sentence.
   * English and Swahili are the working languages here, and stating Swahili is
   * a real differentiator against the offshore agencies bidding on the same
   * Kenyan search terms.
   */
  languages: string[];
  /**
   * Payment methods, in the words a Kenyan customer uses.
   *
   * M-Pesa leads because it is the question behind the question — a business
   * owner comparing developers wants to know their customers can pay the way
   * they already pay. Naming it in structured data and on the page answers that
   * before anyone has to ask.
   */
  paymentAccepted: string[];
  /** ISO 4217. Kenyan shillings — the currency every published price is in. */
  currenciesAccepted: string;
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
  // Google renders this verbatim in some surfaces, so it is written in the
  // currency the customer thinks in rather than as the "$$" band, which means
  // nothing to a Nairobi business owner and implies US pricing.
  // Must track the lowest published `pricing.from` in `services.ts` — this is
  // the figure Google may show beside the business, and a floor higher than
  // the one on the page reads as a bait-and-switch.
  priceRange: "KES 25,000+",
  profiles: [],
  serviceAreas: [
    "Nyeri",
    "Nairobi",
    "Nyeri County",
    "Nairobi County",
    "Mount Kenya region",
    "Kenya",
  ],
  languages: ["en", "sw"],
  paymentAccepted: ["M-Pesa", "Bank transfer", "Card"],
  currenciesAccepted: "KES",
};

/** Primary navigation — shared by desktop nav and the full-screen index. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
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
