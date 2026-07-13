"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { mainNav, primaryCta, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { CloseIcon, MenuIcon } from "@/components/icons";

const EASE = [0.2, 0.7, 0.2, 1] as const;

function useActivePath() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Desktop link with a soft pill hover + gold underline for the active route. */
function NavLink({ href, label }: { href: string; label: string }) {
  const isActive = useActivePath()(href);
  return (
    <Link
      href={href}
      className={cn(
        "group relative rounded-full px-3 py-1.5 text-sm transition-colors duration-200",
        isActive
          ? "text-foreground"
          : "text-muted hover:bg-foreground/[0.04] hover:text-foreground",
      )}
    >
      {label}
      <span
        className={cn(
          "absolute inset-x-3 -bottom-0.5 h-px bg-accent transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
          isActive
            ? "scale-x-100"
            : "origin-center scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = useActivePath();

  // Condense the capsule (tighter, more opaque, deeper shadow) once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4"
    >
      {/* Floating glass capsule */}
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex items-center justify-between gap-3 rounded-full border pl-5 pr-2",
          "ring-1 ring-inset ring-foreground/[0.03] backdrop-blur-xl",
          "transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
          scrolled || menuOpen
            ? "max-w-5xl border-border/80 bg-background/75 py-1.5 shadow-lg shadow-black/25"
            : "max-w-6xl border-border/50 bg-surface/40 py-2.5 shadow-md shadow-black/10",
        )}
      >
        <Logo />

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>

        <div className="hidden items-center gap-1.5 lg:flex">
          <ThemeToggle />
          <Button href={primaryCta.href} size="sm">
            {primaryCta.label}
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.06]"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — a floating card beneath the capsule */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ transformOrigin: "top" }}
            className="mt-2 origin-top rounded-3xl border border-border bg-background/90 p-3 shadow-xl shadow-black/30 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {mainNav.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: EASE,
                    delay: 0.06 + index * 0.05,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg transition-colors",
                      isActive(item.href)
                        ? "bg-foreground/[0.04] text-accent"
                        : "text-foreground hover:bg-foreground/[0.04]",
                    )}
                  >
                    {item.label}
                    <span className="text-eyebrow text-muted">
                      0{index + 1}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                ease: EASE,
                delay: 0.06 + mainNav.length * 0.05,
              }}
              className="mt-2 px-1 pb-1"
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

      <span className="sr-only">{siteConfig.name} primary navigation</span>
    </motion.header>
  );
}
