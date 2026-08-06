"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { mainNav, primaryCta, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { AnimatedLogo } from "@/components/layout/animated-logo";
import { Magnetic } from "@/components/motion/magnetic";
import { RollText } from "@/components/motion/roll-text";

const EASE = [0.2, 0.7, 0.2, 1] as const;

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useActiveIndex() {
  const pathname = usePathname();
  return mainNav.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  );
}

/** Shared glass-pill surface for every island. */
function islandSurface(scrolled: boolean) {
  return cn(
    "rounded-full border ring-1 ring-inset ring-foreground/[0.03] backdrop-blur-xl",
    "transition-[background-color,border-color,box-shadow,padding] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
    scrolled
      ? "border-border/80 bg-background/80 shadow-lg shadow-black/30"
      : "border-border/50 bg-surface/40 shadow-md shadow-black/10",
  );
}

/**
 * Island — a single floating glass element with entrance choreography,
 * pointer parallax, and gentle idle levitation.
 *
 * Layering keeps transforms from colliding:
 *   positioner (CSS place)  →  motion (entrance opacity/scale + parallax x/y)
 *   →  .island-float (CSS bob)  →  content
 */
function Island({
  children,
  className,
  parallaxX,
  parallaxY,
  delay,
  floatDuration,
  floatDelay,
  docked,
  reduce,
}: {
  children: ReactNode;
  className?: string;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  delay: number;
  floatDuration: string;
  floatDelay: string;
  docked: boolean;
  reduce: boolean | null;
}) {
  return (
    <div className={cn("absolute top-1/2 -translate-y-1/2", className)}>
      <motion.div
        style={reduce ? undefined : { x: parallaxX, y: parallaxY }}
        initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: EASE, delay }}
      >
        <div
          className={cn(!reduce && !docked && "island-float")}
          style={
            { "--float-duration": floatDuration, "--float-delay": floatDelay } as React.CSSProperties
          }
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const activeIndex = useActiveIndex();
  const docked = scrolled || menuOpen;

  // ---- Pointer parallax shared across the three islands --------------------
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pcfg = { stiffness: 140, damping: 20, mass: 0.6 };
  const spX = useSpring(pointerX, pcfg);
  const spY = useSpring(pointerY, pcfg);

  const logoX = useTransform(spX, (v) => v * -14);
  const logoY = useTransform(spY, (v) => v * -7);
  const navX = useTransform(spX, (v) => v * 8);
  const navY = useTransform(spY, (v) => v * 5);
  const ctaX = useTransform(spX, (v) => v * 16);
  const ctaY = useTransform(spY, (v) => v * 8);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      pointerX.set((e.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, pointerX, pointerY]);

  // ---- Center island: morphing gold spotlight ------------------------------
  const listRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const measuredOnce = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const w = useMotionValue(0);
  const h = useMotionValue(0);
  const o = useMotionValue(0);
  const spring = { stiffness: 500, damping: 45, mass: 0.6 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const sw = useSpring(w, spring);
  const sh = useSpring(h, spring);
  const so = useSpring(o, { stiffness: 300, damping: 40 });

  const measure = useCallback(() => {
    const idx = hovered ?? activeIndex;
    const el = idx >= 0 ? linkRefs.current[idx] : null;
    if (!el || !listRef.current) {
      o.set(0);
      return;
    }
    const left = el.offsetLeft;
    const top = el.offsetTop;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    if (!measuredOnce.current) {
      sx.jump(left);
      sy.jump(top);
      sw.jump(width);
      sh.jump(height);
      measuredOnce.current = true;
    }
    x.set(left);
    y.set(top);
    w.set(width);
    h.set(height);
    o.set(1);
  }, [hovered, activeIndex, x, y, w, h, o, sx, sy, sw, sh]);

  useIsoLayoutEffect(() => {
    measure();
  }, [measure, scrolled]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(list);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // ---- Center island: pointer-tracked light through the glass --------------
  const glowX = useMotionValue(-200);
  const glowY = useMotionValue(-200);
  const glow = useMotionTemplate`radial-gradient(150px circle at ${glowX}px ${glowY}px, color-mix(in srgb, var(--accent) 20%, transparent), transparent 68%)`;
  function handleGlow(e: React.PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
      <div
        className={cn(
          "relative mx-auto h-14 transition-[max-width] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
          docked ? "max-w-5xl" : "max-w-6xl",
        )}
      >
        {/* ---------- LOGO ISLAND (left) ---------- */}
        <Island
          className="left-0"
          parallaxX={logoX}
          parallaxY={logoY}
          delay={0.1}
          floatDuration="7s"
          floatDelay="0s"
          docked={docked}
          reduce={reduce}
        >
          <div
            className={cn(
              islandSurface(scrolled),
              "flex items-center px-5",
              scrolled ? "py-2" : "py-2.5",
            )}
          >
            <AnimatedLogo />
          </div>
        </Island>

        {/* ---------- CENTER NAV ISLAND (desktop) ---------- */}
        <Island
          className="left-1/2 hidden -translate-x-1/2 lg:block"
          parallaxX={navX}
          parallaxY={navY}
          delay={0.2}
          floatDuration="8.5s"
          floatDelay="-2s"
          docked={docked}
          reduce={reduce}
        >
          <div
            onPointerMove={handleGlow}
            className={cn(
              "group/nav relative flex items-center overflow-hidden",
              islandSurface(scrolled),
              scrolled ? "px-1.5 py-1.5" : "px-2 py-2",
            )}
          >
            {/* rotating gold ring — ignites on scroll or hover */}
            <div
              aria-hidden
              className={cn(
                "nav-ring pointer-events-none absolute inset-0 z-10 rounded-full transition-opacity duration-700",
                scrolled ? "opacity-100" : "opacity-0 group-hover/nav:opacity-100",
              )}
            />
            {/* pointer-tracked light */}
            <motion.span
              aria-hidden
              style={{ background: glow }}
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/nav:opacity-100"
            />

            <div
              ref={listRef}
              className="relative z-0 flex items-center gap-1"
              onPointerLeave={() => setHovered(null)}
            >
              {/* morphing spotlight */}
              <motion.span
                aria-hidden
                style={{ x: sx, y: sy, width: sw, height: sh, opacity: so }}
                className="pointer-events-none absolute left-0 top-0 rounded-full bg-accent-soft ring-1 ring-inset ring-accent/25"
              />

              {mainNav.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    onPointerEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "group relative z-10 rounded-full px-4 py-2 text-sm transition-colors duration-200",
                      isActive
                        ? "text-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    <RollText label={item.label} />
                  </Link>
                );
              })}
            </div>
          </div>
        </Island>

        {/* ---------- ACTIONS ISLAND (right) ---------- */}
        <Island
          className="right-0"
          parallaxX={ctaX}
          parallaxY={ctaY}
          delay={0.3}
          floatDuration="7.5s"
          floatDelay="-4s"
          docked={docked}
          reduce={reduce}
        >
          <div
            className={cn(
              islandSurface(scrolled),
              "flex items-center gap-1.5 pl-2 pr-2",
              scrolled ? "py-1.5" : "py-2",
            )}
          >

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Magnetic strength={0.25}>
                <Button href={primaryCta.href} size="sm">
                  {primaryCta.label}
                </Button>
              </Magnetic>
            </div>

            {/* Mobile menu toggle */}
            <div className="lg:hidden">
              <MenuToggle
                open={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              />
            </div>
          </div>
        </Island>

        {/* ---------- MOBILE MENU ---------- */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.32, ease: EASE }}
              style={{ transformOrigin: "top" }}
              className="absolute inset-x-0 top-full z-40 mt-3 overflow-hidden rounded-3xl border border-border bg-background/90 p-3 shadow-xl shadow-black/30 backdrop-blur-xl lg:hidden"
            >
              <div
                aria-hidden
                className="hero-glow pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-60"
              />
              <ul className="relative flex flex-col">
                {mainNav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.4,
                      ease: EASE,
                      delay: 0.06 + index * 0.06,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "group flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg transition-colors",
                        index === activeIndex
                          ? "bg-foreground/[0.04] text-accent"
                          : "text-foreground hover:bg-foreground/[0.04]",
                      )}
                    >
                      <span className="transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-1">
                        {item.label}
                      </span>
                      <span className="text-eyebrow text-muted transition-colors group-hover:text-accent">
                        0{index + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE,
                  delay: 0.06 + mainNav.length * 0.06,
                }}
                className="relative mt-2 px-1 pb-1"
              >
                <Button
                  href={primaryCta.href}
                  size="lg"
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  {primaryCta.label}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="sr-only">{siteConfig.name} primary navigation</span>
    </header>
  );
}

/** Morphing hamburger → X toggle (three lines that fold into a cross). */
function MenuToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  const line = "absolute left-0 h-0.5 w-5 rounded-full bg-current";
  const transition = { duration: 0.3, ease: EASE };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.06]"
    >
      <span className="relative block h-3.5 w-5">
        <motion.span
          className={cn(line, "top-0")}
          animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
          transition={transition}
          style={{ transformOrigin: "center" }}
        />
        <motion.span
          className={cn(line, "top-[6px]")}
          animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2, ease: EASE }}
        />
        <motion.span
          className={cn(line, "bottom-0")}
          animate={open ? { bottom: 6, rotate: -45 } : { bottom: 0, rotate: 0 }}
          transition={transition}
          style={{ transformOrigin: "center" }}
        />
      </span>
    </button>
  );
}
