import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Marquee — the contents ticker.
 *
 * A calm, infinite horizontal band of the studio's capabilities, set in mono
 * capitals and separated by the house lozenge, like a strip of running text
 * across the head of a page. Two identical tracks translate by -50% for a
 * seamless loop (pure CSS). Pauses on hover, fades at both edges, and freezes
 * under prefers-reduced-motion via the global rule.
 */
type MarqueeProps = {
  items: string[];
  /** Full loop duration; larger = slower. */
  duration?: string;
  /** Travel right-to-left (default) or the reverse. */
  reverse?: boolean;
  className?: string;
};

function Track({ items, ariaHidden }: { items: string[]; ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="text-label flex items-center whitespace-nowrap text-ink-soft"
        >
          {item}
          <span
            aria-hidden
            className="mx-7 h-1 w-1 rotate-45 bg-foil/70 sm:mx-9"
          />
        </span>
      ))}
    </div>
  );
}

export function Marquee({
  items,
  duration = "58s",
  reverse = false,
  className,
}: MarqueeProps) {
  return (
    <div className={cn("group marquee-mask relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        <Track items={items} />
        <Track items={items} ariaHidden />
      </div>
    </div>
  );
}
