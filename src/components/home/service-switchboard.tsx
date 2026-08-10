"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRightIcon } from "@/components/icons";
import { hasPublishedFloor, type Service } from "@/config/services";
import { cn } from "@/lib/utils";

/**
 * The switchboard — the four disciplines as an index you operate.
 *
 * It replaced four stacked full-width panels. Those cost roughly 1,400px of
 * scroll to communicate four words, and the right half of every one of them was
 * a diagonal hatch pattern standing in for artwork we did not have. Meanwhile
 * three genuinely useful things were sitting unused in `services.ts`: a real
 * screen for each discipline, the six concrete deliverables an engagement
 * includes, and a starting price. The whole offer now fits in one screen and
 * says considerably more.
 *
 * It is a tablist, not a list of links, and that is deliberate. The obvious
 * build is "hover a name, swap the panel, click to navigate" — which on a phone
 * means the first tap navigates and the panel is never seen at all. As tabs the
 * interaction is identical on every device: pointing selects, arrow keys
 * select, tapping selects, and the panel carries its own link out.
 *
 * The panel sits beside the index on a wide screen and beneath it on a narrow
 * one — same DOM, same state, one image. An accordion per row would have meant
 * two copies of the detail, and a hidden `<Image>` is still a downloaded image.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

export function ServiceSwitchboard({ services }: { services: Service[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  /**
   * Which screens have been asked for. Only the selected discipline's capture
   * is in the DOM at first paint; every one after that mounts on first visit
   * and then stays, so going back to a discipline is instant and no one pays
   * for four screenshots to read one.
   */
  const [seen, setSeen] = useState<number[]>([0]);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function select(index: number) {
    setActive(index);
    setSeen((current) =>
      current.includes(index) ? current : [...current, index],
    );
  }

  // Automatic activation — moving focus selects. Correct for tabs whose panels
  // are already in the document and cost nothing to show.
  function onKeyDown(event: React.KeyboardEvent) {
    const last = services.length - 1;
    const next = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[event.key];

    if (next === undefined) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  const service = services[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* ---- the index ---- */}
      <div
        role="tablist"
        aria-label="What we do"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="lg:col-span-5"
      >
        {services.map((entry, index) => {
          const isActive = index === active;
          return (
            <button
              key={entry.slug}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`svc-tab-${entry.slug}`}
              aria-controls="svc-panel"
              aria-selected={isActive}
              // Only the selected tab is in the tab sequence; the arrow keys
              // move between them. That is the tablist contract, and it stops
              // a keyboard user having to press Tab four times to leave.
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(index)}
              // Pointing selects, which is what makes it feel live under a
              // mouse. Guarded to mouse: a touch "hover" fires on tap and would
              // double up with the click.
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") select(index);
              }}
              className={cn(
                "group/tab relative flex w-full flex-wrap items-baseline gap-4 border-t border-rule py-6 text-left sm:gap-6 sm:py-7",
                "first:border-t-0 first:pt-0",
              )}
            >
              {/* The marker slides between rows rather than cutting: framer
                  animates it from wherever it currently is, so the eye is
                  carried to the new row instead of being asked to find it. */}
              {isActive && (
                <motion.span
                  aria-hidden
                  layoutId="switchboard-marker"
                  className="absolute -left-4 top-4 bottom-4 w-[2px] rounded-full bg-foil sm:-left-6"
                  transition={
                    reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }
                  }
                />
              )}

              <span
                aria-hidden
                className={cn(
                  "shrink-0 text-label-sm tabular-nums transition-colors duration-300",
                  isActive ? "text-foil" : "text-ink-mute",
                )}
              >
                {entry.index}
              </span>

              <span className="flex-1">
                <span
                  className={cn(
                    "block text-[clamp(1.625rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] transition-colors duration-300",
                    isActive ? "text-ink" : "text-ink-mute group-hover/tab:text-ink",
                  )}
                >
                  {entry.name}
                </span>
                <span
                  className={cn(
                    "mt-2 block text-[0.9375rem] leading-relaxed transition-colors duration-300",
                    isActive ? "text-ink-soft" : "text-ink-mute",
                  )}
                >
                  {entry.summary}
                </span>
              </span>

              {/* "from", spelled out. A bare figure beside a discipline reads
                  as the price rather than the floor, and the difference between
                  those two readings is an angry first meeting. Set in text
                  rather than the mono label style, which at this size turned a
                  commitment into small print. */}
              <span
                // On a phone the figure competes with the name for the same
                // line and forces "AI & automation" to wrap; it drops to its
                // own line below the summary instead, indented to the name's
                // column so the four prices still stack into a readable column.
                className="order-3 w-full shrink-0 whitespace-nowrap pl-9 text-[0.875rem] tabular-nums text-ink-mute sm:order-none sm:w-auto sm:pl-0"
              >
                from{" "}
                <span
                  className={cn(
                    "transition-colors duration-300",
                    isActive ? "text-ink" : "text-ink-mute",
                  )}
                >
                  {entry.pricing.from}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* ---- the panel ---- */}
      <div
        role="tabpanel"
        id="svc-panel"
        aria-labelledby={`svc-tab-${service.slug}`}
        className="lg:col-span-7"
      >
        {/* The plate is a fixed box and the captures cross-fade inside it, so
            switching disciplines never changes the height of the section. */}
        <div
          className={cn(
            "relative overflow-hidden rounded-[var(--radius-card)] bg-paper-deep",
            "aspect-[4/3] sm:aspect-[16/10]",
          )}
        >
          {services.map((entry, index) => {
            if (!seen.includes(index)) return null;
            const isActive = index === active;
            return (
              <div
                key={entry.slug}
                aria-hidden={!isActive}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive ? "opacity-100" : "opacity-0",
                  // The phone captures are portrait. They sit centred and whole
                  // on the plate instead of being cropped to a strip.
                  entry.showcase.portrait &&
                    "flex items-center justify-center p-5 sm:p-6",
                )}
              >
                {/* A portrait capture leaves most of a 16:10 plate empty. One
                    warm bloom behind it turns that space into a lit stage
                    rather than a gap where a wider screenshot should have
                    been. */}
                {entry.showcase.portrait && (
                  <span
                    aria-hidden
                    className="band-bloom absolute left-1/2 top-1/2 h-[85%] w-[60%] -translate-x-1/2 -translate-y-1/2 opacity-70"
                  />
                )}
                <Image
                  src={entry.showcase.src}
                  alt={entry.showcase.alt}
                  width={entry.showcase.portrait ? 780 : 1440}
                  height={entry.showcase.portrait ? 1688 : 900}
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className={cn(
                    entry.showcase.portrait
                      ? "relative h-full w-auto rounded-[var(--radius-lg)] object-contain shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)]"
                      : "h-full w-full object-cover",
                  )}
                />
              </div>
            );
          })}
        </div>

        {/* Keyed on the discipline so the copy re-mounts and replays its rise —
            the same movement the opening showcase uses when its caption
            changes, because they are the same gesture doing the same job. */}
        <motion.div
          key={service.slug}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-7"
        >
          <h3 className="text-[clamp(1.375rem,2.2vw,1.75rem)] font-semibold tracking-[-0.03em]">
            {service.headline}
          </h3>

          <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
            {service.includes.map((item) => (
              <li
                key={item}
                className="rounded-full border border-rule px-3.5 py-1.5 text-[0.875rem] text-ink-soft"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-rule pt-6">
            <p className="text-[0.9375rem] text-ink-mute">
              {/* "from", and a plain word about what that means. A bare number
                  on a studio page invites the reading that it is the price;
                  the honest version costs one short sentence. */}
              {hasPublishedFloor(service) && "From "}
              <span className="font-medium text-ink">{service.pricing.from}</span>
              {hasPublishedFloor(service) && (
                <span className="mt-0.5 block text-[0.8125rem]">
                  This is a starting price. We agree the real one after we talk.
                </span>
              )}
            </p>

            <Link
              href={`/services/${service.slug}`}
              className="tap inline-flex items-center gap-2 text-[0.9375rem] font-medium transition-opacity duration-200 hover:opacity-70"
            >
              Explore {service.name.toLowerCase()}
              <ArrowUpRightIcon width={14} height={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
