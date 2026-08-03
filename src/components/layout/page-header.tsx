import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Engraving } from "@/components/editorial/engraving";
import { Rule } from "@/components/editorial/rule";
import { Display, Label } from "@/components/editorial/typography";
import { PointerTilt } from "@/components/motion/pointer-tilt";

/**
 * PageHeader — how every interior section of the publication opens.
 *
 * A label and a rule, the title printed line by line, a standfirst, and — when
 * the page warrants a figure — a plate held in the outer margin. Bakes in the
 * top space needed to clear the masthead so every page starts on the same line.
 */
type PageHeaderProps = {
  eyebrow?: string;
  /** Authored line breaks — the title is art-directed, not reflowed. */
  title: ReactNode[];
  description?: ReactNode;
  /** Running head printed opposite the label. */
  aside?: string;
  /** Engraving composition for the margin plate; omit for a plain opener. */
  figure?: number;
  figureLabel?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  aside,
  figure,
  figureLabel,
}: PageHeaderProps) {
  const hasPlate = figure !== undefined;

  // `pt` clears the undocked masthead (folio strip + main row ≈ 105px) with
  // room to breathe. It does not need to grow much beyond that on wider
  // screens, where the masthead is exactly the same height.
  return (
    <header className="pt-32 lg:pt-36">
      <Container size="wide">
        <div className="flex items-baseline justify-between gap-6">
          {eyebrow && (
            <Label foil marker>
              {eyebrow}
            </Label>
          )}
          {aside && (
            <span className="text-label-sm hidden text-ink-mute sm:inline">
              {aside}
            </span>
          )}
        </div>

        <Rule className="mt-4" />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className={hasPlate ? "lg:col-span-8" : "lg:col-span-10"}>
            {/* The lower clamp bound governs phones: 2.15rem keeps a two- or
                three-word line on one line at 360px instead of orphaning a
                word onto its own row. */}
            <Display
              as="h1"
              delay={0.1}
              stagger={0.12}
              lines={title}
              className="mt-8 text-[clamp(2.15rem,6.2vw,5rem)] leading-[1.0] tracking-[-0.03em] sm:mt-10"
            />

            {description && (
              <p
                data-reveal="ink"
                style={{ ["--reveal-delay" as string]: "0.4s" }}
                className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-ink-soft sm:mt-8"
              >
                {description}
              </p>
            )}
          </div>

          {hasPlate && (
            <div className="hidden lg:col-span-3 lg:col-start-10 lg:block">
              <PointerTilt amount={4} className="animate-plate-drift mt-10">
                <div className="relative aspect-square border border-rule bg-paper-deep">
                  <div aria-hidden className="plate-grid absolute inset-0 opacity-50" />
                  <div aria-hidden className="hatch absolute inset-0 opacity-40" />
                  <Engraving variant={figure} />
                  <span aria-hidden className="absolute left-3 top-3 h-3 w-px bg-rule-strong" />
                  <span aria-hidden className="absolute left-3 top-3 h-px w-3 bg-rule-strong" />
                </div>
                {figureLabel && (
                  <p className="text-label-sm mt-3 text-ink-mute">
                    <span className="text-foil">Fig.</span>{" "}
                    <span className="normal-case tracking-[0.14em]">{figureLabel}</span>
                  </p>
                )}
              </PointerTilt>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
