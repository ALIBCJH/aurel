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
 * DESKTOP — full-bleed art, `object-right` so the device cluster is the last
 * thing surrendered when a very wide viewport crops the sides. A scrim runs
 * left-to-right under the copy column and a second one seats the section into
 * the page ground beneath.
 *
 * MOBILE — the portrait original below the copy, but held in a 3:4 box rather
 * than at its native 0.462. The full-height version put ~90px of empty sky at
 * the top of the frame and ran 844px tall, so the first thing that scrolled
 * into view was nothing at all. Cropping to 3:4 lands the devices dead centre.
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
          sizes="100vw"
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
          <p
            data-reveal="fade"
            className="flex items-center gap-2.5 text-label-sm text-ink-mute"
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
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
              <ArrowUpRightIcon width={15} height={15} />
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              Explore our work
            </Button>
          </div>
        </div>
      </Container>

      {/* ---- mobile art ----
          No `data-reveal`: the reveal observer only fires on scroll-into-view,
          and hero art below the fold would sit invisible until scrolled past. */}
      <div className="relative mt-12 aspect-[3/4] overflow-hidden md:hidden">
        <Image
          src={imagery.hero.path}
          alt={imagery.hero.alt}
          fill
          priority
          // Hidden from `md` up, so a desktop browser is told to pick the
          // smallest candidate rather than a full-viewport one for an element
          // it will never paint.
          sizes="(max-width: 767px) 100vw, 1px"
          // The same artwork, cropped to the phone rather than shot for it.
          // `nexora-hero-mobile.webp` was purpose-built and is retired anyway:
          // it has the sentence "Building digital experiences that drive your
          // business forward" rendered into the pixels on the photographed
          // phone — which is the `<h1>` immediately above it, so every handset
          // visitor read the same claim twice, once as text and once as a
          // picture of text. It also carried "+127%" and a traffic-source
          // breakdown, numbers this studio publishes nowhere. See the note in
          // `config/imagery.ts`.
          //
          // `70%` lands the laptop, the sphere and the light arc in a 3:4 box.
          className="object-cover object-[70%_50%]"
        />
        {/* Seats the crop into the page rather than ending it on a hard edge.
            Same reasoning as the desktop scrim above, and kept shorter still:
            the mobile frame is only 520px tall, so 96px was a fifth of the
            picture spent on a join. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[color:var(--nexora-black)]"
        />
      </div>
    </section>
  );
}
