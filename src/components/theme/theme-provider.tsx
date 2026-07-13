"use client";

/**
 * Minimal theme provider — no external dependency.
 *
 * Works together with <ThemeScript/>, which sets the initial `.dark` class on
 * <html> before paint. This provider simply reads that class on mount and
 * exposes a `toggleTheme` / `setTheme` API plus the current value via context.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  /** True once mounted on the client — use to defer theme-dependent UI. */
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage unavailable — non-fatal */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default matches the server render / ThemeScript default (dark).
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Sync React state with whatever ThemeScript already applied to <html>.
  // This is a one-time reconciliation with an external system (the DOM class
  // set pre-hydration by the blocking script), which the lint rule can't infer.
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- external-system sync on mount
    setThemeState(isDark ? "dark" : "light");
    setMounted(true);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mounted, setTheme, toggleTheme }),
    [theme, mounted, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return context;
}
