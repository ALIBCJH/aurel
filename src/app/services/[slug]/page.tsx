import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/config/services";
import { primaryCta } from "@/config/site";

// Pre-render every known service at build time.
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.description };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={service.name}
        description={service.tagline}
      />

      <Section spacing="default">
        <Container size="narrow" className="px-0">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">
              {service.description}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 leading-relaxed text-muted">
              This is a placeholder for the {service.name.toLowerCase()} detail
              page. Case studies, process, and engagement models will live here.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10">
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
