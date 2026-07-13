"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * HeadlineReveal — reveals a headline line-by-line with a rising clip mask
 * (not a typewriter). Runs once on mount. Each `lines` entry is one visual
 * line and may contain inline markup (e.g. a gold accent word).
 *
 * Falls back to plain static text under prefers-reduced-motion.
 */
export function HeadlineReveal({
  lines,
  as: Tag = "h1",
  className,
  delay = 0,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2";
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          // pb/-mb pair keeps descenders (g, y, p) from being clipped by the mask
          className="block overflow-hidden pb-[0.12em] -mb-[0.12em]"
        >
          <motion.span
            className="block"
            initial={reduce ? undefined : { y: "115%" }}
            animate={reduce ? undefined : { y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
