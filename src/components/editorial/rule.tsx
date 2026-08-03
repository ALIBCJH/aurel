import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Rule — the hairline that does the structural work of the whole layout.
 *
 * Rules separate columns, close sections, and underscore headings. They draw
 * themselves left→right as they enter view, which is the site's quietest and
 * most-used piece of motion.
 */
type RuleProps = {
  /** Gold instead of ink — reserved for section openings. */
  foil?: boolean;
  /** Skip the draw-in animation (for rules that must simply be there). */
  static?: boolean;
  delay?: number;
  className?: string;
};

export function Rule({
  foil = false,
  static: isStatic = false,
  delay = 0,
  className,
}: RuleProps) {
  return (
    <div
      aria-hidden
      data-reveal={isStatic ? undefined : "rule"}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
      className={cn(foil ? "rule-foil-h" : "rule-h", className)}
    />
  );
}

/**
 * FigureRule — a rule interrupted by a small foil lozenge, used to open a
 * section the way a printer's ornament would.
 */
export function FigureRule({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-4", className)}>
      <div data-reveal="rule" className="rule-h flex-1" />
      <span
        data-reveal="fade"
        style={{ "--reveal-delay": "0.35s" } as CSSProperties}
        className="h-1.5 w-1.5 rotate-45 bg-foil"
      />
      <div
        data-reveal="rule"
        style={{ "--reveal-delay": "0.1s" } as CSSProperties}
        className="rule-h flex-1"
      />
    </div>
  );
}

/**
 * Lozenge — the house ornament. A small foil diamond used as a bullet, a
 * separator between running-head items, and a marker beside labels.
 */
export function Lozenge({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block h-1 w-1 rotate-45 bg-foil align-middle", className)}
    />
  );
}
