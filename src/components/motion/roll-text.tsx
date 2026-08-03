import { cn } from "@/lib/utils";

/**
 * RollText — a two-layer label where, on hover of the nearest `group`, each
 * letter rolls up and a gold duplicate rolls in from below, staggered per
 * character. Pure CSS transitions (no per-frame JS) keep it buttery.
 *
 * The visible base layer inherits the caller's text colour; the incoming
 * layer is gold. Both layers carry the full word so widths stay identical.
 */
const EASE = "cubic-bezier(0.2,0.7,0.2,1)";
const STAGGER = 22; // ms between letters

export function RollText({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const chars = [...label];

  return (
    <span
      aria-hidden
      className={cn("relative inline-flex overflow-hidden align-middle", className)}
    >
      {/* Base layer — rolls up and out on hover */}
      <span className="inline-flex">
        {chars.map((ch, i) => (
          <span
            key={`base-${i}`}
            className="inline-block transition-transform duration-300 will-change-transform group-hover:-translate-y-full"
            style={{ transitionTimingFunction: EASE, transitionDelay: `${i * STAGGER}ms` }}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>

      {/* Incoming gold layer — rolls up into place on hover */}
      <span className="absolute inset-0 inline-flex text-accent">
        {chars.map((ch, i) => (
          <span
            key={`gold-${i}`}
            className="inline-block translate-y-full transition-transform duration-300 will-change-transform group-hover:translate-y-0"
            style={{ transitionTimingFunction: EASE, transitionDelay: `${i * STAGGER}ms` }}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
