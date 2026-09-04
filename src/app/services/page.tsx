import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ServiceReel } from "@/components/services/service-reel";
import { Eyebrow, SectionHead } from "@/components/layout/section-head";
import { ArrowUpRightIcon } from "@/components/icons";
import { ServiceIcon } from "@/components/brand/service-icons";
import { anyPublishedFloor, hasPublishedFloor, services } from "@/config/services";
import { primaryCta } from "@/config/site";
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildServiceListSchema,
} from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ICT Services in Nyeri — Repair, Networks, Software & CCTV",
  description:
    "What Mojah Investments does: computer and printer supply and repair, network installation, software development, websites, system migration and CCTV. Nyeri, Kenya.",
  alternates: { canonical: "/services" },
};

/**
 * The services page.
 *
 * Structure: a claim, an interactive reel of the six disciplines, then one
 * full-bleed band per service alternating between the page tone and its
 * inverse. Each band carries the concrete deliverables rather than a picture,
 * so the page argues from specifics rather than adjectives — there is no
 * honest photograph of a repaired laptop or a cable run in this repository,
 * and an unrelated stock image would teach the reader that the pictures here
 * are decorative.
 *
 * The commercials block near the end explains how quoting works rather than
 * printing figures, because no figures have been published. See the note at
 * the top of `config/services.ts` for why an invented one would be worse than
 * none, and `anyPublishedFloor` for how the price grid switches itself back on
 * when real numbers land.
 */

/** The shared four-stage shape every job follows, whatever the discipline. */
const engagement = [
  {
    step: "01",
    title: "Understand",
    body: "What the business actually needs the technology to do. The cheapest conversation in the job, and the one skipping which is why so much equipment gets bought and then worked around.",
  },
  {
    step: "02",
    title: "Look at it",
    body: "A diagnosis on the bench or a walk round the building. We do not price work we have not seen — a quote written from a phone description is a guess with a number on it.",
  },
  {
    step: "03",
    title: "Do the work",
    body: "Supplied, installed, repaired or built — and labelled and documented as we go rather than afterwards, because that is what decides how the next fault goes.",
  },
  {
    step: "04",
    title: "Hand over",
    body: "Tested doing the actual job, your team shown what they need to know, and every login and password in your name. Then we are reachable when something changes.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          buildServiceListSchema(services),
          buildBreadcrumbSchema([{ name: "Services", path: "/services" }]),
        ]}
      />

      {/* ── The claim ────────────────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-20 lg:pt-24">
        <Container size="wide">
          {/* Title left, standfirst right — see the note on /work. */}
          <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow data-reveal="fade">Services</Eyebrow>
              <h1
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: "0.05s" }}
                className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em]"
              >
                All aspects of your technology, from the major to the minor
              </h1>
            </div>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.1s" }}
              className="max-w-xl text-[1.0625rem] leading-[1.7] text-ink-soft lg:col-span-5 lg:col-start-8"
            >
              Equipment supplied and repaired, networks installed and
              maintained, software and websites built, systems moved, cameras
              fitted. Six disciplines — take one of them, or hand us the lot and
              have a single supplier answerable for the whole thing.
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
                <div
                  className={cn(
                    "min-w-0",
                    "lg:col-span-6",
                    flip && "lg:order-2 lg:col-start-7",
                  )}
                >
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

                  {/* The `includes` pills used to sit here. They now appear
                      once, in the specimen card at the top of the page, where
                      the reel already summarises every discipline. Repeating
                      them in each band put scope on the page three times over
                      — as pills here, as the card up there, and as the
                      deliverables ledger a few centimetres to the right — and
                      the ledger is the concrete one. */}

                  <div
                    data-reveal="fade"
                    style={{ ["--reveal-delay" as string]: "0.18s" }}
                    className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
                  >
                    {/* `whitespace-normal` below `sm`: the label is built from
                        the discipline name, and "Explore Google Maps &
                        Business Presence" on one unbreakable line is 372px —
                        wider than a 390px phone has gutter for, which is what
                        made this page scroll sideways. The name is also set as
                        written rather than lowercased; `toLowerCase()` was
                        turning Google Maps and SEO into common nouns. */}
                    <Button
                      href={`/services/${service.slug}`}
                      size="md"
                      className="max-w-full whitespace-normal text-center sm:whitespace-nowrap"
                    >
                      Explore {service.name}
                      <ArrowUpRightIcon width={14} height={14} />
                    </Button>
                    <p className="text-sm">
                      {hasPublishedFloor(service) && (
                        <span className="text-ink-mute">From </span>
                      )}
                      <span className="font-medium">{service.pricing.from}</span>
                    </p>
                  </div>
                </div>

                {/* what you actually get */}
                {/* Was a screenshot. The pictures on this page did not
                    illustrate the disciplines they sat beside — Google Maps &
                    Business Presence was shown with a photograph of an
                    interior-design showroom, Mobile Applications with a
                    *website* on a phone, SEO with an insurance article page —
                    because there is no capture of a map listing or a native
                    app anywhere in the repository. Three of the six were worse
                    still and rendered a grey placeholder with a file path in
                    mono.

                    The replacement is not decoration: `deliverables` is a
                    written list of the concrete things each engagement
                    produces, in the same plain English as the rest of the
                    page. Titles only here — the bodies run three or four
                    sentences each and belong on the discipline's own page.

                    `min-w-0` because grid items default to `min-width: auto`,
                    so a child that cannot wrap sets the floor for the whole
                    track and pushes the page into horizontal scroll. */}
                <div
                  className={cn(
                    "min-w-0",
                    "lg:col-span-6",
                    flip && "lg:order-1 lg:col-start-1",
                  )}
                >
                  <div
                    data-reveal="plate"
                    className={cn(
                      "relative overflow-hidden rounded-[var(--radius-card)] border border-rule p-8 sm:p-10",
                      loud ? "bg-paper" : "bg-paper-deep",
                    )}
                  >
                    <div aria-hidden className="plate-grid absolute inset-0 opacity-40" />
                    <span aria-hidden className="absolute left-4 top-4 h-3 w-px bg-rule-strong" />
                    <span aria-hidden className="absolute left-4 top-4 h-px w-3 bg-rule-strong" />
                    <span aria-hidden className="absolute bottom-4 right-4 h-3 w-px bg-rule-strong" />
                    <span aria-hidden className="absolute bottom-4 right-4 h-px w-3 bg-rule-strong" />

                    <div className="relative">
                      <div className="flex items-center justify-between gap-6">
                        <h3 className="text-label-sm text-foil">What you get</h3>
                        <ServiceIcon
                          slug={service.slug}
                          width={26}
                          height={26}
                          aria-hidden
                          className="shrink-0 text-foil/70"
                        />
                      </div>

                      <ol className="mt-7 space-y-0">
                        {service.deliverables.map((item, i) => (
                          <li
                            key={item.title}
                            className="flex items-baseline gap-5 border-t border-rule py-4 first:border-t-0 first:pt-0"
                          >
                            <span className="w-6 shrink-0 text-sm tabular-nums text-ink-mute">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[1.0625rem] leading-snug tracking-[-0.015em]">
                              {item.title}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
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
            deck="The same four stages whatever the discipline, so you always know where a job is and what happens next."
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
      {/* Two shapes, chosen by whether any discipline publishes a figure.
          While none do, printing a grid of six identical "On request" cells at
          2rem would read as a broken render rather than a policy — so the
          block explains the quoting method instead, which is the genuinely
          useful thing to tell somebody comparing suppliers. Put real numbers
          in `services.ts` and the grid returns on its own. */}
      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container size="wide">
          <div className="rounded-[var(--radius-card)] bg-paper-deep p-7 sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-[16ch] text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
                What it costs
              </h2>
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-mute">
                {anyPublishedFloor()
                  ? "Published because most suppliers hide it, and because hiding it wastes everyone's first call. These are honest starting points, not quotes."
                  : "Every job is quoted after we have seen it, which is the only way to give you a number that will still be the number at the end."}
              </p>
            </div>

            {anyPublishedFloor() ? (
              /* The hairline dividers are a `gap-px` over a `bg-rule` ground,
                 which means any cell the services do not fill shows up as a
                 grey slab rather than as nothing. So the column count has to
                 divide the number of disciplines exactly. At six that is 1, 2
                 or 3 — six columns would give each price about 190px and break
                 the figures onto two lines. If the service count changes
                 again, change these with it. */
              <dl className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-rule sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
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
            ) : (
              <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-3 lg:gap-12">
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">
                    We look before we price
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-soft">
                    The same fault can be a loose cable or a failed mainboard,
                    and the same building can be an afternoon of cabling or a
                    week of it. A figure produced before anyone has looked is a
                    guess, and a guess is how a quote doubles halfway through
                    the job.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">
                    The quote shows its reasoning
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-soft">
                    What we propose, what it costs, and why — itemised, so you
                    can compare it fairly against another supplier&apos;s
                    instead of comparing two bottom lines that cover different
                    work.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">
                    Including the cheaper answer
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-soft">
                    Where a repair beats a replacement, four cameras beat eight,
                    or the system you already have is fine, that is what the
                    quote will say. It costs us the bigger sale and it is the
                    reason people come back.
                  </p>
                </div>
              </div>
            )}
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
              Tell us what has stopped working rather than what you think you
              need to buy. Half the time the answer is smaller and cheaper than
              people expect — and we will say so.
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
