import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/icons";
import { imagery } from "@/config/imagery";
import { primaryCta, siteConfig } from "@/config/site";

/**
 * The opening.
 *
 * The page says what it does, in text, at every width. That is a correction
 * rather than a preference: this section used to hide the `<h1>` from `md` up
 * on the theory that the artwork carried the words. Two of the three rotating
 * frames did carry a headline — but the first one, which is the LCP and the
 * only frame most visitors ever see, carries none. So the desktop home page
 * opened as a dark photograph and two unexplained buttons. The words that were
 * baked into the other two also disagreed with the `<h1>` they replaced, were
 * set in a face the site does not use, could not be selected, translated or
 * searched, and asserted figures ("120+ projects", "98% client satisfaction")
 * that this studio has nowhere else been willing to invent.
 *
 * So the art is art now, and only art. `nexora-hero-desktop.webp` is the frame
 * that never had type in it, and it is composed for exactly this: the devices
 * sit in the right half and the left half is empty ground. The copy goes in
 * that empty half, where the composition already made room for it.
 *
 * DESKTOP — full-bleed art behind the copy. A scrim runs left-to-right under
 * the copy column and a second one seats the section into the page ground
 * beneath.
 *
 * MOBILE — no art at all. The opening is the claim, the supporting line and
 * the two controls, and nothing else. Every arrangement of the picture on a
 * handset was worse than leaving it out: as a background it sat under 600px of
 * copy on a 390px screen, and below the copy it was a full extra screen of
 * scrolling before the page said anything a visitor came for. It also cost a
 * hero-sized download on the connection least able to afford one, which is the
 * argument `services.ts` makes about everyone else's sites.
 *
 * The desktop art is `hidden md:block`, and a `display: none` image is still
 * fetched — so `sizes` tells a handset to take the smallest candidate in the
 * set rather than a full-viewport one for something it will never paint.
 */
export function OpeningSpread() {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-28 md:flex md:min-h-[44rem] md:items-center md:pb-28 md:pt-40 lg:min-h-[48rem]">
      {/* ---- desktop art ---- */}
      <div aria-hidden className="absolute inset-0 -z-20 hidden md:block">
        <Image
          src={imagery.hero.path}
          alt=""
          fill
          priority
          // Full width from `md` up, where this is the LCP element. Below it
          // the wrapper is `display: none` — which does not stop the fetch —
          // so a handset is pointed at the smallest candidate in the set
          // instead of downloading a full-viewport hero it will never show.
          sizes="(min-width: 768px) 100vw, 1px"
          // `100%` horizontally: on a very wide viewport the crop eats the
          // empty left ground first and the devices are the last thing given
          // up. Vertically centred, which the previous asset could not afford
          // — it had a shallow depth of field focused on the screen, so its
          // foreground was genuinely soft and the crop had to be biased up to
          // push the blur off-frame. The current art is sharp front to back
          // (measured: the nearest and furthest elements carry more edge
          // detail than the focal plane), so the whole composition can be in
          // shot and the plinth, sphere and light arc all survive.
          className="object-cover object-[100%_50%]"
        />
      </div>

      {/* The copy scrim. Weighted to the left, gone by the time it reaches the
          devices, so the artwork is never veiled where it is doing the work. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[color:var(--nexora-black)] from-15% via-[color:color-mix(in_srgb,var(--nexora-black)_72%,transparent)] via-45% to-transparent to-70% md:block"
      />

      {/* And a short one at the foot, so the frame meets the page ground
          without a seam. Short is the operative word: at 160px this reached up
          into the plinth, the sphere and the light streak and dimmed all three
          — the parts of the photograph actually worth looking at — and read as
          if the bottom of the image had been blurred. 64px is enough to hide
          the join and nothing more. The image's own base is already near-black,
          so there is very little to hide. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 hidden h-16 bg-gradient-to-b from-transparent to-[color:var(--nexora-black)] md:block"
      />

      <Container size="wide" className="relative z-10 w-full">
        <div className="md:max-w-[34rem] lg:max-w-[38rem]">
          {/* Desktop only. On a handset the opening is down to the claim and
              one action, and a location line above the headline was the first
              thing between a visitor and what the studio does. It is still on
              every other page, in the footer, and in the LocalBusiness schema,
              so nothing about the Nyeri/Nairobi signal is lost — it is only
              removed from the top of the smallest screen. */}
          <p
            data-reveal="fade"
            className="hidden items-center gap-2.5 text-label-sm text-ink-mute md:flex"
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-foil"
            />
            {siteConfig.location}
          </p>

          <h1
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "0.05s" }}
            className="mt-8 text-[clamp(2.25rem,4.8vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
          >
            We build digital experiences that move businesses forward.
          </h1>

          <p
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "0.1s" }}
            className="mt-6 max-w-md text-[1.0625rem] leading-[1.7] text-ink-soft"
          >
            Websites, applications, SEO and digital presence for ambitious
            businesses.
          </p>

          <div
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "0.16s" }}
            // `mt-14` below `md`, `mt-10` above: with the eyebrow and the
            // primary CTA both gone from the handset opening, the one
            // remaining control sat too close under the supporting line and
            // read as attached to it. The extra 16px gives it its own footing.
            //
            // `items-start` matters as much as the size below — in a column
            // the default `stretch` made the button span the full width of the
            // screen, which is most of what made it look oversized.
            className="mt-14 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-10"
          >
            {/* Wrapped rather than given `hidden md:inline-flex` directly:
                `cn` joins and does not merge, so a display utility passed
                through `className` loses to the `inline-flex` in the button's
                own base styles. See the note in `lib/utils.ts` — this has
                shipped as a real bug on this codebase before. */}
            <span className="hidden md:inline-flex">
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
                <ArrowUpRightIcon width={15} height={15} />
              </Button>
            </span>
            {/* `md` on a handset (48px tall, 15px lettering), stepping up to
                the `lg` metrics from `md` up so it still matches the primary
                CTA it sits beside on desktop.

                Passing breakpoint-prefixed utilities through `className` is
                safe in a way that passing bare ones is not: `md:h-14` and the
                base `h-12` live in different cascade layers, so the prefixed
                rule reliably wins above 768px. The hazard `lib/utils.ts`
                documents is two *unprefixed* utilities from the same group,
                where emission order decides and the caller loses. Heights
                measured at both breakpoints to confirm. */}
            <Button
              href="/work"
              variant="secondary"
              size="md"
              className="md:h-14 md:px-8 md:text-base"
            >
              Explore our work
            </Button>
          </div>
        </div>
      </Container>

    </section>
  );
}
