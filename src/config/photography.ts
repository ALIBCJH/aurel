/**
 * Licensed photography.
 *
 * This is the one place on the site where an image is not a screen of our own
 * work. The rule stated in `cases.ts` and `services.ts` still stands and is
 * not weakened by this file: nothing here may ever be used to illustrate a
 * product, a service or a case study, because those pages argue that the work
 * exists and a photograph cannot carry that argument. These images do a
 * different job — the site says "Nyeri" on nearly every page and would
 * otherwise never show it.
 *
 * A licensed landscape is second best and is here because it is honest and
 * available. The right photograph for this slot is one of Mojah's own: the
 * shopfront at Old Batian House, or the workshop bench. Replace this the day
 * such a photograph exists — and when you do, drop the `credit` block, since
 * it exists only to satisfy the licence on somebody else's work.
 *
 * Sourced through Openverse, filtered to licences that permit commercial use
 * and modification. NonCommercial and NoDerivatives were both excluded: NC
 * because this is a commercial studio site, ND because these are cropped.
 *
 * `credit` is not decoration. CC BY requires attribution by name, and the
 * licence is void without it — so the credit line is rendered wherever the
 * photograph is, and this record is what makes that possible. Before adding an
 * entry, confirm the licence on the `source` page itself rather than trusting
 * an aggregator's metadata.
 */
export type Photograph = {
  src: string;
  alt: string;
  /** Where this is, in the same plain words the rest of the site uses. */
  place: string;
  /** What the reader should notice. One sentence. */
  note: string;
  credit: {
    creator: string;
    creatorUrl?: string;
    license: string;
    licenseUrl: string;
    /** The page the photograph came from, for anyone who wants to verify it. */
    source: string;
  };
};

export const placePhotography: Photograph[] = [
  {
    src: "/place/nyeri.webp",
    alt: "The Nyeri countryside in full sun — smallholdings, banana and coffee under mature trees, with the peaks of Mount Kenya rising over the ridge behind.",
    place: "Nyeri",
    note: "Where we are. Mount Kenya is the ridge on the horizon, about forty kilometres out.",
    credit: {
      creator: "Ninara",
      creatorUrl: "https://www.flickr.com/photos/37583176@N00/51936152848/",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      source:
        "https://commons.wikimedia.org/wiki/File:Nyeri,_Kenya_-_51936152848.jpg",
    },
  },
  // The Nairobi matatu photograph that sat here has been removed. Mojah trades
  // from Nyeri and travels across the Mount Kenya region; a picture captioned
  // "the other half of the week" in Nairobi was a claim about where the
  // business operates, made by an image rather than in text. `public/place/
  // nairobi.webp` is still on disk and nothing references it.
];
