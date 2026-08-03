import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";
import { Masthead } from "@/components/layout/masthead";
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

// Browser chrome matches the page. A single value, not a prefers-color-scheme
// pair: the theme is chosen by stored preference and defaults to light, so
// keying the chrome off the OS setting produced the mismatch where a
// system-dark visitor got a light page inside dark chrome.
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

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
      // Light is the default and the designed state; ThemeScript applies any
      // stored preference pre-paint.
      className={`${inter.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <JsonLd data={graph} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <ThemeProvider>
          <RevealObserver />
          <ReadingProgress />
          <Masthead />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Colophon />
        </ThemeProvider>
      </body>
    </html>
  );
}
