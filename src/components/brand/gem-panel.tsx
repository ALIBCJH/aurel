import { cn } from "@/lib/utils";
import { GemMark } from "./gem-mark";

/**
 * GemPanel — an abstract cut-crystal / gold-texture panel.
 *
 * A deliberately non-photographic visual: dot texture, a soft gold glow, fine
 * facet lines, and the faceted gem. Used as the "visual" side of service
 * blocks and inside device mockups. `index` deterministically varies the
 * facet rotation so repeated panels feel distinct (SSR-safe, no randomness).
 */
export function GemPanel({
  className,
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  const rotation = (index * 23) % 360;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-surface",
        className,
      )}
    >
      <div className="hero-dots absolute inset-0 opacity-40" />
      <div className="hero-glow absolute -right-1/5 -top-1/4 h-2/3 w-2/3 rounded-full opacity-70 blur-2xl" />

      {/* abstract facet lines */}
      <svg
        viewBox="0 0 400 320"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-accent/20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden
        style={{ transform: `rotate(${rotation}deg) scale(1.4)` }}
      >
        <path d="M-40 240 L200 40 L440 240" />
        <path d="M-40 300 L200 100 L440 300" />
        <path d="M200 40 L200 320" />
        <path d="M60 320 L200 100 L340 320" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <GemMark
          strokeWidth={1.25}
          className="w-1/3 text-accent/45 drop-shadow-[0_0_20px_var(--accent-soft)]"
        />
      </div>

      {/* soft vignette into the panel edges */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-border/60" />
    </div>
  );
}
