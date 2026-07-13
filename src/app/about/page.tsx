import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { GemMark } from "@/components/brand/gem-mark";
import { primaryCta } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aurel is a technology partner built like a design house — engineering, design, and strategy under one roof.",
};

const principles = [
  { title: "Craft over speed", body: "We move deliberately, because quality is what people remember." },
  { title: "Explicit over clever", body: "Clear systems others can build on beat clever ones only we understand." },
  { title: "Partners, not vendors", body: "Your outcome is the brief. We stay accountable from idea to launch." },
  { title: "Built to last", body: "We choose the durable path, protecting your budget for years." },
];

const team = [
  { role: "Founder & Principal Engineer" },
  { role: "Design Lead" },
  { role: "AI & Automation" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The studio"
        title={
          <>
            A technology partner, built like a{" "}
            <span className="italic text-accent">design house</span>.
          </>
        }
        description="Small enough to care about every detail. Serious enough to build what lasts."
      />

      {/* Story */}
      <Section spacing="default">
        <Container size="narrow" className="px-0">
          <div className="grid gap-8 sm:grid-cols-2">
            <Reveal>
              <p className="leading-relaxed text-foreground/85">
                Aurel was founded on a simple frustration: the calibre of craft
                usually reserved for enterprises was out of reach for the
                ambitious small and medium businesses who needed it most.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-muted">
                So we built a studio that combines engineering, design, and
                strategy under one roof — owning every step from first idea to
                launch, and standing behind the result long after.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Philosophy band */}
      <Section spacing="default" bleed className="border-y border-accent/20 bg-surface-muted/30">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <Reveal>
              <p className="font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
                Design first. Build second.{" "}
                <span className="italic text-accent">Automate last.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-muted lg:mt-2">
                A deliberate process protects your budget and produces software
                you can trust. We solve the right problem before we write code,
                and automate only once the foundations are sound.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Principles */}
      <Section spacing="default">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">What we hold to.</h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="border-t border-accent/25 pt-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section spacing="default" bleed className="border-t border-border">
        <Container>
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">The people behind it.</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {team.map((member, index) => (
              <Reveal key={member.role} delay={index * 0.08}>
                <div className="rounded-xl border border-border bg-surface p-6">
                  <div className="flex aspect-square items-center justify-center rounded-lg border border-border bg-surface-muted/40">
                    <GemMark className="w-16 text-accent/40" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{member.role}</h3>
                  <p className="mt-1 text-sm text-muted">Profile coming soon</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section spacing="lg" bleed className="border-t border-border">
        <Container size="narrow" className="text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl">
              Let&apos;s build something worth remembering.
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
