"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * PointerTilt — gives a plate the sense of being a physical sheet held at a
 * slight angle to the light.
 *
 * The pointer's position over the element drives a small rotation and a
 * counter-shift on the contents. Everything is sprung, the range is deliberately
 * shallow (a few degrees), and it does nothing at all under reduced motion or
 * on touch, where there is no pointer to follow.
 */
type PointerTiltProps = {
  children: ReactNode;
  /** Maximum rotation in degrees. */
  amount?: number;
  className?: string;
};

const SPRING = { stiffness: 150, damping: 20, mass: 0.6 };

export function PointerTilt({
  children,
  amount = 5,
  className,
}: PointerTiltProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // -0.5 … 0.5 across the element in each axis
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-amount, amount]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [amount, -amount]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={
        reduce
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
