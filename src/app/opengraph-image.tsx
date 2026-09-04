import { ImageResponse } from "next/og";
import { businessInfo, siteConfig } from "@/config/site";

/**
 * The default social card, inherited by every route that does not define its
 * own. The site previously shipped none, so every link shared to WhatsApp,
 * LinkedIn, or Slack — which is how most B2B referral traffic actually
 * travels — rendered as a bare grey box.
 *
 * Drawn rather than shipped as a static file so it stays in step with the
 * brand: the palette below is the site's, and the mark is the same reduced
 * letterform the masthead uses at small sizes.
 *
 * It is also, for now, the only rendered Mojah lockup that exists as an image —
 * which is why `buildLocalBusinessSchema` points its `image` at this route
 * rather than at a logo file.
 *
 * Kept to flexbox and inline styles on purpose — this is rendered by Satori,
 * which supports neither CSS grid nor external stylesheets, and silently
 * mis-renders rather than erroring when given something it cannot handle.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The palette, inlined because Satori cannot read CSS custom properties.
// These must track --mojah-* in globals.css; a share card in last season's
// colours is the most public possible place for the palette to drift.
const PAPER = "#080808"; /* --mojah-black */
const INK = "#f2efe8"; /* --mojah-white */
const INK_MUTE = "#b8b5ae"; /* --mojah-gray */
const FOIL = "#d39a45"; /* --mojah-gold */

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          padding: "72px 80px",
        }}
      >
        {/* running head */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: INK_MUTE,
          }}
        >
          <span>ICT Solutions</span>
          <span>{businessInfo.addressLocality} · Kenya</span>
        </div>

        {/* the lockup */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {/* The compact "M" from `components/brand/gem-mark.tsx`, restated
                rather than imported: Satori renders this at build time and
                cannot take a React component that relies on `currentColor`,
                so the stroke has to be a literal. Keep the two in step — the
                path is `GEM_PATH_COMPACT` scaled to this stroke weight. */}
            <svg width="64" height="66" viewBox="0 0 120 124" fill="none">
              <path
                d="M32 100 L32 24 M88 100 L88 24 M32 24 L60 62 L88 24"
                stroke={FOIL}
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 68,
                letterSpacing: "0.3em",
                color: INK,
              }}
            >
              {siteConfig.shortName.toUpperCase()}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 46,
              lineHeight: 1.2,
              color: INK,
              maxWidth: 900,
            }}
          >
            Computers, networks, software &amp; security for Kenyan businesses.
          </div>
        </div>

        {/* foot */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 1,
              backgroundColor: FOIL,
              opacity: 0.45,
              marginBottom: 28,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: INK_MUTE,
            }}
          >
            <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
            {/* The phone number, not the email. This card is unfurled mostly in
                WhatsApp, where the reader is one tap from calling and there is
                no email address published yet anyway. */}
            <span style={{ color: FOIL }}>{businessInfo.telephone}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
