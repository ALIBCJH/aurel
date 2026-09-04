import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProjectForm } from "@/components/contact/project-form";
import { Eyebrow, SectionHead } from "@/components/layout/section-head";
import { ArrowUpRightIcon } from "@/components/icons";
import { services } from "@/config/services";
import { businessInfo, siteConfig } from "@/config/site";
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildContactPageSchema,
} from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Mojah Investments, Nyeri",
  description:
    "Call, WhatsApp or visit Mojah Investments at Old Batian House, ground floor, Nyeri. Open Mon–Sat 8am–7pm and Sun 10am–5pm. We read every message ourselves.",
  alternates: { canonical: "/contact" },
};

/** "+254727477328" → "+254 727 477 328". Display only; links use raw E.164. */
function formatPhone(e164: string): string {
  const match = e164.match(/^(\+\d{3})(\d{3})(\d{3})(\d{3})$/);
  return match ? `${match[1]} ${match[2]} ${match[3]} ${match[4]}` : e164;
}

const expectations = [
  {
    title: "A person, not an autoresponder",
    body: "Somebody who has actually read what you sent. If an answer will take longer than a day, we tell you that rather than leaving you wondering.",
  },
  {
    title: "A look before a number",
    body: "For anything beyond a simple supply, we want to see the machine or walk the site before quoting. A price given down the phone is a guess, and guesses are what turn into surprises.",
  },
  {
    title: "An honest answer",
    body: "If a machine is not worth repairing, if you need less than you asked for, or if this is not work for us at all, we will say so and point you somewhere sensible.",
  },
];

/**
 * The contact page.
 *
 * The form is the considered route in, but it is not the only one, and in this
 * market it is not even the most likely: WhatsApp is where Kenyan businesses
 * actually open a conversation, and for a repair shop the phone is where most
 * of them start. Both get equal billing rather than being tucked into a footer
 * as an unlabelled icon.
 *
 * The channels are assembled rather than hardcoded so that a blank value in
 * config drops the card entirely — a contact page advertising a route that
 * does not work is worse than one with two cards on it. Email is currently
 * blank; see `siteConfig.email`.
 */
export default function ContactPage() {
  const channels = [
    ...(businessInfo.telephone
      ? [
          {
            label: "Phone",
            value: formatPhone(businessInfo.telephone),
            href: `tel:${businessInfo.telephone}`,
            note: businessInfo.openingHoursText.join(" · "),
            external: false,
          },
        ]
      : []),
    ...(businessInfo.whatsapp
      ? [
          {
            label: "WhatsApp",
            value: "Start a chat",
            href: `https://wa.me/${businessInfo.whatsapp}`,
            note: "Easiest way to send a photo of the fault",
            external: true,
          },
        ]
      : []),
    ...(siteConfig.email
      ? [
          {
            label: "Email",
            value: siteConfig.email,
            href: `mailto:${siteConfig.email}`,
            note: "Best for detail and attachments",
            external: false,
          },
        ]
      : []),
  ];

  return (
    <>
      <JsonLd
        data={[
          buildContactPageSchema(),
          buildBreadcrumbSchema([{ name: "Contact", path: "/contact" }]),
        ]}
      />

      {/* ── The claim ────────────────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-20 lg:pt-24">
        <Container size="wide">
          <div className="max-w-4xl">
            <Eyebrow data-reveal="fade">Start a project</Eyebrow>
            <h1
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.05s" }}
              className="mt-5 text-[clamp(2.5rem,7vw,5.25rem)] font-semibold leading-[1] tracking-[-0.04em]"
            >
              Tell us what needs sorting
            </h1>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.1s" }}
              className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.6] text-ink-soft sm:text-xl"
            >
              Describe the problem rather than the solution — a paragraph about
              what has stopped working is a perfectly good place to start. Or
              bring the machine to Old Batian House and we will look at it.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Direct channels ──────────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-14">
        <Container size="wide">
          {/* Columns follow the channel count. Hardcoding three left a
              third-width void whenever a channel was dropped for having no
              value in config, which reads as a card that failed to render. */}
          <ul
            data-reveal="fade"
            className={cn(
              "grid gap-4 sm:gap-5",
              channels.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
            )}
          >
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group/ch flex h-full flex-col justify-between rounded-[var(--radius-xl)] border border-rule p-6 transition-colors duration-200 hover:bg-field sm:p-7"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-sm text-ink-mute">{channel.label}</span>
                    <ArrowUpRightIcon
                      width={15}
                      height={15}
                      className="mt-0.5 shrink-0 text-ink-mute transition-transform duration-300 group-hover/ch:-translate-y-0.5 group-hover/ch:translate-x-0.5"
                    />
                  </span>
                  <span className="mt-6 block break-words text-lg font-medium tracking-[-0.02em]">
                    {channel.value}
                  </span>
                  <span className="mt-1.5 block text-sm text-ink-mute">
                    {channel.note}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── The brief ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
                Or send us the details
              </h2>
              <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-ink-soft">
                Six fields, about two minutes. Only your name and email are
                required — everything else just means we arrive at the first
                call already useful.
              </p>

              <div className="mt-10">
                <ProjectForm />
              </div>
            </div>

            {/* ---- the margin ---- */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-[var(--radius-xl)] bg-paper-deep p-6 sm:p-7">
                  <h2 className="text-lg font-semibold tracking-[-0.02em]">
                    Not sure what you need?
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                    That is a normal place to start. Tell us the problem and we
                    will work out which discipline it belongs to — or whether it
                    needs one at all.
                  </p>
                  {/* The price column that sat opposite each name is gone.
                      With every discipline quoted on request it printed "On
                      request" six times down the right-hand edge, which read
                      as a rendering fault rather than a pricing policy. The
                      one-line summary is the useful thing to show instead, and
                      it is what actually helps somebody pick. If real figures
                      land in `services.ts`, this is a sensible place to put
                      them back — guarded on `hasPublishedFloor`. */}
                  <ul className="mt-6 space-y-1">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="tap block py-2.5 text-[0.9375rem] transition-opacity hover:opacity-70"
                        >
                          <span className="font-medium">{service.name}</span>
                          <span className="mt-0.5 block text-sm leading-snug text-ink-mute">
                            {service.summary}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-relaxed text-ink-mute">
                    Everything is quoted after we have seen it.{" "}
                    <Link
                      href="/services"
                      className="tap font-medium text-ink underline underline-offset-4"
                    >
                      See how each one runs
                    </Link>
                    .
                  </p>
                </div>

                {/* Address and hours read from config, so this panel, the
                    footer and the LocalBusiness schema cannot disagree about
                    when the shop is open. */}
                <dl className="mt-6 rounded-[var(--radius-xl)] border border-rule p-6 sm:p-7">
                  <div>
                    <dt className="text-sm text-ink-mute">Where we are</dt>
                    <dd className="mt-1.5 text-base font-medium leading-relaxed">
                      {businessInfo.streetAddress}
                      <br />
                      {businessInfo.addressLocality},{" "}
                      {businessInfo.addressRegion}
                    </dd>
                  </div>
                  <div className="mt-5">
                    <dt className="text-sm text-ink-mute">Hours</dt>
                    <dd className="mt-1.5 text-base font-medium">
                      {businessInfo.openingHoursText.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div className="mt-5">
                    <dt className="text-sm text-ink-mute">Covering</dt>
                    <dd className="mt-1.5 text-base font-medium">
                      Nyeri and the Mount Kenya region
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── What happens next ────────────────────────────────────────────── */}
      <section className="bg-paper-deep py-20 sm:py-24 lg:py-28">
        <Container size="wide">
          <SectionHead
            title="What happens next"
            deck="No sales process. Three steps, and a real person at the end of each one."
          />

          <ol className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-3">
            {expectations.map((item, index) => (
              <li
                key={item.title}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${index * 0.07}s` }}
                className="rounded-[var(--radius-xl)] border border-rule bg-paper p-7 sm:p-8"
              >
                <span className="text-sm tabular-nums text-ink-mute">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-semibold leading-snug tracking-[-0.025em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
