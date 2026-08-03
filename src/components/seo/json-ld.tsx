import { businessInfo, siteConfig } from "@/config/site";
import type { Service } from "@/config/services";

/**
 * Structured data.
 *
 * A studio that sells SEO and ships no schema is answering a sales objection it
 * did not need to create. These builders emit the types that actually earn
 * something in search results — rich snippets, knowledge-panel eligibility,
 * local pack entry — rather than every type that technically validates.
 *
 * Everything is derived from config, so the schema cannot drift from the copy
 * on the page. That drift is the usual reason structured data quietly stops
 * matching reality and gets ignored.
 */

const BASE = siteConfig.url.replace(/\/$/, "");

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

/** The studio as an entity. Safe to emit everywhere; needs no address. */
export function buildOrganizationSchema(): JsonLdValue {
  const sameAs = businessInfo.profiles.filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: BASE,
    description: siteConfig.description,
    email: siteConfig.email,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/logo.png`,
    },
    ...(businessInfo.telephone && { telephone: businessInfo.telephone }),
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
 * The local-pack entry. Returns null until there is a real phone number.
 *
 * Google cross-references this against your Google Business Profile; publishing
 * a placeholder address or number does not get you a provisional listing, it
 * gets you a mismatch that suppresses local ranking. Silence is strictly better
 * than a guess here.
 */
export function buildLocalBusinessSchema(): JsonLdValue | null {
  if (!businessInfo.telephone) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE}/#localbusiness`,
    name: siteConfig.name,
    url: BASE,
    email: siteConfig.email,
    telephone: businessInfo.telephone,
    description: siteConfig.description,
    image: `${BASE}/logo.png`,
    priceRange: businessInfo.priceRange,
    openingHours: businessInfo.openingHours,
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

/** A single discipline, for /services/[slug]. */
export function buildServiceSchema(service: Service): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/${service.slug}#service`,
    name: service.name,
    description: service.description,
    url: `${BASE}/services/${service.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "Country", name: "Kenya" },
      { "@type": "Place", name: "East Africa" },
    ],
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
