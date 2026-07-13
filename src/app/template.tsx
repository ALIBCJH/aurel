"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Route transition — a subtle cross-fade + tiny rise applied to page content on
 * each navigation (template.tsx re-mounts per route), so moving between pages
 * feels like one continuous app. Nav and footer (in layout) stay fixed.
 *
 * Only opacity/transform animate; disabled under prefers-reduced-motion.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
