import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Wordmark } from "@/components/brand/wordmark";
import { Rule } from "@/components/editorial/rule";
import { Label } from "@/components/editorial/typography";
import { Engraving } from "@/components/editorial/engraving";
import { businessInfo, mainNav, siteConfig } from "@/config/site";

/** "+254797942186" → "+254 797 942 186". Display only; links use the raw E.164. */
function formatPhone(e164: string): string {
  const match = e164.match(/^(\+\d{3})(\d{3})(\d{3})(\d{3})$/);
  return match ? `${match[1]} ${match[2]} ${match[3]} ${match[4]}` : e164;
}

/**
 * Colophon — the last page.
 *
 * Printed matter closes by telling you how it was made: the types used, where
 * it was set, who to write to. That is exactly what this footer does, with the
 * wordmark stamped across the full measure above it.
 */
const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Colophon() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-rule-foil bg-paper-deep">
      {/* a very large, very faint plate behind the whole colophon */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 h-[32rem] w-[32rem] opacity-[0.07]"
      >
        <Engraving variant={1} drift />
      </div>

      <Container size="wide" className="relative">
        {/* the stamp */}
        <div className="pt-20 sm:pt-24">
          <div data-reveal="fade" className="flex justify-center">
            <Wordmark size="xl" foil className="opacity-90" />
          </div>
          <Rule foil className="mt-12" />
        </div>

        {/* three columns of apparatus */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div data-reveal="fade" className="lg:col-span-2 lg:max-w-xs">
            <Label>Colophon</Label>
            <p className="mt-5 text-sm leading-relaxed text-ink-mute">
              Set in Inter, with Geist Mono for figures and labels. Designed
              and engineered in Nyeri and Nairobi — working worldwide.
            </p>
          </div>

          <nav data-reveal="fade" style={{ ["--reveal-delay" as string]: "0.08s" }} aria-label="Index">
            <Label>Index</Label>
            <ul className="mt-3 space-y-1">
              {mainNav.map((item, index) => (
                <li key={item.href} className="flex items-baseline gap-3">
                  <span className="text-label-sm text-foil/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={item.href}
                    className="link-rule tap inline-flex py-2.5 text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-reveal="fade" style={{ ["--reveal-delay" as string]: "0.16s" }}>
            <Label>Enquiries</Label>
            <ul className="mt-3 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-rule tap inline-flex py-2.5 text-ink-soft transition-colors duration-300 hover:text-ink"
                >
                  {siteConfig.email}
                </a>
              </li>
              {businessInfo.telephone && (
                <li>
                  <a
                    href={`tel:${businessInfo.telephone}`}
                    className="link-rule tap inline-flex py-2.5 text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    {formatPhone(businessInfo.telephone)}
                  </a>
                </li>
              )}
              {businessInfo.whatsapp && (
                <li>
                  {/* WhatsApp is the default business channel in this market —
                      it belongs in the footer as a named route in, not as an
                      icon nobody recognises. */}
                  <a
                    href={`https://wa.me/${businessInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-rule tap inline-flex py-2.5 text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    WhatsApp us
                  </a>
                </li>
              )}
              <li className="text-ink-mute">{siteConfig.location}</li>
              <li className="text-ink-mute">Replies within one business day.</li>
            </ul>
          </div>
        </div>

        <Rule />

        {/* the foot */}
        <div className="text-label-sm flex flex-col gap-2 py-6 text-ink-mute sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="py-2">{siteConfig.copyright}</p>
          <div className="flex items-center gap-6">
            {legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-rule tap inline-flex py-3 transition-colors duration-300 hover:text-foil"
              >
                {item.label}
              </Link>
            ))}
            <span aria-hidden className="hidden text-foil/60 sm:inline">
              ◆
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
