import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ServiceReel } from "@/components/services/service-reel";
import { Eyebrow, SectionHead } from "@/components/layout/section-head";
import { ArrowUpRightIcon } from "@/components/icons";
import { services } from "@/config/services";
import { primaryCta } from "@/config/site";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Website, app, AI and SEO services in Kenya",
  description:
    "What Aurel builds for Kenyan businesses: websites, mobile apps, AI automation and SEO. One team for all four, with starting prices published up front.",
  alternates: { canonical: "/services" },
};

/**
 * The services page.
 *
 * Structure: a claim, an interactive reel of the four disciplines, then one
 * full-bleed band per service alternating between the page tone and its
 * inverse. Each band carries a real screenshot, so the page argues from
 * evidence rather than adjectives.
 *
 * The pricing strip near the end is the part most competitors omit. Publishing
 * ranges filters out bad-fit enquiries before they cost anyone a call, and
 * "how much does a website cost in Kenya" is among the highest-intent things
 * anyone in this market types into Google.
 */

/** The shared four-stage shape every engagement follows, whatever the discipline. */
const engagement = [
  {
    step: "01",
    title: "Discovery",
    body: "Half a day on your business, your customer, and the outcome that matters. It is the cheapest hour in the project and it changes everything downstream.",
  },
  {
    step: "02",
    title: "Design",
    body: "Structure and words first, then interface. Designing before the content exists is how projects end up beautiful and mute.",
  },
  {
    step: "03",
    title: "Build",
    body: "Two-week cycles with something you can open at the end of each. You watch it take shape rather than waiting months for a reveal.",
  },
  {
    step: "04",
    title: "Live",
    body: "Launch, measurement, handover, and a first round of changes driven by what real usage shows. You own everything at the end of it.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([{ name: "Services", path: "/services" }])}
      />

      {/* ── The claim ────────────────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-20 lg:pt-24">
        <Container size="wide">
          <div className="max-w-4xl">
            <Eyebrow data-reveal="fade">Services</Eyebrow>
            <h1
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.05s" }}
              className="mt-5 text-[clamp(2.5rem,7vw,5.25rem)] font-semibold leading-[1] tracking-[-0.04em]"
            >
              Four things, done properly
            </h1>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.1s" }}
              className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.6] text-ink-soft sm:text-xl"
            >
              We used to list eight. Four is the honest number — the four things
              we actually do, and do properly. Hire us for one of them or for all
              four; the standard is the same either way.
            </p>
          </div>

          <div
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "0.16s" }}
            className="mt-14 sm:mt-20"
          >
            <ServiceReel />
          </div>
        </Container>
      </section>

      {/* ── One band per discipline ──────────────────────────────────────── */}
      {services.map((service, index) => {
        const loud = index % 2 === 0;
        const flip = index % 2 === 1;

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={cn(
              "mt-16 scroll-mt-24 py-16 sm:mt-20 sm:py-20 lg:py-28",
              loud && "bg-paper-deep",
            )}
          >
            <Container size="wide">
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                {/* the words */}
                <div className={cn("lg:col-span-6", flip && "lg:order-2 lg:col-start-7")}>
                  <span
                    className={cn(
                      "text-sm tabular-nums text-ink-mute",
                    )}
                  >
                    {service.index}
                  </span>

                  <h2
                    data-reveal="fade"
                    className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.038em]"
                  >
                    {service.headline}
                  </h2>

                  <p
                    data-reveal="fade"
                    style={{ ["--reveal-delay" as string]: "0.06s" }}
                    className={cn(
                      "mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-ink-soft",
                    )}
                  >
                    {service.description}
                  </p>

                  {/* what an engagement includes, as pills */}
                  <ul
                    data-reveal="fade"
                    style={{ ["--reveal-delay" as string]: "0.12s" }}
                    className="mt-8 flex flex-wrap gap-2"
                  >
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className={cn(
                          "rounded-full border border-rule px-3.5 py-2 text-sm text-ink-soft",
                        )}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div
                    data-reveal="fade"
                    style={{ ["--reveal-delay" as string]: "0.18s" }}
                    className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
                  >
                    <Button
                      href={`/services/${service.slug}`}
                      size="md"
                    >
                      Explore {service.name.toLowerCase()}
                      <ArrowUpRightIcon width={14} height={14} />
                    </Button>
                    <p className="text-sm">
                      <span className="text-ink-mute">From </span>
                      <span className="font-medium">{service.pricing.from}</span>
                    </p>
                  </div>
                </div>

                {/* the work */}
                <div className={cn("lg:col-span-6", flip && "lg:order-1 lg:col-start-1")}>
                  <Link
                    href={`/services/${service.slug}`}
                    data-reveal="plate"
                    className={cn(
                      "group/shot block overflow-hidden rounded-[var(--radius-card)]",
                      loud ? "bg-paper" : "bg-paper-deep",
                    )}
                  >
                    <Image
                      src={service.showcase.src}
                      alt={service.showcase.alt}
                      width={1440}
                      height={900}
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/shot:scale-[1.03]"
                    />
                  </Link>
                </div>
              </div>

              {/* the local constraint — the thing that makes building here different */}
              <div
                data-reveal="fade"
                className={cn(
                  "mt-12 border-t border-rule pt-8 sm:mt-16",
                )}
              >
                <div className="grid gap-4 lg:grid-cols-12 lg:gap-16">
                  <h3
                    className="text-base font-medium text-ink lg:col-span-4"
                  >
                    {service.localAngle.title}
                  </h3>
                  <p
                    className="max-w-3xl text-[0.9375rem] leading-[1.75] text-ink-soft lg:col-span-8"
                  >
                    {service.localAngle.body}
                  </p>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* ── How an engagement runs ───────────────────────────────────────── */}
      <section className="py-20 sm:py-24 lg:py-32">
        <Container size="wide">
          <SectionHead
            title="How we work with you"
            deck="The same four stages whatever the discipline, so you always know where a project is and what happens next."
          />

          <ol className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {engagement.map((stage, index) => (
              <li
                key={stage.step}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${index * 0.07}s` }}
                className="rounded-[var(--radius-xl)] bg-paper-deep p-7 sm:p-8"
              >
                <span className="text-sm tabular-nums text-ink-mute">
                  {stage.step}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em]">
                  {stage.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-soft">
                  {stage.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── What it costs ────────────────────────────────────────────────── */}
      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container size="wide">
          <div className="rounded-[var(--radius-card)] bg-paper-deep p-7 sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-[16ch] text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
                What it costs
              </h2>
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-mute">
                Published because most agencies hide it, and because hiding it
                wastes everyone&apos;s first call. These are honest starting
                points, not quotes.
              </p>
            </div>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-rule sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
              {services.map((service) => (
                <div key={service.slug} className="bg-paper-deep p-6 sm:p-7">
                  <dt className="text-sm text-ink-mute">{service.name}</dt>
                  <dd className="mt-3 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.035em]">
                    {service.pricing.from}
                  </dd>
                  <dd className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {service.pricing.note}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* ── The invitation ───────────────────────────────────────────────── */}
      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container size="wide">
          <div className="rounded-[var(--radius-card)] border border-rule bg-paper-deep px-7 py-16 text-center sm:px-10 sm:py-20 lg:py-28">
            <h2
              data-reveal="fade"
              className="mx-auto max-w-[18ch] text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
            >
              Not sure which one you need?
            </h2>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.08s" }}
              className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-ink-soft"
            >
              Tell us the problem rather than the solution. Half the time the
              answer is smaller and cheaper than people expect — and we will say
              so.
            </p>
            <div
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.16s" }}
              className="mt-10 flex justify-center"
            >
              <Button
                href={primaryCta.href} size="lg">
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
