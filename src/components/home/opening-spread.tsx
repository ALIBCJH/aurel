import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  WorkShowcase,
  type ShowcaseSlide,
} from "@/components/home/work-showcase";
import { ArrowUpRightIcon } from "@/components/icons";
import { cases } from "@/config/cases";
import { services } from "@/config/services";
import { businessInfo, primaryCta, siteConfig } from "@/config/site";

/**
 * The opening band — a storefront window rather than a landing page.
 *
 * The previous hero was a centred claim ("We build software that ships"), a
 * centred deck, two centred buttons and a wide screenshot. Two problems, and
 * neither was solved by adding motion to it:
 *
 *  1. The claim named nothing. Every studio on earth could run that line, and
 *     "ships" is engineer-speak — a business owner comparing three quotes does
 *     not parse it. Nothing above the fold said what was sold, to whom, or
 *     from where.
 *
 *  2. The shape was the default shape. Perfect vertical symmetry is what a
 *     page looks like when nobody has decided anything about it.
 *
 * So this is asymmetric and specific. The claim states the deliverables in the
 * words a client would use, the four disciplines are named directly beneath it
 * rather than being left for a section further down, and the right-hand column
 * is a plain facts card: where we are, what we do, what is live, how fast we
 * answer. Every value in it is read from config, so there is exactly one place
 * any of it can be wrong.
 *
 * The live URLs are load-bearing. They are the one thing on the page that
 * cannot be invented — you can open them and the products are there.
 *
 * The opening was briefly set on a near-black band, to give the page a front
 * door. That is gone: the site is one surface now, top to bottom, and the
 * opening earns its weight from the size of the claim and the density of the
 * plate beside it rather than from a change of temperature.
 */
/**
 * The screens the opening cycles through: each product's lead shot, then two
 * more that prove the detail.
 *
 * Derived rather than listed, so adding a gallery entry to a case feeds the
 * opening automatically. The portrait phone captures are left out on purpose —
 * they are 780×1688 against the plate's 16:10 and would crop to a stripe.
 *
 * PER_CASE is a real limit, not a formality. The galleries carry four or five
 * screens each now, and at a 5.4s dwell the full set would take the best part
 * of a minute to come round — long past the point anyone is still watching.
 * Three per product is enough to show range without asking for that patience.
 */
const PER_CASE = 3;

function buildSlides(): ShowcaseSlide[] {
  return cases.flatMap((entry) => {
    const href = `/work/${entry.slug}`;
    // The host, not the full URL: it is chrome on a frame, and
    // "https://www.rjinteriors.studio/" reads as a paste rather than a place.
    const host = entry.url
      ? new URL(entry.url).hostname.replace(/^www\./, "")
      : undefined;

    const shots = [
      { src: entry.image.src, alt: entry.image.alt, caption: entry.summary },
      ...entry.gallery.map((shot) => ({
        src: shot.src,
        alt: shot.alt,
        caption: shot.caption,
      })),
    ].slice(0, PER_CASE);

    return shots.map((shot) => ({ ...shot, client: entry.client, href, host }));
  });
}

export function OpeningSpread() {
  const live = cases.filter((entry) => entry.url);

  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
        {/* ---- atmosphere ---- */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="band-grid absolute inset-0" />
          <div
            // Deliberately far larger than the band and anchored off two
            // corners, so its falloff never crosses back into view. At 95vh the
            // circle's own edge landed mid-section and read as a smudge on the
            // paper rather than as light.
            className="band-bloom absolute left-[-35%] top-[-75%] h-[150vh] w-[150vh]"
          />
        </div>

        <Container size="wide">
          <div className="grid items-start gap-x-16 gap-y-14 lg:grid-cols-12">
            {/* ---- the claim ---- */}
            <div className="lg:col-span-7">
              <p
                data-reveal="fade"
                className="flex items-center gap-2.5 text-label-sm text-ink-mute"
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-foil"
                />
                {siteConfig.location}
              </p>

              <h1
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: "0.06s" }}
                className="mt-7 text-[clamp(2.5rem,6.2vw,4.75rem)] leading-[1.02] tracking-[-0.042em]"
              >
                We build websites, apps and the software behind them,{" "}
                <span className="text-foil">for businesses in Kenya</span>.
              </h1>

              <p
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: "0.12s" }}
                className="mt-7 max-w-xl text-[1.0625rem] leading-[1.65] text-ink-soft sm:text-lg"
              >
                Aurel is a software studio in Nyeri and Nairobi. One team
                plans it, designs it and builds it — and everything we make is
                yours to keep.
              </p>

              {/* The four disciplines, named. This is the single most literal
                  answer to "what do you actually do", and it belongs above the
                  fold rather than three sections down. */}
              <ul
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: "0.18s" }}
                className="mt-9 flex flex-wrap gap-x-2.5 gap-y-2.5"
              >
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group/chip inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-rule px-4 py-2 text-[0.9375rem] text-ink-soft transition-colors duration-200 hover:border-rule-foil hover:text-ink"
                    >
                      <span
                        aria-hidden
                        className="text-label-sm text-ink-mute transition-colors duration-200 group-hover/chip:text-foil"
                      >
                        {service.index}
                      </span>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: "0.24s" }}
                className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                  <ArrowUpRightIcon width={15} height={15} />
                </Button>
                <Button href="/work" variant="secondary" size="lg">
                  See the work
                </Button>
              </div>
            </div>

            {/* ---- the facts ---- */}
            {/* Deliberately dense and deliberately dull: a specification plate,
                not a feature card. Anything a prospect would otherwise have to
                dig for — where we are, what is live, how long a reply takes,
                what a phone call costs them — answered before they scroll. */}
            <aside
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.3s" }}
              className="rounded-[var(--radius-xl)] border border-rule bg-paper-deep p-7 sm:p-8 lg:col-span-5"
            >
              <p className="text-label-sm text-foil">The studio</p>

              <dl className="mt-6 flex flex-col">
                <Fact label="Based in">{siteConfig.location}</Fact>

                <Fact label="What we do">
                  {services.map((service) => service.name).join(" · ")}
                </Fact>

                <Fact label="See it live">
                  <span className="flex flex-col items-start gap-1.5">
                    {live.map((entry) => (
                      <a
                        key={entry.slug}
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tap group/live inline-flex items-center gap-1.5 font-mono text-[0.9375rem] transition-colors duration-200 hover:text-foil"
                      >
                        {prettyHost(entry.url!)}
                        <ArrowUpRightIcon
                          width={12}
                          height={12}
                          className="opacity-50 transition-all duration-200 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 group-hover/live:opacity-100"
                        />
                      </a>
                    ))}
                  </span>
                </Fact>

                <Fact label="We reply">Within one business day</Fact>

                <Fact label="You own">The site, the domain and every account, in your name</Fact>
              </dl>

              {/* WhatsApp, not a second "get in touch". In this market it is
                  the channel people actually open, and a number on screen is
                  the cheapest proof that a business is real. */}
              <a
                href={`https://wa.me/${businessInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-rule-strong text-[0.9375rem] transition-colors duration-200 hover:border-foil hover:text-foil"
              >
                WhatsApp {formatPhone(businessInfo.telephone)}
              </a>
            </aside>
          </div>
        </Container>
      </section>

      {/* ---- the proof ---- */}
      {/* This used to be pulled up with a negative margin so it straddled the
          seam between a dark band and the white page, stitching the two
          surfaces together. There is one surface now, so the pull is gone and
          it simply follows the claim — which is the order it was always
          arguing for: say what you build, then show it. */}
      <Container size="wide" className="relative z-10">
        <div data-reveal="plate">
          <WorkShowcase slides={buildSlides()} />
        </div>
      </Container>
    </>
  );
}

/* -------------------------------------------------------------------------- */

/** One ruled row of the specification plate. */
function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-rule py-4 first:border-t-0 first:pt-0 sm:flex-row sm:gap-6">
      <dt className="shrink-0 pt-0.5 text-label-sm text-ink-mute sm:w-28">
        {label}
      </dt>
      <dd className="text-[0.9375rem] leading-[1.55] text-ink-soft">
        {children}
      </dd>
    </div>
  );
}

/** `https://www.rjinteriors.studio/` → `rjinteriors.studio`. */
function prettyHost(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}

/** `+254797942186` → `+254 797 942 186`. */
function formatPhone(e164: string): string {
  const match = /^(\+\d{3})(\d{3})(\d{3})(\d{3})$/.exec(e164);
  return match ? match.slice(1).join(" ") : e164;
}
