import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * The default social card, inherited by every route that does not define its
 * own. The site previously shipped none, so every link shared to WhatsApp,
 * LinkedIn, or Slack — which is how most B2B referral traffic actually
 * travels — rendered as a bare grey box.
 *
 * Drawn rather than shipped as a static file so it stays in step with the
 * brand: the palette below is the Night edition's, and the mark is the same
 * reduced four-stroke "A" the masthead uses at small sizes.
 *
 * Kept to flexbox and inline styles on purpose — this is rendered by Satori,
 * which supports neither CSS grid nor external stylesheets, and silently
 * mis-renders rather than erroring when given something it cannot handle.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The Nexora palette, inlined because Satori cannot read CSS custom properties.
// These must track --nexora-* in globals.css; a share card in last season's
// colours is the most public possible place for the palette to drift.
const PAPER = "#080808"; /* --nexora-black */
const INK = "#f2efe8"; /* --nexora-white */
const INK_MUTE = "#b8b5ae"; /* --nexora-gray */
const FOIL = "#d39a45"; /* --nexora-gold */

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
          <span>Issue 01 — MMXXVI</span>
          <span>Nairobi · Working worldwide</span>
        </div>

        {/* the lockup */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <svg width="64" height="66" viewBox="0 0 120 124" fill="none">
              <path
                d="M60 12 L18 112 M60 12 L102 112 M36 84 L84 84 M60 12 L60 84"
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
              AUREL
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
            Websites, mobile apps, AI &amp; SEO for ambitious businesses.
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
            <span style={{ color: FOIL }}>{siteConfig.email}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
