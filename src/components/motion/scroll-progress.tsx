"use client";

import { motion, useScroll } from "framer-motion";

/**
 * A 2px gold scroll-progress bar pinned to the very top of the viewport.
 * Uses raw scroll progress (no spring) so it stays calm and precise.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    />
  );
}
