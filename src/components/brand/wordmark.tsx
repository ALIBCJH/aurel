import Link from "next/link";
import { GemMark } from "@/components/brand/gem-mark";
import { cn } from "@/lib/utils";

/**
 * Wordmark — AUREL, set in the display serif with the wide letterspacing of a
 * title page, preceded by the faceted mark.
 *
 * `size` controls the whole lockup; the gem scales with the lettering. On hover
 * the letters tighten very slightly and the mark warms to full foil — a small
 * reward that never disturbs the layout.
 */
/**
 * `compact` swaps in the reduced four-stroke mark. Below ~28px the full gem's
 * thirteen facets merge into a filled triangle (see `GemMark`), so the small
 * lockups — which is to say the masthead, the one users actually look at —
 * draw the simplified mark instead.
 */
const sizes = {
  sm: {
    text: "text-base",
    gem: "h-4 w-4",
    gap: "gap-2.5",
    track: "0.3em",
    compact: true,
  },
  md: {
    text: "text-xl",
    gem: "h-[1.15rem] w-[1.15rem]",
    gap: "gap-3",
    track: "0.32em",
    compact: true,
  },
  lg: {
    text: "text-3xl sm:text-4xl",
    gem: "h-7 w-7 sm:h-8 sm:w-8",
    gap: "gap-4",
    track: "0.34em",
    compact: false,
  },
  xl: {
    text: "text-[clamp(2.25rem,9vw,7rem)]",
    gem: "h-[0.7em] w-[0.7em]",
    gap: "gap-[0.28em]",
    track: "0.28em",
    compact: false,
  },
} as const;

type WordmarkProps = {
  size?: keyof typeof sizes;
  className?: string;
  /** Render as a link home. */
  href?: string;
  /** Gold lettering rather than ink. */
  foil?: boolean;
};

export function Wordmark({
  size = "md",
  className,
  href,
  foil = false,
}: WordmarkProps) {
  const s = sizes[size];

  const content = (
    <span className={cn("group/mark inline-flex items-center", s.gap, className)}>
      <GemMark
        compact={s.compact}
        strokeWidth={s.compact ? 1.75 : 1.5}
        className={cn(
          s.gem,
          "shrink-0 text-foil transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/mark:rotate-[8deg]",
        )}
      />
      <span
        className={cn(
          "font-display font-light leading-none",
          s.text,
          foil ? "foil" : "text-ink",
        )}
        style={{ letterSpacing: s.track, paddingLeft: "0.1em" }}
      >
        AUREL
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label="Aurel — home"
      className="tap -ml-1 inline-flex items-center px-1"
    >
      {content}
    </Link>
  );
}
