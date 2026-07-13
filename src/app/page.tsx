import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Hero } from "@/components/home/hero";
import { Approach } from "@/components/home/approach";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import { AnimatedGem } from "@/components/brand/animated-gem";
import { GemMark } from "@/components/brand/gem-mark";
import { ServiceIcon } from "@/components/brand/service-icons";
import { Diamond, FacetedDivider } from "@/components/brand/facet";
import { ArrowUpRightIcon } from "@/components/icons";
import { primaryCta } from "@/config/site";
import { services } from "@/config/services";

const marqueeItems = [
  "Custom software",
  "AI automation",
  "Digital products",
  "Modern web",
  "Branding",
  "SEO",
  "Process optimisation",
  "Immersive experiences",
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
      {/* Hero (cinematic, animated product showcase) */}
      <Hero />

      {/* Capabilities marquee — continuous movement */}
      <section className="border-y border-border py-5 sm:py-6">
        <Marquee items={marqueeItems} />
      </section>

      {/* Belief band */}
      <Section
        spacing="default"
        bleed
        className="border-b border-accent/20 bg-surface-muted/30"
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

      {/* Services grid — line icon + drawing gold top-border + lift on hover */}
      <Section spacing="lg">
        <Reveal>
          <h2 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
            Everything it takes to compete in the digital era — under one roof.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={(index % 4) * 0.06}
              className="h-full"
            >
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface/30 p-6 transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1 hover:border-accent/40 hover:bg-surface"
              >
                {/* gold top-border draws in on hover */}
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-x-100" />
                <span className="text-accent">
                  <ServiceIcon slug={service.slug} />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
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

      {/* Approach — steps joined by a self-drawing gold thread */}
      <Approach />

      {/* Why Aurel — small gem markers */}
      <Section spacing="default" bleed className="border-t border-border">
        <Container>
          <div className="grid gap-12 md:grid-cols-3 lg:gap-16">
            {whyAurel.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <Diamond />
                <h3 className="mt-5 font-display text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing CTA — gem bookend with glow pulse, faint grid + watermark */}
      <Section spacing="lg" bleed className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-line-grid absolute inset-0 opacity-70" />
          <GemMark
            strokeWidth={1.5}
            className="absolute left-1/2 top-1/2 w-[min(80vw,560px)] -translate-x-1/2 -translate-y-1/2 text-accent opacity-[0.04]"
          />
        </div>

        <Container>
          <FacetedDivider className="mb-16 sm:mb-20" />
        </Container>

        <Container size="narrow" className="text-center">
          <Reveal className="flex justify-center">
            <div className="relative">
              <div
                aria-hidden
                className="hero-glow animate-glow-pulse absolute -inset-6 rounded-full blur-2xl"
              />
              <AnimatedGem className="relative w-24" />
            </div>
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
