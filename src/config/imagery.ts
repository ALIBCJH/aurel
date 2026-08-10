/**
 * The Nexora imagery system.
 *
 * Four commissioned images carry the new visual direction. They are *not* in
 * the repository yet, and this file is deliberately written for that state
 * rather than against it: every entry below is a reserved path plus enough
 * description that the render can stand in for the asset until the asset
 * arrives, and can be dropped in later without touching a component.
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
 */
export type NexoraImage = {
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
   * Home hero. Websites + applications + analytics + growth, in one frame.
   *
   * One file serves both breakpoints, art-directed by crop rather than by a
   * second shoot: full-bleed and centred on desktop, and cropped to 3:4 at
   * `70%` on a handset (see `opening-spread.tsx`).
   *
   * `mobilePath` is retired and deliberately not rendered.
   * `nexora-hero-mobile.webp` is still in `public/images/` and still shows a
   * photographed phone with "Building digital experiences that drive your
   * business forward" set into the pixels — verbatim the `<h1>` that sits
   * directly above it, so the page made the same claim twice, once as text
   * and once as a picture of text. It also bakes in "+127%" and a
   * traffic-source split, which are exactly the unbacked figures the rest of
   * the site refuses to print. Same disqualification as the two retired
   * desktop frames below. A replacement must have no legible type in it at
   * all; the brief is in `public/images/HERO-BRIEF.md`.
   */
  hero: {
    path: "/images/nexora-hero-desktop.webp",
    // `aspect` is unused for the hero — it is rendered `fill` + `object-cover`
    // and the section sets its own height — but is kept accurate for the
    // delivered file, which is 1774x887.
    aspect: 2 / 1,
    alt: "A laptop showing a finished website beside a phone showing its analytics dashboard, lit in gold on a dark studio surface — the site a customer lands on, and the reporting behind it.",
    brief:
      "Digital transformation — website, application, analytics, SEO and growth in a single composition. Near-black ground, gold accents, no stock desk photography.",
  },

  /** Mobile applications service. */
  mobileApps: {
    path: "/images/aurel-mobile-apps.webp",
    aspect: 4 / 3,
    alt: "A mobile application shown across several screens — the interface a customer uses, and the data behind it.",
    brief:
      "Mobile applications — iOS and Android, interface and UX, backend and analytics. Dark ground, gold accents.",
  },

  /** SEO & digital visibility service. */
  seo: {
    path: "/images/aurel-seo.webp",
    aspect: 4 / 3,
    alt: "Search results and a rising visibility trend — what it looks like when the right people start finding a business online.",
    brief:
      "SEO — search, visibility, organic traffic, rankings and growth. Must read as measurement, not as a marketing chart.",
  },

  /** Google Maps & business presence service. */
  googleMaps: {
    path: "/images/aurel-google-maps.webp",
    aspect: 4 / 3,
    alt: "A business shown on a map with its profile, opening hours and reviews — how a customer finds it and decides to come.",
    brief:
      "Digital presence — business to Google Maps to customer. Profile, location pin, reviews, contact. The sequence must be legible at a glance.",
  },
} as const satisfies Record<string, NexoraImage>;

export type ImageryKey = keyof typeof imagery;

/**
 * Retired: the desktop hero rotation.
 *
 * `nexora-hero-desktop-2.webp` and `-3.webp` are still in `public/images/` and
 * are deliberately not rendered. Both bake a headline, a supporting line and
 * service labels into the pixels — type the site cannot select, translate,
 * search, restyle or reflow, set in a face the site does not use, and saying
 * something other than the `<h1>` they sat in for. Frame 2 also bakes in
 * "120+ Projects Delivered · 98% Client Satisfaction · 4+ Years", which is
 * exactly the kind of unbacked figure `cases.ts` and `work/page.tsx` both
 * refuse to publish in text.
 *
 * If a rotation is wanted again, the requirement is a set of frames with no
 * type in them at all — see `imagery.hero`, which is the one delivered frame
 * that qualifies. Do not restore these two by pointing the hero back at them.
 */
