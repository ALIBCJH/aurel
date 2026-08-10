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
 * to know how an engagement actually runs before spending attention on a case.
 *
 * "What we do" is currently a heading with nothing under it — the six service
 * cards were removed and a replacement has not landed yet. The order above is
 * the intended argument, and the first step of it is presently unmade.
 *
 * The title leads with what is sold and where, not with positioning: "premium
 * digital solutions studio" is not a phrase anyone searches, and a title is a
 * query-matching surface before it is a brand surface.
 */
export const metadata: Metadata = {
  title: "Digital Solutions & Software Consulting in Kenya",
  description:
    "Nexora builds websites, mobile apps, SEO and digital presence for businesses in Kenya. Based in Nyeri and Nairobi. Starting prices published, and you own everything we build.",
  alternates: { canonical: "/" },
};

/** Why a business picks this studio over the next one. Claims we can keep. */
const reasons = [
  {
    title: "Built around your business",
    body: "We start from what the business needs, not from what we like building. Often the answer is smaller and cheaper than what you came in asking for, and we will say so before you spend the money.",
  },
  {
    title: "One team, start to finish",
    body: "Planning, design and engineering all happen here. The people who sit down with you at the start are the people who build it — nobody to hand you over to, and nobody to blame.",
  },
  {
    title: "Designed for growth",
    body: "A site nobody can find is a brochure. We build the visibility in from the start — search, profile, maps and measurement — rather than selling it back to you a year later.",
  },
  {
    title: "You own everything",
    body: "Code, content, domain, hosting and store accounts are in your name from day one. Nothing is held hostage as a retention strategy, and leaving is never made difficult.",
  },
];

/**
 * The five-stage engagement.
 *
 * Distinct from the per-discipline `process` in `services.ts`: that describes
 * how one kind of work runs, this describes the shape every engagement shares.
 */
const howWeWork = [
  {
    step: "01",
    title: "Discover",
    body: "Understand the business, the customers and the goal. Half a day that changes everything downstream — the cheapest hour in the project, and the one most often skipped.",
  },
  {
    step: "02",
    title: "Design",
    body: "Structure, words and strategy first, then interface. Designing before the content exists is how projects end up beautiful and mute.",
  },
  {
    step: "03",
    title: "Build",
    body: "Develop the website, application or system in two-week cycles, with something you can open at the end of each one. You watch it take shape rather than waiting months for a reveal.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Deploy it, connect it to the places your customers already look, and hand over every login. You leave the launch owning the whole thing.",
  },
  {
    step: "05",
    title: "Grow",
    body: "Search, analytics and steady optimisation once real usage shows what actually happens. This is the stage most suppliers skip, and it is where the return is.",
  },
];

export default function HomePage() {
  return (
    <>
      <OpeningSpread />

      {/* ── What we do ───────────────────────────────────────────────────── */}
      {/* Heading only, deliberately. The deck, the six service cards and the
          "All services" control were removed and nothing has replaced them
          yet — this is a reserved slot for whatever goes here next, not an
          accident. Until then the six disciplines are still reachable from the
          masthead, the thumb bar and the footer, and /services is still the
          canonical listing, so nothing has been orphaned. */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <SectionHead title="What we do" />
        </Container>
      </section>

      {/* ── Why Nexora ────────────────────────────────────────────────────── */}
      {/* The tinted band — the one warm surface per page. See globals.css. */}
      <section className="border-y border-rule bg-tint py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <SectionHead
            title="Why businesses choose Nexora"
            deck="Small enough that the person you meet is the person who builds it. Serious enough to hand you something you can run for years."
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
            deck="The same five stages on every engagement, whatever the discipline. You always know which one you are in."
          />
          <ProcessSteps steps={howWeWork} className="mt-12 sm:mt-16" />
        </Container>
      </section>

      {/* ── Work preview ─────────────────────────────────────────────────── */}
      <section className="border-t border-rule py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <SectionHead
            title="Work we have done"
            deck="Both of these are live and we have linked them. Open them and judge the work for yourself — that is the only reason they are here."
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
