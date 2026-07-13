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

const EASE = [0.22, 1, 0.36, 1] as const;

function useActivePath() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Desktop link with an animated gold underline and active state. */
function NavLink({ href, label }: { href: string; label: string }) {
  const isActive = useActivePath()(href);
  return (
    <Link
      href={href}
      className={cn(
        "group relative py-1 text-sm transition-colors duration-300",
        isActive ? "text-foreground" : "text-muted hover:text-foreground",
      )}
    >
      {label}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isActive ? "w-full" : "w-0 group-hover:w-full",
        )}
      />
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = useActivePath();

  // Elevate the bar (background blur + hairline) once the page scrolls.
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
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled || menuOpen
            ? "border-b border-border bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-18 max-w-wide items-center justify-between px-6 sm:px-8 lg:px-12">
          <Logo />

          {/* Desktop navigation */}
          <div className="hidden items-center gap-9 lg:flex">
            {mainNav.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Button href={primaryCta.href} size="sm" className="ml-1">
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-muted"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="lg:hidden"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl"
            >
              <div className="mx-auto max-w-wide px-6 py-6 sm:px-8">
                <ul className="flex flex-col">
                  {mainNav.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: EASE,
                        delay: 0.08 + index * 0.05,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between border-b border-border py-4 font-display text-2xl",
                          isActive(item.href)
                            ? "text-accent"
                            : "text-foreground",
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
                    duration: 0.4,
                    ease: EASE,
                    delay: 0.08 + mainNav.length * 0.05,
                  }}
                  className="mt-6"
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="sr-only">{siteConfig.name} primary navigation</span>
    </motion.header>
  );
}
