import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Panel — the big stacked card that carries most of this site.
 *
 * One component, three tones, used for services, capabilities and calls to
 * action. Its whole job is scale: a full-measure rounded rectangle with an
 * oversized title, a short paragraph, and an index in the corner. Stacked with
 * alternating tones it produces rhythm without needing a second colour or any
 * commissioned artwork — which is precisely why this pattern is worth copying
 * and a 3D-render-led homepage is not.
 *
 *   loud   — inverted (black on a white page, white on a dark one)
 *   quiet  — the muted surface
 *   outline— transparent with a hairline, for lower-priority rows
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

const indexTones: Record<PanelTone, string> = {
  loud: "text-ink-mute",
  quiet: "text-ink-mute",
  outline: "text-ink-mute",
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
  const inner = (
    <>
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
  // children paints no background at all. The children still lay out, so the
  // failure looks like "the card lost its colour" rather than "the card is the
  // wrong display type", and `getBoundingClientRect` still returns a plausible
  // rect, which makes it maddening to diagnose.
  const shell = cn(
    "group/panel relative isolate block overflow-hidden rounded-[var(--radius-card)]",
    "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
    tones[tone],
    href && "hover:-translate-y-0.5",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={shell}>
        {inner}
      </Link>
    );
  }

  return <div className={shell}>{inner}</div>;
}

/**
 * A cheap, asset-free graphic for a Panel's media slot: soft concentric bands
 * in the panel's own ink, so it reads as texture rather than as a picture we
 * did not have. Deterministic per index — no randomness, so SSR stays stable.
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
