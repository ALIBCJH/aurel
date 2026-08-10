import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Lead } from "@/components/editorial/typography";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms governing use of the Nexora website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        aside="Appendix B"
        title={["Terms of Service"]}
        description="The terms and conditions governing use of this site and our services."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="narrow">
          <Lead>
            This is a placeholder terms of service. Replace this content with
            your finalised terms before launch.
          </Lead>
        </Container>
      </section>
    </>
  );
}
