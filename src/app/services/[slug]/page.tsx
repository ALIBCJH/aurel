import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { GemPanel } from "@/components/brand/gem-panel";
import { getService, services } from "@/config/services";
import { primaryCta } from "@/config/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.summary };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const index = services.findIndex((s) => s.slug === service.slug);

  return (
    <>
      <PageHeader eyebrow={`Service ${service.index}`} title={service.name} />

      <Section spacing="default">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-muted">
                {service.description}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-10 text-eyebrow text-accent">
                What&apos;s included
              </h2>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 py-3.5 text-foreground/90"
                  >
                    <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10">
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <GemPanel index={index} className="aspect-[4/3] w-full lg:sticky lg:top-28" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
