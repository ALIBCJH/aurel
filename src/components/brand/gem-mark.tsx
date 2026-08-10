import { cn } from "@/lib/utils";

/**
 * GemMark — the faceted "N" gem, drawn in fine line strokes.
 *
 * A theme-aware SVG reproduction of the Nexora mark: the letter set inside a
 * facetted frame, echoing the containing shape of the supplied artwork. Drawn
 * rather than embedded because the delivered logo is a raster whose wordmark
 * is near-black — on this site's #080808 ground it is invisible, and keying it
 * to a light colour would mean recolouring somebody else's artwork. A vector
 * that inherits `currentColor` scales to any size, tints with the palette and
 * carries no background plate. The delivered raster is kept for the contexts
 * that need a literal logo file — see `public/companylogo.png`.
 *
 * Was a faceted "A" until the 2026-08-10 rename from Nexora.
 *
 * Size is controlled by the caller via `className` (e.g. `h-6 w-6`). Colour
 * defaults to the gold accent via `currentColor`.
 */
/** The gem's facet path data, shared with the animated variant. */
export const GEM_PATH = [
  // the containing facet — the slanted frame the supplied mark sits inside
  "M16 16 L104 16 L104 108 L16 108 Z",
  // the letterform: two stems and the diagonal that joins them
  "M34 94 L34 30",
  "M86 94 L86 30",
  "M34 30 L86 94",
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
 * facets are dropped. At small sizes the frame closes up around the N and the
 * mark reads as a filled box with a scratch in it; three strokes still read as
 * a letter at 16px.
 */
export const GEM_PATH_COMPACT = [
  // the letterform alone — the frame and facets are dropped
  "M32 100 L32 24",
  "M88 100 L88 24",
  "M32 24 L88 100",
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
