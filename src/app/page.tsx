import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/layout/section-head";
import { OpeningSpread } from "@/components/home/opening-spread";
import { ServiceSwitchboard } from "@/components/home/service-switchboard";
import { ArrowUpRightIcon } from "@/components/icons";
import { cases } from "@/config/cases";
import { services } from "@/config/services";
import { primaryCta } from "@/config/site";

/**
 * The title deliberately leads with what is sold and where, not with the
 * studio's positioning line: "digital transformation studio" is not a phrase
 * anyone searches, and a title is a query-matching surface before it is a
 * brand surface.
 */
export const metadata: Metadata = {
  title: "Websites, mobile apps, AI & SEO for businesses in Kenya",
  description:
    "Aurel builds websites, mobile apps, AI automation and SEO for businesses in Kenya. Based in Nyeri and Nairobi. Starting prices are on the site and you own everything we build.",
  alternates: { canonical: "/" },
};

const commitments = [
  {
    title: "One team, start to finish",
    body: "Planning, design and building all happen here. The people who sit down with you at the start are the same people who build it — nobody to hand you over to, nobody to blame.",
  },
  {
    title: "Built for the network you actually have",
    body: "We build and test on an ordinary Android phone on a busy network, because that is what your customers use. Every page is kept light, on purpose.",
  },
  {
    title: "You own everything",
    body: "The code, the words, the domain, the hosting and the store listings are all in your name. We do not hold your work hostage to keep you as a client.",
  },
];

export default function HomePage() {
  return (
    <>
      <OpeningSpread />

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <SectionHead
            title="What we do"
            deck="Four things we do properly. Take one or take all of them — the standard is the same either way."
            action={
              <Button href="/services" variant="secondary" size="md">
                All services
                <ArrowUpRightIcon width={14} height={14} />
              </Button>
            }
          />

          <div className="mt-10 sm:mt-14">
            <ServiceSwitchboard services={services} />
          </div>
        </Container>
      </section>

      {/* ── Work ─────────────────────────────────────────────────────────── */}
      {/* Deliberately the tallest section on the page: the screenshots are the
          strongest asset here and everything else is arguing for them. */}
      <section className="py-20 sm:py-28 lg:py-36">
        <Container size="wide">
          <SectionHead
            title="Work we have done"
            deck="Two products, both live. We have linked them, so open them and judge the work for yourself."
            action={
              <Button href="/work" variant="secondary" size="md">
                All work
                <ArrowUpRightIcon width={14} height={14} />
              </Button>
            }
          />

          <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-2 lg:gap-12">
            {cases.map((entry, index) => (
              <article
                key={entry.slug}
                data-reveal="plate"
                style={{ ["--reveal-delay" as string]: `${index * 0.08}s` }}
              >
                <Link
                  href={`/work/${entry.slug}`}
                  className="group/case block overflow-hidden rounded-[var(--radius-card)] bg-paper-deep"
                >
                  <Image
                    src={entry.image.src}
                    alt={entry.image.alt}
                    width={1440}
                    height={900}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/case:scale-[1.03]"
                  />
                </Link>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
                  <Link
                    href={`/work/${entry.slug}`}
                    className="tap transition-opacity duration-200 hover:opacity-70"
                  >
                    {entry.client}
                  </Link>
                </h3>
                <p className="mt-2.5 max-w-lg text-[0.9375rem] leading-relaxed text-ink-soft">
                  {entry.headline}
                </p>
                <p className="mt-4 text-sm text-ink-mute">
                  {entry.sector} · {entry.year}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Why us ───────────────────────────────────────────────────────── */}
      {/* The one warm band on the page. Every other section is the same
          temperature and the same shape, so the eye has nothing to catch on;
          a single change of surface is enough to mark a turn without adding a
          second colour to the palette. */}
      <section className="bg-tint py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <SectionHead
            title="Why businesses choose us"
            deck="Small enough that the person you meet is the person who builds it. Serious enough to hand you something you can run for years."
          />

          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-3">
            {commitments.map((item, index) => (
              <div
                key={item.title}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${index * 0.07}s` }}
                className="rounded-[var(--radius-xl)] border border-rule bg-paper p-7 sm:p-9"
              >
                <span aria-hidden className="text-sm tabular-nums text-ink-mute">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em] sm:text-[1.375rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-soft">
                  {item.body}
                </p>
              </div>
            ))}
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
              Tell us what you are trying to build
            </h2>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.08s" }}
              className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-ink-soft"
            >
              We read every enquiry ourselves and reply within one business day.
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
