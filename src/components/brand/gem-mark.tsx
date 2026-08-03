import { cn } from "@/lib/utils";

/**
 * GemMark — the faceted "A" gem, drawn in fine gold line strokes.
 *
 * A transparent, theme-aware SVG reproduction of the brand mark (see
 * public/logo.png), so it sits cleanly on both obsidian and off-white
 * backgrounds and can be scaled or made to glow without artefacts.
 *
 * Size is controlled by the caller via `className` (e.g. `h-6 w-6`). Colour
 * defaults to the gold accent via `currentColor`.
 */
/** The gem's facet path data, shared with the animated variant. */
export const GEM_PATH = [
  // outer triangle
  "M60 8 L12 112 L108 112 Z",
  // apex fans to the crossbar ends (primary gem facets)
  "M60 8 L44 92",
  "M60 8 L76 92",
  // central spine + inner A counter
  "M60 8 L60 50",
  "M60 50 L44 92",
  "M60 50 L76 92",
  // crossbar
  "M44 92 L76 92",
  // lower outer facets
  "M44 92 L12 112",
  "M76 92 L108 112",
  // lower centre facets
  "M44 92 L60 112",
  "M76 92 L60 112",
  // small top facet
  "M48 44 L60 22 L72 44",
].join(" ");

/**
 * The mark reduced to its four load-bearing strokes, for small sizes.
 *
 * `GEM_PATH` carries thirteen sub-paths across a 120×124 field. With
 * `vectorEffect="non-scaling-stroke"` each of those keeps its full device-pixel
 * width no matter how far the artwork is scaled down, so below roughly 28px the
 * facets stop resolving, run together, and the mark fills in as a solid
 * triangle with a notch — which reads as a warning icon sitting next to the
 * company name, not as a gem.
 *
 * This variant is an *open* letterform — two legs, a crossbar, and the apex
 * spine that keeps the gem's facet. The closed base is deliberately dropped:
 * any closed triangle at this size reads as a caution glyph no matter how the
 * interior is drawn, whereas an open A reads as a letter.
 */
export const GEM_PATH_COMPACT = [
  // the two legs
  "M60 12 L18 112",
  "M60 12 L102 112",
  // crossbar
  "M36 84 L84 84",
  // apex spine — the one surviving facet
  "M60 12 L60 84",
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
