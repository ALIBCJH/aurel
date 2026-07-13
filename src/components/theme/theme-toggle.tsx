"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

/**
 * Compact icon button that switches between light and dark themes.
 * Renders a stable placeholder until mounted to avoid hydration mismatch,
 * since the correct icon depends on the client-resolved theme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
          : "Toggle theme"
      }
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full",
        "text-foreground/80 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:text-accent hover:bg-surface-muted",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted ? theme : "placeholder"}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inline-flex"
        >
          {mounted && theme === "dark" ? (
            <MoonIcon width={18} height={18} />
          ) : (
            <SunIcon width={18} height={18} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
