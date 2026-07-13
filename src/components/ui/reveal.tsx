"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal — the reusable entrance animation used across pages.
 *
 * A restrained fade-and-rise that plays once when the element scrolls into
 * view. `delay` enables simple staggering between sibling elements. This keeps
 * page-level motion consistent and intentional rather than ad hoc.
 */
type RevealProps = {
  children: ReactNode;
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section";
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = "div",
}: RevealProps) {
  // Cast to a single motion component type to keep prop inference simple.
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
