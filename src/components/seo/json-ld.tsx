import { businessInfo, siteConfig } from "@/config/site";
import type { Service } from "@/config/services";

/**
 * Structured data.
 *
 * These builders emit the types that actually earn something in search results
 * — rich snippets, knowledge-panel eligibility, local pack entry — rather than
 * every type that technically validates.
 *
 * Everything is derived from config, so the schema cannot drift from the copy
 * on the page. That drift is the usual reason structured data quietly stops
 * matching reality and gets ignored.
 *
 * EVERY OPTIONAL FIELD IS SPREAD CONDITIONALLY. That is not fussiness: a blank
 * email, an empty price band or a missing logo emitted as `""` is a claim that
 * the business has no such thing, and Google is more likely to distrust the
 * whole node than to ignore one bad field. Silence beats a placeholder in
 * every one of these positions.
 */

const BASE = siteConfig.url.replace(/\/$/, "");

/**
 * Is there a published email address to emit?
 *
 * A named boolean rather than `siteConfig.email && …` inline, for a reason
 * that is compiler-level rather than stylistic: `siteConfig` is declared `as
 * const`, so while the address is blank its type is the literal `""` and
 * `"" && { … }` narrows to `""` — a string, which TypeScript refuses to spread
 * ("Spread types may only be created from object types"). Comparing the length
 * yields a plain boolean, so the spread type is `false | { … }`, which is
 * legal and still erases the key at runtime.
 */
const hasEmail = siteConfig.email.length > 0;

/** Stable @ids so nodes can reference each other across pages. */
export const ORG_ID = `${BASE}/#organization`;
export const SITE_ID = `${BASE}/#website`;

type JsonLdValue = Record<string, unknown>;

/**
 * Serialise a JSON-LD payload for embedding in a <script> body.
 *
 * SECURITY — why this is safe, and what makes it safe:
 *
 *  1. Every "<" in the serialised output is replaced with its JSON unicode
 *     escape (backslash-u-0-0-3-c). That is the entire attack surface here: the
 *     only way a string inside the payload can break out of a script element is
 *     by containing a literal closing script tag. With "<" escaped, that
 *     sequence cannot be produced, so no value — however hostile — can
 *     terminate the tag early or inject markup. The escape is invisible to
 *     consumers: it is valid JSON and decodes back to "<" when parsed.
 *  2. Every input reaches this function from `src/config/*.ts` — module-level
 *     constants authored in-repo. No request data, user input, CMS content, or
 *     network response is serialised here.
 *
 * This is the approach Next.js documents for JSON-LD (see
 * `next/dist/docs/01-app/02-guides/json-ld.md`), and matches the existing use
 * of `dangerouslySetInnerHTML` in `components/theme/theme-script.tsx`.
 *
 * If this ever needs to carry untrusted content — a CMS field, a client
 * testimonial pasted from email — the "<" escape still covers the injection
 * risk, but validate the shape of the data before trusting it downstream.
 */
function serializeJsonLd(data: JsonLdValue | JsonLdValue[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Renders a JSON-LD block. See `serializeJsonLd` for the security rationale. */
export function JsonLd({ data }: { data: JsonLdValue | JsonLdValue[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/**
 * The places this studio serves, as schema.org nodes.
 *
 * One helper for all three builders so the geography cannot say one thing on
 * the services page and another in the site-wide entity. The country is typed
 * as `Country` and every town or county as `Place` — the distinction is real to
 * a consumer, and emitting "Kenya" as both (which is what listing it twice
 * produced) is the kind of redundancy that makes a graph look auto-generated.
 */
function areaServedNodes(): JsonLdValue[] {
  return businessInfo.serviceAreas.map((name) => ({
    "@type": name === "Kenya" ? "Country" : "Place",
    name,
  }));
}

/** The business as an entity. Safe to emit everywhere; needs no address. */
export function buildOrganizationSchema(): JsonLdValue {
  const sameAs = businessInfo.profiles.filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    /**
     * The short form, so a search engine can connect "Mojah" and "Mojah
     * Investments" as one entity rather than treating the shorter one as an
     * unrelated string. Customers, directories and reviews will use both.
     */
    alternateName: siteConfig.shortName,
    url: BASE,
    description: siteConfig.description,
    ...(hasEmail && { email: siteConfig.email }),
    /**
     * NO LOGO IS EMITTED YET, and that is a real gap rather than an oversight.
     *
     * `logo` is what Google uses in knowledge panels and several other
     * surfaces, so it is worth having. What is not worth having is the
     * previous owner's artwork: `public/companylogo.png` and the files in
     * `public/images/` are another company's mark, and pointing this at any of
     * them would publish their identity as Mojah's.
     *
     * TO FIX: put a square-ish Mojah logo on a white plate — white, because
     * this is rendered on white in search surfaces and a near-black wordmark
     * on transparency disappears there — at `public/mojah-logo.png`, then
     * restore:
     *
     *   logo: { "@type": "ImageObject", url: `${BASE}/mojah-logo.png` },
     */
    // The towns served, stated explicitly, alongside the street address on the
    // LocalBusiness node. This is what makes a Karatina or Nanyuki query
    // reachable rather than conceded — the shop is in Nyeri but the work
    // travels.
    areaServed: areaServedNodes(),
    knowsLanguage: businessInfo.languages,
    // A contact point rather than a bare telephone field: this is the shape
    // that can surface as a callable number beside the result, and it carries
    // the languages and the area with it.
    ...(businessInfo.telephone && {
      telephone: businessInfo.telephone,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: businessInfo.telephone,
        ...(hasEmail && { email: siteConfig.email }),
        availableLanguage: businessInfo.languages,
        areaServed: "KE",
      },
    }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function buildWebSiteSchema(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: BASE,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/**
 * The local entry — the single most valuable node on this site.
 *
 * Returns null until there is a real phone number: Google cross-references this
 * against your Google Business Profile, and publishing a placeholder does not
 * earn a provisional listing, it earns a mismatch that suppresses local
 * ranking. Silence beats a guess.
 *
 * THE STREET ADDRESS IS PUBLISHED, and that is the point. Mojah has a staffed,
 * visitable shopfront, which makes it a bricks-and-mortar business rather than
 * a service-area one — so it is eligible for the local pack on proximity, which
 * is where the walk-in and "computer repair near me" traffic comes from. That
 * eligibility is worth more than everything else in this file combined.
 *
 * Two things it depends on absolutely:
 *
 *  - The address must be byte-identical to the Google Business Profile. Not
 *    equivalent — identical. This is the most common reason a legitimate
 *    listing fails to rank.
 *  - `areaServed` still carries the wider geography, because the work travels
 *    beyond the shop. Each town is named individually rather than collapsed
 *    into "Kenya", since each named place is something a local query can be
 *    matched against.
 *
 * `@type` is ProfessionalService — a valid LocalBusiness subtype that covers a
 * mixed supply, repair and services business. Do not narrow it to
 * `ComputerStore`: it would describe the retail half and quietly disclaim the
 * networks, software and CCTV work.
 */
export function buildLocalBusinessSchema(): JsonLdValue | null {
  if (!businessInfo.telephone) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE}/#localbusiness`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: BASE,
    ...(hasEmail && { email: siteConfig.email }),
    telephone: businessInfo.telephone,
    description: siteConfig.description,
    // The social card, which is drawn from config and always renders the
    // current name and details — see app/opengraph-image.tsx. Deliberately not
    // the previous owner's logo file; see `buildOrganizationSchema` above for
    // what to put here once Mojah artwork exists.
    image: `${BASE}/opengraph-image`,
    // Omitted while blank. An empty `priceRange` renders as a stray separator
    // beside the business in some surfaces, and a made-up band is a price
    // promise nobody here has agreed to honour.
    ...(businessInfo.priceRange && { priceRange: businessInfo.priceRange }),
    // Both are named because a customer wants to know they can pay the way
    // they already pay. M-Pesa leads for that reason.
    paymentAccepted: businessInfo.paymentAccepted.join(", "),
    currenciesAccepted: businessInfo.currenciesAccepted,
    knowsLanguage: businessInfo.languages,
    // Derived, not restated. Spelling the hours out here would let the schema
    // drift from config the first time the shop changes them. The array form
    // carries the six-day week and the shorter Sunday as separate rules, which
    // is what makes "open now" correct on a Sunday afternoon.
    openingHours: businessInfo.openingHours,
    areaServed: areaServedNodes(),
    address: {
      "@type": "PostalAddress",
      ...(businessInfo.streetAddress && {
        streetAddress: businessInfo.streetAddress,
      }),
      addressLocality: businessInfo.addressLocality,
      addressRegion: businessInfo.addressRegion,
      addressCountry: businessInfo.addressCountry,
      ...(businessInfo.postalCode && { postalCode: businessInfo.postalCode }),
    },
    parentOrganization: { "@id": ORG_ID },
  };
}

/**
 * Pull the numeric floor out of a published price string.
 *
 * `pricing.from` is written for humans ("KES 30,000") because it is rendered
 * on the page; schema.org needs a bare number. Parsed rather than duplicated
 * into a second field, so the figure a visitor reads and the figure Google
 * reads cannot disagree — disagreement is the usual reason price markup gets
 * ignored.
 *
 * Returns null when the string carries no digits, so a future "On application"
 * degrades to omitting the offer rather than advertising a price of zero.
 */
function parsePriceFloor(from: string): number | null {
  const digits = from.replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
}

/** A single discipline, for /services/[slug]. */
export function buildServiceSchema(service: Service): JsonLdValue {
  const floor = parsePriceFloor(service.pricing.from);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/${service.slug}#service`,
    name: service.name,
    description: service.description,
    url: `${BASE}/services/${service.slug}`,
    provider: { "@id": ORG_ID },
    // The towns are named individually, not collapsed into "Kenya". Each named
    // place is something a local query can be matched against, and Nyeri is
    // ground the Nairobi agencies are not contesting.
    areaServed: areaServedNodes(),
    // A real starting figure in shillings, where one is published. Nothing is
    // emitted today because no discipline publishes a floor — `parsePriceFloor`
    // returns null for "On request" and the whole offer is dropped rather than
    // advertising a price of zero. "How much does X cost in Kenya" is among
    // the highest-intent things anyone in this market types, so this becomes
    // valuable the moment real figures land in `services.ts`.
    // `minPrice` rather than `price`, because it is a floor and saying
    // otherwise would be a promise nobody here has made.
    ...(floor !== null && {
      offers: {
        "@type": "Offer",
        priceCurrency: businessInfo.currenciesAccepted,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: businessInfo.currenciesAccepted,
          minPrice: floor,
        },
        seller: { "@id": ORG_ID },
      },
    }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} — what an engagement includes`,
      itemListElement: service.includes.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

/**
 * Breadcrumbs. Pass the trail without the site root — that is prepended.
 *   buildBreadcrumbSchema([{ name: "Services", path: "/services" }, …])
 */
export function buildBreadcrumbSchema(
  trail: Array<{ name: string; path: string }>,
): JsonLdValue {
  const items = [{ name: "Home", path: "" }, ...trail];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  };
}

/**
 * FAQ rich results. Only emit this where the questions and answers are visibly
 * on the page — Google treats hidden FAQ markup as a guidelines violation.
 */
export function buildFaqSchema(
  faqs: Array<{ question: string; answer: string }>,
): JsonLdValue | null {
  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * The services index as an ordered list of the four disciplines.
 *
 * Without this the index page is, to a crawler, an unstructured wall of prose
 * that happens to link elsewhere. `ItemList` states that it is a list of four
 * distinct offerings and names them, which is what lets the individual service
 * pages be understood as children of a coherent set rather than as four
 * unrelated pages that happen to share a URL prefix.
 *
 * Takes the services rather than importing them, so this module stays a pure
 * schema layer with one direction of dependency.
 */
export function buildServiceListSchema(items: Service[]): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE}/services#list`,
    name: `${siteConfig.name} — services`,
    description: siteConfig.description,
    numberOfItems: items.length,
    itemListElement: items.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      description: service.summary,
      url: `${BASE}/services/${service.slug}`,
    })),
  };
}

/**
 * The contact page.
 *
 * Small but worth emitting: it marks one page as the place a human reaches the
 * business, and hangs the phone number and languages off an entity Google
 * already knows. On a service-area business with no street address, every extra
 * corroboration of the contact details is doing real work.
 */
export function buildContactPageSchema(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${BASE}/contact#page`,
    url: `${BASE}/contact`,
    name: `Contact ${siteConfig.name}`,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    ...(businessInfo.telephone && {
      mainEntity: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: businessInfo.telephone,
        ...(hasEmail && { email: siteConfig.email }),
        availableLanguage: businessInfo.languages,
        areaServed: "KE",
      },
    }),
  };
}
