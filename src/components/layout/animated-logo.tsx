"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { GEM_PATH } from "@/components/brand/gem-mark";

const EASE = [0.2, 0.7, 0.2, 1] as const;
const WORD = [...siteConfig.name.toUpperCase()];

/**
 * AnimatedLogo — the brand lockup with entrance choreography.
 *
 * On mount the faceted "A" gem draws itself (SVG pathLength) and the wordmark
 * letters rise into place, staggered. On hover the gem lifts and glows, and a
 * diagonal light-sweep passes across it. Reduced-motion renders it static.
 */
export function AnimatedLogo({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group/logo relative inline-flex items-center gap-3 rounded-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className,
      )}
    >
      {/* Gem mark */}
      <span className="relative h-7 w-7 shrink-0">
        {/* Soft glow that blooms on hover */}
        <span className="pointer-events-none absolute -inset-1 rounded-full bg-accent/25 opacity-0 blur-md transition-opacity duration-500 group-hover/logo:opacity-100" />

        <motion.svg
          viewBox="0 0 120 124"
          fill="none"
          aria-hidden
          className="relative h-full w-full text-accent transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/logo:-translate-y-0.5"
        >
          <motion.path
            d={GEM_PATH}
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
            animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.4, ease: EASE, delay: 0.2 },
              opacity: { duration: 0.4, delay: 0.2 },
            }}
          />
        </motion.svg>

        {/* Diagonal light-sweep on hover */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-y-0 -left-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-accent/45 to-transparent blur-[2px] transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/logo:translate-x-[220%]" />
        </span>
      </span>

      {/* Wordmark */}
      <span className="flex text-lg font-light uppercase tracking-[0.34em] text-foreground">
        {WORD.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={reduce ? undefined : { y: 14, opacity: 0 }}
            animate={reduce ? undefined : { y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 + i * 0.06 }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </Link>
  );
}
