# Aurel

A premium foundation for **Aurel** — a digital transformation studio building
custom software, AI automation, digital products, and modern web experiences.

Built as a minimal, elegant, production-grade base for future pages.

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config — no `tailwind.config.js`)
- **Framer Motion** for restrained, intentional interactions

## Design system

- **Themes:** dark (primary) + warm editorial light, toggled via a
  dependency-free theme provider with a blocking anti-flash init script.
- **Brand colors:** `#0E1013` · `#F4F1EA` · gold accent `#B8925A` (used sparingly).
- **Type:** Fraunces (editorial display) + Geist (sans) + Geist Mono.
- **Tokens:** colors, typography, spacing, container widths, radii, and easing
  are declared in `src/app/globals.css` via Tailwind v4's `@theme`.

## Project structure

```
src/
├── app/            # Root layout, global styles, pages
├── components/
│   ├── layout/     # Navbar, Footer, Container, Section, Logo
│   ├── theme/      # ThemeProvider, ThemeScript, ThemeToggle
│   └── ui/         # Button, Card, Reveal + icons
├── config/         # site.ts — nav, footer, socials (single source of truth)
└── lib/            # utils
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.
