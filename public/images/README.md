# Nexora imagery

Four commissioned images carry the visual direction. Drop them here and they
appear — `src/components/ui/figure.tsx` checks for each file at build time and
renders a reserved slot until it exists. No code change is needed.

| File | Used on | Must communicate |
|---|---|---|
| `nexora-hero-desktop.webp` | Home hero | Websites, applications, analytics, SEO, growth |
| `nexora-hero-mobile.webp` | Home hero, ≤767px | Portrait original at 0.462 — a full phone viewport, no crop |
| `aurel-mobile-apps.webp` | Services → Mobile applications | Apps, UI/UX, iOS/Android, backend, analytics |
| `aurel-seo.webp` | Services → SEO & digital visibility | Search, visibility, traffic, rankings, growth |
| `aurel-google-maps.webp` | Services → Google Maps & business presence | Business → Maps → customer; profile, reviews, contact |

Export at 2× the largest rendered width, WebP or AVIF. Aspect ratios are
declared in `src/config/imagery.ts` and must match the delivered file, or the
layout will shift when it lands.

Ground is `#080808`, accent `#d39a45` (sampled from the hero light). No stock desk photography, no blue, no
purple gradients, no glass, no generic AI composites.

## Logo derivatives

`public/companylogo.png` is the master and the only file that should ever be
replaced when the artwork changes. Two derivatives are generated from it for
screen use on this dark ground, and both must be regenerated together:

| File | What it is |
|---|---|
| `nexora-logo-reversed.png` | White plate keyed out, wordmark lifted to warm white, N mark left in its delivered blue-violet |
| `nexora-logo-foil.png` | The same, with the N mark's gradient remapped onto `#d39a45` — this is what the masthead renders |

The foil edition is a screen treatment, not a change of identity. Structured
data (`src/components/seo/json-ld.tsx`) still points at the master, so search
results, social cards and print keep the delivered colours.
