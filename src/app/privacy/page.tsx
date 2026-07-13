import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Aurel handles your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use, and protect your information."
      />
      <Section spacing="default">
        <Container size="narrow" className="px-0">
          <Reveal>
            <p className="leading-relaxed text-muted">
              This is a placeholder privacy policy. Replace this content with
              your finalized policy before launch.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
