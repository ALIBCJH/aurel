import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProjectForm } from "@/components/contact/project-form";
import { ArrowUpRightIcon } from "@/components/icons";
import { services } from "@/config/services";
import { businessInfo, siteConfig } from "@/config/site";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell us what you are trying to build. Email, call or WhatsApp Aurel in Nyeri and Nairobi — we reply within one business day.",
  alternates: { canonical: "/contact" },
};

/** "+254797942186" → "+254 797 942 186". Display only; links use raw E.164. */
function formatPhone(e164: string): string {
  const match = e164.match(/^(\+\d{3})(\d{3})(\d{3})(\d{3})$/);
  return match ? `${match[1]} ${match[2]} ${match[3]} ${match[4]}` : e164;
}

const expectations = [
  {
    title: "A reply within one business day",
    body: "From a person who has read your brief, not an autoresponder. If it will take longer than that, we say so.",
  },
  {
    title: "A conversation, not a pitch deck",
    body: "Half an hour on where you want to get to and whether we are the right studio to take you there. No slides.",
  },
  {
    title: "An honest answer",
    body: "If the work is not right for us, or the thing you need is smaller and cheaper than you expected, we will tell you and point you somewhere sensible.",
  },
];

/**
 * The contact page.
 *
 * The form is the considered route in, but it is not the only one, and on this
 * market it is not even the most likely: WhatsApp is where Kenyan businesses
 * actually open a conversation. It gets equal billing with email and phone
 * rather than being tucked into a footer as an unlabelled icon.
 */
export default function ContactPage() {
  const channels = [
    {
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      note: "Best for detail and attachments",
      external: false,
    },
    ...(businessInfo.whatsapp
      ? [
          {
            label: "WhatsApp",
            value: "Start a chat",
            href: `https://wa.me/${businessInfo.whatsapp}`,
            note: "Fastest — how most enquiries here begin",
            external: true,
          },
        ]
      : []),
    ...(businessInfo.telephone
      ? [
          {
            label: "Phone",
            value: formatPhone(businessInfo.telephone),
            href: `tel:${businessInfo.telephone}`,
            note: "Weekdays, 9am–5pm EAT",
            external: false,
          },
        ]
      : []),
  ];

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([{ name: "Contact", path: "/contact" }])}
      />

      {/* ── The claim ────────────────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-20 lg:pt-24">
        <Container size="wide">
          <div className="max-w-4xl">
            <p data-reveal="fade" className="text-sm font-medium text-ink-mute">
              Start a project
            </p>
            <h1
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.05s" }}
              className="mt-5 text-[clamp(2.5rem,7vw,5.25rem)] font-semibold leading-[1] tracking-[-0.04em]"
            >
              Tell us what you are trying to build
            </h1>
            <p
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: "0.1s" }}
              className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.6] text-ink-soft sm:text-xl"
            >
              Describe the problem rather than the solution — a paragraph about
              where you are stuck is a perfectly good brief. We read every
              enquiry ourselves.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Direct channels ──────────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-14">
        <Container size="wide">
          <ul
            data-reveal="fade"
            className="grid gap-4 sm:gap-5 lg:grid-cols-3"
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
                Or send the brief
              </h2>
              <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-ink-soft">
                Six fields, about two minutes. Only your name and email are
                required — everything else just helps us come to the first call
                already useful.
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
                  <ul className="mt-6 space-y-1">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="tap flex items-center justify-between gap-4 py-2.5 text-[0.9375rem] transition-opacity hover:opacity-70"
                        >
                          <span className="font-medium">{service.name}</span>
                          <span className="shrink-0 text-sm text-ink-mute">
                            {service.pricing.from}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-relaxed text-ink-mute">
                    Starting points, not quotes.{" "}
                    <Link
                      href="/services"
                      className="tap font-medium text-ink underline underline-offset-4"
                    >
                      See what moves them
                    </Link>
                    .
                  </p>
                </div>

                <dl className="mt-6 rounded-[var(--radius-xl)] border border-rule p-6 sm:p-7">
                  <div>
                    <dt className="text-sm text-ink-mute">Where we are</dt>
                    <dd className="mt-1.5 text-base font-medium">
                      {siteConfig.location}
                    </dd>
                  </div>
                  <div className="mt-5">
                    <dt className="text-sm text-ink-mute">Hours</dt>
                    <dd className="mt-1.5 text-base font-medium">
                      Mon–Fri, 9am–5pm EAT
                    </dd>
                  </div>
                  <div className="mt-5">
                    <dt className="text-sm text-ink-mute">Working</dt>
                    <dd className="mt-1.5 text-base font-medium">
                      Across Kenya and remote
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── What happens next ────────────────────────────────────────────── */}
      <section className="bg-contrast py-20 text-contrast-ink sm:py-24 lg:py-28">
        <Container size="wide">
          <h2 className="max-w-[16ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.038em]">
            What happens next
          </h2>

          <ol className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-3">
            {expectations.map((item, index) => (
              <li
                key={item.title}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${index * 0.07}s` }}
                className="rounded-[var(--radius-xl)] border border-white/15 p-7 sm:p-8"
              >
                <span className="text-sm tabular-nums text-contrast-mute">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-semibold leading-snug tracking-[-0.025em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-contrast-mute">
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
