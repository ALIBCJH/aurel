"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Container } from "@/components/layout/container";
import { GemMark } from "@/components/brand/gem-mark";
import { ThemeToggle } from "@/components/theme/edition-toggle";
import { ArrowUpRightIcon } from "@/components/icons";
import { mainNav, primaryCta, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The masthead.
 *
 * Three things carry it, and each is doing a job rather than decorating:
 *
 *  1. It condenses. At the top of the page the bar spans the full measure and
 *     is transparent, so the page begins at the very top of the viewport with
 *     nothing sitting on it. Once you scroll, it contracts into a floating
 *     glass capsule — smaller, self-contained, and clearly a layer above the
 *     page rather than part of it.
 *
 *  2. A highlight follows the pointer. A rounded field is measured from the
 *     live DOM and sprung between entries, so the nav has a sense of momentum
 *     and always shows where you are. It returns to the current page when the
 *     pointer leaves.
 *
 *  3. The call to action is magnetic. It leans very slightly toward the cursor
 *     as you approach, which makes it feel like the one object on the bar that
 *     wants to be pressed.
 *
 * All of it is pointer-driven and all of it is disabled under reduced motion,
 * where the bar simply sits there and works.
 */
const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { stiffness: 420, damping: 40, mass: 0.7 };

/** `/` must match exactly, or Home would be active on every page. */
function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Masthead() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => {
    setCondensed(value > 24);
  });

  // ---- the travelling highlight -------------------------------------------
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement | null>());
  const [hovered, setHovered] = useState<string | null>(null);
  const settled = useRef(false);

  const x = useSpring(0, SPRING);
  const width = useSpring(0, SPRING);
  const [visible, setVisible] = useState(false);

  const activeHref =
    mainNav.find((item) => isActive(pathname, item.href))?.href ?? null;

  const measure = useCallback(() => {
    const target = hovered ?? activeHref;
    if (!target || !navRef.current) {
      setVisible(false);
      return;
    }
    const node = itemRefs.current.get(target);
    if (!node) {
      setVisible(false);
      return;
    }

    // The first measurement must not fly in from zero.
    if (!settled.current) {
      x.jump(node.offsetLeft);
      width.jump(node.offsetWidth);
      settled.current = true;
    } else {
      x.set(node.offsetLeft);
      width.set(node.offsetWidth);
    }
    setVisible(true);
  }, [activeHref, hovered, width, x]);

  useLayoutEffect(measure, [measure]);

  // The capsule changes the nav's width, so the highlight has to be
  // re-measured after that transition settles or it points at the old layout.
  useEffect(() => {
    const timer = window.setTimeout(measure, 420);
    return () => window.clearTimeout(timer);
  }, [condensed, measure]);

  useEffect(() => {
    const onResize = () => {
      settled.current = false;
      measure();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  // ---- the magnetic call to action ----------------------------------------
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const magnetX = useSpring(0, { stiffness: 260, damping: 22 });
  const magnetY = useSpring(0, { stiffness: 260, damping: 22 });

  function pullCta(event: React.PointerEvent<HTMLAnchorElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const box = ctaRef.current?.getBoundingClientRect();
    if (!box) return;
    // A third of the distance from centre, so it leans rather than lurches.
    magnetX.set((event.clientX - (box.left + box.width / 2)) * 0.32);
    magnetY.set((event.clientY - (box.top + box.height / 2)) * 0.32);
  }

  function releaseCta() {
    magnetX.set(0);
    magnetY.set(0);
  }

  // ---- the full-screen index ----------------------------------------------
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <Container size="wide" className="pointer-events-none">
          <motion.div
            initial={false}
            animate={{
              // Height is animated on the capsule rather than left to the
              // logo's row height. At the full 80px the "pill" is really just
              // a tall bar with rounded ends; contracting to 60 is what makes
              // it read as a discrete floating object.
              height: condensed ? 60 : 80,
              marginTop: condensed ? 12 : 0,
              paddingLeft: condensed ? 16 : 0,
              paddingRight: condensed ? 8 : 0,
              borderRadius: condensed ? 999 : 0,
              backgroundColor: condensed
                ? "color-mix(in srgb, var(--paper) 78%, transparent)"
                : "color-mix(in srgb, var(--paper) 0%, transparent)",
              borderColor: condensed ? "var(--rule)" : "rgba(0,0,0,0)",
              boxShadow: condensed
                ? "0 18px 40px -28px rgb(0 0 0 / 0.35)"
                : "0 0 0 0 rgb(0 0 0 / 0)",
            }}
            transition={{ duration: 0.4, ease: EASE }}
            className={cn(
              "pointer-events-auto mx-auto flex items-center border transition-[backdrop-filter,max-width] duration-500",
              condensed
                ? "max-w-fit gap-2 backdrop-blur-xl backdrop-saturate-150"
                : "max-w-full gap-6",
            )}
          >
            {/* the mark */}
            <Link
              href="/"
              aria-label="Aurel — home"
              className="group/mark flex h-full shrink-0 items-center gap-2.5"
            >
              {/* The mark does not rotate on scroll. It is a letterform, and
                  turning an "A" on its side makes it read as an arrow or a
                  send icon — a moment of delight bought by destroying the one
                  piece of brand recognition in the bar. The capsule morph is
                  the motion here; the mark stays itself. */}
              <GemMark
                compact
                strokeWidth={1.75}
                className="h-[1.05rem] w-[1.05rem] shrink-0 text-foil transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/mark:-translate-y-0.5"
              />
              <motion.span
                initial={false}
                animate={{
                  width: condensed ? 0 : "auto",
                  opacity: condensed ? 0 : 1,
                  marginRight: condensed ? -10 : 0,
                }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden whitespace-nowrap text-lg font-semibold tracking-[-0.02em]"
              >
                Aurel
              </motion.span>
            </Link>

            {/* the index */}
            <nav
              aria-label="Main"
              className={cn("hidden lg:block", !condensed && "ml-auto")}
              onMouseLeave={() => setHovered(null)}
            >
              <div ref={navRef} className="relative flex items-center">
                {/* the travelling highlight */}
                <motion.span
                  aria-hidden
                  style={{ x, width }}
                  animate={{ opacity: visible ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="absolute left-0 top-1/2 -z-10 h-9 -translate-y-1/2 rounded-full bg-field"
                />

                {mainNav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      ref={(node) => {
                        itemRefs.current.set(item.href, node);
                      }}
                      onMouseEnter={() => setHovered(item.href)}
                      onFocus={() => setHovered(item.href)}
                      onBlur={() => setHovered(null)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex h-11 items-center px-4 text-[0.9375rem] font-medium",
                        "transition-opacity duration-200",
                        active ? "opacity-100" : "opacity-60 hover:opacity-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div
              className={cn(
                "flex shrink-0 items-center gap-1.5",
                !condensed && "ml-auto lg:ml-0",
              )}
            >
              <ThemeToggle />

              {/* the magnetic call to action */}
              <motion.span
                style={{ x: magnetX, y: magnetY }}
                className="hidden sm:inline-flex"
              >
                <Link
                  ref={ctaRef}
                  href={primaryCta.href}
                  onPointerMove={pullCta}
                  onPointerLeave={releaseCta}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-contrast px-5 text-[0.9375rem] font-medium text-contrast-ink transition-opacity duration-200 hover:opacity-90"
                >
                  {primaryCta.label}
                  <ArrowUpRightIcon width={14} height={14} />
                </Link>
              </motion.span>

              {/* index trigger — the only route into the nav below lg */}
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="site-index"
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 hover:bg-field lg:hidden"
              >
                <span aria-hidden className="flex flex-col items-end gap-[5px]">
                  <span className="block h-0.5 w-5 rounded-full bg-current" />
                  <span className="block h-0.5 w-3.5 rounded-full bg-current" />
                </span>
              </button>
            </div>
          </motion.div>
        </Container>
      </header>

      {/* ---- the full-screen index ---- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-index"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-paper lg:hidden"
          >
            <Container size="wide">
              <div className="flex h-16 items-center justify-between sm:h-20">
                <span className="text-sm text-ink-mute">Menu</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-2xl transition-colors duration-200 hover:bg-field"
                >
                  <span aria-hidden>×</span>
                </button>
              </div>

              <nav aria-label="Menu" className="pb-[max(2rem,env(safe-area-inset-bottom))] pt-6">
                <ul>
                  {mainNav.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        ease: EASE,
                        delay: 0.04 + index * 0.05,
                      }}
                      className="border-b border-rule"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center justify-between gap-6 py-5"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="text-sm tabular-nums text-ink-mute">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[clamp(2rem,9vw,3rem)] font-semibold tracking-[-0.035em]">
                            {item.label}
                          </span>
                        </span>
                        <ArrowUpRightIcon
                          width={20}
                          height={20}
                          className="shrink-0 text-ink-mute"
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.32 }}
                  className="mt-10"
                >
                  <Link
                    href={primaryCta.href}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-contrast text-base font-medium text-contrast-ink"
                  >
                    {primaryCta.label}
                    <ArrowUpRightIcon width={15} height={15} />
                  </Link>

                  <div className="mt-8 flex flex-col gap-1 text-[0.9375rem] text-ink-mute">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="tap inline-flex py-2 transition-colors hover:text-ink"
                    >
                      {siteConfig.email}
                    </a>
                    <span className="py-1">{siteConfig.location}</span>
                  </div>
                </motion.div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
