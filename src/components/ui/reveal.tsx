import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Reveal — the house entrance animation.
 *
 * This is a *server* component. It renders nothing but a `data-reveal`
 * attribute; the animation is CSS (globals.css → REVEAL SYSTEM) and the trigger
 * is the single `RevealObserver` mounted in the root layout.
 *
 * Two consequences worth the trade:
 *  - Pages using it stay server components — no client boundary per section.
 *  - The hiding CSS is scoped to `html.js`, so without JavaScript the page is
 *    fully rendered and readable rather than a column of invisible blocks.
 *
 * Variants:
 *  - `fade`  (default) fade + rise
 *  - `mask`  child rises out of a clipped band — for display lines
 *  - `rule`  hairline draws left → right
 *  - `ruleV` hairline draws top → bottom
 *  - `plate` slower, heavier arrival with a touch of scale — for figures
 *  - `ink`   copy resolves out of soft focus
 */
type RevealVariant = "fade" | "mask" | "rule" | "ruleV" | "plate" | "ink";

const attr: Record<RevealVariant, string> = {
  fade: "fade",
  mask: "mask",
  rule: "rule",
  ruleV: "rule-v",
  plate: "plate",
  ink: "ink",
};

type RevealProps = {
  children: ReactNode;
  /** Stagger, in seconds. */
  delay?: number;
  /** Vertical travel in px (fade variant only). */
  y?: number;
  variant?: RevealVariant;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
};

export function Reveal({
  children,
  delay = 0,
  y,
  variant = "fade",
  className,
  style,
  as,
}: RevealProps) {
  const Component = as ?? "div";

  return (
    <Component
      data-reveal={attr[variant]}
      className={className}
      style={
        {
          ...(delay ? { "--reveal-delay": `${delay}s` } : null),
          ...(y !== undefined ? { "--reveal-y": `${y}px` } : null),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Component>
  );
}
