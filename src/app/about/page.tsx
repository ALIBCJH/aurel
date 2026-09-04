import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow, SectionHead } from "@/components/layout/section-head";
import { ArrowUpRightIcon } from "@/components/icons";
import { cases } from "@/config/cases";
import { services } from "@/config/services";
import { placePhotography } from "@/config/photography";
import { initials, team } from "@/config/team";
import { businessInfo, primaryCta, siteConfig } from "@/config/site";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Mojah Investments",
  description:
    "Mojah Investments is an ICT solutions provider in Nyeri, Kenya, covering data networks, hardware, software and managed IT. Who we are and what we commit to.",
  alternates: { canonical: "/about" },
};

/**
 * The About page.
 *
 * Its job is to make a prospect believe there is a real, findable business
 * behind the phone number, run by people who will still be there in a year.
 * Everything here serves that: a street address you could drive to, hours you
 * could turn up within, a named person accountable for the work, and
 * commitments phrased so a client could hold us to them rather than adjectives
 * that mean nothing.
 *
 * WHAT IS DELIBERATELY MISSING. Mojah's own company profile ends with
 * "Download our full company profile here". No such file has been supplied, so
 * there is no link to it — a download control that 404s costs more trust than
 * the missing document does. Put the PDF in `public/` and add the link back.
 */
const principles = [
  {
    title: "We tell you what it actually needs",
    body: "Including when that is less than you came in asking for, and when a machine is not worth repairing. A supplier paid to sell is not incentivised to say either of those things. We would rather say them and keep the relationship.",
  },
  {
    title: "Diagnose before quoting",
    body: "We do not price work we have not seen. A number produced from a phone description is a guess, and a guess is how a quote doubles halfway through the job. Look first, quote second.",
  },
  {
    title: "Leave it documented",
    body: "Cables labelled, systems written down, passwords handed over. The measure of a good installation is whether the next competent person — us or anybody else — can understand it without ringing round.",
  },
  {
    title: "It is yours",
    body: "Accounts, logins, licences and code are in your name from the start. Nothing is held back as a way of keeping you, and moving to another supplier is never made difficult.",
  },
];

/** What technology owes a business. Short enough to be read as a set. */
const beliefs = [
  "Solve real problems",
  "Keep the business running",
  "Be reachable when it breaks",
  "Explain it in plain language",
  "Support it for the long term",
];

const facts = [
  { label: "Based", value: "Nyeri, Kenya" },
  { label: "Covering", value: "Mount Kenya region" },
  { label: "Disciplines", value: "Six" },
  { label: "Open", value: "Six days a week" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "About", path: "/about" }])} />

      {/* ── The claim ────────────────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-20 lg:pt-24">
        <Container size="wide">
          {/* Title left, standfirst right — see the note on /work. */}
          <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow data-reveal="fade">About</Eyebrow>
              {/* Mojah's own line, and the one place on the site it belongs.
                  A reader who has reached /about already knows roughly who
                  they are dealing with, so a tagline here is doing brand work
                  rather than standing between a stranger and what is sold. */}
              <h1
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: "0.05s" }}
                className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em]"
              >
                Flipping the ICT switch.
              </h1>
            </div>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.1s" }}
              className="max-w-xl text-[1.0625rem] leading-[1.7] text-ink-soft lg:col-span-5 lg:col-start-8"
            >
              Mojah Investments is an all-round ICT solutions provider,
              partnering with organisations and enterprises across Nyeri and the
              Mount Kenya region. We take care of your technology needs from the
              major to the minor — so you can get on with the rest of the
              business.
            </p>
          </div>

          {/* facts strip */}
          <dl
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "0.16s" }}
            className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-rule sm:mt-16 sm:grid-cols-2 lg:grid-cols-4"
          >
            {facts.map((fact) => (
              <div key={fact.label} className="bg-paper p-6">
                <dt className="text-sm text-ink-mute">{fact.label}</dt>
                <dd className="mt-2 text-xl font-semibold tracking-[-0.025em]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── Who we are ───────────────────────────────────────────────────── */}
      {/* Mojah's own account of itself, tightened but not rewritten — the
          claims are the company's, and softening them into agency English
          would lose the thing that makes them worth printing.

          The address panel sits inside this section rather than on /contact
          alone, because for a business with a shopfront the single most useful
          fact on an About page is that you could walk into it. Every value is
          read from config, so it cannot drift from the LocalBusiness schema. */}
      <section className="py-20 sm:py-24 lg:py-32">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow data-reveal="fade">Who we are</Eyebrow>
              <h2
                data-reveal="fade"
                className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.038em]"
              >
                We are Mojah Investments.
              </h2>

              <p
                data-reveal="ink"
                className="mt-8 max-w-2xl text-[1.0625rem] leading-[1.75] text-ink-soft"
              >
                We supply data networks, hardware, software and managed IT
                products and services. Our work is meant to give a business
                secure, prompt communication with everyone it deals with —
                regardless of its size, and regardless of how far down the road
                it already is with its own technology.
              </p>
              <p
                data-reveal="ink"
                className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.75] text-ink-soft"
              >
                We are interested in understanding you first: what drives the
                business, what is getting in its way, and what technology can
                honestly do about it. Then we deliver against that and keep
                improving it. A hands-on approach is the whole of the method —
                it is why we would rather look at a machine than describe one
                over the phone.
              </p>
            </div>

            {/* ---- where to find us ---- */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <dl className="rounded-[var(--radius-xl)] border border-rule p-6 sm:p-7">
                <dt className="text-sm text-ink-mute">Where we are</dt>
                <dd className="mt-1.5 text-base font-medium leading-relaxed">
                  {businessInfo.streetAddress}
                  <br />
                  {businessInfo.addressLocality}, {businessInfo.addressRegion}
                </dd>

                <dt className="mt-5 text-sm text-ink-mute">Open</dt>
                <dd className="mt-1.5 text-base font-medium">
                  {businessInfo.openingHoursText.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>

                {businessInfo.telephone && (
                  <>
                    <dt className="mt-5 text-sm text-ink-mute">Phone</dt>
                    <dd className="mt-1.5 text-base font-medium">
                      <a
                        href={`tel:${businessInfo.telephone}`}
                        className="tap inline-flex underline-offset-4 hover:underline"
                      >
                        {businessInfo.telephone}
                      </a>
                    </dd>
                  </>
                )}
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── The person ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 lg:py-32">
        <Container size="wide">
          <SectionHead
            title={team.length === 1 ? "Who you will be working with" : "The team"}
            deck={
              team.length === 1
                ? "Named, so you know who is accountable for the work before you commit to any of it."
                : "The people who will actually be on your job."
            }
          />

          <div className="mt-12 flex flex-col gap-16 sm:mt-16 lg:gap-24">
            {team.map((person) => (
              <article
                key={person.name}
                className="grid gap-10 lg:grid-cols-12 lg:gap-16"
              >
                {/* portrait, or a monogram that looks deliberate without one */}
                <div className="lg:col-span-4">
                  <div
                    data-reveal="plate"
                    className="overflow-hidden rounded-[var(--radius-card)] border border-rule bg-paper-deep"
                  >
                    {person.photo ? (
                      // Held in the same 4:5 box the monogram uses, rather
                      // than at whatever ratio the file happens to be. A phone
                      // portrait is 9:16, and `h-auto w-full` would render it
                      // as a tower nearly twice the height of the biography
                      // beside it — the column would be a picture with some
                      // text next to it instead of a person with a face.
                      //
                      // `object-position` is biased upward because the subject
                      // of a portrait is the face, and a centred 4:5 crop of a
                      // 9:16 frame takes it off the top edge.
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={person.photo.src}
                          alt={person.photo.alt}
                          fill
                          sizes="(min-width: 1024px) 30vw, 100vw"
                          className="object-cover object-[50%_12%]"
                        />
                      </div>
                    ) : (
                      // A white monogram centred in a flat 4:5 panel was the
                      // largest and palest object on the page — a hole where a
                      // face should be, and the one element a visitor reads as
                      // "unfinished" on the page whose whole job is trust. Set
                      // in foil over the plate texture the site already uses
                      // for its figures, it reads as a printed device instead.
                      // It is still second best: get the photograph.
                      <div className="relative flex aspect-[4/5] items-center justify-center">
                        <div
                          aria-hidden
                          className="plate-grid absolute inset-0 opacity-50"
                        />
                        <div
                          aria-hidden
                          className="band-bloom absolute inset-0 opacity-70"
                        />
                        <span
                          aria-hidden
                          className="foil relative font-display text-[clamp(3.5rem,8vw,6rem)] font-light tracking-[0.06em]"
                        >
                          {initials(person.name)}
                        </span>
                        <span
                          aria-hidden
                          className="absolute left-5 top-5 h-3 w-px bg-rule-strong"
                        />
                        <span
                          aria-hidden
                          className="absolute left-5 top-5 h-px w-3 bg-rule-strong"
                        />
                        <span
                          aria-hidden
                          className="absolute bottom-5 right-5 h-3 w-px bg-rule-strong"
                        />
                        <span
                          aria-hidden
                          className="absolute bottom-5 right-5 h-px w-3 bg-rule-strong"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                  <h3 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-base text-ink-mute">
                    {person.role} · {person.location}
                  </p>

                  <p
                    data-reveal="fade"
                    className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-soft"
                  >
                    {person.bio}
                  </p>

                  {person.quote && (
                    <blockquote
                      data-reveal="fade"
                      className="mt-8 border-l-2 border-ink pl-6 text-[clamp(1.125rem,2.2vw,1.5rem)] font-medium leading-[1.4] tracking-[-0.02em]"
                    >
                      {person.quote}
                    </blockquote>
                  )}

                  {/* Each of the three blocks below is hidden while its array
                      is empty. Without the guards an entry with no credentials
                      renders a "Works in" heading over nothing and an 8-rem
                      stack of empty margins — which reads as a page that
                      failed to load rather than a profile that is short. See
                      config/team.ts for what still needs supplying. */}
                  {person.credentials.length > 0 && (
                    <ul className="mt-8 space-y-2">
                      {person.credentials.map((credential) => (
                        <li
                          key={credential}
                          className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-soft"
                        >
                          <span aria-hidden className="text-ink-mute">
                            —
                          </span>
                          {credential}
                        </li>
                      ))}
                    </ul>
                  )}

                  {person.focus.length > 0 && (
                    <div className="mt-8">
                      <p className="text-sm text-ink-mute">Works in</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {person.focus.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-rule px-3 py-1.5 text-sm text-ink-soft"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {person.links.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                      {person.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tap inline-flex items-center gap-1.5 py-2 text-[0.9375rem] font-medium underline-offset-4 hover:underline"
                        >
                          {link.label}
                          <ArrowUpRightIcon width={13} height={13} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {team.length === 1 && (
            <p className="mt-12 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-mute">
              Behind Marcus is the workshop and installation team at Old Batian
              House. There is no account layer between you and the people
              holding the screwdriver: whoever quotes the job is answerable for
              it, and where a specialist is brought in for particular work you
              are told who they are.
            </p>
          )}
        </Container>
      </section>

      {/* ── How we work ──────────────────────────────────────────────────── */}
      {/* ── What we believe ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 lg:py-32">
        <Container size="wide">
          <SectionHead
            title="What we believe"
            deck="Five things we think technology owes a business. They are the reason the work is shaped the way it is."
          />
          {/* Five items, five columns at `lg`. The hairlines are a `gap-px`
              over a `bg-rule` ground, so any cell the list does not fill shows
              up as a grey slab rather than as nothing — if `beliefs` changes
              length, the column count has to change with it. */}
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-rule sm:mt-16 sm:grid-cols-2 lg:grid-cols-5">
            {beliefs.map((belief, index) => (
              <li
                key={belief}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${index * 0.06}s` }}
                className="bg-paper p-6 sm:p-7"
              >
                <span aria-hidden className="text-label-sm tabular-nums text-foil/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[0.9375rem] leading-[1.6]">{belief}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Our approach ─────────────────────────────────────────────────── */}
      {/* Set as a statement rather than a card grid: it is one idea, and one
          idea given a whole band reads as a position rather than a feature. */}
      <section className="border-y border-rule bg-tint py-20 sm:py-24 lg:py-32">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow data-reveal="fade">Our approach</Eyebrow>
              <h2
                data-reveal="fade"
                className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.038em]"
              >
                Business first.
                <br />
                <span className="text-foil">Technology second.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
              <p
                data-reveal="ink"
                className="text-[1.0625rem] leading-[1.75] text-ink-soft"
              >
                We do not start by asking what to buy. We start by asking what
                the business needs — what the equipment has to do all day, who
                depends on it, and what is currently going wrong. The
                specification is a consequence of that answer, not the starting
                point.
              </p>
              <p
                data-reveal="ink"
                className="mt-6 text-[1.0625rem] leading-[1.75] text-ink-soft"
              >
                It is why we will sometimes tell you the thing you asked for is
                not the thing you need, and why the answer is often smaller and
                cheaper than expected — four cameras rather than eight, a repair
                rather than a replacement, the system you already have rather
                than a new one. A supplier paid to sell is not incentivised to
                say that. We would rather say it and keep the relationship.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper-deep py-20 sm:py-24 lg:py-32">
        <Container size="wide">
          <SectionHead
            title="Our values"
            deck="Commitments rather than adjectives — each one is something you could reasonably hold against us if we broke it."
          />

          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-2">
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${index * 0.07}s` }}
                className="rounded-[var(--radius-xl)] border border-rule bg-paper p-7 sm:p-9"
              >
                <span className="text-sm tabular-nums text-ink-mute">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em] sm:text-[1.375rem]">
                  {principle.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-soft">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What we do & what we've shipped ──────────────────────────────── */}
      {/* ---- where we work ----
          The site names Nyeri on nearly every page and would otherwise never
          show it. Captioned as a place rather than as mood: the point is that
          this is a real address, not a stock idea of "Africa". Deliberately
          not full-bleed — it sits at the same width as the screens elsewhere
          so a photograph never outranks the work.

          The column count follows the number of photographs, because a
          two-column grid holding one figure renders it at half width with a
          void beside it. `config/photography.ts` currently holds one; the
          right replacement is a photograph of Old Batian House. */}
      <section className="py-20 sm:py-24 lg:py-32">
        <Container size="wide">
          <SectionHead
            title="Where the work happens"
            deck="Nyeri town, with the work reaching out across the Mount Kenya region — Karatina, Nanyuki, and the farms and businesses between them."
          />

          <div
            className={cn(
              "mt-12 grid gap-8 sm:mt-16 lg:gap-10",
              // With one figure the grid is capped rather than left to span
              // the full wide container, where a single 3:2 photograph would
              // stand taller than the section that introduces it.
              placePhotography.length > 1 ? "sm:grid-cols-2" : "max-w-3xl",
            )}
          >
            {placePhotography.map((photo, index) => (
              <figure
                key={photo.src}
                data-reveal="plate"
                style={{ ["--reveal-delay" as string]: `${index * 0.08}s` }}
              >
                <div className="overflow-hidden rounded-[var(--radius-xl)] bg-paper-deep">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={1200}
                    height={800}
                    sizes={
                      placePhotography.length > 1
                        ? "(min-width: 640px) 45vw, 100vw"
                        : "(min-width: 768px) 48rem, 100vw"
                    }
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3">
                  <span className="text-sm font-medium">{photo.place}</span>
                  <span className="text-sm leading-relaxed text-ink-mute">
                    {" "}
                    — {photo.note}
                  </span>
                  {/* The licence is only valid while the credit is present. */}
                  <span className="mt-1 block text-xs text-ink-mute">
                    Photograph:{" "}
                    <a
                      href={photo.credit.source}
                      className="underline underline-offset-2"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {photo.credit.creator}
                    </a>
                    ,{" "}
                    <a
                      href={photo.credit.licenseUrl}
                      className="underline underline-offset-2"
                      rel="license noopener noreferrer"
                      target="_blank"
                    >
                      {photo.credit.license}
                    </a>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.038em]">
                What that looks like in practice
              </h2>
              <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.6] text-ink-soft">
                Six disciplines, and two sites live on the open internet. The
                work is the argument — go and open it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/work" size="md">
                  See the work
                  <ArrowUpRightIcon width={14} height={14} />
                </Button>
                <Button href="/services" variant="secondary" size="md">
                  All services
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="border-t border-rule">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group/row flex items-center justify-between gap-6 border-b border-rule py-5 transition-opacity hover:opacity-70"
                    >
                      <span className="text-lg font-medium tracking-[-0.02em]">
                        {service.name}
                      </span>
                      <span className="text-sm text-ink-mute">
                        {service.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="mt-8 flex flex-wrap gap-3">
                {cases.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/work/${entry.slug}`}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-full border border-rule px-4",
                        "text-sm font-medium transition-colors hover:bg-field",
                      )}
                    >
                      {entry.client}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The invitation ───────────────────────────────────────────────── */}
      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container size="wide">
          <div className="rounded-[var(--radius-card)] bg-paper-deep px-7 py-16 text-center sm:px-10 sm:py-20 lg:py-28">
            <h2
              data-reveal="fade"
              className="mx-auto max-w-[18ch] text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
            >
              Let us flip your ICT switch
            </h2>
            {/* The route in is whichever channel actually exists.
                Email is blank in config until Mojah supplies an address, so
                the sentence is built rather than hardcoded — the phone number
                leads, the email is offered only when there is one, and the
                form is always the fallback. `tap` grows each hit area to 44px
                without changing layout, since these sit inline in a sentence
                and cannot simply be made taller. */}
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.08s" }}
              className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-ink-soft"
            >
              {businessInfo.telephone && (
                <>
                  Call{" "}
                  <a
                    href={`tel:${businessInfo.telephone}`}
                    className="tap font-medium text-ink underline underline-offset-4"
                  >
                    {businessInfo.telephone}
                  </a>
                  ,{" "}
                </>
              )}
              {siteConfig.email && (
                <>
                  write to{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="tap font-medium text-ink underline underline-offset-4"
                  >
                    {siteConfig.email}
                  </a>
                  ,{" "}
                </>
              )}
              or send us the details — it takes about two minutes.
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
