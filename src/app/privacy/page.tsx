import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Lead } from "@/components/editorial/typography";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mojah Investments handles your data.",
  alternates: { canonical: "/privacy" },
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
            finalised policy before launch. Kenya&apos;s Data Protection Act
            applies to the enquiries collected through this site.
          </Lead>
          {/* This paragraph previously told visitors that nothing they typed
              reached a server — which stopped being true when the form began
              posting to `/api/contact`. A privacy notice is the one page where
              an out-of-date sentence is a misrepresentation rather than a
              typo, so it now describes what the form actually does. Check it
              again if the delivery route in `app/api/contact/route.ts`
              changes. */}
          <p
            data-reveal="ink"
            style={{ ["--reveal-delay" as string]: "0.15s" }}
            className="mt-6 text-[1.0625rem] leading-[1.8] text-ink-soft"
          >
            When you send the enquiry form on this site, what you type is
            submitted to our server and forwarded to us so we can reply. We use
            it to answer your enquiry and for nothing else. If the form cannot
            reach us — because you are offline, for example — it falls back to
            opening your own email application, and in that case nothing is
            sent anywhere until you press send yourself.
          </p>
        </Container>
      </section>
    </>
  );
}
