import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Lead } from "@/components/editorial/typography";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Aurel handles your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        aside="Appendix A"
        title={["Privacy Policy"]}
        description="How we collect, use, and protect your information."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="narrow">
          <Lead>
            This is a placeholder privacy policy. Replace this content with your
            finalised policy before launch.
          </Lead>
          <p
            data-reveal="ink"
            style={{ ["--reveal-delay" as string]: "0.15s" }}
            className="mt-6 text-[1.0625rem] leading-[1.8] text-ink-soft"
          >
            The contact form on this site composes an email in your own client —
            nothing you type is sent to or stored on our servers until you
            choose to send it yourself.
          </p>
        </Container>
      </section>
    </>
  );
}
