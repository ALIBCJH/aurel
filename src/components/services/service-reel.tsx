"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

/**
 * ServiceReel — the four disciplines as oversized type, with the work behind them.
 *
 * Running the pointer down the list swaps a real screenshot into the panel on
 * the right. It is the one piece of delight on this page, and it earns its
 * place by doing a job: the visitor sees an actual product for each discipline
 * before reading a word about it.
 *
 * Pointer-driven, so it does nothing on touch — which is correct rather than a
 * compromise. On a phone the list is simply four large tap targets, and the
 * screenshots appear anyway in the detailed sections below. Nothing here is
 * load-bearing for understanding or navigating the page.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

export function ServiceReel() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div
      className="grid gap-10 lg:grid-cols-12 lg:gap-16"
      onMouseLeave={() => setActive(0)}
    >
      {/* ---- the list ---- */}
      <ul className="lg:col-span-7">
        {services.map((service, index) => {
          const isActive = index === active;
          return (
            <li key={service.slug} className="border-t border-rule last:border-b">
              <Link
                href={`/services/${service.slug}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group/row flex items-center gap-5 py-6 sm:gap-8 sm:py-8"
              >
                <span
                  className={cn(
                    "w-8 shrink-0 text-sm tabular-nums transition-colors duration-300",
                    isActive ? "text-ink" : "text-ink-mute",
                  )}
                >
                  {service.index}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]",
                      "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "lg:group-hover/row:translate-x-2",
                    )}
                  >
                    {service.name}
                  </span>
                  <span className="mt-2 block max-w-md text-[0.9375rem] leading-relaxed text-ink-mute">
                    {service.summary}
                  </span>
                </span>

                <span
                  aria-hidden
                  className={cn(
                    "shrink-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                  )}
                >
                  ↗
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ---- the work behind them ---- */}
      <div aria-hidden className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 overflow-hidden rounded-[var(--radius-xl)] bg-paper-deep">
          {/* `contain`, not `cover`: the showcases are deliberately a mix of
              desktop captures (16:10) and phone captures (9:19.5). Cover would
              slice the sides off a website and the top off a phone; contain
              letterboxes both cleanly against the panel, which also makes the
              portrait ones read as a device sitting on a surface. */}
          <div className="relative aspect-[4/3] p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-4"
              >
                <Image
                  src={current.showcase.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 0px"
                  className="rounded-md object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="px-6 py-5 text-sm text-ink-mute">
            <span className="font-medium text-ink">{current.name}</span>
            {" — "}
            {current.headline}
          </p>
        </div>
      </div>
    </div>
  );
}
