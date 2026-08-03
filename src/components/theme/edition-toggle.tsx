"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

/**
 * Theme toggle.
 *
 * Was a labelled "Day edition / Night edition" control sitting in the folio
 * strip — part of the printed-annual conceit. Now a plain icon button: dark is
 * the designed default, and switching is a preference, not a feature worth
 * naming twice in the header.
 *
 * Until mounted it renders the dark-state icon to match the server output, so
 * hydration is stable.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = !mounted || theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-md",
        "text-ink-mute transition-colors duration-200 hover:bg-field hover:text-ink",
        className,
      )}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "dark" : "light"}
            initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            className="absolute inline-flex"
          >
            {isDark ? (
              <MoonIcon width={16} height={16} />
            ) : (
              <SunIcon width={16} height={16} />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}

/** @deprecated Older name kept so existing imports keep working. */
export const EditionToggle = ThemeToggle;
