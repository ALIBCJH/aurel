import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/icons";
import { cases } from "@/config/cases";
import { getService } from "@/config/services";
import { primaryCta } from "@/config/site";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Aurel — a real-time 3D showroom for R&J Interiors, and a searchable product-by-product site for Datani Insurance Agency. Both live, both linked.",
  alternates: { canonical: "/work" },
};

/**
 * The casebook.
 *
 * Two real projects rather than six invented ones. Each card links out to the
 * live product as well as to its case note, because a portfolio a visitor can
 * go and verify is worth more than one they have to take on trust.
 */
export default function WorkPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "Work", path: "/work" }])} />

      {/* ── The claim ────────────────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-20 lg:pt-24">
        <Container size="wide">
          <div className="max-w-4xl">
            <p data-reveal="fade" className="text-sm font-medium text-ink-mute">
              Work
            </p>
            <h1
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.05s" }}
              className="mt-5 text-[clamp(2.5rem,7vw,5.25rem)] font-semibold leading-[1] tracking-[-0.04em]"
            >
              Proof, not promises
            </h1>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.1s" }}
              className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.6] text-ink-soft sm:text-xl"
            >
              Two products, both live, both linked. Go and open them — that is
              rather the point of a portfolio.
            </p>
          </div>
        </Container>
      </section>

      {/* ── The entries ──────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24">
        <Container size="wide">
          <ul className="flex flex-col gap-16 sm:gap-20 lg:gap-28">
            {cases.map((entry, index) => (
              <li key={entry.slug}>
                <article>
                  <Link
                    href={`/work/${entry.slug}`}
                    data-reveal="plate"
                    className="group/shot block overflow-hidden rounded-[var(--radius-card)] bg-paper-deep"
                  >
                    <Image
                      src={entry.image.src}
                      alt={entry.image.alt}
                      width={1440}
                      height={900}
                      sizes="(min-width: 1536px) 88rem, 100vw"
                      priority={index === 0}
                      className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/shot:scale-[1.02]"
                    />
                  </Link>

                  <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-7">
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-mute">
                        <span className="tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span aria-hidden>·</span>
                        <span>{entry.sector}</span>
                        <span aria-hidden>·</span>
                        <span>{entry.year}</span>
                      </p>

                      <h2 className="mt-3 max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
                        <Link
                          href={`/work/${entry.slug}`}
                          className="transition-opacity duration-200 hover:opacity-70"
                        >
                          {entry.headline}
                        </Link>
                      </h2>

                      <p className="mt-4 max-w-xl text-[0.9375rem] leading-[1.7] text-ink-soft">
                        {entry.summary}
                      </p>
                    </div>

                    <div className="lg:col-span-4 lg:col-start-9">
                      <p className="text-lg font-medium tracking-[-0.02em]">
                        {entry.client}
                      </p>
                      <p className="mt-1 text-sm text-ink-mute">
                        {entry.location}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {entry.services.map((slug) => {
                          const service = getService(slug);
                          if (!service) return null;
                          return (
                            <li key={slug}>
                              <Link
                                href={`/services/${slug}`}
                                className="inline-flex min-h-11 items-center rounded-full border border-rule px-3.5 text-sm text-ink-soft transition-colors hover:bg-field"
                              >
                                {service.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <Link
                          href={`/work/${entry.slug}`}
                          className="tap inline-flex items-center gap-1.5 text-[0.9375rem] font-medium underline-offset-4 hover:underline"
                        >
                          Read the case note
                          <ArrowUpRightIcon width={13} height={13} />
                        </Link>
                        {entry.url && (
                          <a
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tap inline-flex items-center gap-1.5 text-[0.9375rem] text-ink-mute underline-offset-4 hover:text-ink hover:underline"
                          >
                            Visit the live site
                            <ArrowUpRightIcon width={13} height={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── On measurement ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="rounded-[var(--radius-card)] bg-paper-deep p-7 sm:p-10 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
                  We publish what we can stand behind
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-[0.9375rem] leading-[1.8] text-ink-soft">
                  You will notice these case notes describe what was built and
                  what it does, and do not claim a percentage uplift. That is
                  deliberate. Outcome figures only mean something against a
                  measured baseline, and where we do not have one we would rather
                  say so than publish a number that merely sounds good. As
                  results come in from work now running, they will appear here
                  with the method behind them.
                </p>
                <p className="mt-5 text-[0.9375rem] leading-[1.8] text-ink-mute">
                  Every entry also states plainly what our involvement was —
                  commissioned work, or our own venture. Ask any studio for that
                  distinction; it is often more informative than the portfolio
                  itself.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The invitation ───────────────────────────────────────────────── */}
      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container size="wide">
          <div className="rounded-[var(--radius-card)] bg-contrast px-7 py-16 text-center text-contrast-ink sm:px-10 sm:py-20 lg:py-28">
            <h2
              data-reveal="fade"
              className="mx-auto max-w-[18ch] text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
            >
              Your project could be the next entry
            </h2>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.08s" }}
              className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-contrast-mute"
            >
              Tell us what you are trying to build. We reply within one business
              day.
            </p>
            <div
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.16s" }}
              className="mt-10 flex justify-center"
            >
              <Button
                href={primaryCta.href}
                size="lg"
                className="bg-paper text-ink hover:opacity-90"
              >
                {primaryCta.label}
                <ArrowUpRightIcon width={15} height={15} />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
