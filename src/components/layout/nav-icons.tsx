import type { SVGProps } from "react";

/**
 * Navigation glyphs.
 *
 * Drawn rather than borrowed, and drawn to be understood by someone who has
 * never thought about an interface in their life. Every one is a thing from the
 * world — a house, a window with four panes, a picture in a frame, a person —
 * because abstract marks (chevrons, dots, hamburgers) are a convention you have
 * to have been taught. The four-pane window is doing double duty: the studio
 * sells exactly four disciplines.
 *
 * One geometry throughout: 24px box, 1.6 stroke, round caps and joins, no fill.
 * They sit under labels and must never be louder than the words.
 */
type GlyphProps = SVGProps<SVGSVGElement>;

function Glyph({ children, ...props }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export function HomeGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M3.6 10.4 12 3.8l8.4 6.6" />
      <path d="M5.6 12v7.2a1 1 0 0 0 1 1h10.8a1 1 0 0 0 1-1V12" />
    </Glyph>
  );
}

export function ServicesGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <rect x="3.8" y="3.8" width="7" height="7" rx="1.6" />
      <rect x="13.2" y="3.8" width="7" height="7" rx="1.6" />
      <rect x="3.8" y="13.2" width="7" height="7" rx="1.6" />
      <rect x="13.2" y="13.2" width="7" height="7" rx="1.6" />
    </Glyph>
  );
}

export function WorkGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <rect x="3.2" y="4.6" width="17.6" height="14.8" rx="2.2" />
      <circle cx="8.6" cy="9.6" r="1.5" />
      <path d="M3.6 16.4 8.4 12l4 3.4 3.2-2.6 4.6 4" />
    </Glyph>
  );
}

export function AboutGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="8.4" r="3.6" />
      <path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0" />
    </Glyph>
  );
}

export function StartGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M7.4 16.6 16.6 7.4" />
      <path d="M9.6 7.4h7v7" />
    </Glyph>
  );
}
