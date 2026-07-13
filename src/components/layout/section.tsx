import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

/**
 * Section — vertical rhythm primitive.
 *
 * Provides consistent, generous vertical spacing between page regions. By
 * default it wraps its children in a <Container>; pass `bleed` to opt out when
 * a section needs full-bleed content (e.g. a background band).
 */
const spacingClasses = {
  sm: "py-16 sm:py-20",
  default: "py-24 sm:py-28 lg:py-32",
  lg: "py-28 sm:py-36 lg:py-44",
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
