"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GEM_PATH } from "./gem-mark";

/**
 * AnimatedGem — the signature gem motion.
 *
 * On mount the facets draw themselves (SVG pathLength), then a slow diagonal
 * light-sweep shimmers across every ~5s. Under prefers-reduced-motion it
 * renders as a plain static gem with no draw or shimmer.
 *
 * Size via `className` (defaults to full width of its box).
 */
export function AnimatedGem({
  className,
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 120 124"
        fill="none"
        aria-hidden
        className="w-full text-accent"
      >
        <motion.path
          d={GEM_PATH}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
          animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 1.6, ease: [0.2, 0.7, 0.2, 1] },
            opacity: { duration: 0.4 },
          }}
        />
      </svg>

      {/* light-sweep shimmer */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-gem-shimmer absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-md" />
        </div>
      )}
    </div>
  );
}
