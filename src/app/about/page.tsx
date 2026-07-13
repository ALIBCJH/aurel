import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aurel is a digital transformation studio with the precision of a product company and the taste of a design house.",
};

const principles = [
  {
    title: "Craftsmanship",
    body: "We sweat the details others skip — because quality compounds over time.",
  },
  {
    title: "Precision",
    body: "Thoughtful systems, clear decisions, and technology built to last.",
  },
  {
    title: "Partnership",
    body: "One accountable team focused on outcomes, not hand-offs.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A studio at the intersection of design and engineering."
        description="Aurel helps ambitious businesses evolve — combining the rigor of a product company with the taste of a design house."
      />

      <Section spacing="default">
        <div className="grid gap-10 sm:grid-cols-3">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.08}>
              <h2 className="font-display text-2xl">{principle.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {principle.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section spacing="sm" bleed className="border-t border-border">
        <Container size="narrow">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">
              This is a placeholder for the full About page. Team, story, and
              values will be detailed here.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
