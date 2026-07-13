import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { BrowserMockup } from "@/components/brand/browser-mockup";
import { primaryCta } from "@/config/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from the Aurel studio — proof, not promises. Case studies are on the way.",
};

// Placeholder project types — no invented clients. Replace with real work.
const projects = [
  { name: "Commerce platform", tags: "Web · Software", result: "Case study coming soon" },
  { name: "Brand & website", tags: "Branding · Web", result: "Case study coming soon" },
  { name: "AI operations assistant", tags: "AI · Automation", result: "Case study coming soon" },
  { name: "Booking & payments app", tags: "Software · Mobile", result: "Case study coming soon" },
  { name: "Marketing site & SEO", tags: "Web · SEO", result: "Case study coming soon" },
  { name: "Product configurator", tags: "Immersive · Web", result: "Case study coming soon" },
];

const caseStudy = [
  {
    label: "The challenge",
    body: "A concise framing of the problem the client faced and why it mattered to their business.",
  },
  {
    label: "Our approach",
    body: "How we discovered, designed, and built the solution — the decisions that shaped the outcome.",
  },
  {
    label: "The outcome",
    body: "The measurable result: faster, clearer, more revenue, less manual work. Proof it worked.",
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Proof, not <span className="italic text-accent">promises</span>.
          </>
        }
        description="A closer look at what we build. We're a young studio — these placeholders show the shape of the work as our first case studies are documented."
      />

      <Section spacing="default">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.name} delay={(index % 3) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background p-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <BrowserMockup index={index} />
                <div className="relative flex flex-1 flex-col px-3 pb-4 pt-5">
                  <span className="absolute inset-x-3 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-xl">{project.name}</h2>
                    <span className="text-eyebrow mt-1.5 shrink-0 text-muted">
                      {project.tags}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{project.result}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Featured case study block */}
      <Section spacing="default" bleed className="border-t border-border">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface-muted/30 p-8 sm:p-12">
              <p className="text-eyebrow text-accent">Featured case study</p>
              <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl">
                The anatomy of a project, start to finish.
              </h2>
              <div className="mt-10 grid gap-8 border-t border-accent/20 pt-10 md:grid-cols-3">
                {caseStudy.map((part) => (
                  <div key={part.label}>
                    <h3 className="text-eyebrow text-muted">{part.label}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                      {part.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section spacing="lg" bleed className="border-t border-border">
        <Container size="narrow" className="text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl">
              Your project could be the next one here.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-10 flex justify-center">
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
