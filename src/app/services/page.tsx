import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Engraving } from "@/components/editorial/engraving";
import { Rule } from "@/components/editorial/rule";
import { Label } from "@/components/editorial/typography";
import { PointerTilt } from "@/components/motion/pointer-tilt";
import { ArrowUpRightIcon } from "@/components/icons";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, mobile apps, AI automation, and SEO for businesses in Kenya. Four disciplines, one team — engage us for a single piece or the whole transformation.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        aside={`Section 01 — ${services.length} disciplines`}
        title={[
          "Everything it takes",
          "to compete — under",
          <>
            one <em key="roof" className="foil font-normal italic">roof.</em>
          </>,
        ]}
        description="Four disciplines, one team. Engage us for a single piece or the whole transformation — the standard does not change."
        figure={2}
        figureLabel="The full index"
      />

      {/* ── The entries ──────────────────────────────────────────────────── */}
      <section className="pb-24 pt-20 sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28">
        <Container size="wide">
          <ul>
            {services.map((service, index) => {
              const flip = index % 2 === 1;
              return (
                <li key={service.slug} className="border-t border-rule">
                  <article className="grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
                    {/* ---- the entry ---- */}
                    <div
                      data-reveal="fade"
                      className={cn(
                        "lg:col-span-7",
                        flip ? "lg:order-2 lg:col-start-6" : "lg:order-1",
                      )}
                    >
                      <div className="flex items-baseline gap-5">
                        <span className="font-display text-[2.75rem] font-light leading-none text-foil/50">
                          {service.index}
                        </span>
                        <h2 className="font-display text-[clamp(1.85rem,3.4vw,2.75rem)] font-light leading-[1.05] tracking-[-0.02em]">
                          {service.name}
                        </h2>
                      </div>

                      <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.75] text-ink-soft">
                        {service.description}
                      </p>

                      <div className="mt-10 max-w-xl">
                        <Label>What it includes</Label>
                        <ul className="mt-4 border-t border-rule">
                          {service.includes.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-3 border-b border-rule py-2.5 text-sm text-ink-soft"
                            >
                              <span
                                aria-hidden
                                className="h-1 w-1 rotate-45 bg-foil"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6">
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-label group/link inline-flex min-h-11 items-center gap-2.5 text-ink-soft transition-colors duration-300 hover:text-foil"
                        >
                          <span className="link-rule">Read the detail</span>
                          <ArrowUpRightIcon
                            width={13}
                            height={13}
                            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          />
                        </Link>
                      </div>
                    </div>

                    {/* ---- the plate ---- */}
                    <div
                      className={cn(
                        "lg:col-span-4",
                        flip ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-9",
                      )}
                    >
                      <PointerTilt amount={4}>
                        <figure data-reveal="plate">
                          <div className="relative aspect-[4/5] border border-rule bg-paper-deep">
                            <div aria-hidden className="plate-grid absolute inset-0 opacity-50" />
                            <div aria-hidden className="hatch absolute inset-0 opacity-40" />
                            <Engraving variant={index} />
                            <span aria-hidden className="absolute left-3 top-3 h-3 w-px bg-rule-strong" />
                            <span aria-hidden className="absolute left-3 top-3 h-px w-3 bg-rule-strong" />
                            <span aria-hidden className="absolute bottom-3 right-3 h-3 w-px bg-rule-strong" />
                            <span aria-hidden className="absolute bottom-3 right-3 h-px w-3 bg-rule-strong" />
                          </div>
                          <figcaption className="text-label-sm mt-3 text-ink-mute">
                            <span className="text-foil">Fig. {service.index}</span>{" "}
                            <span className="normal-case tracking-[0.14em]">
                              {service.summary}
                            </span>
                          </figcaption>
                        </figure>
                      </PointerTilt>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          <Rule />
        </Container>
      </section>

      {/* ── The invitation ───────────────────────────────────────────────── */}
      <section className="border-t border-rule-foil bg-paper-deep py-14 sm:py-16">
        <Container size="wide">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div data-reveal="fade" className="max-w-xl">
              <Label foil marker>
                Not sure where to start?
              </Label>
              <p className="font-display mt-5 text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-[1.1] tracking-[-0.02em]">
                So do most of our clients.{" "}
                <em className="foil font-normal italic">
                  That is what the first conversation is for.
                </em>
              </p>
            </div>
            <div data-reveal="fade" style={{ ["--reveal-delay" as string]: "0.12s" }}>
              <Button href="/contact" size="lg">
                Book a discovery call
                <ArrowUpRightIcon width={14} height={14} />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
