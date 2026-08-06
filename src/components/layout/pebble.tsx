"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";

/**
 * The pebble — a soft marker that glides to whatever is current.
 *
 * The whole navigation rests on one idea: the bar itself never moves, so the
 * only thing in it that is allowed to move is this. It is the difference
 * between a page that reacts to you and a page that rearranges itself around
 * you, and it is why the old capsule felt unsettled — it moved on scroll, which
 * is something you do to the document, not to the navigation.
 *
 * The motion is squash-and-stretch, borrowed from animation rather than from
 * interfaces: the pebble stretches along its direction of travel and thins
 * slightly as it goes, then settles. That is what makes it read as a drop of
 * something warm rather than a rectangle being repositioned, and it costs two
 * transforms driven off the spring's own velocity — no timers, no extra state,
 * no re-render per frame.
 *
 * It measures the live DOM instead of being told where to sit, so it stays
 * correct through font loading, resizes, and copy changes.
 */
const SPRING = { stiffness: 420, damping: 38, mass: 0.9 };

export type PebbleAxis = "horizontal" | "vertical";

export function usePebble<T extends HTMLElement>({
  activeKey,
  axis = "horizontal",
}: {
  /** Key of the item the pebble should rest on, or null to hide it. */
  activeKey: string | null;
  axis?: PebbleAxis;
}) {
  const trackRef = useRef<T>(null);
  const itemRefs = useRef(new Map<string, HTMLElement | null>());
  const settled = useRef(false);
  const [visible, setVisible] = useState(false);

  const pos = useSpring(0, SPRING);
  const size = useSpring(0, SPRING);

  const measure = useCallback(() => {
    const node = activeKey ? itemRefs.current.get(activeKey) : null;
    if (!node || !trackRef.current) {
      setVisible(false);
      return;
    }

    const next =
      axis === "horizontal"
        ? { p: node.offsetLeft, s: node.offsetWidth }
        : { p: node.offsetTop, s: node.offsetHeight };

    // The first measurement must land, not fly in from the origin.
    if (!settled.current) {
      pos.jump(next.p);
      size.jump(next.s);
      settled.current = true;
    } else {
      pos.set(next.p);
      size.set(next.s);
    }
    setVisible(true);
  }, [activeKey, axis, pos, size]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    // Fonts land after first paint and change every label's width, so a pebble
    // measured before they arrive sits slightly wrong until something else
    // forces a re-measure.
    document.fonts?.ready.then(measure).catch(() => {});

    const onResize = () => {
      settled.current = false;
      measure();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  const register = useCallback(
    (key: string) => (node: HTMLElement | null) => {
      itemRefs.current.set(key, node);
    },
    [],
  );

  return { trackRef, register, pos, size, visible, measure };
}

export function Pebble({
  pos,
  size,
  visible,
  axis = "horizontal",
  className,
}: {
  pos: ReturnType<typeof useSpring>;
  size: ReturnType<typeof useSpring>;
  visible: boolean;
  axis?: PebbleAxis;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const velocity = useVelocity(pos);

  // Stretch along the direction of travel, thin across it. The range is the
  // spring's realistic top speed; past it the effect just holds rather than
  // turning the pebble into a smear.
  const along = useTransform(velocity, [-2600, 0, 2600], [1.14, 1, 1.14], {
    clamp: true,
  });
  const across = useTransform(velocity, [-2600, 0, 2600], [0.9, 1, 0.9], {
    clamp: true,
  });

  const dynamic = reduce
    ? {}
    : axis === "horizontal"
      ? { scaleX: along, scaleY: across }
      : { scaleY: along, scaleX: across };

  return (
    <motion.span
      aria-hidden
      style={
        axis === "horizontal"
          ? { x: pos, width: size, ...dynamic }
          : { y: pos, height: size, ...dynamic }
      }
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={className}
    />
  );
}
