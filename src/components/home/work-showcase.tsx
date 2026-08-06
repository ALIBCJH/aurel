"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * The showcase — the opening plate, cycling through real screens.
 *
 * It was one static screenshot. The screenshots are the strongest asset on the
 * site and six of the seven were sitting unused in `public/work`, so the plate
 * now works through them instead of arguing for one.
 *
 * Every frame is a capture of something live. That is the constraint the rest
 * of this page is built on and it does not relax because the plate moves: no
 * abstract renders, no mockups, no device frames wrapped around a stock photo.
 * The motion is here to keep the eye on the proof, not to replace it.
 *
 * Four things move, and each is doing one job:
 *
 *  1. A crossfade, not a slide. Sliding implies a filmstrip and asks the eye to
 *     track; these are unrelated screens from two different products, so they
 *     dissolve in place and the frame itself never moves.
 *  2. A very slow push in on the live frame — 6% over the whole dwell, which is
 *     below the threshold where it reads as zooming and just stops the image
 *     feeling like a dead rectangle.
 *  3. The caption rises out of a clipped band as it changes, so the words are
 *     visibly attached to the screen behind them.
 *  4. A rail that fills, which is the only honest way to say "this will move
 *     again in a moment" before it does.
 */

export type ShowcaseSlide = {
  src: string;
  alt: string;
  /** What this particular screen is. */
  caption: string;
  client: string;
  href: string;
  /** Live host, e.g. "datani.co.ke" — shown in the frame's address bar. */
  host?: string;
};

/** Dwell per slide. Long enough to actually read the caption and look. */
const DWELL_MS = 5400;
const EASE = [0.22, 1, 0.36, 1] as const;

export function WorkShowcase({ slides }: { slides: ShowcaseSlide[] }) {
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Nothing advances while the plate is off screen. Without this the cycle
  // keeps running the whole way down the page, and a reader who scrolls back up
  // finds it several screens along with no idea it moved — the opening frame is
  // the one chosen to be seen first, and it should still be there.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  /**
   * How far the images are allowed to load ahead.
   *
   * All five mounted at once is five full-width screenshots on first paint,
   * and this studio's own copy promises a page-weight budget on mid-range
   * Android over congested 4G. So the plate mounts the current slide and the
   * one after it, and reaches further only as the reader gets there.
   */
  const [reach, setReach] = useState(1);

  // Progress within the current slide, 0→1. A motion value rather than state:
  // the rail is repainted every frame and React must not re-render for it.
  const progress = useMotionValue(0);

  const running =
    !reduce && playing && !hovered && inView && slides.length > 1;

  function goTo(next: number) {
    progress.set(0);
    setIndex(next);
    setReach((current) => Math.max(current, next + 1));
  }

  useAnimationFrame((_, delta) => {
    if (!running) return;
    const next = progress.get() + delta / DWELL_MS;
    if (next >= 1) goTo((index + 1) % slides.length);
    else progress.set(next);
  });

  const active = slides[index];

  return (
    <figure
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ---- the plate ---- */}
      {/* Browser chrome, and it is not decoration. These are captures of pages
          that are live right now, and the argument of this whole section is
          that you could go and open them. A frame with the real host in it says
          that before the caption gets a chance to, and it turns a floating
          rectangle into a window onto something. The address updates as the
          screens cycle, so it is never showing the wrong site. */}
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-rule bg-paper shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)]">
        <div className="flex items-center gap-3 border-b border-rule px-4 py-3 sm:px-5">
          <span aria-hidden className="flex shrink-0 items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rule-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-rule-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-rule-strong" />
          </span>
          {active.host && (
            <span className="flex min-w-0 flex-1 justify-center">
              <span className="truncate rounded-full bg-field px-3 py-1 font-mono text-[0.8125rem] text-ink-mute">
                {active.host}
              </span>
            </span>
          )}
        </div>

        <div
          // A fixed 16:10 box. Every capture is 2200×1375, but the aspect is
          // pinned here anyway so a future screenshot at another size crops
          // rather than resizing the plate mid-cycle and shunting the page.
          className="relative aspect-[16/10] overflow-hidden bg-paper-deep"
        >
        {slides.map((slide, i) => {
          if (i > reach) return null;
          const isActive = i === index;
          return (
            <Link
              key={slide.src}
              href={slide.href}
              tabIndex={isActive ? undefined : -1}
              aria-hidden={isActive ? undefined : true}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isActive ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <motion.div
                className="h-full w-full"
                animate={{ scale: isActive && !reduce ? 1.06 : 1 }}
                // Only the visible slide takes the long push. The others snap
                // back instantly — mid-crossfade a 5-second reset would be a
                // second, contradictory movement behind the one on top.
                transition={{
                  duration: isActive && !reduce ? DWELL_MS / 1000 : 0,
                  ease: "linear",
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={1440}
                  height={900}
                  sizes="(min-width: 1536px) 88rem, 100vw"
                  priority={i === 0}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </Link>
          );
        })}
        </div>
      </div>

      {/* ---- the caption and the controls ---- */}
      <figcaption className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        {/* Keyed on the index so it re-mounts and replays the rise. */}
        <motion.span
          key={index}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
        >
          <Link
            href={active.href}
            className="tap text-lg font-medium tracking-[-0.02em] transition-opacity duration-200 hover:opacity-70"
          >
            {active.client}
          </Link>
          <span className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-mute">
            {active.caption}
          </span>
        </motion.span>

        <div className="flex shrink-0 items-center gap-4">
          {/* The rail. One segment per screen, and each is the control for it —
              a separate row of dots would say the same thing twice. */}
          {/* A group of buttons, not a tablist. `role="tab"` is a promise that
              the control moves you into a matching `tabpanel`, and there isn't
              one here — the rail swaps an image inside a single region. A tab
              role with nothing to control announces "tab 1 of 5" and then
              strands the reader. */}
          <div
            role="group"
            aria-label="Screens from our work"
            className="flex items-center gap-2"
          >
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-current={i === index}
                aria-label={`${slide.client} — ${slide.caption}`}
                onClick={() => goTo(i)}
                // The hit area is 44px tall and mostly transparent; the rule
                // inside it is 2px. A 2px tap target is not a tap target.
                className="group/rail flex h-11 w-11 items-center justify-center"
              >
                <span className="relative block h-0.5 w-full overflow-hidden rounded-full bg-rule-strong transition-colors duration-200 group-hover/rail:bg-ink-mute">
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 origin-left rounded-full bg-foil"
                    style={{ scaleX: i === index ? progress : 0 }}
                  />
                </span>
              </button>
            ))}
          </div>

          {/* WCAG 2.2.2: anything that moves on its own for more than five
              seconds needs a way to stop it that does not require a pointer.
              Hover-to-pause covers a mouse and nothing else. Hidden entirely
              under reduced motion, where nothing is moving to begin with. */}
          {!reduce && slides.length > 1 && (
            <button
              type="button"
              onClick={() => setPlaying((on) => !on)}
              aria-label={playing ? "Pause the showcase" : "Play the showcase"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-rule text-ink-mute transition-colors duration-200 hover:border-rule-strong hover:text-ink"
            >
              {playing ? <PauseGlyph /> : <PlayGlyph />}
            </button>
          )}

          <Link
            href="/work"
            className="hidden items-center gap-1.5 text-[0.9375rem] text-ink-mute transition-colors duration-200 hover:text-ink lg:inline-flex"
          >
            All work
            <ArrowUpRightIcon width={13} height={13} />
          </Link>
        </div>
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */

function PauseGlyph() {
  return (
    <svg width={11} height={12} viewBox="0 0 11 12" aria-hidden fill="currentColor">
      <rect x="0" y="0" width="3.5" height="12" rx="1" />
      <rect x="7.5" y="0" width="3.5" height="12" rx="1" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width={11} height={12} viewBox="0 0 11 12" aria-hidden fill="currentColor">
      <path d="M1 1.2a1 1 0 0 1 1.5-.87l7 4.8a1 1 0 0 1 0 1.74l-7 4.8A1 1 0 0 1 1 10.8V1.2Z" />
    </svg>
  );
}
