import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/layout/section-head";
import { OpeningSpread } from "@/components/home/opening-spread";
import { ProcessSteps } from "@/components/ui/process-steps";
import { Testimonials } from "@/components/ui/testimonial";
import { CtaSection } from "@/components/ui/cta-section";
import { Screenshot } from "@/components/ui/screenshot";
import { ArrowUpRightIcon } from "@/components/icons";
import { cases } from "@/config/cases";

/**
 * The home page.
 *
 * Order is an argument, and this one runs: what we do → why us → how it runs →
 * proof → what clients say → what to do next. Each section answers the
 * question the previous one raises, which is why the process sits before the
 * work rather than after it: a visitor who has just seen the disciplines wants
 * to know how a job actually runs before spending attention on a case.
 *
 * "What we do" is a heading with nothing under it — a reserved slot rather
 * than an accident. The six disciplines are still reachable from the masthead,
 * the thumb bar and the footer, and /services is still the canonical listing,
 * so nothing is orphaned. The obvious thing to put here is the six-service
 * index; it is left alone rather than half-built.
 *
 * The title leads with what is sold and where, not with positioning: "ICT
 * solutions provider" is a phrase businesses use about themselves and almost
 * nobody types into Google, whereas "computer repair" and the town name are
 * typed constantly. A title is a query-matching surface before it is a brand
 * surface.
 */
export const metadata: Metadata = {
  title: "ICT Solutions, Computer Repair & Networks in Nyeri",
  description:
    "Mojah Investments supplies and repairs computers, printers and photocopiers, installs networks and CCTV, and builds software and websites. Nyeri, Kenya. Open six days a week.",
  alternates: { canonical: "/" },
};

/** Why a business picks Mojah over the next supplier. Claims we can keep. */
const reasons = [
  {
    title: "One supplier for the whole thing",
    body: "The machines, the network they sit on, the software that runs on them and the cameras watching the door. When something breaks, there is nobody to point at somebody else — which is most of what makes ICT problems take weeks instead of days.",
  },
  {
    title: "We tell you when not to spend",
    body: "Sometimes the honest answer is that a machine is worth repairing, that you do not need the bigger package, or that the system you have is fine. A supplier paid to sell is not incentivised to say that. We would rather say it and keep the relationship.",
  },
  {
    title: "You can find us",
    body: "There is a shop at Old Batian House with people in it six days a week. You can walk in with a laptop under your arm. That is a different proposition from a phone number that answers when it feels like it.",
  },
  {
    title: "It is yours",
    body: "Accounts, passwords, logins and code are in your name from the start. Nothing is held back as a way of keeping you, and moving to somebody else is never made difficult.",
  },
];

/**
 * The five stages every job shares.
 *
 * Distinct from the per-discipline `process` in `services.ts`: that describes
 * how one kind of work runs, this describes the shape they all have in common.
 * It is written to cover a photocopier repair and a network installation
 * equally, because both go through it.
 */
const howWeWork = [
  {
    step: "01",
    title: "Understand",
    body: "What the business actually needs, before anything is quoted. It is the cheapest conversation in the job and the one most often skipped — and skipping it is why so much equipment is bought and then worked around.",
  },
  {
    step: "02",
    title: "Look at it",
    body: "A diagnosis on the bench, or a walk round the building. We do not price work we have not seen: a quote written from a phone description is a guess with a number on it.",
  },
  {
    step: "03",
    title: "Quote plainly",
    body: "What we propose, what it costs, and why — written down, with the reasoning attached so you can compare it fairly against anyone else's. Including where the cheaper option is the right one.",
  },
  {
    step: "04",
    title: "Do the work",
    body: "Installed, repaired or built, and tested doing the job it is actually there to do rather than merely powering on. Labelled and documented as we go, not afterwards.",
  },
  {
    step: "05",
    title: "Support it",
    body: "Handover, showing your team what they need to know, and being reachable when something changes. This is the stage most suppliers treat as over, and it is the one you feel every week.",
  },
];

export default function HomePage() {
  return (
    <>
      <OpeningSpread />

      {/* ── What we do ───────────────────────────────────────────────────── */}
      {/* Heading and deck only — see the note at the top of this file for why
          the slot beneath is reserved rather than filled. */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <SectionHead
            title="What we do"
            deck="Equipment supplied and repaired, networks installed, software and websites built, systems moved, cameras fitted. Take one of them, or hand us the lot."
          />
        </Container>
      </section>

      {/* ── Why Mojah ────────────────────────────────────────────────────── */}
      {/* The tinted band — the one warm surface per page. See globals.css. */}
      <section className="border-y border-rule bg-tint py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <SectionHead
            title="Why businesses choose Mojah"
            deck="Close enough that you can walk in with the machine. Broad enough that the network, the software and the cameras are one supplier's problem rather than three."
          />

          <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-2">
            {reasons.map((item, index) => (
              <div
                key={item.title}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${index * 0.07}s` }}
                className="rounded-[var(--radius-xl)] border border-rule bg-paper p-7 sm:p-9"
              >
                <span aria-hidden className="text-label-sm tabular-nums text-foil/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em] sm:text-[1.375rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-soft">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── How we work ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <SectionHead
            title="How we work"
            deck="The same five stages on every job, from a printer repair to a full network. You always know which one you are in."
          />
          <ProcessSteps steps={howWeWork} className="mt-12 sm:mt-16" />
        </Container>
      </section>

      {/* ── Work preview ─────────────────────────────────────────────────── */}
      <section className="border-t border-rule py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <SectionHead
            title="Work we have done"
            deck="Both of these are live and we have linked them. Open them and judge for yourself — that is the only reason they are here."
            action={
              <Button href="/work" variant="secondary" size="md">
                View our work
                <ArrowUpRightIcon width={14} height={14} />
              </Button>
            }
          />

          <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-2 lg:gap-10">
            {cases.map((entry, index) => (
              <article
                key={entry.slug}
                data-reveal="plate"
                style={{ ["--reveal-delay" as string]: `${index * 0.08}s` }}
              >
                <Link
                  href={`/work/${entry.slug}`}
                  className="group/case block rounded-[var(--radius-card)]"
                >
                  <Screenshot
                    src={entry.image.src}
                    alt={entry.image.alt}
                    href={entry.url}
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/case:-translate-y-1"
                  />
                </Link>

                {/* The sector used to sit opposite the title as a `shrink-0`
                    span. At 390px "Interior design & custom textiles" at that
                    letterspacing is wider than the gutter allows, so it could
                    not shrink and could not wrap, and pushed the whole document
                    to 402px — a home page that scrolled sideways on a phone.
                    Above the title it has the full measure and reads better. */}
                <div className="mt-6">
                  <span className="text-label-sm text-ink-mute">
                    {entry.sector}
                  </span>
                  <h3 className="mt-3 text-[1.25rem] font-semibold tracking-[-0.025em]">
                    <Link
                      href={`/work/${entry.slug}`}
                      className="transition-colors hover:text-foil"
                    >
                      {entry.client}
                    </Link>
                  </h3>
                  <p className="mt-2 max-w-md text-[0.9375rem] leading-[1.65] text-ink-soft">
                    {entry.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What clients say ─────────────────────────────────────────────── */}
      {/* Renders nothing until a real, attributed quote exists. The empty array
          in config/testimonials.ts is deliberate, not an oversight. */}
      <Testimonials deck="Quotes appear here as clients agree to be named. We do not write them ourselves." />

      <CtaSection secondary={{ label: "Explore our work", href: "/work" }} />
    </>
  );
}
