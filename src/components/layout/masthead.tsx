"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Pebble, usePebble } from "@/components/layout/pebble";
import Image from "next/image";
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
          <Link
            href="/"
            aria-label="Nexora — home"
            className="group/mark -ml-1 flex h-12 shrink-0 items-center gap-2.5 rounded-full px-1"
          >
            {/* The delivered lockup, in its foil edition — this ground only.
                The supplied file has a near-black wordmark on a white plate,
                which is invisible here; `nexora-logo-reversed.png` keys the
                plate out and lifts the wordmark to warm white.
                `nexora-logo-foil.png` goes one step further and remaps the N
                mark's blue-violet gradient onto the palette's gold, keeping
                the gradient's own light-to-dark structure. The mark was the
                only cool colour anywhere on a site that is otherwise gold end
                to end, and it read as an asset from another brand.

                This is a screen edition, not a new identity:
                `public/companylogo.png` remains the master and is what the
                structured data still points at, so search results, social
                cards and anything printed keep the delivered colours. If the
                artwork changes, regenerate both derivatives from the master
                rather than editing either by hand. */}
            <Image
              src="/images/nexora-logo-foil.png"
              alt={`${siteConfig.name} — home`}
              width={1171}
              height={225}
              priority
              // Without a `sizes` hint next/image emits the full device
              // srcset and the browser picks w=3840 — a 3.3x upscale of a
              // 1171px source that the optimiser stalls on, leaving the
              // masthead with no logo at all. The lockup renders ~117px wide,
              // so 160px covers it at 2x on the widest breakpoint.
              sizes="160px"
              className="h-5 w-auto shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/mark:-translate-y-0.5 sm:h-[1.4rem]"
            />
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
