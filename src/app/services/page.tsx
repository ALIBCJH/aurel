import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { GemPanel } from "@/components/brand/gem-panel";
import { ServiceIcon } from "@/components/brand/service-icons";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eight disciplines, one team — custom websites, software, AI automation, strategy, branding, SEO, process optimisation, and immersive experiences.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Everything it takes to compete — under one{" "}
            <span className="italic text-accent">roof</span>.
          </>
        }
        description="Eight disciplines, one team. Engage us for a single piece or the whole transformation."
      />

      <Section spacing="default">
        <div className="flex flex-col gap-24 sm:gap-28 lg:gap-36">
          {services.map((service, index) => {
            const flip = index % 2 === 1;
            return (
              <Reveal key={service.slug}>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  {/* text */}
                  <div className={cn(flip && "lg:order-2")}>
                    <div className="flex items-center gap-4">
                      <span className="text-accent">
                        <ServiceIcon slug={service.slug} width={36} height={36} />
                      </span>
                      <span className="font-display text-5xl text-accent/25 sm:text-6xl">
                        {service.index}
                      </span>
                    </div>
                    <h2 className="mt-5 text-3xl sm:text-4xl">{service.name}</h2>
                    <p className="mt-5 max-w-xl leading-relaxed text-muted">
                      {service.description}
                    </p>
                    <ul className="mt-7 flex flex-wrap gap-2.5">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground/80"
                        >
                          <span className="h-1 w-1 rotate-45 bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* visual */}
                  <div className={cn(flip && "lg:order-1")}>
                    <GemPanel index={index} className="aspect-[4/3] w-full" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Mid-page CTA strip */}
      <Section spacing="default" bleed className="border-y border-accent/20 bg-surface-muted/30">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="max-w-xl text-2xl sm:text-3xl">
            Not sure where to start?{" "}
            <span className="text-muted">So do most of our clients.</span>
          </h2>
          <Button href="/contact" size="lg" className="shrink-0">
            Book a discovery call
          </Button>
        </Container>
      </Section>
    </>
  );
}
