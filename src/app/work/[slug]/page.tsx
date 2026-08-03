import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Rule } from "@/components/editorial/rule";
import { Label, Marginalia } from "@/components/editorial/typography";
import { ArrowUpRightIcon, ArrowRightIcon } from "@/components/icons";
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

      <PageHeader
        eyebrow={entry.client}
        aside={`${entry.sector} — ${entry.year}`}
        title={[entry.headline]}
        description={entry.summary}
      />

      {/* ── The plate ────────────────────────────────────────────────────── */}
      <section className="pt-10 sm:pt-12">
        <Container size="wide">
          <figure data-reveal="plate" className="border border-rule">
            <Image
              src={entry.image.src}
              alt={entry.image.alt}
              width={1440}
              height={900}
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="h-auto w-full"
              priority
            />
          </figure>
          <figcaption className="text-label-sm mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-mute">
            <span className="text-foil">Fig. {String(index + 1).padStart(2, "0")}</span>
            <span className="normal-case tracking-[0.1em]">
              {entry.client} · {entry.location}
            </span>
            {entry.url && (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-rule tap inline-flex items-center gap-1.5 whitespace-nowrap py-2 text-foil"
              >
                Visit the live site
                <ArrowUpRightIcon width={11} height={11} />
              </a>
            )}
          </figcaption>
        </Container>
      </section>

      {/* ── Our involvement — stated before anything else ────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Label foil marker>
                Our involvement
              </Label>
              <Rule className="mt-4" />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p
                data-reveal="ink"
                className="text-[1.0625rem] leading-[1.8] text-ink-soft"
              >
                {entry.relationship}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {disciplines.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="text-label-sm inline-flex min-h-11 items-center border border-rule px-4 text-ink-soft transition-colors duration-300 hover:border-foil hover:text-foil"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The challenge ────────────────────────────────────────────────── */}
      <section className="border-t border-rule bg-paper-deep py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Label foil marker>
                The challenge
              </Label>
              <Rule className="mt-4" />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p
                data-reveal="ink"
                className="text-[1.0625rem] leading-[1.8] text-ink-soft sm:text-lg"
              >
                {entry.challenge}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The approach ─────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <Label foil marker>
            Our approach
          </Label>
          <Rule className="mt-4" />

          <ol className="mt-10 lg:mt-12">
            {entry.approach.map((step, stepIndex) => (
              <li
                key={step.title}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${stepIndex * 0.07}s` }}
                className="grid gap-3 border-t border-rule py-7 first:border-t-0 first:pt-0 sm:py-9 lg:grid-cols-12 lg:gap-8"
              >
                <span className="text-label-sm text-foil/70 lg:col-span-1">
                  {String(stepIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-[1.6rem] font-light leading-tight tracking-[-0.02em] sm:text-[1.85rem] lg:col-span-5">
                  {step.title}
                </h2>
                <p className="max-w-2xl text-[0.9375rem] leading-[1.75] text-ink-soft lg:col-span-6">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── More of the product ──────────────────────────────────────────── */}
      {(entry.gallery.length > 0 || entry.mobileImage) && (
        <section className="border-t border-rule py-14 sm:py-16 lg:py-20">
          <Container size="wide">
            <Label foil marker>
              Screens
            </Label>
            <Rule className="mt-4" />

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:gap-10">
              {entry.gallery.map((shot) => (
                <figure key={shot.src} data-reveal="plate">
                  <div className="overflow-hidden rounded-lg border border-rule bg-paper-raised">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={1440}
                      height={900}
                      sizes="(min-width: 640px) 45vw, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm leading-relaxed text-ink-mute">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}

              {entry.mobileImage && (
                <figure data-reveal="plate" className="flex flex-col">
                  <div className="mx-auto w-full max-w-[15rem] overflow-hidden rounded-[1.5rem] border-[5px] border-paper-raised bg-paper-raised shadow-[0_24px_60px_-30px_rgb(0_0_0/0.7)]">
                    <Image
                      src={entry.mobileImage.src}
                      alt={entry.mobileImage.alt}
                      width={390}
                      height={844}
                      sizes="240px"
                      className="h-auto w-full"
                    />
                  </div>
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

      {/* ── The outcome, the facts, and the stack ────────────────────────── */}
      <section className="border-t border-rule bg-paper-deep py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Label foil marker>
                Where it stands
              </Label>
              <Rule className="mt-4" />
              <p
                data-reveal="ink"
                className="mt-8 text-[1.0625rem] leading-[1.8] text-ink-soft sm:text-lg"
              >
                {entry.outcome}
              </p>

              {/* Measured results only. See the note in config/cases.ts. */}
              {entry.metrics.length > 0 && (
                <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                  {entry.metrics.map((metric) => (
                    <div key={metric.label} data-reveal="fade">
                      <div aria-hidden className="rule-foil-h mb-4" />
                      <dt className="text-label-sm text-ink-mute">{metric.label}</dt>
                      <dd className="font-display mt-2 text-[clamp(2rem,4vw,2.75rem)] font-light leading-none tracking-[-0.03em] text-foil">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {entry.quote && (
                <blockquote
                  data-reveal="fade"
                  className="mt-12 border-l border-rule-foil pl-6"
                >
                  <p className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] font-light leading-[1.3] tracking-[-0.01em]">
                    {entry.quote.text}
                  </p>
                  <footer className="text-label-sm mt-5 text-ink-mute">
                    <span className="text-foil">{entry.quote.author}</span>
                    <span className="normal-case tracking-[0.1em]">
                      {" "}
                      · {entry.quote.role}
                    </span>
                  </footer>
                </blockquote>
              )}
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Label>Details</Label>
              <ul className="mt-5">
                {entry.facts.map((fact) => (
                  <li
                    key={fact.label}
                    data-reveal="fade"
                    className="flex items-baseline justify-between gap-4 border-b border-rule py-3.5"
                  >
                    <span className="text-label-sm text-ink-mute">{fact.label}</span>
                    <span className="text-right text-sm text-ink-soft">
                      {fact.value}
                    </span>
                  </li>
                ))}
              </ul>

              <Label className="mt-10 block">Built with</Label>
              <ul className="mt-4 flex flex-wrap gap-2">
                {entry.stack.map((item) => (
                  <li
                    key={item}
                    className="text-label-sm border border-rule px-3 py-2 text-ink-mute"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {entry.metrics.length === 0 && (
                <Marginalia figure="On numbers" className="mt-10">
                  No outcome figures are published for this project because no
                  baseline was measured before it began. We would rather leave
                  this empty than fill it with an estimate.
                </Marginalia>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Turn the page ────────────────────────────────────────────────── */}
      <section className="border-t border-rule-foil py-14 sm:py-16">
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Label foil marker>
                Start a project
              </Label>
              <p className="font-display mt-5 max-w-md text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.1] tracking-[-0.02em]">
                Tell us what you are trying to build.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                  <ArrowUpRightIcon width={14} height={14} />
                </Button>
                <Button href="/work" variant="ghost" size="md">
                  All work
                  <ArrowRightIcon width={13} height={13} />
                </Button>
              </div>
            </div>

            {cases.length > 1 && (
              <Link href={`/work/${next.slug}`} className="group/turn max-w-xs">
                <Label>Next →</Label>
                <p className="font-display mt-3 text-2xl font-light tracking-[-0.02em] transition-colors duration-300 group-hover/turn:text-foil">
                  {next.client}
                </p>
              </Link>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
