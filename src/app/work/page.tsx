import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardBody, CardEyebrow, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and case studies from the Aurel studio.",
};

// Placeholder project slots — replace with real case studies.
const placeholders = [
  { eyebrow: "Case Study", title: "Coming soon" },
  { eyebrow: "Case Study", title: "Coming soon" },
  { eyebrow: "Case Study", title: "Coming soon" },
  { eyebrow: "Case Study", title: "Coming soon" },
];

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Selected work, crafted with precision."
        description="A closer look at the products, platforms, and experiences we've shipped. Full case studies are on the way."
      />

      <Section spacing="default">
        <div className="grid gap-6 sm:grid-cols-2">
          {placeholders.map((item, index) => (
            <Reveal key={index} delay={index * 0.08}>
              <Card className="flex aspect-[4/3] flex-col justify-end">
                <CardEyebrow>{item.eyebrow}</CardEyebrow>
                <CardTitle className="mt-3 font-display">{item.title}</CardTitle>
                <CardBody className="mt-2">
                  Project details will be published here.
                </CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
