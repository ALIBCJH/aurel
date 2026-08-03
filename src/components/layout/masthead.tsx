"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Wordmark } from "@/components/brand/wordmark";
import { ThemeToggle } from "@/components/theme/edition-toggle";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/icons";
import { mainNav, primaryCta, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The top bar.
 *
 * Replaces the previous editorial masthead — a two-strip affair with a folio
 * line, Roman numerals, an "edition" switch, and a sliding gold marker. All of
 * that was arguing that this is a printed annual. It is a software studio, and
 * the bar should say the name, offer the four destinations, and get out of the
 * way so the work can be the loudest thing on screen.
 *
 * One row, one rule. It only earns a background once you have scrolled past the
 * hero, so at rest the page starts at the very top of the viewport with nothing
 * sitting on it.
 */
const EASE = [0.2, 0.7, 0.2, 1] as const;

export function Masthead() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 16);
  });

  // Close on navigation. Adjusted during render rather than in an effect, which
  // would paint the overlay once over the new page before tearing it down.
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
        <motion.div
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? "color-mix(in srgb, var(--paper) 72%, transparent)"
              : "color-mix(in srgb, var(--paper) 0%, transparent)",
            borderBottomColor: scrolled ? "var(--rule)" : "transparent",
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className={cn(
            "border-b transition-[backdrop-filter] duration-300",
            scrolled && "backdrop-blur-xl backdrop-saturate-150",
          )}
        >
          <Container size="wide">
            <div className="flex h-16 items-center gap-6 sm:h-20 lg:gap-10">
              <Wordmark href="/" size="sm" />

              {/* Nav sits right of centre, next to the CTA, rather than being
                  centred in its own island — the reference keeps the whole
                  right side as one cluster so the left is purely the mark. */}
              <nav
                aria-label="Main"
                className="ml-auto hidden items-center gap-7 lg:flex"
              >
                {mainNav.map((item) => {
                  const active =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "text-[0.9375rem] font-medium transition-opacity duration-200",
                        active ? "text-ink" : "text-ink opacity-60 hover:opacity-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-0">
                <ThemeToggle />

                <span className="hidden sm:inline-flex">
                  <Button href={primaryCta.href} size="sm" variant="primary">
                    {primaryCta.label}
                    <ArrowUpRightIcon width={13} height={13} />
                  </Button>
                </span>

                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors duration-200 hover:bg-field lg:hidden"
                >
                  <span className="relative flex h-3.5 w-5 flex-col justify-between">
                    <motion.span
                      animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="h-0.5 w-full rounded-full bg-current"
                    />
                    <motion.span
                      animate={{ opacity: menuOpen ? 0 : 1 }}
                      transition={{ duration: 0.15 }}
                      className="h-0.5 w-full rounded-full bg-current"
                    />
                    <motion.span
                      animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="h-0.5 w-full rounded-full bg-current"
                    />
                  </span>
                </button>
              </div>
            </div>
          </Container>
        </motion.div>
      </header>

      {/* ---- mobile menu ---- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-paper lg:hidden"
          >
            <div className="flex min-h-full flex-col justify-between px-6 pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8">
              <nav aria-label="Menu">
                <ul>
                  {mainNav.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.04 + index * 0.05 }}
                      className="border-b border-rule"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center justify-between py-5 text-3xl font-bold tracking-[-0.03em] transition-colors duration-200 hover:text-foil sm:text-4xl"
                      >
                        {item.label}
                        <ArrowUpRightIcon width={18} height={18} className="text-ink-mute" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.28 }}
                  className="mt-10"
                >
                  <Button href={primaryCta.href} size="lg" className="w-full">
                    {primaryCta.label}
                    <ArrowUpRightIcon width={14} height={14} />
                  </Button>
                </motion.div>
              </nav>

              <div className="mt-12 flex flex-col gap-2 text-sm text-ink-mute">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="tap inline-flex py-2 transition-colors duration-200 hover:text-ink"
                >
                  {siteConfig.email}
                </a>
                <span className="py-1">{siteConfig.location}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
