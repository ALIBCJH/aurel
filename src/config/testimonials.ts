/**
 * Client testimonials.
 *
 * **This array is empty on purpose and must stay empty until a real client has
 * said something and agreed to be quoted.** The components that read it are
 * built and tested; they render nothing at all when there is nothing to show,
 * so shipping a real quote is a matter of adding an object here.
 *
 * Do not add a placeholder quote "to see how it looks". A fabricated
 * testimonial is the single most damaging thing that can be put on a studio
 * site: it is unverifiable, it is the first thing a careful prospect checks,
 * and it retrospectively casts doubt on the live client URLs — which are the
 * one claim on this site that anybody can confirm in ten seconds.
 *
 * Sourcing one: ask after a launch, ask for something specific rather than
 * "great to work with", and get written permission to publish the name and
 * organisation. A quote attributed to "a client in Nairobi" persuades nobody.
 */
export type Testimonial = {
  /** The words, verbatim. Never tidied into marketing English. */
  quote: string;
  /** Full name — an anonymous testimonial is worth less than none. */
  name: string;
  /** Their organisation. */
  organisation: string;
  /** Their role, where they are happy to state it. */
  role?: string;
  /** Slug of the related case in `cases.ts`, if the quote came from one. */
  caseSlug?: string;
  /** Which discipline the quote speaks to, for filtering later. */
  serviceSlug?: string;
};

export const testimonials: Testimonial[] = [];
