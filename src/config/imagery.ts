/**
 * The commissioned imagery system.
 *
 * `Figure` (src/components/ui/figure.tsx) resolves these at build time. If the
 * file exists it is rendered as a real optimised image; if it does not, a
 * composed placeholder is drawn that states the path and what belongs there.
 * Nothing anywhere renders a broken image, and nothing invents a substitute:
 * generating filler art for a slot that is waiting on a real photograph is how
 * a placeholder quietly becomes permanent.
 *
 * To ship an asset: drop the file at `path` (and `mobilePath` where one is
 * declared), and it appears. No code change.
 *
 * Export at 2× the largest rendered width, in WebP or AVIF. `aspect` must
 * match the delivered file or the layout will shift when it lands.
 *
 * ON WHAT BELONGS HERE NEXT. This holds one frame — abstract equipment art
 * carried over as the home opening, which is honest because it depicts nothing
 * it cannot back up. The strongest images this site could gain are photographs
 * Mojah can actually take: the workshop bench, a cable run terminated and
 * labelled, the shopfront at Old Batian House. A real photograph of your own
 * premises outperforms any stock or generated substitute, and it is the one
 * asset a competitor cannot copy. Do not fill these slots with stock — the
 * placeholder is designed to be lived with until the real thing exists.
 */
export type BrandImage = {
  /** Reserved public path. */
  path: string;
  /** Portrait-cropped variant for narrow viewports, where one is warranted. */
  mobilePath?: string;
  /** Rendered width ÷ height. Reserves the box before the file exists. */
  aspect: number;
  /** Alt text, written now so it is never an afterthought later. */
  alt: string;
  /** Shown on the placeholder — what the commissioned image must communicate. */
  brief: string;
};

export const imagery = {
  /**
   * Home opening. Rendered full-bleed behind the copy from `md` up, and not at
   * all on a handset — see `opening-spread.tsx` for why.
   *
   * Deliberately has no legible type baked into it. Several retired frames in
   * `public/images/` do carry set headlines and figures, which is why they are
   * not used: type in a picture cannot be selected, translated, searched or
   * restyled, and figures baked into artwork are claims nobody can check.
   */
  hero: {
    path: "/images/mojah-hero-desktop.webp",
    // `aspect` is unused for the hero — it is rendered `fill` + `object-cover`
    // and the section sets its own height — but is kept accurate for the
    // delivered file, which is 1774x887.
    aspect: 2 / 1,
    alt: "A laptop and a phone lit in gold on a dark surface — the equipment a business runs on, and the systems behind it.",
    brief:
      "Business ICT — equipment, network and systems in a single composition. Near-black ground, gold accents, no stock desk photography, and no legible type anywhere in the frame.",
  },
} as const satisfies Record<string, BrandImage>;

export type ImageryKey = keyof typeof imagery;

/**
 * Retired frames.
 *
 * `nexora-hero-desktop-2.webp`, `-3.webp`, `-v1.webp` and
 * `nexora-hero-mobile.webp` remain in `public/images/` and are deliberately not
 * rendered. Each bakes a headline, service labels, or figures such as "120+
 * Projects Delivered · 98% Client Satisfaction" into the pixels — claims this
 * site does not make in text and will not make in a picture, under the previous
 * owner's brand. They are safe to delete; nothing references them.
 */
