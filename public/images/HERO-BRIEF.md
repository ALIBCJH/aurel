# Hero art brief

What to commission to replace the current hero, and the exact geometry it has
to satisfy. Written from the shipped layout
(`src/components/home/opening-spread.tsx`), not from taste — every number below
is derived from how the section actually crops.

Deliver the two files at the paths in the table and they appear with no code
change.

| File | Size | Ratio | Format |
|---|---|---|---|
| `public/images/nexora-hero-desktop.webp` | **3840 × 1920** | 2:1 | WebP q85–90, or AVIF |
| `public/images/nexora-hero-mobile.webp` | **1536 × 2048** | 3:4 | WebP q85–90, or AVIF |

Target weight: under 400KB each. The current desktop file is 51KB at 1536px
wide and holds 99% of its original detail, so this content compresses very
well — do not let anyone "optimise" it by shrinking the pixel dimensions.

## Why these sizes

**Desktop.** The section is full-bleed and a fixed 768 CSS px tall, so its
aspect ratio changes with the browser window while its height does not. At
3840 × 1920 the art is 2× the pixel density of a 1920px viewport, which is what
fixes the softness on a retina screen — the file in use now is 1536px wide and
gets upscaled about 1.9× to fill the physical pixels.

**Mobile.** The art sits in a 3:4 box, so a 3:4 original crops by exactly
nothing. 1536px wide covers the worst realistic case (a 430px phone at 3× DPR,
or a 767px tablet at 2×) with pixels to spare.

## Safe zones — desktop

`object-cover` with `object-position: 100% 32%` means different parts get cut
at different window widths. Measured:

| Viewport | Cropped away |
|---|---|
| 1024px | 33% off the **left** |
| 1280px | 17% off the left |
| 1440px | 6% off the left |
| 1920px | 6% top, 14% bottom |
| 2560px | 13% top, 27% bottom |
| 3440px (ultrawide) | 18% top, 38% bottom |

So, on a 3840 × 1920 canvas:

```
  x=0            1420        1536                              3744  3840
  ┌───────────────┬───────────┬─────────────────────────────────┬────┐  y=0
  │                                                                  │
  │               │           │                                 │    │  y=384   ← 20%
  │   COPY ZONE               │        SUBJECT SAFE AREA        │    │
  │   empty, near-black       │   laptop, phone, gold light,    │    │
  │   no detail, no light     │   plinth, plant — all of it     │    │
  │   (headline sits here)    │   must live inside this box     │    │
  │               │           │                                 │    │  y=1536  ← 80%
  │                                                                  │
  └───────────────┴───────────┴─────────────────────────────────┴────┘  y=1920
        0–37%                        40–97.5%
```

- **Subject safe area — x 1536→3744, y 384→1536.** Every element that matters
  goes inside this. Anything outside it will be cut off on some common screen.
- **Copy zone — x 0→1420, full height.** Must be empty, near-black, and free of
  bright detail: the `<h1>`, the standfirst and both buttons are set in warm
  white over this region. It is fine for the ground to fall off to pure black
  at the very left edge — 33% of it disappears at narrow widths anyway.
- **Bleed.** Do not run the composition to the top or bottom edge. Ultrawide
  monitors cut 18% off the top and 38% off the bottom.

## Safe zones — mobile

A 3:4 original into a 3:4 box crops by nothing, so there is no danger area.
Keep essential content within a 5% margin (x 77→1459, y 102→1946) so the frame
does not feel cramped, and compose it upright — subject centred, ground below,
falloff above.

## The prompt

Written for an image generator; it works equally well as a brief for a 3D
artist. The two prompts describe the same scene from two framings so the pair
reads as one shoot.

### Desktop — 3840 × 1920

> Ultra-high-resolution CGI product render, 2:1 cinematic aspect. A modern
> open laptop and a smartphone standing together on a dark polished stone
> plinth, positioned in the **right-hand 55% of the frame**, with the **left
> 40% left as empty seamless near-black studio ground (#080808)** falling off
> to pure black at the left edge. The laptop is turned three-quarters toward
> camera, its screen showing an **abstract dark interface — soft grey cards,
> blocks and bars, absolutely no readable text or lettering**. The phone beside
> it shows an **abstract analytics dashboard: a rising gold line chart, a gold
> ring gauge, plain grey rows, no words or numbers**. A single continuous
> ribbon of warm gold light (#d39a45) arcs around and behind the devices. A
> matte gold sphere and a small faceted dark octahedron rest on the plinth. A
> large tropical plant sits upper right, its leaves rim-lit in gold. Warm gold
> key light from the right, subtle gold rim light, deep shadow everywhere else.
> **Shot at f/11 — deep focus, tack sharp from the front edge of the plinth to
> the plant at the back, no bokeh, no depth-of-field blur anywhere.** 50mm lens,
> eye-level, luxury studio product photography, matte surfaces, high
> micro-contrast.
>
> **Negative / must not appear:** any text, letters, numbers, words, headlines,
> UI labels, captions, statistics, percentages, logos, watermarks or
> signatures; blue or purple of any kind; glass-morphism; lens flare; shallow
> depth of field, bokeh or background blur; stock office desk photography;
> people; hands.

### Mobile — 1536 × 2048

> Same scene, same lighting, same materials, reframed as a **3:4 vertical
> portrait**. The phone stands in front and slightly right of centre, the
> laptop angled behind it to the left, both on the dark polished stone plinth.
> The gold light ribbon arcs behind them, and the tropical plant fills the upper
> right corner. Composition centred and upright — subject in the middle band,
> stone plinth and its shadow across the bottom, near-black ground falling off
> at the top. Same abstract screens with **no readable text of any kind**. Same
> warm gold key from the right. **f/11, deep focus, sharp front to back, no
> bokeh.**
>
> **Negative:** identical to the desktop list above.

## Acceptance checklist

Reject and re-render if any of these fail:

- [ ] **No legible text anywhere in the image** — not in the UI on the screens,
      not floating as labels, not on the plinth. This is the hard one and it is
      the reason the previous two hero frames were retired: they baked a
      headline into the pixels, in a typeface the site does not use, saying
      something different from the real `<h1>`, and one of them asserted "120+
      Projects · 98% Client Satisfaction" — figures this studio does not publish
      anywhere else because it cannot back them.
- [ ] **Sharp front to back.** Zoom to 100% on the front edge of the plinth and
      on the laptop's palm rest. If either is softer than the screen, it is the
      same defect as the current image and it will read as a blurred hero.
- [ ] Everything essential inside the safe area above.
- [ ] Copy zone genuinely dark — sample it; white text needs at least 4.5:1 and
      the current art comfortably clears 17:1.
- [ ] No blue, no purple. The gold is `#d39a45`, sampled from the arc light in
      the existing frame and now the site's accent.
- [ ] Delivered at full pixel dimensions, not upscaled from a smaller render.

## After the files land

One code change is worth making once the art is confirmed sharp: the desktop
crop is currently biased upward (`object-[100%_32%]`) purely to push the
out-of-focus foreground of the present image off-frame. With a deep-focus
render, set it back to `object-[100%_50%]` in `opening-spread.tsx` so the
composition is centred and the plinth and sphere come back into view.
