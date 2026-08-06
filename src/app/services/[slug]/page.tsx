import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Engraving } from "@/components/editorial/engraving";
import { Rule } from "@/components/editorial/rule";
import { Label, Marginalia } from "@/components/editorial/typography";
import { PointerTilt } from "@/components/motion/pointer-tilt";
import { ArrowUpRightIcon, ArrowRightIcon } from "@/components/icons";
import { casesForService } from "@/config/cases";
import { getService, services } from "@/config/services";
import { primaryCta, siteConfig } from "@/config/site";
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/components/seo/json-ld";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const path = `/services/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${service.seoTitle} — ${siteConfig.name}`,
      description: service.metaDescription,
      url: path,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const index = services.findIndex((s) => s.slug === service.slug);
  const previous = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];

  // FAQ markup is only emitted because the questions and answers are rendered
  // visibly below. Google treats hidden FAQ markup as a guidelines violation.
  const faqSchema = buildFaqSchema(service.faqs);

  // Real work that drew on this discipline. A claim about what we build is
  // worth far less than a screenshot of something we built.
  const proof = casesForService(service.slug);

  return (
    <>
      <JsonLd
        data={[
          buildServiceSchema(service),
          buildBreadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <PageHeader
        eyebrow={`Discipline ${service.index}`}
        aside={`Section 01 — ${service.index} of ${String(services.length).padStart(2, "0")}`}
        title={[service.headline]}
        description={service.description}
      />

      {/* ── The problem ──────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Label foil marker>
                Where this starts
              </Label>
              <Rule className="mt-4" />
              <p
                data-reveal="ink"
                className="mt-8 text-[1.0625rem] leading-[1.8] text-ink-soft sm:text-lg"
              >
                {service.problem}
              </p>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                <PointerTilt amount={4}>
                  <figure data-reveal="plate">
                    <div className="relative aspect-square border border-rule bg-paper-deep">
                      <div aria-hidden className="plate-grid absolute inset-0 opacity-50" />
                      <div aria-hidden className="hatch absolute inset-0 opacity-40" />
                      <Engraving variant={index} />
                      <span aria-hidden className="absolute left-3 top-3 h-3 w-px bg-rule-strong" />
                      <span aria-hidden className="absolute left-3 top-3 h-px w-3 bg-rule-strong" />
                    </div>
                    <figcaption className="text-label-sm mt-3 text-ink-mute">
                      <span className="text-foil">Fig. {service.index}</span>{" "}
                      <span className="normal-case tracking-[0.14em]">
                        {service.name}
                      </span>
                    </figcaption>
                  </figure>
                </PointerTilt>

                <Marginalia figure="Note" className="mt-10">
                  Every engagement is carried by one team, end to end — the
                  people who scope it are the people who build it.
                </Marginalia>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── What we build ────────────────────────────────────────────────── */}
      <section className="border-t border-rule bg-paper-deep py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <Label foil marker>
            What we build
          </Label>
          <Rule className="mt-4" />

          <ul className="mt-10 lg:mt-12">
            {service.deliverables.map((item, itemIndex) => (
              <li
                key={item.title}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${itemIndex * 0.07}s` }}
                className="grid gap-3 border-t border-rule py-7 first:border-t-0 first:pt-0 sm:py-9 lg:grid-cols-12 lg:gap-8"
              >
                <span className="text-label-sm text-foil/70 lg:col-span-1">
                  {String(itemIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-[1.6rem] font-light leading-tight tracking-[-0.02em] sm:text-[1.85rem] lg:col-span-5">
                  {item.title}
                </h2>
                <p className="max-w-2xl text-[0.9375rem] leading-[1.75] text-ink-soft lg:col-span-6">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── The local angle ──────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Label foil marker>
                Built for here
              </Label>
              <Rule className="mt-4" />
              <h2 className="font-display mt-8 text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-[1.08] tracking-[-0.02em]">
                {service.localAngle.title}
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 lg:pt-2">
              <p
                data-reveal="ink"
                className="text-[1.0625rem] leading-[1.8] text-ink-soft"
              >
                {service.localAngle.body}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── How it runs ──────────────────────────────────────────────────── */}
      <section className="border-t border-rule py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="flex items-baseline justify-between gap-6">
            <Label foil marker>
              How it runs
            </Label>
            <span className="text-label-sm hidden text-ink-mute sm:inline">
              {service.process.length} stages
            </span>
          </div>
          <Rule className="mt-4" />

          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-10">
            {service.process.map((stage, stageIndex) => (
              <li
                key={stage.step}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${stageIndex * 0.08}s` }}
              >
                <div aria-hidden className="rule-foil-h mb-5" />
                <span className="text-label-sm text-foil">{stage.step}</span>
                <h3 className="font-display mt-3 text-2xl font-light tracking-[-0.02em]">
                  {stage.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-mute">
                  {stage.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Included & commercials ───────────────────────────────────────── */}
      <section className="border-t border-rule bg-paper-deep py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Label foil marker>
                What an engagement includes
              </Label>
              <Rule className="mt-4" />
              <ul className="mt-2">
                {service.includes.map((item, itemIndex) => (
                  <li
                    key={item}
                    data-reveal="fade"
                    style={{ ["--reveal-delay" as string]: `${itemIndex * 0.06}s` }}
                    className="flex items-baseline gap-5 border-b border-rule py-4"
                  >
                    <span className="text-label-sm w-6 shrink-0 text-foil/70">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl font-light tracking-[-0.01em]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Label foil marker>
                Commercials
              </Label>
              <Rule className="mt-4" />
              <p
                data-reveal="fade"
                className="font-display mt-8 text-[clamp(2.25rem,5vw,3.25rem)] font-light leading-none tracking-[-0.03em]"
              >
                <span className="text-label-sm mr-3 align-middle text-ink-mute">
                  From
                </span>
                <span className="foil-flat">{service.pricing.from}</span>
              </p>
              <p
                data-reveal="ink"
                className="mt-6 text-[0.9375rem] leading-[1.75] text-ink-soft"
              >
                {service.pricing.note}
              </p>
              <div data-reveal="fade" className="mt-9">
                <Button href={primaryCta.href} size="lg" className="w-full sm:w-auto">
                  {primaryCta.label}
                  <ArrowUpRightIcon width={14} height={14} />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Proof ────────────────────────────────────────────────────────── */}
      {proof.length > 0 && (
        <section className="border-t border-rule py-14 sm:py-16 lg:py-20">
          <Container size="wide">
            <div className="flex items-baseline justify-between gap-6">
              <Label foil marker>
                Where we have done this
              </Label>
              <Link
                href="/work"
                className="text-label-sm tap hidden text-ink-mute transition-colors duration-200 hover:text-foil sm:inline-flex"
              >
                All work →
              </Link>
            </div>
            <Rule className="mt-4" />

            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-12 lg:gap-12">
              {proof.map((entry) => (
                <article key={entry.slug} data-reveal="plate">
                  <Link
                    href={`/work/${entry.slug}`}
                    className="group/proof block overflow-hidden rounded-lg border border-rule bg-paper-raised"
                  >
                    <Image
                      src={entry.image.src}
                      alt={entry.image.alt}
                      width={1440}
                      height={900}
                      sizes="(min-width: 640px) 45vw, 100vw"
                      className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/proof:scale-[1.02]"
                    />
                  </Link>
                  <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">
                    <Link
                      href={`/work/${entry.slug}`}
                      className="tap transition-colors duration-200 hover:text-foil"
                    >
                      {entry.client}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-mute">
                    {entry.summary}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Questions ────────────────────────────────────────────────────── */}
      <section className="border-t border-rule py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Label foil marker>
                Questions
              </Label>
              <Rule className="mt-4" />
              <h2 className="font-display mt-8 text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-[1.08] tracking-[-0.02em]">
                The things people ask{" "}
                <em className="foil font-normal italic">before they commit.</em>
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <dl>
                {service.faqs.map((faq, faqIndex) => (
                  <div
                    key={faq.question}
                    data-reveal="fade"
                    style={{ ["--reveal-delay" as string]: `${faqIndex * 0.05}s` }}
                    className="border-t border-rule py-7 first:border-t-0 first:pt-0"
                  >
                    <dt className="font-display text-xl font-light leading-snug tracking-[-0.01em] sm:text-[1.375rem]">
                      {faq.question}
                    </dt>
                    <dd className="mt-3 max-w-2xl text-[0.9375rem] leading-[1.75] text-ink-soft">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Turn the page ────────────────────────────────────────────────── */}
      <section className="border-t border-rule bg-paper-deep py-12">
        <Container size="wide">
          <div className="mb-8 flex flex-wrap items-center gap-6">
            <Button href="/services" variant="ghost" size="md">
              All disciplines
              <ArrowRightIcon width={13} height={13} />
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Link
              href={`/services/${previous.slug}`}
              className="group/turn border-t border-rule pt-5 sm:border-t-0 sm:pt-0"
            >
              <Label>← Previous</Label>
              <p className="font-display mt-3 text-2xl font-light tracking-[-0.02em] transition-colors duration-300 group-hover/turn:text-foil">
                {previous.name}
              </p>
            </Link>
            <Link
              href={`/services/${next.slug}`}
              className="group/turn border-t border-rule pt-5 sm:border-t-0 sm:pt-0 sm:text-right"
            >
              <Label>Next →</Label>
              <p className="font-display mt-3 text-2xl font-light tracking-[-0.02em] transition-colors duration-300 group-hover/turn:text-foil">
                {next.name}
              </p>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
