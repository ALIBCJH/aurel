import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { ArrowUpRightIcon } from "@/components/icons";
import { services } from "@/config/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software, AI solutions, digital experiences, and automation — delivered end to end.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Capabilities across the full arc of transformation."
        description="One accountable team, from strategy to shipped product. Explore how we help ambitious businesses evolve."
      />

      <Section spacing="default">
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.08}>
              <Link href={`/services/${service.slug}`} className="block h-full">
                <Card interactive className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="font-display">
                      {service.name}
                    </CardTitle>
                    <ArrowUpRightIcon className="mt-1 shrink-0 text-muted" />
                  </div>
                  <CardBody className="mt-3">{service.description}</CardBody>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
