import { cn } from "@/lib/utils";
import { GemMark } from "./gem-mark";

/**
 * GemFigure — the large faceted gem, glowing softly against the background.
 * Used as the hero visual and in closing CTAs. Purely decorative.
 */
export function GemFigure({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-square items-center justify-center",
        className,
      )}
    >
      {/* ambient gold glow */}
      <div
        aria-hidden
        className="hero-glow absolute inset-[12%] rounded-full opacity-70 blur-3xl"
      />
      {/* faint concentric ring for depth */}
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full border border-accent/10"
      />
      <GemMark
        strokeWidth={1.5}
        className={cn("relative w-1/2 drop-shadow-[0_0_24px_var(--accent-soft)]", markClassName)}
      />
    </div>
  );
}
