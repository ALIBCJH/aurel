"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ServiceIcon } from "@/components/brand/service-icons";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

/**
 * ServiceReel — the index of disciplines, with a specimen card beside it.
 *
 * Running the pointer down the list used to swap a screenshot into the panel
 * on the right, on the theory that a visitor should see an actual product for
 * each discipline before reading a word about it. The theory was sound and the
 * pictures did not support it: Google Maps & Business Presence was illustrated
 * by a photograph of an interior-design showroom, Mobile Applications by a
 * *website* viewed on a phone, SEO by an insurance company's article page.
 * There is no capture of a map listing or a native app anywhere in the
 * repository, so the panel was showing whichever screenshot happened to be
 * attached rather than anything about the discipline named next to it.
 *
 * A picture that does not illustrate its caption is worse than no picture: it
 * spends the largest element on the row teaching the reader that the page is
 * decorative.
 *
 * So the panel now carries the specification instead — the outcome sentence,
 * everything an engagement includes, the price floor and the number of stages.
 * All of it already written, all of it specific to the discipline under the
 * cursor, and none of it able to drift out of agreement with the heading the
 * way an arbitrary screenshot did. The delight survives; it is now attached to
 * information.
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
      {/* ---- the index ---- */}
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
                    isActive ? "text-foil" : "text-ink-mute",
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
                    isActive
                      ? "translate-x-0 text-foil opacity-100"
                      : "-translate-x-2 opacity-0",
                  )}
                >
                  ↗
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ---- the specimen card ----
          `aria-hidden`: every word in here is already on the row it describes
          or on the discipline's own page, so to a screen reader this is a
          duplicate index read twice. It is a pointer affordance. */}
      <div aria-hidden className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 overflow-hidden rounded-[var(--radius-xl)] border border-rule bg-paper-deep">
          <div className="relative p-8">
            <div className="plate-grid absolute inset-0 opacity-40" />

            {/* Register ticks — the same marks the figures elsewhere carry. */}
            <span className="absolute left-4 top-4 h-3 w-px bg-rule-strong" />
            <span className="absolute left-4 top-4 h-px w-3 bg-rule-strong" />
            <span className="absolute bottom-4 right-4 h-3 w-px bg-rule-strong" />
            <span className="absolute bottom-4 right-4 h-px w-3 bg-rule-strong" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.38, ease: EASE }}
                className="relative"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="font-display text-[4.5rem] font-light leading-none tracking-[0.02em] text-foil/70">
                    {current.index}
                  </span>
                  <ServiceIcon
                    slug={current.slug}
                    width={30}
                    height={30}
                    className="mt-2 shrink-0 text-foil"
                  />
                </div>

                <p className="mt-7 text-[1.375rem] font-semibold leading-[1.2] tracking-[-0.03em]">
                  {current.headline}
                </p>

                <div className="mt-7 h-px w-full bg-[color:var(--rule-foil)]" />

                <p className="mt-6 text-label-sm text-ink-mute">
                  Every engagement includes
                </p>
                <ul className="mt-4 space-y-2.5">
                  {current.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-[0.9375rem] leading-snug text-ink-soft"
                    >
                      <span className="mt-[0.4em] h-1 w-1 shrink-0 rotate-45 bg-foil" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-baseline justify-between gap-4 border-t border-rule px-8 py-5">
            <span className="text-[0.9375rem]">
              <span className="text-ink-mute">From </span>
              <span className="font-medium">{current.pricing.from}</span>
            </span>
            <span className="text-label-sm text-ink-mute">
              {current.process.length} stages
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
