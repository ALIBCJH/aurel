import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { ProjectForm } from "@/components/contact/project-form";
import { Engraving } from "@/components/editorial/engraving";
import { Rule } from "@/components/editorial/rule";
import { Label, Marginalia } from "@/components/editorial/typography";
import { PointerTilt } from "@/components/motion/pointer-tilt";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell us where you want to go. Start a project with Aurel — we reply within one business day.",
};

const expectations = [
  {
    numeral: "I",
    title: "A reply within one business day",
    body: "From a person who has read your brief, not an autoresponder.",
  },
  {
    numeral: "II",
    title: "A conversation, not a pitch deck",
    body: "Thirty minutes on where you want to go and whether we are the right studio to take you there.",
  },
  {
    numeral: "III",
    title: "An honest answer",
    body: "If the work is not right for us, we will say so — and point you somewhere better.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a project"
        aside="Section 04 — enquiries"
        title={[
          "Tell us where",
          <>
            you want to <em key="g" className="foil font-normal italic">go.</em>
          </>,
        ]}
        description="We'll show you how technology gets you there."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* ---- the brief ---- */}
            <div data-reveal="fade" className="lg:col-span-7">
              <Label foil marker>
                The brief
              </Label>
              <div className="mt-8">
                <ProjectForm />
              </div>
            </div>

            {/* ---- the margin ---- */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-32">
                <PointerTilt amount={4}>
                  <div
                    data-reveal="plate"
                    className="relative aspect-square border border-rule bg-paper-deep"
                  >
                    <div aria-hidden className="plate-grid absolute inset-0 opacity-50" />
                    <div aria-hidden className="hatch absolute inset-0 opacity-40" />
                    <Engraving variant={8} />
                    <span aria-hidden className="absolute left-3 top-3 h-3 w-px bg-rule-strong" />
                    <span aria-hidden className="absolute left-3 top-3 h-px w-3 bg-rule-strong" />
                    <span aria-hidden className="absolute bottom-3 right-3 h-3 w-px bg-rule-strong" />
                    <span aria-hidden className="absolute bottom-3 right-3 h-px w-3 bg-rule-strong" />
                  </div>
                </PointerTilt>

                <div data-reveal="fade" className="mt-8">
                  <Label>Direct</Label>
                  <Rule className="mt-3" />
                  <dl className="mt-5 space-y-5">
                    <div>
                      <dt className="text-label-sm text-ink-mute">Email</dt>
                      <dd className="mt-1.5">
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="link-rule font-display text-lg font-light transition-colors duration-300 hover:text-foil"
                        >
                          {siteConfig.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-label-sm text-ink-mute">Location</dt>
                      <dd className="font-display mt-1.5 text-lg font-light">
                        {siteConfig.location}
                      </dd>
                    </div>
                  </dl>
                </div>

                <Marginalia figure="Note" className="mt-8">
                  Prefer to write it yourself? Email us directly — a paragraph
                  about where you are stuck is a perfectly good brief.
                </Marginalia>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── What happens next ────────────────────────────────────────────── */}
      <section className="border-t border-rule bg-paper-deep py-14 sm:py-16">
        <Container size="wide">
          <div className="flex items-baseline justify-between gap-6">
            <Label foil marker>
              What happens next
            </Label>
            <span className="text-label-sm text-ink-mute">Three steps</span>
          </div>
          <Rule className="mt-4" />

          <ul className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {expectations.map((item, index) => (
              <li
                key={item.title}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${index * 0.09}s` }}
              >
                <span className="text-label-sm text-foil">{item.numeral}</span>
                <h3 className="font-display mt-4 text-xl font-light leading-snug tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-mute">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
