import type { CSSProperties, ReactNode } from "react";
import { GEM_PATH } from "@/components/brand/gem-mark";
import { cn } from "@/lib/utils";

/**
 * Engraving — the plates.
 *
 * Every figure on the site is a line engraving built from one vocabulary:
 * the faceted mark, rosettes, perspective rays, hatched fields, orbits and
 * lattices. Nine compositions are defined; each service, case note and
 * section draws a different one, so no two figures on a page repeat.
 *
 * All geometry is deterministic (index-seeded arithmetic, never random) so the
 * server and client renders agree. Strokes carry `pathLength={1}`, which lets
 * one CSS rule draw every path — long or short — over the same duration; see
 * the REVEAL SYSTEM block in globals.css.
 */

const VIEW = 400;
const CENTER = VIEW / 2;

type StrokeProps = {
  d: string;
  /** Stagger for this stroke's draw-in, in seconds. */
  delay?: number;
  width?: number;
  /** Gold rather than ink. */
  foil?: boolean;
  opacity?: number;
};

function Stroke({ d, delay = 0, width = 1, foil, opacity = 1 }: StrokeProps) {
  return (
    <path
      d={d}
      className="engrave-stroke"
      pathLength={1}
      fill="none"
      stroke={foil ? "var(--foil)" : "var(--ink)"}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
      vectorEffect="non-scaling-stroke"
    />
  );
}

/* --------------------------------------------------------------------------
 * Geometry helpers — plain trigonometry, no randomness.
 * ------------------------------------------------------------------------ */

const rad = (deg: number) => (deg * Math.PI) / 180;
const fix = (n: number) => Math.round(n * 100) / 100;

function circle(cx: number, cy: number, r: number) {
  return `M ${fix(cx - r)} ${fix(cy)} a ${r} ${r} 0 1 0 ${fix(r * 2)} 0 a ${r} ${r} 0 1 0 ${fix(-r * 2)} 0`;
}

function ellipse(cx: number, cy: number, rx: number, ry: number) {
  return `M ${fix(cx - rx)} ${fix(cy)} a ${rx} ${ry} 0 1 0 ${fix(rx * 2)} 0 a ${rx} ${ry} 0 1 0 ${fix(-rx * 2)} 0`;
}

function line(x1: number, y1: number, x2: number, y2: number) {
  return `M ${fix(x1)} ${fix(y1)} L ${fix(x2)} ${fix(y2)}`;
}

function ray(cx: number, cy: number, angle: number, from: number, to: number) {
  const c = Math.cos(rad(angle));
  const s = Math.sin(rad(angle));
  return line(cx + c * from, cy + s * from, cx + c * to, cy + s * to);
}

function arc(cx: number, cy: number, r: number, start: number, end: number) {
  const x1 = cx + Math.cos(rad(start)) * r;
  const y1 = cy + Math.sin(rad(start)) * r;
  const x2 = cx + Math.cos(rad(end)) * r;
  const y2 = cy + Math.sin(rad(end)) * r;
  const large = Math.abs(end - start) > 180 ? 1 : 0;
  return `M ${fix(x1)} ${fix(y1)} A ${r} ${r} 0 ${large} 1 ${fix(x2)} ${fix(y2)}`;
}

/** A sine-modulated horizontal line — the engraver's way of shading a curve. */
function waveLine(y: number, amplitude: number, phase: number) {
  const steps = 16;
  const points: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const x = (VIEW / steps) * i;
    const offset = Math.sin(rad((i / steps) * 360 + phase)) * amplitude;
    points.push(`${i === 0 ? "M" : "L"} ${fix(x)} ${fix(y + offset)}`);
  }
  return points.join(" ");
}

/** The faceted mark, placed and scaled inside the 400×400 plate. */
function Gem({
  scale,
  x = CENTER,
  y = CENTER,
  delay = 0,
  width = 1,
  foil = true,
  opacity = 1,
}: {
  scale: number;
  x?: number;
  y?: number;
  delay?: number;
  width?: number;
  foil?: boolean;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${fix(x - 60 * scale)} ${fix(y - 60 * scale)}) scale(${scale})`}>
      <Stroke d={GEM_PATH} delay={delay} width={width} foil={foil} opacity={opacity} />
    </g>
  );
}

/* --------------------------------------------------------------------------
 * The nine compositions
 * ------------------------------------------------------------------------ */

function Prism() {
  const rays = Array.from({ length: 9 }, (_, i) =>
    line(210, 196, 400, 96 + i * 26),
  );
  return (
    <>
      <Gem scale={2.1} x={170} y={200} delay={0.05} width={1.2} />
      {rays.map((d, i) => (
        <Stroke key={i} d={d} delay={0.25 + i * 0.05} opacity={0.5 - i * 0.03} />
      ))}
      <Stroke d={line(0, 300, 400, 300)} delay={0.15} opacity={0.35} />
    </>
  );
}

function Rosette() {
  const rings = [58, 96, 134, 172];
  const spokes = Array.from({ length: 24 }, (_, i) => ray(CENTER, CENTER, i * 15, 58, 172));
  return (
    <>
      {rings.map((r, i) => (
        <Stroke key={`r${i}`} d={circle(CENTER, CENTER, r)} delay={i * 0.12} opacity={0.5} />
      ))}
      {spokes.map((d, i) => (
        <Stroke key={`s${i}`} d={d} delay={0.3 + (i % 6) * 0.05} opacity={0.28} />
      ))}
      <Gem scale={1.1} delay={0.5} width={1.4} />
    </>
  );
}

function Perspective() {
  const vpX = 268;
  const vpY = 150;
  const rays = Array.from({ length: 11 }, (_, i) => line(vpX, vpY, -40 + i * 48, 400));
  const horizons = [178, 214, 262, 322, 396];
  return (
    <>
      {rays.map((d, i) => (
        <Stroke key={`v${i}`} d={d} delay={i * 0.045} opacity={0.4} />
      ))}
      {horizons.map((y, i) => (
        <Stroke key={`h${i}`} d={line(0, y, 400, y)} delay={0.3 + i * 0.1} opacity={0.3} />
      ))}
      <Stroke d={circle(vpX, vpY, 34)} delay={0.55} foil opacity={0.8} />
      <Gem scale={0.42} x={vpX} y={vpY} delay={0.7} width={1.2} />
    </>
  );
}

function WaveField() {
  const lines = Array.from({ length: 15 }, (_, i) =>
    waveLine(52 + i * 22, 9 + (i % 4) * 4, i * 34),
  );
  return (
    <>
      {lines.map((d, i) => (
        <Stroke key={i} d={d} delay={i * 0.06} opacity={0.22 + (i % 3) * 0.08} />
      ))}
      <Gem scale={1.5} delay={0.5} width={1.4} />
    </>
  );
}

function Orbit() {
  const orbits = [0, 36, 72, 108, 144];
  return (
    <>
      {orbits.map((angle, i) => (
        <g key={i} transform={`rotate(${angle} ${CENTER} ${CENTER})`}>
          <Stroke d={ellipse(CENTER, CENTER, 168, 62)} delay={i * 0.14} opacity={0.34} />
        </g>
      ))}
      <Stroke d={circle(CENTER, CENTER, 96)} delay={0.6} foil opacity={0.6} />
      <Gem scale={1.25} delay={0.75} width={1.4} />
    </>
  );
}

function Spectrum() {
  // Deterministic "reading" — a sequence that rises and falls like a signal.
  const bars = Array.from({ length: 21 }, (_, i) => {
    const h = 40 + Math.abs(Math.sin(rad(i * 43))) * 190 + (i % 3) * 12;
    const x = 16 + i * 18.5;
    return { d: line(x, 340, x, 340 - h), i };
  });
  return (
    <>
      <Stroke d={line(0, 340, 400, 340)} delay={0} opacity={0.5} />
      {bars.map(({ d, i }) => (
        <Stroke key={i} d={d} delay={0.1 + i * 0.035} foil={i % 4 === 0} opacity={0.55} />
      ))}
      <Stroke d={arc(200, 340, 168, 200, 340)} delay={0.6} opacity={0.3} />
      <Gem scale={0.62} x={200} y={96} delay={0.8} width={1.3} />
    </>
  );
}

function ArcFan() {
  // Quarter arcs swung from the lower-left corner, sized so the widest still
  // crosses the plate — the fan has to fill the figure, not hide in a corner.
  const arcs = Array.from({ length: 11 }, (_, i) => arc(18, 382, 46 + i * 38, -90, 0));
  const spokes = Array.from({ length: 7 }, (_, i) => ray(18, 382, -90 + i * 15, 46, 430));
  return (
    <>
      {arcs.map((d, i) => (
        <Stroke key={`a${i}`} d={d} delay={i * 0.07} foil={i % 3 === 0} opacity={0.42} />
      ))}
      {spokes.map((d, i) => (
        <Stroke key={`s${i}`} d={d} delay={0.35 + i * 0.05} opacity={0.16} />
      ))}
      <Stroke d={line(18, 0, 18, 382)} delay={0.2} opacity={0.4} />
      <Stroke d={line(18, 382, 400, 382)} delay={0.28} opacity={0.4} />
      <Gem scale={1.15} x={262} y={150} delay={0.7} width={1.3} />
    </>
  );
}

function Lattice() {
  const down = Array.from({ length: 14 }, (_, i) => line(-200 + i * 56, 0, 200 + i * 56, 400));
  const up = Array.from({ length: 14 }, (_, i) => line(-200 + i * 56, 400, 200 + i * 56, 0));
  return (
    <>
      {down.map((d, i) => (
        <Stroke key={`d${i}`} d={d} delay={i * 0.05} opacity={0.2} />
      ))}
      {up.map((d, i) => (
        <Stroke key={`u${i}`} d={d} delay={0.2 + i * 0.05} opacity={0.14} />
      ))}
      <Stroke d={circle(CENTER, CENTER, 118)} delay={0.55} foil opacity={0.7} />
      <Gem scale={1.35} delay={0.7} width={1.5} />
    </>
  );
}

/** The house plate — the mark presented as a specimen, used in the masthead. */
function Specimen() {
  const spokes = Array.from({ length: 36 }, (_, i) => ray(CENTER, CENTER, i * 10, 150, 182));
  const facets = Array.from({ length: 12 }, (_, i) => ray(CENTER, 214, -180 + i * 15, 0, 168));
  return (
    <>
      <Stroke d={circle(CENTER, CENTER, 182)} delay={0.05} opacity={0.35} />
      <Stroke d={circle(CENTER, CENTER, 150)} delay={0.12} opacity={0.5} foil />
      {spokes.map((d, i) => (
        <Stroke key={`s${i}`} d={d} delay={0.2 + (i % 9) * 0.04} opacity={0.3} />
      ))}
      {facets.map((d, i) => (
        <Stroke key={`f${i}`} d={d} delay={0.4 + i * 0.04} opacity={0.16} />
      ))}
      <Stroke d={circle(CENTER, CENTER, 96)} delay={0.3} opacity={0.22} />
      <Gem scale={2.0} delay={0.5} width={1.5} />
      <Stroke d={line(74, 340, 326, 340)} delay={0.9} opacity={0.4} />
    </>
  );
}

const COMPOSITIONS = [
  Prism,
  Rosette,
  Perspective,
  WaveField,
  Orbit,
  Spectrum,
  ArcFan,
  Lattice,
  Specimen,
] as const;

/** Total number of distinct plate compositions. */
export const ENGRAVING_COUNT = COMPOSITIONS.length;

type EngravingProps = {
  /** Which composition to draw. Wraps, so any index is safe. */
  variant?: number;
  className?: string;
  /** Slowly rotate the whole plate — used for large ambient figures. */
  drift?: boolean;
};

export function Engraving({ variant = 0, className, drift = false }: EngravingProps) {
  const index = ((variant % COMPOSITIONS.length) + COMPOSITIONS.length) % COMPOSITIONS.length;
  const Composition = COMPOSITIONS[index];

  return (
    <svg
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      data-reveal="engrave"
      style={{ "--engrave-len": 1 } as CSSProperties}
      className={cn("h-full w-full text-ink", drift && "animate-engrave-orbit", className)}
    >
      <Composition />
    </svg>
  );
}

/* --------------------------------------------------------------------------
 * Plate — an engraving presented as a printed figure.
 * ------------------------------------------------------------------------ */

type PlateProps = {
  variant?: number;
  /** e.g. "01" — printed in the corner and in the caption. */
  figure?: string;
  caption?: ReactNode;
  className?: string;
  /** Aspect ratio utility, e.g. "aspect-[4/5]". */
  ratio?: string;
  children?: ReactNode;
};

export function Plate({
  variant = 0,
  figure,
  caption,
  className,
  ratio = "aspect-[4/3]",
  children,
}: PlateProps) {
  return (
    <figure className={cn("group/plate", className)}>
      <div
        data-reveal="plate"
        className={cn(
          "relative overflow-hidden border border-rule bg-paper-deep",
          ratio,
        )}
      >
        {/* register grid, then the plate itself */}
        <div aria-hidden className="plate-grid absolute inset-0 opacity-[0.55]" />
        <div aria-hidden className="hatch absolute inset-0 opacity-40" />
        <div className="absolute inset-0 [&>svg]:opacity-90">
          {children ?? <Engraving variant={variant} />}
        </div>

        {/* corner registration ticks — a printer's alignment marks */}
        <span aria-hidden className="absolute left-3 top-3 h-3 w-px bg-rule-strong" />
        <span aria-hidden className="absolute left-3 top-3 h-px w-3 bg-rule-strong" />
        <span aria-hidden className="absolute bottom-3 right-3 h-3 w-px bg-rule-strong" />
        <span aria-hidden className="absolute bottom-3 right-3 h-px w-3 bg-rule-strong" />

        {figure && (
          <span className="text-label-sm absolute right-3 top-3 text-ink-mute">
            {figure}
          </span>
        )}
      </div>

      {caption && (
        <figcaption
          data-reveal="fade"
          style={{ "--reveal-delay": "0.2s" } as CSSProperties}
          className="text-label-sm mt-3 flex items-baseline gap-2 text-ink-mute"
        >
          {figure && <span className="text-foil">Fig. {figure}</span>}
          <span className="tracking-[0.14em] normal-case">{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
