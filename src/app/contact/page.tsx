import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectForm } from "@/components/contact/project-form";
import { GemMark } from "@/components/brand/gem-mark";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell us where you want to go. Start a project with Aurel — we reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a project"
        title={
          <>
            Tell us where you want to{" "}
            <span className="italic text-accent">go</span>.
          </>
        }
        description="We'll show you how technology gets you there."
      />

      <Section spacing="default">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          {/* Form */}
          <Reveal>
            <ProjectForm />
          </Reveal>

          {/* Contact details */}
          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-muted/40 p-8">
              <GemMark className="w-12 text-accent/60" strokeWidth={1.75} />

              <div className="mt-8 space-y-8">
                <div>
                  <p className="text-eyebrow text-muted">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-2 block text-lg text-foreground transition-colors hover:text-accent"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <p className="text-eyebrow text-muted">Location</p>
                  <p className="mt-2 text-lg text-foreground">
                    {siteConfig.location}
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-accent/20 pt-6">
                <p className="text-sm leading-relaxed text-muted">
                  We reply within one business day.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
