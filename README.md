# Mojah Investments

The website for **Mojah Investments** — an ICT solutions provider in Nyeri,
Kenya. Hardware supply and repair, network installation, software development,
websites, system migration, and CCTV.

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config — no `tailwind.config.js`)
- **Framer Motion** for restrained, intentional interactions

## Design system

- **Ground:** a single dark edition. There is no theme toggle.
- **Brand colours:** near-black `#080808` · warm white `#f2efe8` · gold
  `#d39a45`, declared once as `--mojah-*` in `src/app/globals.css` and consumed
  everywhere through semantic tokens (`--paper`, `--ink`, `--foil`). Add colour
  by reaching for a token, never by writing a hex.
- **Type:** Inter (display and text, separated by weight and tracking) + Geist
  Mono for labels and figures.
- **Tokens:** colours, typography, spacing, container widths, radii and easing
  are declared in `src/app/globals.css` via Tailwind v4's `@theme`.

## Project structure

```
src/
├── app/            # Routes, root layout, global styles, contact API
├── components/
│   ├── brand/      # Gem mark, wordmark, service icons
│   ├── layout/     # Masthead, Colophon, ThumbBar, Container, Section
│   ├── seo/        # JSON-LD builders
│   └── ui/         # Button, Card, Reveal + icons
├── config/         # The single source of truth — see below
└── lib/            # utils
```

## Where the content lives

Almost nothing on this site is written in a page component. Change these files
and every page, sitemap entry and structured-data node follows:

| File | Holds |
| --- | --- |
| `src/config/site.ts` | Name, tagline, address, phone, hours, service areas, nav |
| `src/config/services.ts` | The six disciplines, in full |
| `src/config/cases.ts` | The work |
| `src/config/team.ts` | Who is named on /about |
| `src/config/testimonials.ts` | Empty on purpose — read the note before adding |

## Before launch

These are known gaps rather than bugs; each is commented where it lives.

- **`NEXT_PUBLIC_SITE_URL`** — the fallback domain in `src/config/site.ts` is a
  guess. Set the real one, or every canonical link and schema `@id` points at a
  hostname Mojah does not own.
- **`siteConfig.email`** — deliberately blank. The site renders correctly
  without it (contact runs on phone and WhatsApp), and every email route
  reappears the moment it is filled in.
- **`CONTACT_TO_EMAIL`** — required for the enquiry form to deliver anywhere.
  See `.env.example`.
- **A logo file** — there is no Mojah artwork in the repository. The masthead
  draws a vector mark instead, and `components/seo/json-ld.tsx` documents where
  a logo goes when one exists. `src/app/favicon.ico` is still the previous
  owner's.
- **Prices** — every discipline reads "On request". Real figures in
  `services.ts` switch the price grid and the schema.org offers back on by
  themselves.
- **The company profile PDF** — /about references it in Mojah's own copy but no
  file has been supplied, so there is no download link.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.
