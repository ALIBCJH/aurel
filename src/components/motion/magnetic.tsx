"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magnetic — wraps content so it leans toward the pointer with spring physics,
 * then eases back to rest on leave. A hallmark of high-end agency navigation.
 *
 * The pull is applied to an inner wrapper only, so it never disturbs the
 * layout box of an ancestor (important for the nav's measured spotlight).
 * Disabled entirely under `prefers-reduced-motion`.
 */
export function Magnetic({
  children,
  className,
  strength = 0.4,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 260, damping: 18, mass: 0.5 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  function handleMove(e: React.PointerEvent<HTMLSpanElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={reduce ? undefined : { x: sx, y: sy }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.span>
  );
}
