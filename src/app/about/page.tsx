import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/icons";
import { cases } from "@/config/cases";
import { services } from "@/config/services";
import { initials, team } from "@/config/team";
import { primaryCta, siteConfig } from "@/config/site";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aurel is a small Kenyan software studio in Nyeri and Nairobi. Meet the person who builds the work, and the standards the studio holds to.",
  alternates: { canonical: "/about" },
};

/**
 * The About page.
 *
 * Its only real job is to make a prospect believe that a capable, identifiable
 * person will personally handle their project. Everything here serves that:
 * the founder is named with verifiable credentials, the studio's size is
 * stated plainly rather than implied to be larger, and the principles are
 * phrased as commitments a client could hold us to rather than adjectives.
 */
const principles = [
  {
    title: "Craft over speed",
    body: "We move deliberately, because quality is what people remember long after the deadline is forgotten. If a date and a standard conflict, we will tell you early rather than quietly ship the lesser thing.",
  },
  {
    title: "Explicit over clever",
    body: "Clear systems that another engineer can pick up beat clever ones only we understand. We optimise for the next person to open the file — which, eventually, is whoever you hire after us.",
  },
  {
    title: "Partners, not vendors",
    body: "Your outcome is the brief, not the ticket list. That includes telling you when the thing you asked for is not the thing you need, and when the answer is smaller and cheaper than you expected.",
  },
  {
    title: "You own it",
    body: "Code, content, domains, infrastructure and store accounts are in your name from day one. Nothing is held hostage as a retention strategy, and leaving is never made difficult.",
  },
];

const facts = [
  { label: "Based", value: "Nyeri & Nairobi" },
  { label: "Working", value: "Kenya & remote" },
  { label: "Disciplines", value: "Four" },
  { label: "Reply", value: "One business day" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "About", path: "/about" }])} />

      {/* ── The claim ────────────────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-20 lg:pt-24">
        <Container size="wide">
          <div className="max-w-4xl">
            <p data-reveal="fade" className="text-sm font-medium text-ink-mute">
              About
            </p>
            <h1
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.05s" }}
              className="mt-5 text-[clamp(2.5rem,7vw,5.25rem)] font-semibold leading-[1] tracking-[-0.04em]"
            >
              Small studio. Serious work.
            </h1>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.1s" }}
              className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.6] text-ink-soft sm:text-xl"
            >
              Aurel was founded on a straightforward frustration: the calibre of
              engineering usually reserved for enterprise budgets was out of
              reach for the ambitious small and medium businesses who needed it
              most.
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

      {/* ── The person ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 lg:py-32">
        <Container size="wide">
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.038em]">
            {team.length === 1 ? "Who you will be working with" : "The team"}
          </h2>

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
                      <Image
                        src={person.photo.src}
                        alt={person.photo.alt}
                        width={800}
                        height={1000}
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="h-auto w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-[4/5] items-center justify-center">
                        <span
                          aria-hidden
                          className="text-[clamp(4rem,9vw,7rem)] font-semibold tracking-[-0.05em] text-ink"
                        >
                          {initials(person.name)}
                        </span>
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
                </div>
              </article>
            ))}
          </div>

          {team.length === 1 && (
            <p className="mt-12 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-mute">
              That is the whole studio, and it is deliberate. Aurel is
              principal-led: the person who scopes your project is the person who
              builds it, and there is no account layer between you and the
              engineering. Specialists are brought in for specific work when a
              project genuinely needs them, and you are told who they are.
            </p>
          )}
        </Container>
      </section>

      {/* ── How we work ──────────────────────────────────────────────────── */}
      <section className="bg-paper-deep py-20 sm:py-24 lg:py-32">
        <Container size="wide">
          <h2 className="max-w-[16ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.038em]">
            What you can hold us to
          </h2>

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
      <section className="py-20 sm:py-24 lg:py-32">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.038em]">
                What that looks like in practice
              </h2>
              <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.6] text-ink-soft">
                Four disciplines, and two products live in the world. The work
                is the argument — go and open it.
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
              Let&apos;s build something worth remembering
            </h2>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.08s" }}
              className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-ink-soft"
            >
              Write to{" "}
              {/* `tap` grows the hit area to 44px without changing layout —
                  this sits inline in a sentence, so it cannot simply be made
                  taller. */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="tap font-medium text-ink underline underline-offset-4"
              >
                {siteConfig.email}
              </a>{" "}
              or start with the brief — it takes about two minutes.
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
