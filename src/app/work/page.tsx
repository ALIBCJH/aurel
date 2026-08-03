import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Rule, FigureRule } from "@/components/editorial/rule";
import { Display, Label, Marginalia } from "@/components/editorial/typography";
import { ArrowUpRightIcon } from "@/components/icons";
import { cases } from "@/config/cases";
import { primaryCta } from "@/config/site";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Aurel — a real-time 3D showroom for R&J Interiors, and a searchable product-by-product site for Datani Insurance Agency.",
  alternates: { canonical: "/work" },
};

/**
 * The casebook.
 *
 * This page used to list six invented projects as a "forthcoming" list. Two
 * real ones beat six imagined ones: the entries below are live, in production,
 * and linked so anyone can go and check. Each states plainly what our
 * involvement was rather than implying a client relationship that did not
 * exist — see the note at the top of config/cases.ts.
 */
export default function WorkPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "Work", path: "/work" }])} />

      <PageHeader
        eyebrow="The casebook"
        aside={`Section 02 — ${cases.length} entries`}
        title={[
          "Proof,",
          <>
            not <em key="p" className="foil font-normal italic">promises.</em>
          </>,
        ]}
        description="Two projects, both live, both linked. Go and look at them — that is rather the point of a portfolio."
      />

      {/* ── The entries ──────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <ul className="flex flex-col gap-16 sm:gap-20 lg:gap-28">
            {cases.map((entry, index) => (
              <li key={entry.slug}>
                <article className="grid gap-8 lg:grid-cols-12 lg:gap-14">
                  {/* the plate */}
                  <div
                    className={
                      index % 2 === 1
                        ? "lg:order-2 lg:col-span-7"
                        : "lg:col-span-7"
                    }
                  >
                    <Link
                      href={`/work/${entry.slug}`}
                      data-reveal="plate"
                      className="group/plate block overflow-hidden border border-rule"
                    >
                      <Image
                        src={entry.image.src}
                        alt={entry.image.alt}
                        width={1440}
                        height={900}
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/plate:scale-[1.02]"
                        priority={index === 0}
                      />
                    </Link>
                  </div>

                  {/* the entry */}
                  <div
                    className={
                      index % 2 === 1
                        ? "lg:order-1 lg:col-span-5 lg:pt-4"
                        : "lg:col-span-5 lg:pt-4"
                    }
                  >
                    <div
                      data-reveal="fade"
                      className="flex items-baseline justify-between gap-4"
                    >
                      <Label foil marker>
                        {String(index + 1).padStart(2, "0")} — {entry.sector}
                      </Label>
                      <span className="text-label-sm text-ink-mute">
                        {entry.year}
                      </span>
                    </div>
                    <Rule className="mt-4" />

                    <h2 className="font-display mt-7 text-[clamp(1.85rem,3.4vw,2.75rem)] font-light leading-[1.06] tracking-[-0.02em]">
                      <Link
                        href={`/work/${entry.slug}`}
                        className="transition-colors duration-300 hover:text-foil"
                      >
                        {entry.headline}
                      </Link>
                    </h2>

                    <p
                      data-reveal="ink"
                      className="mt-5 text-[0.9375rem] leading-[1.75] text-ink-soft"
                    >
                      {entry.summary}
                    </p>

                    <p className="text-label-sm mt-6 text-ink-mute">
                      <span className="text-foil">{entry.client}</span>
                      <span className="normal-case tracking-[0.1em]">
                        {" "}
                        · {entry.location}
                      </span>
                    </p>

                    <div
                      data-reveal="fade"
                      className="mt-8 flex flex-wrap items-center gap-6"
                    >
                      <Button
                        href={`/work/${entry.slug}`}
                        variant="secondary"
                        size="md"
                      >
                        Read the case note
                        <ArrowUpRightIcon width={13} height={13} />
                      </Button>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── On measurement ───────────────────────────────────────────────── */}
      <section className="border-t border-rule bg-paper-deep py-14 sm:py-16">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Label foil marker>
                On measurement
              </Label>
              <Rule className="mt-4" />
              <h2 className="font-display mt-8 text-[clamp(1.6rem,3vw,2.25rem)] font-light leading-[1.1] tracking-[-0.02em]">
                We publish what we can{" "}
                <em className="foil font-normal italic">stand behind.</em>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
              <p
                data-reveal="ink"
                className="text-[0.9375rem] leading-[1.8] text-ink-soft"
              >
                You will notice these case notes describe what was built and what
                it does, and do not claim a percentage uplift. That is
                deliberate. Outcome figures only mean something against a
                measured baseline, and where we do not have one we would rather
                say so than publish a number that merely sounds good. As results
                come in from work now running, they will appear here with the
                method behind them.
              </p>
              <Marginalia figure="Note" className="mt-8">
                Every entry states plainly what our involvement was —
                commissioned work, or our own venture. Ask any studio for that
                distinction; it is often more informative than the portfolio
                itself.
              </Marginalia>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The invitation ───────────────────────────────────────────────── */}
      <section className="border-t border-rule-foil py-16 sm:py-20 lg:py-24">
        <Container size="narrow" className="text-center">
          <FigureRule className="mb-12" />
          <Display
            delay={0.1}
            lines={[
              "Your project could be",
              <>
                the next <em key="e" className="foil font-normal italic">entry.</em>
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
