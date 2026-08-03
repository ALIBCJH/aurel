"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Panel — the big stacked card that carries most of this site.
 *
 * One component, three tones, used for services, capabilities and calls to
 * action. Its whole job is scale: a full-measure rounded rectangle with an
 * oversized title, a short paragraph, and an index in the corner. Stacked with
 * alternating tones it produces rhythm without needing a second colour or any
 * commissioned artwork.
 *
 * It also glows. A soft gold bloom tracks the pointer across the card, and the
 * card's edge lights where the cursor is nearest. Both are driven by motion
 * values written straight to the DOM rather than React state — a card that
 * re-rendered on every mousemove would be a genuinely bad trade for a lighting
 * effect.
 */
export type PanelTone = "loud" | "quiet" | "outline";

// All three tones stay inside the active theme. An earlier version inverted
// `loud` to a black card on a white page, which gave strong rhythm but meant a
// stack of cards read as two different palettes fighting each other — and in
// dark mode it flipped to glaring white slabs. Rhythm now comes from alternating
// a filled surface against an outlined one, which is quieter and holds together
// in both themes.
const tones: Record<PanelTone, string> = {
  loud: "bg-paper-deep text-ink",
  quiet: "border border-rule bg-paper text-ink",
  outline: "border border-rule bg-transparent text-ink",
};

const bodyTones: Record<PanelTone, string> = {
  loud: "text-ink-soft",
  quiet: "text-ink-soft",
  outline: "text-ink-soft",
};

// `ink-soft`, not `ink-mute`. The glow warms the surface behind this numeral,
// and at peak intensity `ink-mute` falls to 3.65:1 against the lit background —
// below AA for text this size. `ink-soft` holds 6.16:1 lit and is still quiet
// enough at rest. Strengthening the numeral costs nothing; weakening the glow
// to protect it would have cost the effect.
const indexTones: Record<PanelTone, string> = {
  loud: "text-ink-soft",
  quiet: "text-ink-soft",
  outline: "text-ink-soft",
};

export function Panel({
  title,
  body,
  index,
  href,
  tone = "quiet",
  media,
  footer,
  className,
}: {
  title: ReactNode;
  body?: ReactNode;
  /** Rendered small in the top-right — "01", "02". */
  index?: string;
  /** Makes the whole panel a link. */
  href?: string;
  tone?: PanelTone;
  /** Optional visual, bled to the panel's right edge on wide screens. */
  media?: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const shellRef = useRef<HTMLElement>(null);

  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const [lit, setLit] = useState(false);

  // Percentages rather than pixels so the gradient stays correct through the
  // card's hover lift and any resize, without re-measuring.
  const glow = useMotionTemplate`radial-gradient(38rem circle at ${px}% ${py}%, var(--glow), transparent 62%)`;
  const edge = useMotionTemplate`radial-gradient(22rem circle at ${px}% ${py}%, var(--glow-edge), transparent 68%)`;

  function track(event: React.PointerEvent<HTMLElement>) {
    // Touch has no hover, and a glow that only appears after a tap reads as a
    // rendering fault rather than an effect.
    if (reduce || event.pointerType !== "mouse") return;
    const box = shellRef.current?.getBoundingClientRect();
    if (!box) return;
    px.set(((event.clientX - box.left) / box.width) * 100);
    py.set(((event.clientY - box.top) / box.height) * 100);
    if (!lit) setLit(true);
  }

  const inner = (
    <>
      {/* the bloom — sits under the content, over the surface */}
      <motion.span
        aria-hidden
        style={{ backgroundImage: glow }}
        animate={{ opacity: lit ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0"
      />

      {/* the lit edge — a 1px gradient ring, drawn with a mask so only the
          border shows. Without the mask this would be a second full bloom. */}
      <motion.span
        aria-hidden
        style={{
          backgroundImage: edge,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          padding: 1,
        }}
        animate={{ opacity: lit ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)]"
      />

      <div className="relative z-10 flex flex-col p-7 sm:p-10 lg:max-w-[46%] lg:p-14">
        {index && (
          <span
            aria-hidden
            className={cn(
              "absolute right-7 top-7 text-sm tabular-nums sm:right-10 sm:top-10 lg:right-14 lg:top-14",
              indexTones[tone],
            )}
          >
            {index}
          </span>
        )}

        <h3 className="max-w-[15ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
          {title}
        </h3>

        {body && (
          <p className={cn("mt-5 text-[0.9375rem] leading-[1.7]", bodyTones[tone])}>
            {body}
          </p>
        )}

        {footer && <div className="mt-8">{footer}</div>}
      </div>

      {/* Media bleeds off the right on wide screens and is hidden on small
          ones, where there is no room for it to be anything but a distraction
          squeezed under the copy. */}
      {media && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] overflow-hidden lg:block"
        >
          {media}
        </div>
      )}
    </>
  );

  // `block` is load-bearing, not cosmetic. With `href` this renders an <a>,
  // which is `display: inline` by default — and an inline box wrapping block
  // children paints no background at all.
  const shell = cn(
    "group/panel relative isolate block overflow-hidden rounded-[var(--radius-card)]",
    "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
    tones[tone],
    href && "hover:-translate-y-0.5",
    className,
  );

  const handlers = {
    onPointerMove: track,
    onPointerLeave: () => setLit(false),
  };

  if (href) {
    return (
      <Link
        ref={shellRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={shell}
        {...handlers}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      ref={shellRef as React.Ref<HTMLDivElement>}
      className={shell}
      {...handlers}
    >
      {inner}
    </div>
  );
}

/**
 * A cheap, asset-free graphic for a Panel's media slot: fine diagonal rules in
 * the panel's own ink, masked to fade toward the middle of the card, so it
 * reads as texture rather than as a picture we did not have. Deterministic per
 * index — no randomness, so SSR stays stable.
 */
export function PanelGlow({ seed = 0 }: { seed?: number }) {
  const shift = (seed * 17) % 40;
  return (
    <div
      className="h-full w-full opacity-[0.10]"
      style={{
        background: `repeating-linear-gradient(${115 + shift}deg, currentColor 0 1px, transparent 1px 14px)`,
        maskImage: "radial-gradient(120% 100% at 100% 50%, #000 20%, transparent 72%)",
        WebkitMaskImage:
          "radial-gradient(120% 100% at 100% 50%, #000 20%, transparent 72%)",
      }}
    />
  );
}
