"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Pebble, usePebble } from "@/components/layout/pebble";
import { GemMark } from "@/components/brand/gem-mark";
import { mainNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The masthead.
 *
 * It holds still. That is the entire design, and it is a correction rather than
 * a preference — the previous bar condensed after 24px of scroll from a
 * full-width grid into a centred `max-w-fit` capsule, which meant every label
 * physically slid to a new position as you began to read. Reach for "Work",
 * scroll a pixel, and the target moves out from under you. The wordmark
 * animated to zero width on the way, and the active-page marker had to be
 * re-measured on a timer afterwards because the layout had changed underneath
 * it. None of that was soothing; all of it was the bar reacting to the document
 * instead of to the reader.
 *
 * So: fixed height, fixed positions, always the same. Scrolling fades in a
 * frosted surface behind it — an opacity change on a layer that is already
 * there, so nothing reflows and nothing moves. The only travelling object is
 * the pebble, and it travels because *you* pointed at something.
 *
 * The magnetic call to action is gone too. It leaned toward the cursor as you
 * approached, which is a party trick that makes the one button on the page you
 * most want pressed harder to press.
 *
 * Below `lg` this is a slim brand strip; navigation lives in the ThumbBar at
 * the bottom of the screen, in reach of a thumb.
 */

/** `/` must match exactly, or Home would be active on every page. */
function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Masthead() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 16);
  });

  const activeHref =
    mainNav.find((item) => isActive(pathname, item.href))?.href ?? null;

  const { trackRef, register, pos, size, visible } =
    usePebble<HTMLDivElement>({ activeKey: hovered ?? activeHref });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* The surface. A layer that is always present and only changes opacity,
          so the bar's geometry is identical at every scroll position. */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 border-b border-rule bg-[color:color-mix(in_srgb,var(--paper)_82%,transparent)] backdrop-blur-xl backdrop-saturate-150"
      />

      <Container size="wide" className="relative">
        <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
          {/* the mark */}
          {/* Drawn, not an image file.
              This slot used to render `nexora-logo-foil.png` — the previous
              owner's raster lockup, recoloured to sit on this ground. It is
              gone rather than swapped, because there is no Mojah logo file to
              swap in and continuing to serve somebody else's mark under a new
              name is the one thing a rebrand must not do.
              The vector lockup below has no plate, tints with the palette,
              stays sharp at any density, and adds nothing to the page weight —
              so this is a real mark rather than a placeholder. If artwork is
              commissioned later, see the note in `components/seo/json-ld.tsx`
              for where a logo file needs to go. */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="group/mark -ml-1 flex h-12 shrink-0 items-center gap-2.5 rounded-full px-1"
          >
            <GemMark
              compact
              strokeWidth={1.75}
              className="h-[1.15rem] w-[1.15rem] shrink-0 text-foil transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/mark:rotate-[8deg]"
            />
            {/* The short name. "Mojah Investments" at this tracking overruns a
                390px masthead once the nav is beside it. */}
            <span className="text-lg font-semibold tracking-[-0.02em] sm:text-xl">
              {siteConfig.shortName}
            </span>
          </Link>

          {/* the index */}
          <nav
            aria-label="Main"
            className="hidden lg:block"
            onMouseLeave={() => setHovered(null)}
          >
            <div ref={trackRef} className="relative flex items-center">
              <Pebble
                pos={pos}
                size={size}
                visible={visible}
                className="absolute inset-y-1.5 left-0 -z-10 rounded-full bg-[color:color-mix(in_srgb,var(--foil)_13%,transparent)]"
              />

              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={register(item.href)}
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    onBlur={() => setHovered(null)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex h-12 items-center px-4 text-[0.9375rem] transition-colors duration-300",
                      active ? "font-medium text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>


        </div>
      </Container>
    </header>
  );
}
