import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Masthead } from "@/components/layout/masthead";
import { ThumbBar } from "@/components/layout/thumb-bar";
import { Colophon } from "@/components/layout/colophon";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { ReadingProgress } from "@/components/motion/reading-progress";
import {
  JsonLd,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/components/seo/json-ld";

/**
 * The house typography.
 *
 * Inter — everything. Display and text from one grotesk, separated by weight
 * and tracking rather than by family. Fraunces (the previous editorial serif)
 * was removed with the print direction: it carried a magazine voice this studio
 * does not want, and it was the single heaviest asset on the page — a variable
 * serif with three axes plus a full italic, for headings only.
 *
 * Geist Mono — apparatus. Labels, figures, and captions. The one face that
 * still signals software.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  // Every page sets its own canonical; this is the fallback so that a route
  // added without one still points at itself rather than inheriting nothing.
  alternates: { canonical: "/" },
  applicationName: siteConfig.name,
  /**
   * Crawler directives.
   *
   * The default when this is absent is "index, follow" — which is correct but
   * silent, and silence costs real estate. The googleBot block is the part that
   * earns: without `max-image-preview: large` Google shows a thumbnail instead
   * of a full-width image, and without `max-snippet: -1` it truncates the
   * description at its own discretion. Both directly change how much of the
   * result a searcher sees before deciding whether to click.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    // Names the market this site is written for. The generic `en_US` default
    // would be a quiet misstatement on a site built for Kenyan buyers.
    locale: siteConfig.ogLocale,
  },
  /**
   * The Twitter card block, which is misleadingly named.
   *
   * WhatsApp, Slack and several link previewers read these tags in preference
   * to Open Graph, or fall back to them when OG is incomplete. On a Kenyan
   * B2B site that makes this the more important of the two: referrals here
   * travel by WhatsApp far more than by any social network, and a link that
   * unfurls as a grey box is a referral that arrives looking untrustworthy.
   */
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  /**
   * Search Console ownership.
   *
   * Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` at deploy time to the token
   * Google issues, and the meta tag appears. Until the property is verified
   * there is no way to submit the sitemap, see which queries the site is
   * actually surfacing for, or find out that something has been deindexed —
   * so this is the first thing to do after the domain is pointed.
   */
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
};

// Browser chrome matches the page. One value, because there is one palette —
// keying this off the OS setting would put a light page inside dark chrome.
export const viewport: Viewport = {
  // Must equal --nexora-black in globals.css. It cannot read the custom
  // property: this is serialised into a <meta> tag at build time, long before
  // any stylesheet is parsed. If the brand ground changes, change it here too.
  themeColor: "#080808",
};

/**
 * Blocking init script.
 *
 * Marks <html> with `js` before first paint. Every entrance animation in
 * globals.css is scoped to `.js [data-reveal]`, so without JavaScript the page
 * renders fully composed and legible instead of waiting on an observer that
 * will never run — and setting it pre-paint means no flash of hidden copy.
 *
 * This was `components/theme/theme-script.tsx`, which also applied a stored
 * dark-mode preference. That half is gone with the dark edition; the `js` flag
 * is unrelated to theming and still load-bearing.
 *
 * SECURITY NOTE: `__html` is a build-time constant string literal — no user,
 * network, or runtime input, so there is no XSS surface.
 */
function JsSignalScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: "document.documentElement.classList.add('js');",
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Site-wide entities. LocalBusiness is omitted until there is a real phone
  // number in config — see buildLocalBusinessSchema for why a placeholder is
  // worse than nothing.
  const graph = [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildLocalBusinessSchema(),
  ].filter((node) => node !== null);

  return (
    <html
      // `en-KE`, not bare `en` — see siteConfig.locale for why the region
      // subtag is load-bearing on a site targeting one English-speaking market.
      lang={siteConfig.locale}
      className={`${inter.variable} ${geistMono.variable} h-full`}
      // The blocking script below adds `js` to this element before React
      // hydrates, so the server's class list never matches the client's. This
      // was here for the theme class and is still required without it — the
      // `js` flag alone is enough to trip the warning.
      suppressHydrationWarning
    >
      <head>
        <JsSignalScript />
        <JsonLd data={graph} />
      </head>
      <body
        // The thumb bar floats over the page on phones, so the document has to
        // end above it. The bar stands 83px off the bottom edge (71px tall on a
        // 12px cushion), so 6.5rem leaves it clear with about 20px to spare —
        // measured, because 5.5rem left the last footer link 15px underneath
        // it and unreachable. The inset clears the home indicator on handsets
        // that have one. On `main` alone this would not work: the colophon
        // renders after it.
        className="flex min-h-full flex-col antialiased pb-[calc(6.5rem+env(safe-area-inset-bottom))] lg:pb-0"
      >
        <RevealObserver />
        <ReadingProgress />
        <Masthead />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Colophon />
        <ThumbBar />
      </body>
    </html>
  );
}
