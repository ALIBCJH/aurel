import type { ReactNode } from "react";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { HeadlineReveal } from "@/components/motion/headline-reveal";

/**
 * PageHeader — consistent premium header for interior pages.
 *
 * Bakes in the top padding needed to clear the fixed navbar, so every page
 * begins with the same editorial rhythm.
 */
type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  containerSize?: "narrow" | "default" | "wide";
};

export function PageHeader({
  eyebrow,
  title,
  description,
  containerSize = "default",
}: PageHeaderProps) {
  return (
    <Section
      spacing="sm"
      containerSize={containerSize}
      className="pt-32 sm:pt-40 lg:pt-44"
    >
      <div className="max-w-3xl">
        {eyebrow && (
          <Reveal>
            <p className="text-eyebrow text-accent">{eyebrow}</p>
          </Reveal>
        )}
        <HeadlineReveal
          className="mt-6 text-4xl sm:text-5xl lg:text-6xl"
          delay={eyebrow ? 0.1 : 0}
          lines={[title]}
        />
        {description && (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
