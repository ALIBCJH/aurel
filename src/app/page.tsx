import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { HeroBackground } from "@/components/layout/hero-background";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { GemFigure } from "@/components/brand/gem-figure";
import { ArrowUpRightIcon } from "@/components/icons";
import { primaryCta } from "@/config/site";
import { services } from "@/config/services";

const approach = [
  {
    num: "01",
    title: "Discover",
    body: "We learn your business, your customers, and the outcome that matters — before a line of code.",
  },
  {
    num: "02",
    title: "Design",
    body: "We shape the experience and the system deliberately, so everything built later has a reason.",
  },
  {
    num: "03",
    title: "Build",
    body: "We engineer it properly — fast, secure, and maintainable — with you in the loop throughout.",
  },
  {
    num: "04",
    title: "Grow",
    body: "We measure, refine, and automate, so the work keeps compounding long after launch.",
  },
];

const whyAurel = [
  {
    title: "A true partner",
    body: "We own the whole journey — strategy, design, and engineering under one roof. No hand-offs, no finger-pointing, one team accountable for the result.",
  },
  {
    title: "Craft as standard",
    body: "Details others skip are where trust is built. We hold every pixel and every line of code to a standard usually reserved for enterprise budgets.",
  },
  {
    title: "Built to last",
    body: "We build systems you can grow on for years, not throwaway work you'll replace in months. Deliberate choices that protect your investment.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 2 — Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-48 lg:pb-28">
        <HeroBackground />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            <div className="max-w-2xl">
              <Reveal>
                <p className="text-eyebrow text-accent">
                  Digital transformation studio
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl">
                  Technology, held to a{" "}
                  <span className="italic text-accent">higher</span> standard.
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
                  Aurel helps ambitious businesses modernise, grow, and lead —
                  custom software, AI, and design, crafted end to end by a
                  partner you can trust.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button href={primaryCta.href} size="lg">
                    {primaryCta.label}
                    <ArrowUpRightIcon width={18} height={18} />
                  </Button>
                  <Button href="/services" variant="secondary" size="lg">
                    Explore what we do
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="hidden lg:block">
              <GemFigure className="mx-auto w-full max-w-md" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 3 — Belief band */}
      <Section
        spacing="default"
        bleed
        className="border-y border-accent/20 bg-surface-muted/30"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <Reveal>
              <p className="font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
                Great software is engineering. Great products are craft. We
                refuse to choose.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted lg:mt-2">
                Most agencies pick a lane — they can code, or they can design.
                Aurel was built to do both to the highest standard, so what you
                ship works beautifully and lasts.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 4 — Services grid */}
      <Section spacing="lg">
        <Reveal>
          <h2 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
            Everything it takes to compete in the digital era — under one roof.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 4) * 0.06}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full flex-col bg-background p-6 transition-colors duration-300 hover:bg-surface"
              >
                {/* gold line across the top on hover */}
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-accent" />
                <h3 className="mt-6 font-sans text-lg font-semibold text-foreground">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.summary}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5 — Approach */}
      <Section spacing="default" bleed className="border-t border-border">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
              Design first. Build second. Automate last.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {approach.map((step, index) => (
              <Reveal key={step.num} delay={index * 0.08}>
                <div className="border-t border-accent/25 pt-5">
                  <span className="font-display text-2xl text-accent">
                    {step.num}
                  </span>
                  <h3 className="mt-3 text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6 — Why Aurel */}
      <Section spacing="default" bleed className="border-t border-border">
        <Container>
          <div className="grid gap-12 md:grid-cols-3 lg:gap-16">
            {whyAurel.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7 — Closing CTA */}
      <Section spacing="lg" bleed className="border-t border-border">
        <Container size="narrow" className="text-center">
          <Reveal>
            <GemFigure className="mx-auto w-28" />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-8 text-4xl sm:text-5xl">
              Let&apos;s build what your business is becoming.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-md text-muted">
              Tell us where you want to go. We&apos;ll show you how technology
              gets you there — with craft, precision, and care.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex justify-center">
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
                <ArrowUpRightIcon width={18} height={18} />
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
