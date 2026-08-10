/**
 * Licensed photography.
 *
 * This is the one place on the site where an image is not a screen of our own
 * work. The rule stated in `cases.ts` and `services.ts` still stands and is
 * not weakened by this file: nothing here may ever be used to illustrate a
 * product, a service or a case study, because those pages argue that the work
 * exists and a photograph cannot carry that argument. These images do a
 * different job — the site says "Nyeri and Nairobi" on nearly every page and
 * has never once shown either place.
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
    note: "Where the studio is. Mount Kenya is the ridge on the horizon, about forty kilometres out.",
    credit: {
      creator: "Ninara",
      creatorUrl: "https://www.flickr.com/photos/37583176@N00/51936152848/",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      source:
        "https://commons.wikimedia.org/wiki/File:Nyeri,_Kenya_-_51936152848.jpg",
    },
  },
  {
    src: "/place/nairobi.webp",
    alt: "A matatu, hand-painted end to end, pulling through a Nairobi city-centre junction past shopfronts and pedestrians in the middle of the day.",
    place: "Nairobi",
    note: "The other half of the week. Most of our clients' customers arrive on one of these.",
    credit: {
      // CC0 waives the attribution requirement. Credited anyway: the
      // photographer did the work, and a studio that asks clients to value
      // craft should not quietly take someone else's.
      creator: "Francis Akuka for the Wikimedia Foundation",
      license: "CC0 1.0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
      source: "https://commons.wikimedia.org/wiki/File:Matatu_bus.jpg",
    },
  },
];
