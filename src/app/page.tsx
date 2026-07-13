import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { HeroBackground } from "@/components/layout/hero-background";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardEyebrow, CardTitle } from "@/components/ui/card";
import { ArrowUpRightIcon } from "@/components/icons";
import { primaryCta } from "@/config/site";

/**
 * Example homepage.
 *
 * This is NOT the finished site — it's a reference composition showing how the
 * foundation pieces (Section, Container, Reveal, Button, Card, tokens, type
 * system) fit together. Future pages should follow the same patterns.
 */

const marqueeItems = [
  "Custom Software",
  "AI Automation",
  "Digital Products",
  "Modern Web Experiences",
  "Creative Technology",
  "Design Systems",
  "Cloud Infrastructure",
  "Product Strategy",
];

const capabilities = [
  {
    eyebrow: "01",
    title: "Custom Software",
    body: "Bespoke platforms and products engineered for scale, reliability, and long-term maintainability.",
  },
  {
    eyebrow: "02",
    title: "AI Automation",
    body: "Intelligent systems and agents that remove manual work and compound your team's output.",
  },
  {
    eyebrow: "03",
    title: "Digital Products",
    body: "End-to-end product design and engineering, from first principles to production launch.",
  },
  {
    eyebrow: "04",
    title: "Web Experiences",
    body: "Fast, elegant, and memorable interfaces that make premium brands feel effortless.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — textured background, status badge; clears the fixed navbar */}
      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 lg:pt-52 lg:pb-28">
        <HeroBackground />
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/40 px-4 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-eyebrow text-foreground/70">
                  Available for new projects
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl">
                We build the technology that moves ambitious businesses{" "}
                <span className="text-accent italic">forward</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
                Aurel is a creative technology studio crafting custom software,
                AI automation, and modern digital experiences — with the
                precision of a product company and the taste of a design house.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                  <ArrowUpRightIcon
                    width={18}
                    height={18}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Button>
                <Button href="/work" variant="secondary" size="lg">
                  View our work
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Capabilities marquee — full-bleed, calm, pauses on hover */}
      <section className="border-y border-border py-6 sm:py-7">
        <Marquee items={marqueeItems} />
      </section>

      {/* Capabilities — demonstrates the Card + grid + Reveal stagger pattern */}
      <Section spacing="default">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h2 className="max-w-xl text-3xl sm:text-4xl">
              A studio built for the full arc of transformation.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              From strategy to shipped product — a single team accountable for
              outcomes, not hand-offs.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <Card interactive className="h-full">
                <CardEyebrow>{item.eyebrow}</CardEyebrow>
                <CardTitle className="mt-6 font-display">
                  {item.title}
                </CardTitle>
                <CardBody className="mt-3">{item.body}</CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Closing CTA band */}
      <Section spacing="lg" bleed className="border-t border-border">
        <Container size="narrow" className="text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl">
              Have something ambitious in mind?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-muted">
              Tell us where you want to go. We&apos;ll help you get there with
              craft, precision, and technology that lasts.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
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
