import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Marquee — a calm, infinite horizontal ticker.
 *
 * Renders two identical tracks and translates by -50% for a seamless loop
 * (pure CSS). Pauses on hover, fades at both edges, and freezes for users who
 * prefer reduced motion (handled by the global reduced-motion rule).
 */
type MarqueeProps = {
  items: string[];
  /** Full loop duration; larger = slower. */
  duration?: string;
  className?: string;
};

function Track({ items, ariaHidden }: { items: string[]; ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center"
    >
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="flex items-center font-display text-lg text-muted sm:text-xl"
        >
          {item}
          {/* gold diamond separator (consistent spacing across the loop seam) */}
          <span className="mx-8 h-1.5 w-1.5 rotate-45 rounded-[1px] bg-accent/70 sm:mx-10" />
        </span>
      ))}
    </div>
  );
}

export function Marquee({ items, duration = "44s", className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group marquee-mask relative flex overflow-hidden",
        className,
      )}
    >
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        <Track items={items} />
        <Track items={items} ariaHidden />
      </div>
    </div>
  );
}
