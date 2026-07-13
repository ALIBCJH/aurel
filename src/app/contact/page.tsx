import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell us where you want to go. Get in touch with the Aurel studio.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something ambitious."
        description="Tell us where you want to go — we'll help you get there with craft, precision, and technology that lasts."
      />

      <Section spacing="default">
        <Container size="narrow" className="px-0">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="mailto:hello@aurel.studio" external size="lg">
                hello@aurel.studio
              </Button>
              <Button href="/work" variant="secondary" size="lg">
                See our work
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-sm leading-relaxed text-muted">
              A full contact form will live here. For now, reach us directly by
              email.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
