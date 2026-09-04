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
 *
 * THE FALLBACK BELOW IS A GUESS AND MUST BE CONFIRMED. Nobody has told this
 * codebase what domain Mojah actually owns. Set `NEXT_PUBLIC_SITE_URL` at
 * deploy time to the real one before launch — every canonical tag, sitemap
 * entry and schema `@id` is built from it.
 *
 * ON THE DOMAIN ITSELF: a `.co.ke` address is a real ranking signal for
 * Kenya-targeted queries — Google reads a country-code domain as an explicit
 * geographic target. For a business trading only in Nyeri that is the cheapest
 * local-SEO decision available here.
 */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mojahinvestments.co.ke"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Mojah Investments",
  /** The name on its own, for lockups and tight spaces. */
  shortName: "Mojah",
  // The tagline is the default page title after the company name, so it has to
  // be a phrase somebody would actually type into Google. It names the things
  // people search for — computer repair, networks — and the town, rather than
  // describing a position nobody queries.
  tagline: "ICT solutions, computer repair and networks in Nyeri",
  description:
    "Mojah Investments is an ICT solutions provider in Nyeri, Kenya — computer, printer and photocopier supply and repair, network installation, software development, system migration and CCTV.",
  url: SITE_URL,
  /**
   * The public enquiry address.
   *
   * DELIBERATELY EMPTY. No email address has been supplied for Mojah, and an
   * invented one is worse than none: it renders as a live `mailto:` on four
   * pages and into the structured data, so every enquiry sent to it is a lead
   * that silently disappears. Every render site checks this before drawing
   * anything, so the site is coherent while it is blank — contact runs on the
   * phone number and WhatsApp, both of which are real.
   *
   * Fill it in and the email routes reappear everywhere at once. Note that
   * `CONTACT_TO_EMAIL` in the environment overrides this for form delivery, so
   * the brief form works either way.
   */
  email: "",
  location: "Nyeri, Kenya",
  copyright: "© 2026 Mojah Investments — Nyeri, Kenya",
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
 * Mojah has a staffed, visitable shopfront, so unlike a service-area business
 * the street line IS published here and `buildLocalBusinessSchema` emits it.
 * That is what makes the business eligible for the local pack on proximity —
 * the single largest source of walk-in and call traffic for a repair business.
 *
 * CRITICAL: these five lines must be byte-identical to the Google Business
 * Profile. Not "close enough" — identical. A profile reading "Old Batian
 * House, Ground Floor" against a site reading "ground floor" is the most
 * common reason a correct listing fails to rank.
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
  /**
   * Opening hours in schema.org format, e.g. "Mo-Fr 09:00-17:00".
   *
   * An array because Mojah keeps two different schedules — a long six-day week
   * and a shorter Sunday. Collapsing those into one string would either drop
   * Sunday trading (losing every weekend "open now" query) or overstate the
   * Sunday hours, which is worse: somebody drives to Old Batian House at 6pm
   * on a Sunday and finds it shut.
   */
  openingHours: string[];
  /** Human-readable version of the same, for the page. */
  openingHoursText: string[];
  /**
   * Indicative price band, rendered verbatim by Google in some surfaces.
   *
   * Empty because Mojah publishes no prices — see `services.ts`. Emitting a
   * band the site does not stand behind would put a figure beside the business
   * in search results that nobody here has agreed to honour.
   */
  priceRange: string;
  /** Public profiles — feeds schema.org `sameAs`. */
  profiles: string[];
  /**
   * The towns and counties served, most specific first.
   *
   * Nyeri leads because that is where the shop is and where the winnable
   * queries are. The wider entries exist because a hardware and networks
   * business genuinely travels — an installation in Nanyuki or Karatina is an
   * ordinary job — and stating that is what makes those searches reachable.
   */
  serviceAreas: string[];
  /**
   * Languages the business can actually do business in, as BCP-47 tags.
   *
   * Honest, not aspirational: it is a claim a caller can test in one sentence.
   */
  languages: string[];
  /**
   * Payment methods, in the words a Kenyan customer uses.
   *
   * M-Pesa leads because it is the question behind the question — a customer
   * bringing in a laptop wants to know they can pay the way they already pay.
   */
  paymentAccepted: string[];
  /** ISO 4217. Kenyan shillings. */
  currenciesAccepted: string;
};

// Deliberately typed rather than `as const`: several fields are placeholders
// waiting to be filled, and `as const` would give the empty ones the literal
// type `""`, which TypeScript then knows can never be truthy — breaking the
// conditional spreads that omit them from the schema while they are blank.
export const businessInfo: BusinessInfo = {
  telephone: "+254727477328",
  whatsapp: "254727477328",
  streetAddress: "Old Batian House, ground floor",
  addressLocality: "Nyeri",
  addressRegion: "Nyeri County",
  addressCountry: "KE",
  postalCode: "",
  // Mon–Sat 8am–7pm, Sun 10am–5pm. Kept in schema.org's 24-hour form here and
  // in plain English below, from one place, so the two cannot drift.
  openingHours: ["Mo-Sa 08:00-19:00", "Su 10:00-17:00"],
  openingHoursText: ["Mon–Sat, 8am–7pm", "Sun, 10am–5pm"],
  priceRange: "",
  profiles: [],
  serviceAreas: [
    "Nyeri",
    "Nyeri County",
    "Karatina",
    "Nanyuki",
    "Mount Kenya region",
    "Kenya",
  ],
  languages: ["en", "sw"],
  paymentAccepted: ["M-Pesa", "Bank transfer", "Card", "Cash"],
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
  label: "Talk to us",
  href: "/contact",
};

/** Condensed footer navigation. */
export const footerNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];
