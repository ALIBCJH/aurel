import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Screenshot } from "@/components/ui/screenshot";
import { Eyebrow } from "@/components/layout/section-head";
import { ArrowUpRightIcon } from "@/components/icons";
import { cases } from "@/config/cases";
import { getService } from "@/config/services";
import { primaryCta } from "@/config/site";
import { Testimonials } from "@/components/ui/testimonial";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Nexora Digital Projects & Case Studies",
  description:
    "Work Nexora has built in Kenya: a 3D showroom for R&J Interiors and a product-by-product website for Datani Insurance Agency. Both are live, and both are linked here so you can open them.",
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
          {/* Title and standfirst share the row rather than stacking down the
              left with the right half empty. That layout left roughly 600×250px
              of blank ground directly above the fold on this page, on /about
              and on /services — the first thing a visitor met on three of the
              five pages was a void. */}
          <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow data-reveal="fade">Work</Eyebrow>
              <h1
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: "0.05s" }}
                className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em]"
              >
                Work built for real businesses
              </h1>
            </div>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.1s" }}
              className="max-w-xl text-[1.0625rem] leading-[1.7] text-ink-soft lg:col-span-5 lg:col-start-8"
            >
              We do not build technology for the sake of technology. We build
              digital experiences that solve real business problems — and both
              of these are live and linked, so you can open them and judge.
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
                    className="group/shot block rounded-[var(--radius-card)]"
                  >
                    <Screenshot
                      src={entry.image.src}
                      alt={entry.image.alt}
                      href={entry.url}
                      phone={entry.mobileImage}
                      sizes="(min-width: 1536px) 88rem, 100vw"
                      priority={index === 0}
                      className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/shot:-translate-y-1"
                    />
                  </Link>

                  {/* Clears the phone inset, which hangs below the mat. */}
                  <div className="mt-7 grid gap-6 sm:mt-14 lg:grid-cols-12 lg:gap-12">
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
      {/* Renders nothing until a real, attributed quote exists — see
          config/testimonials.ts. The heading the brief asked for lives in the
          component, so it appears with the first quote and not before. */}
      <Testimonials />

      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container size="wide">
          <div className="rounded-[var(--radius-card)] border border-rule bg-paper-deep px-7 py-16 text-center sm:px-10 sm:py-20 lg:py-28">
            <h2
              data-reveal="fade"
              className="mx-auto max-w-[18ch] text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
            >
              Your project could be the next entry
            </h2>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.08s" }}
              className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-ink-soft"
            >
              Tell us what you are trying to build. We reply within one business
              day.
            </p>
            <div
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.16s" }}
              className="mt-10 flex justify-center"
            >
              <Button href={primaryCta.href} size="lg">
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
