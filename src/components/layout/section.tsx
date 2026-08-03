import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

/**
 * Section — vertical rhythm primitive.
 *
 * Provides consistent vertical spacing between page regions. By default it
 * wraps its children in a <Container>; pass `bleed` to opt out when a section
 * needs full-bleed content (e.g. a background band).
 *
 * The scale is deliberately tighter than it was. Adjacent sections stack their
 * padding, so the old `py-24` floor put 192px of nothing between every pair of
 * content blocks — on a phone that is most of a screen. Printed pages, which
 * this design takes its cues from, are dense: they use the *margin* as a frame
 * and fill the measure. Separation here is the job of the hairline rules, not
 * of empty paper.
 */
const spacingClasses = {
  sm: "py-12 sm:py-16",
  default: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-24 lg:py-32",
} as const;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: keyof typeof spacingClasses;
  containerSize?: "narrow" | "default" | "wide";
  /** Skip the inner Container to render full-bleed content. */
  bleed?: boolean;
};

export function Section({
  spacing = "default",
  containerSize = "default",
  bleed = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(spacingClasses[spacing], className)} {...props}>
      {bleed ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}
