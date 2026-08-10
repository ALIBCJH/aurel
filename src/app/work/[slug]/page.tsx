import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Screenshot } from "@/components/ui/screenshot";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/icons";
import { cases, getCase } from "@/config/cases";
import { getService } from "@/config/services";
import { primaryCta, siteConfig } from "@/config/site";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/json-ld";

export function generateStaticParams() {
  return cases.map((entry) => ({ slug: entry.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCase(slug);
  if (!entry) return {};

  const path = `/work/${entry.slug}`;

  return {
    title: `${entry.client} — ${entry.headline}`,
    description: entry.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${entry.client} — ${siteConfig.name}`,
      description: entry.metaDescription,
      url: path,
      type: "article",
      images: [{ url: entry.image.src, alt: entry.image.alt }],
    },
  };
}

export default async function CaseNotePage({ params }: Params) {
  const { slug } = await params;
  const entry = getCase(slug);

  if (!entry) {
    notFound();
  }

  const index = cases.findIndex((c) => c.slug === entry.slug);
  const next = cases[(index + 1) % cases.length];
  const disciplines = entry.services
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service) => service !== undefined);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Work", path: "/work" },
          { name: entry.client, path: `/work/${entry.slug}` },
        ])}
      />

      {/* ── The claim ────────────────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-20 lg:pt-24">
        <Container size="wide">
          <Link
            href="/work"
            className="tap inline-flex items-center gap-1.5 text-sm text-ink-mute underline-offset-4 hover:text-ink hover:underline"
          >
            ← All work
          </Link>

          <div className="mt-6 max-w-4xl">
            <p data-reveal="fade" className="text-sm font-medium">
              <span className="text-foil">{entry.client}</span>
              <span className="text-ink-mute"> · {entry.sector} · {entry.year}</span>
            </p>
            <h1
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.05s" }}
              className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
            >
              {entry.headline}
            </h1>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.1s" }}
              className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.6] text-ink-soft sm:text-xl"
            >
              {entry.summary}
            </p>
          </div>
        </Container>
      </section>

      {/* ── The plate ────────────────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-14">
        <Container size="wide">
          <figure data-reveal="plate">
            <Screenshot
              src={entry.image.src}
              alt={entry.image.alt}
              href={entry.url}
              sizes="(min-width: 1536px) 88rem, 100vw"
              priority
            />
            {entry.url && (
              <figcaption className="mt-5">
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap inline-flex items-center gap-1.5 text-[0.9375rem] font-medium underline-offset-4 hover:underline"
                >
                  Visit the live site
                  <ArrowUpRightIcon width={13} height={13} />
                </a>
              </figcaption>
            )}
          </figure>
        </Container>
      </section>

      {/* ── Involvement + details ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-sm font-medium text-ink-mute">
                Our involvement
              </h2>
              <p
                data-reveal="fade"
                className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-soft"
              >
                {entry.relationship}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {disciplines.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-rule px-4 text-sm transition-colors hover:bg-field"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <dl className="rounded-[var(--radius-xl)] bg-paper-deep p-6 sm:p-7">
                {entry.facts.map((fact, factIndex) => (
                  <div
                    key={fact.label}
                    className={factIndex > 0 ? "mt-5" : undefined}
                  >
                    <dt className="text-sm text-ink-mute">{fact.label}</dt>
                    <dd className="mt-1 text-base font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The challenge ────────────────────────────────────────────────── */}
      <section className="bg-paper-deep py-16 sm:py-20 lg:py-28">
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
                The challenge
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p
                data-reveal="fade"
                className="text-[1.0625rem] leading-[1.75] text-ink-soft sm:text-lg"
              >
                {entry.challenge}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The approach ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28">
        <Container size="wide">
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.038em]">
            Our approach
          </h2>

          <ol className="mt-12 sm:mt-16">
            {entry.approach.map((step, stepIndex) => (
              <li
                key={step.title}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${stepIndex * 0.06}s` }}
                className="grid gap-3 border-t border-rule py-8 lg:grid-cols-12 lg:gap-12 lg:py-10"
              >
                <span className="text-sm tabular-nums text-ink-mute lg:col-span-1">
                  {String(stepIndex + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[1.375rem] font-semibold leading-snug tracking-[-0.025em] sm:text-2xl lg:col-span-4">
                  {step.title}
                </h3>
                <p className="max-w-2xl text-[0.9375rem] leading-[1.75] text-ink-soft lg:col-span-7">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Screens ──────────────────────────────────────────────────────── */}
      {(entry.gallery.length > 0 || entry.mobileImage) && (
        <section className="pb-16 sm:pb-20 lg:pb-28">
          <Container size="wide">
            <h2 className="text-sm font-medium text-ink-mute">Screens</h2>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:gap-10">
              {entry.gallery.map((shot) => (
                <figure key={shot.src} data-reveal="plate">
                  <Screenshot
                    src={shot.src}
                    alt={shot.alt}
                    sizes="(min-width: 640px) 45vw, 100vw"
                  />
                  <figcaption className="mt-3 text-sm leading-relaxed text-ink-mute">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}

              {entry.mobileImage && (
                <figure data-reveal="plate">
                  <Screenshot
                    src={entry.mobileImage.src}
                    alt={entry.mobileImage.alt}
                    portrait
                  />
                  <figcaption className="mt-3 text-center text-sm leading-relaxed text-ink-mute">
                    The same product on a phone — where most of this market
                    actually browses
                  </figcaption>
                </figure>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* ── Where it stands ──────────────────────────────────────────────── */}
      <section className="pb-16 sm:pb-20 lg:pb-28">
        <Container size="wide">
          <div className="rounded-[var(--radius-card)] bg-paper-deep p-7 sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
                  Where it stands
                </h2>
                <p
                  data-reveal="fade"
                  className="mt-6 text-[1.0625rem] leading-[1.75] text-ink-soft"
                >
                  {entry.outcome}
                </p>

                {/* Measured results only — see the note in config/cases.ts. */}
                {entry.metrics.length > 0 && (
                  <dl className="mt-10 grid gap-8 sm:grid-cols-3">
                    {entry.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="text-sm text-ink-mute">{metric.label}</dt>
                        <dd className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.035em]">
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {entry.quote && (
                  <blockquote className="mt-10 border-l-2 border-ink pl-6">
                    <p className="text-[clamp(1.125rem,2.2vw,1.5rem)] font-medium leading-[1.4] tracking-[-0.02em]">
                      {entry.quote.text}
                    </p>
                    <footer className="mt-4 text-sm text-ink-mute">
                      <span className="font-medium text-ink">
                        {entry.quote.author}
                      </span>
                      {" · "}
                      {entry.quote.role}
                    </footer>
                  </blockquote>
                )}
              </div>

              <div className="lg:col-span-4 lg:col-start-9">
                <h3 className="text-sm text-ink-mute">Built with</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {entry.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-rule px-3 py-1.5 text-sm text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {entry.metrics.length === 0 && (
                  <p className="mt-8 border-t border-rule pt-6 text-sm leading-relaxed text-ink-mute">
                    No outcome figures are published for this project, because no
                    baseline was measured before it began. We would rather leave
                    this empty than fill it with an estimate.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Turn the page ────────────────────────────────────────────────── */}
      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-10 border-t border-rule pt-12">
            <div>
              <h2 className="max-w-md text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
                Tell us what you are trying to build
              </h2>
              <div className="mt-8">
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                  <ArrowUpRightIcon width={15} height={15} />
                </Button>
              </div>
            </div>

            {cases.length > 1 && (
              <Link href={`/work/${next.slug}`} className="group/turn max-w-xs">
                <span className="text-sm text-ink-mute">Next project</span>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] transition-opacity duration-200 group-hover/turn:opacity-70">
                  {next.client} →
                </p>
              </Link>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
