import Link from "next/link";
import { Container } from "@/components/layout/container";
import { GemMark } from "@/components/brand/gem-mark";
import { services } from "@/config/services";
import { businessInfo, mainNav, siteConfig } from "@/config/site";

/** "+254797942186" → "+254 797 942 186". Display only; links use raw E.164. */
function formatPhone(e164: string): string {
  const match = e164.match(/^(\+\d{3})(\d{3})(\d{3})(\d{3})$/);
  return match ? `${match[1]} ${match[2]} ${match[3]} ${match[4]}` : e164;
}

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/**
 * The footer.
 *
 * Rebuilt off the print-editorial version, which stamped an outsized gold
 * wordmark over an engraved plate watermark and set every label in
 * mono uppercase. That belonged to a direction the rest of the site no longer
 * uses — and being site-wide, it was quietly undoing the new system on every
 * page.
 *
 * It now does the two things a footer is actually for: give someone who has
 * scrolled to the bottom a way to contact you, and a way to keep looking.
 */
export function Colophon() {
  return (
    <footer className="mt-auto border-t border-rule">
      <Container size="wide">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
          {/* the mark and the pitch */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              className="tap inline-flex items-center gap-3"
            >
              <GemMark
                compact
                strokeWidth={1.75}
                className="h-5 w-5 shrink-0 text-ink"
              />
              <span className="text-lg font-semibold tracking-[-0.02em]">
                {siteConfig.shortName}
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-ink-soft">
              An ICT solutions provider in {siteConfig.location}. Equipment,
              networks, software and security — supplied, installed and
              supported.
            </p>

            {/* The address, spelled out.
                A footer address on every page is one of the cheapest local
                signals available, and unlike the structured data a person can
                read it. `address` rather than a div because that is what this
                is; the browser italicises it by default, hence `not-italic`. */}
            <address className="mt-6 space-y-1 text-[0.9375rem] not-italic leading-relaxed text-ink-soft">
              <p>{businessInfo.streetAddress}</p>
              <p>
                {businessInfo.addressLocality}, {businessInfo.addressRegion}
              </p>
            </address>
          </div>

          {/* pages */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-sm text-ink-mute">Pages</h2>
            <ul className="mt-4 space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="tap inline-flex py-2 text-[0.9375rem] transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* services */}
          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="text-sm text-ink-mute">Services</h2>
            <ul className="mt-4 space-y-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="tap inline-flex py-2 text-[0.9375rem] transition-opacity hover:opacity-70"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div className="lg:col-span-3">
            <h2 className="text-sm text-ink-mute">Contact</h2>
            <ul className="mt-4 space-y-1">
              {/* Only rendered once a real address exists — see the note on
                  `siteConfig.email`. A `mailto:` to an invented address is a
                  lead that vanishes without either party noticing. */}
              {siteConfig.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="tap inline-flex break-all py-2 text-[0.9375rem] transition-opacity hover:opacity-70"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              )}
              {businessInfo.telephone && (
                <li>
                  <a
                    href={`tel:${businessInfo.telephone}`}
                    className="tap inline-flex py-2 text-[0.9375rem] transition-opacity hover:opacity-70"
                  >
                    {formatPhone(businessInfo.telephone)}
                  </a>
                </li>
              )}
              {businessInfo.whatsapp && (
                <li>
                  {/* WhatsApp is the default business channel in this market —
                      it belongs here as a named route in, not as an icon. */}
                  <a
                    href={`https://wa.me/${businessInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap inline-flex py-2 text-[0.9375rem] transition-opacity hover:opacity-70"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
            {/* Opening hours belong beside the phone number, not buried on the
                contact page: the question behind "can I call them" is almost
                always "are they open". Rendered from the same config the
                LocalBusiness schema uses, so the two cannot disagree. */}
            <div className="mt-5">
              <h3 className="text-sm text-ink-mute">Open</h3>
              <ul className="mt-2 space-y-0.5 text-[0.9375rem] text-ink-soft">
                {businessInfo.openingHoursText.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* the foot */}
        <div className="flex flex-col gap-3 border-t border-rule py-6 text-sm text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.copyright}</p>
          <div className="flex items-center gap-6">
            {legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="tap inline-flex py-2 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
