"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Engraving } from "@/components/editorial/engraving";
import { ArrowUpRightIcon } from "@/components/icons";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

/**
 * ServiceIndex — the table of capabilities, set as an index rather than a grid
 * of cards.
 *
 * Each line is a ruled entry: number, name, and one-line summary. Running the
 * pointer down the index lifts the corresponding plate out of the margin and
 * carries it alongside the cursor, so browsing the list feels like leafing
 * through the figures. Touch and reduced-motion visitors get the index alone,
 * which loses nothing but the flourish.
 */
const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { stiffness: 260, damping: 30, mass: 0.6 };

export function ServiceIndex() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, SPRING);
  const y = useSpring(pointerY, SPRING);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return;
    pointerX.set(event.clientX - box.left);
    pointerY.set(event.clientY - box.top);
  }

  function enter(index: number, event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || reduce) return;
    // Seat the plate under the cursor before it appears, so it fades in
    // in place instead of sliding across the section.
    const box = containerRef.current?.getBoundingClientRect();
    if (box) {
      x.jump(event.clientX - box.left);
      y.jump(event.clientY - box.top);
    }
    setActive(index);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setActive(null)}
      className="relative"
    >
      <ul className="relative">
        {services.map((service, index) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              onPointerEnter={(event) => enter(index, event)}
              className="group/entry relative block border-t border-rule"
            >
              {/* the warm field that fills the row */}
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-field transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/entry:origin-top group-hover/entry:scale-y-100"
              />
              {/* the foil rule that draws along the top of the active row */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-right scale-x-0 bg-foil transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/entry:origin-left group-hover/entry:scale-x-100"
              />

              <div className="relative grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-5 gap-y-2 px-1 py-6 sm:py-7 lg:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1fr)_2rem] lg:gap-x-8">
                <span
                  className={cn(
                    "text-label-sm text-ink-mute/70 transition-colors duration-500",
                    "group-hover/entry:text-foil",
                  )}
                >
                  {service.index}
                </span>

                <h3 className="font-display text-[1.6rem] font-light leading-none tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/entry:translate-x-1.5 sm:text-[2rem] lg:text-[2.25rem]">
                  {service.name}
                </h3>

                <p className="col-span-2 col-start-2 text-sm leading-relaxed text-ink-mute lg:col-span-1 lg:col-start-3 lg:pt-1 lg:text-[0.9375rem]">
                  {service.summary}
                </p>

                <span className="col-start-3 row-start-1 justify-self-end text-ink-mute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/entry:-translate-y-0.5 group-hover/entry:translate-x-0.5 group-hover/entry:text-foil lg:col-start-4">
                  <ArrowUpRightIcon width={16} height={16} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="border-t border-rule" />

      {/* ---- the plate carried alongside the cursor ---- */}
      <AnimatePresence>
        {active !== null && !reduce && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ x, y }}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
          >
            <div className="sheet relative -translate-y-1/2 translate-x-10 overflow-hidden border border-rule-foil">
              <div className="relative h-[15rem] w-[12rem]">
                <div aria-hidden className="plate-grid absolute inset-0 opacity-50" />
                <div aria-hidden className="hatch absolute inset-0 opacity-40" />
                {/* Keyed so each entry redraws its own engraving from scratch. */}
                <Engraving key={active} variant={active} className="is-in" />
                <span className="text-label-sm absolute bottom-2.5 left-3 text-ink-mute">
                  Fig. {services[active].index}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
