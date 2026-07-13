import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms governing use of the Aurel website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms and conditions governing use of this site and our services."
      />
      <Section spacing="default">
        <Container size="narrow" className="px-0">
          <Reveal>
            <p className="leading-relaxed text-muted">
              This is a placeholder terms of service. Replace this content with
              your finalized terms before launch.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
