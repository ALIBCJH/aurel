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

type GemMarkProps = {
  className?: string;
  strokeWidth?: number;
  /** Provide an accessible label; otherwise the mark is decorative. */
  title?: string;
};

export function GemMark({ className, strokeWidth = 2, title }: GemMarkProps) {
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
        d={GEM_PATH}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
