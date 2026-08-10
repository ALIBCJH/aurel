import { cn } from "@/lib/utils";

/**
 * Button style contract — the Atelier edition.
 *
 * Buttons are set like printed apparatus, not app chrome: square corners, mono
 * uppercase labels, wide tracking. The primary action is a stamped foil field;
 * everything else is a ruled outline or a plain lettered link. Interaction is a
 * press into the paper (translate + shadow) rather than a lift off it.
 *
 * Kept as a plain string generator (no `cva` dependency) and separate from the
 * Button component so the same styles can dress a bare anchor when needed.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base = cn(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
  "rounded-full font-medium tracking-[-0.01em] select-none",
  "transition-[transform,background-color,color,border-color,opacity] duration-200",
  "ease-[cubic-bezier(0.2,0.7,0.2,1)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "active:scale-[0.98]",
  "disabled:pointer-events-none disabled:opacity-50",
);

const variants: Record<ButtonVariant, string> = {
  // The solid pill, in gold with black lettering. This is the one component
  // allowed to fill an area with the accent rather than mark an edge with it,
  // and it is what makes the primary action the loudest object on any page it
  // appears on. It was `--invert-bg` — warm white — which on a near-black
  // ground made every CTA the same weight as a plain card.
  primary: cn(
    "bg-[color:var(--accent)] text-[color:var(--accent-foreground)]",
    "hover:bg-[color:var(--accent-hover)]",
  ),
  // Outline pill — the everyday action. Its hover border goes to gold rather
  // than to the inverted ground, so the two variants read as one family.
  secondary: cn(
    "border border-rule-strong bg-transparent text-ink",
    "hover:border-[color:var(--accent)] hover:bg-field",
  ),
  // Plain lettering with an underline that wipes in. Pinned to the text
  // baseline rather than the box, so the padding that makes this
  // thumb-reachable does not drag the underline away from the words.
  ghost: cn(
    "rounded-none px-0 py-3.5 text-ink-soft",
    "after:absolute after:inset-x-0 after:bottom-3 after:h-px after:bg-current",
    "after:origin-right after:scale-x-0 after:transition-transform after:duration-300",
    "hover:text-ink hover:after:origin-left hover:after:scale-x-100",
  ),
};

// Sentence case at real text sizes — the mono uppercase with wide tracking
// belonged to the print direction and reads as small print here. Heights are
// touch minimums first: 44px is the smallest control a thumb hits reliably.
const sizes: Record<ButtonSize, string> = {
  sm: "h-11 px-5 text-[0.9375rem]",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-7 text-base sm:px-8",
};

// The ghost variant is lettering, not a box — its height comes from the padding
// in the variant above, which already clears 40px.
const ghostSizes: Record<ButtonSize, string> = {
  sm: "h-auto text-[0.9375rem]",
  md: "h-auto text-[0.9375rem]",
  lg: "h-auto text-base",
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
  return cn(
    base,
    variants[variant],
    variant === "ghost" ? ghostSizes[size] : sizes[size],
    className,
  );
}
