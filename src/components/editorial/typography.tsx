import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Rule, Lozenge } from "./rule";

/* --------------------------------------------------------------------------
 * Label — mono, uppercase, wide-tracked. The site's smallest voice: used for
 * folios, section numbers, field names and captions.
 * ------------------------------------------------------------------------ */
export function Label({
  children,
  className,
  foil = false,
  marker = false,
}: {
  children: ReactNode;
  className?: string;
  /** Set in gold — for section openings. */
  foil?: boolean;
  /** Prefix with the house lozenge. */
  marker?: boolean;
}) {
  return (
    <span
      className={cn(
        "text-label inline-flex items-center gap-2.5",
        foil ? "text-foil" : "text-ink-mute",
        className,
      )}
    >
      {marker && <Lozenge />}
      {children}
    </span>
  );
}

/* --------------------------------------------------------------------------
 * Display — the headline, printed line by line.
 *
 * Each line rises out of a clipped band, staggered, as though being pulled off
 * a press. Lines are authored explicitly so the breaks are art-directed rather
 * than left to the browser.
 * ------------------------------------------------------------------------ */
export function Display({
  lines,
  as: Component = "h2",
  className,
  delay = 0,
  stagger = 0.12,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <Component className={cn("letterpress", className)}>
      {lines.map((line, index) => (
        <span
          key={index}
          data-reveal="mask"
          style={{ "--reveal-delay": `${delay + index * stagger}s` } as CSSProperties}
          className="block"
        >
          <span>{line}</span>
        </span>
      ))}
    </Component>
  );
}

/* --------------------------------------------------------------------------
 * SectionOpener — how every section on the site introduces itself: a numbered
 * label, a rule across the full measure, then the title.
 * ------------------------------------------------------------------------ */
export function SectionOpener({
  label,
  title,
  aside,
  className,
  titleClassName,
}: {
  label: ReactNode;
  title: ReactNode[];
  /** Optional right-hand note, set small — a running head for the section. */
  aside?: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-6">
        <Label foil marker>
          {label}
        </Label>
        {aside && (
          <span className="text-label-sm hidden text-ink-mute sm:inline">{aside}</span>
        )}
      </div>
      <Rule className="mt-4" />
      <Display
        lines={title}
        delay={0.12}
        className={cn(
          "mt-8 text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.04]",
          titleClassName,
        )}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Lead — an opening paragraph, set larger, with a foil drop cap.
 * ------------------------------------------------------------------------ */
export function Lead({
  children,
  className,
  cap = true,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  cap?: boolean;
  delay?: number;
}) {
  return (
    <p
      data-reveal="ink"
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
      className={cn(
        "text-[1.0625rem] leading-[1.75] text-ink-soft sm:text-lg",
        cap && "drop-cap",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* --------------------------------------------------------------------------
 * PullQuote — the statement of belief, set at display size with a hanging
 * quotation mark, the way a magazine breaks up a column.
 * ------------------------------------------------------------------------ */
export function PullQuote({
  children,
  attribution,
  className,
}: {
  children: ReactNode;
  attribution?: ReactNode;
  className?: string;
}) {
  return (
    <blockquote className={cn("relative", className)}>
      <span
        aria-hidden
        data-reveal="fade"
        className="font-display absolute -left-1 -top-10 select-none text-[7rem] leading-none text-foil/25 sm:-left-8 sm:-top-14 sm:text-[10rem]"
      >
        &ldquo;
      </span>
      <div className="font-display relative text-[clamp(1.75rem,3.6vw,3rem)] font-light leading-[1.12] tracking-[-0.02em]">
        {children}
      </div>
      {attribution && (
        <footer
          data-reveal="fade"
          style={{ "--reveal-delay": "0.3s" } as CSSProperties}
          className="text-label mt-8 flex items-center gap-3 text-ink-mute"
        >
          <span className="h-px w-8 bg-foil" />
          {attribution}
        </footer>
      )}
    </blockquote>
  );
}

/* --------------------------------------------------------------------------
 * Marginalia — a note set in the margin, the way an editor annotates a proof.
 * Hidden on narrow screens where there is no margin to speak of.
 * ------------------------------------------------------------------------ */
export function Marginalia({
  children,
  figure,
  className,
}: {
  children: ReactNode;
  figure?: string;
  className?: string;
}) {
  return (
    <aside
      data-reveal="fade"
      className={cn("border-l border-rule-foil pl-4 text-sm leading-relaxed", className)}
    >
      {figure && (
        <span className="text-label-sm mb-2 block text-foil">{figure}</span>
      )}
      <span className="text-ink-mute">{children}</span>
    </aside>
  );
}

/* --------------------------------------------------------------------------
 * Folio — the running head/foot: the small strip of apparatus that tells you
 * where in the publication you are.
 * ------------------------------------------------------------------------ */
export function Folio({
  left,
  center,
  right,
  className,
}: {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-label-sm flex items-center justify-between gap-4 text-ink-mute",
        className,
      )}
    >
      <span className="truncate">{left}</span>
      {center && <span className="hidden truncate sm:inline">{center}</span>}
      <span className="shrink-0">{right}</span>
    </div>
  );
}
