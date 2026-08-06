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
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

// Browser chrome matches the page. One value, because there is one palette —
// keying this off the OS setting would put a light page inside dark chrome.
export const viewport: Viewport = {
  themeColor: "#ffffff",
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
      lang="en"
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
