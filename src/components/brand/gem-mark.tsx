import { cn } from "@/lib/utils";

/**
 * GemMark — the faceted "M", drawn in fine line strokes.
 *
 * A drawn mark rather than an embedded raster. A vector that inherits
 * `currentColor` scales to any size, tints with the palette, carries no
 * background plate, and — the reason it matters here — costs nothing and
 * belongs to nobody else. This site has no supplied Mojah artwork, so this is
 * the mark, not a stand-in for one.
 *
 * IF REAL ARTWORK ARRIVES: it should be added as a logo file rather than by
 * editing these paths, and the structured data in `components/seo/json-ld.tsx`
 * has a note describing exactly where it goes and why it wants a white plate.
 *
 * The letterform was an "N" under the previous owner and is now an "M" — two
 * stems and the two diagonals that meet between them.
 *
 * Size is controlled by the caller via `className` (e.g. `h-6 w-6`). Colour
 * defaults to the gold accent via `currentColor`.
 */
/** The gem's facet path data, shared with the animated variant. */
export const GEM_PATH = [
  // the containing facet — the slanted frame the mark sits inside
  "M16 16 L104 16 L104 108 L16 108 Z",
  // the letterform: two stems and the vee that joins them
  "M34 94 L34 30",
  "M86 94 L86 30",
  "M34 30 L60 66",
  "M60 66 L86 30",
  // corner facets, fanning frame to letter — the gem's depth
  "M16 16 L34 30",
  "M104 16 L86 30",
  "M16 108 L34 94",
  "M104 108 L86 94",
].join(" ");

/**
 * The mark reduced to its four load-bearing strokes, for small sizes.
 *
 * `GEM_PATH` carries eight sub-paths across a 120×124 field. With
 * `vectorEffect="non-scaling-stroke"` each of those keeps its full device-pixel
 * width no matter how far the artwork is scaled down, so below roughly 28px the
 * facets stop resolving, run together, and the mark fills in as a solid
 * triangle with a notch — which reads as a warning icon sitting next to the
 * company name, not as a gem.
 *
 * This variant is the bare letterform — the containing frame and the corner
 * facets are dropped. At small sizes the frame closes up around the letter and
 * the mark reads as a filled box with a scratch in it; the bare strokes still
 * read as an M at 16px.
 *
 * The vee is drawn shallower than in the full mark (bottoming at 62 rather
 * than 66) because at 16px a deep vee touches the baseline of the stems and
 * the three counters close into a solid block.
 */
export const GEM_PATH_COMPACT = [
  // the letterform alone — the frame and facets are dropped
  "M32 100 L32 24",
  "M88 100 L88 24",
  "M32 24 L60 62",
  "M60 62 L88 24",
].join(" ");

type GemMarkProps = {
  className?: string;
  strokeWidth?: number;
  /**
   * Draw the reduced mark. Use for anything rendered below ~28px — the
   * masthead lockup, favicons, inline lettering.
   */
  compact?: boolean;
  /** Provide an accessible label; otherwise the mark is decorative. */
  title?: string;
};

export function GemMark({
  className,
  strokeWidth = 2,
  compact = false,
  title,
}: GemMarkProps) {
  return (
    <svg
      viewBox="0 0 120 124"
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("text-accent", className)}
    >
      <path
        d={compact ? GEM_PATH_COMPACT : GEM_PATH}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
