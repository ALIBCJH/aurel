import { cn } from "@/lib/utils";

/**
 * Button style contract.
 *
 * Variants are a plain string generator (no `cva` dependency). Kept separate
 * from the client Button component so styles can also be applied to plain
 * anchors or server-rendered elements when needed.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base = cn(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full",
  "font-medium tracking-tight select-none",
  "transition-[transform,background-color,color,border-color,box-shadow] duration-300",
  "ease-[cubic-bezier(0.22,1,0.36,1)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "active:scale-[0.98]",
  "disabled:pointer-events-none disabled:opacity-50",
);

const variants: Record<ButtonVariant, string> = {
  // Gold — reserved for the single most important action on a view.
  primary: cn(
    "bg-accent text-accent-foreground shadow-sm",
    "hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent/25",
    "active:translate-y-0",
  ),
  // Quiet outline — the everyday action.
  secondary: cn(
    "border border-border-strong bg-transparent text-foreground",
    "hover:-translate-y-0.5 hover:border-accent hover:text-accent",
    "active:translate-y-0",
  ),
  // Text-only — inline and low-emphasis.
  ghost: cn(
    "bg-transparent text-foreground/80",
    "hover:text-accent hover:bg-surface-muted",
  ),
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}
