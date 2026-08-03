"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ReadingProgress — a foil hairline across the very top of the sheet that fills
 * as the reader works down the page. The publication's equivalent of a thumb
 * moving down the edge of a book.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-foil"
    />
  );
}
