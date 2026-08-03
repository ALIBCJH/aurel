import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Engraving } from "@/components/editorial/engraving";
import { Rule, FigureRule } from "@/components/editorial/rule";
import {
  Display,
  Label,
  Lead,
  Marginalia,
  PullQuote,
} from "@/components/editorial/typography";
import { PointerTilt } from "@/components/motion/pointer-tilt";
import { ArrowUpRightIcon } from "@/components/icons";
import { primaryCta } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aurel is a technology partner built like a design house — engineering, design, and strategy under one roof.",
};

const principles = [
  {
    numeral: "I",
    title: "Craft over speed",
    body: "We move deliberately, because quality is what people remember long after the deadline is forgotten.",
  },
  {
    numeral: "II",
    title: "Explicit over clever",
    body: "Clear systems others can build on beat clever ones only we understand. We optimise for the next person.",
  },
  {
    numeral: "III",
    title: "Partners, not vendors",
    body: "Your outcome is the brief. We stay accountable from the first idea to well past launch.",
  },
  {
    numeral: "IV",
    title: "Built to last",
    body: "We choose the durable path over the quick one, protecting your investment for years rather than months.",
  },
];

const masthead = [
  {
    role: "Founder & Principal Engineer",
    owns: "Architecture, delivery, and the final call on whether something is good enough to ship.",
  },
  {
    role: "Design Lead",
    owns: "Identity, interface, and the standard every screen in this studio is held to.",
  },
  {
    role: "AI & Automation",
    owns: "The systems that quietly take repetitive work off your team's hands.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The studio"
        aside="Section 03 — about"
        title={[
          "A technology partner,",
          <>
            built like a{" "}
            <em key="d" className="foil font-normal italic">design house.</em>
          </>,
        ]}
        description="Small enough to care about every detail. Serious enough to build what lasts."
        figure={7}
        figureLabel="The studio mark"
      />

      {/* ── The story ────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Lead>
                Aurel was founded on a simple frustration: the calibre of craft
                usually reserved for enterprises was out of reach for the
                ambitious small and medium businesses who needed it most.
              </Lead>
              <p
                data-reveal="ink"
                style={{ ["--reveal-delay" as string]: "0.15s" }}
                className="mt-7 text-[1.0625rem] leading-[1.8] text-ink-soft"
              >
                So we built a studio that combines engineering, design, and
                strategy under one roof — owning every step from the first idea
                to launch, and standing behind the result long after the
                invoice is settled.
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Marginalia figure="Est. Nairobi">
                One team, working worldwide. Small by choice — it is the only way
                to keep the standard we set for ourselves.
              </Marginalia>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The philosophy ───────────────────────────────────────────────── */}
      <section className="border-y border-rule bg-paper-deep py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Label foil marker>
                The philosophy
              </Label>
              <Rule className="mt-4" />
              <PullQuote className="mt-12">
                Design first. Build second.{" "}
                <em className="foil font-normal italic">Automate last.</em>
              </PullQuote>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
              <p
                data-reveal="ink"
                className="text-[0.9375rem] leading-[1.8] text-ink-soft"
              >
                A deliberate process protects your budget and produces software
                you can trust. We solve the right problem before we write code,
                and automate only once the foundations are sound.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The principles ───────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <Label foil marker>
                Standing orders
              </Label>
              <Rule className="mt-4" />
              <Display
                delay={0.1}
                lines={["What we", <em key="h" className="foil font-normal italic">hold to.</em>]}
                className="mt-8 text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.05]"
              />
              <div data-reveal="plate" className="mt-12 hidden max-w-[14rem] lg:block">
                <PointerTilt amount={4}>
                  <div className="relative aspect-square border border-rule">
                    <div aria-hidden className="plate-grid absolute inset-0 opacity-40" />
                    <Engraving variant={6} />
                  </div>
                </PointerTilt>
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ul>
                {principles.map((item, index) => (
                  <li
                    key={item.title}
                    data-reveal="fade"
                    style={{ ["--reveal-delay" as string]: `${index * 0.08}s` }}
                    className="border-t border-rule py-7 first:border-t-0 first:pt-0 sm:py-9"
                  >
                    <div className="flex items-baseline gap-5 sm:gap-8">
                      <span className="text-label-sm w-7 shrink-0 text-foil">
                        {item.numeral}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl font-light tracking-[-0.02em] sm:text-[1.75rem]">
                          {item.title}
                        </h3>
                        <p className="mt-2.5 max-w-xl text-[0.9375rem] leading-relaxed text-ink-mute">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The masthead ─────────────────────────────────────────────────── */}
      <section className="border-t border-rule bg-paper-deep py-14 sm:py-16">
        <Container size="wide">
          <div className="flex items-baseline justify-between gap-6">
            <Label foil marker>
              The masthead
            </Label>
            <span className="text-label-sm text-ink-mute">
              Names published as the studio grows
            </span>
          </div>
          <Rule className="mt-4" />

          <ul className="mt-10">
            {masthead.map((member, index) => (
              <li
                key={member.role}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${index * 0.09}s` }}
                className="grid items-baseline gap-3 border-b border-rule py-6 sm:grid-cols-12 sm:gap-8"
              >
                <span className="text-label-sm text-foil/70 sm:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-light tracking-[-0.01em] sm:col-span-4 sm:text-2xl">
                  {member.role}
                </h3>
                <p className="text-sm leading-relaxed text-ink-mute sm:col-span-7">
                  {member.owns}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── The invitation ───────────────────────────────────────────────── */}
      <section className="border-t border-rule-foil py-16 sm:py-20 lg:py-24">
        <Container size="narrow" className="text-center">
          <FigureRule className="mb-12" />
          <Display
            delay={0.1}
            lines={[
              "Let's build something",
              <>
                worth <em key="w" className="foil font-normal italic">remembering.</em>
              </>,
            ]}
            className="text-[clamp(2rem,4.8vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
          />
          <div
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "0.4s" }}
            className="mt-12 flex justify-center"
          >
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
              <ArrowUpRightIcon width={14} height={14} />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
