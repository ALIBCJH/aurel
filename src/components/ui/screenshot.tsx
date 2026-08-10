import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Screenshot — the one treatment every capture of real work gets.
 *
 * Before this, a screenshot was an `<img>` with rounded corners dropped
 * straight into a grid column, and the two case studies read as completely
 * different objects: R&J's dark interior dissolved into the near-black page
 * with no discernible edge, while Datani's white-and-purple page glared out of
 * it like a hole punched in the ground. Same markup, opposite failures —
 * because nothing in the markup said "this is a screen".
 *
 * A window frame says it. The chrome and the mat give a bright capture a
 * reason to be bright (it is a screen, and screens are lit) and give a dark
 * capture an edge to sit against. It also legitimises the bottom edge: these
 * are viewport captures and several of them cut through a row of cards, which
 * looks like a cropping mistake on a bare rectangle and looks like scrolling
 * inside a window frame.
 *
 * The address bar carries the real host when one is passed. That is the whole
 * argument of the work pages — these are live, go and look — made visible in
 * the furniture rather than only in the caption underneath.
 *
 * `portrait` switches to a handset bezel. The phone captures are 780×1688 and
 * a browser frame around one is a lie about what was photographed; the bezel
 * also caps the width, since a portrait shot given a full column runs taller
 * than the viewport and pushes everything it was meant to illustrate offscreen.
 */
export function Screenshot({
  src,
  alt,
  href,
  sizes = "100vw",
  priority = false,
  portrait = false,
  phone,
  className,
}: {
  src: string;
  alt: string;
  /** Live URL, if there is one. Only the host is shown, in the address bar. */
  href?: string;
  sizes?: string;
  priority?: boolean;
  /** True for handset captures (780×1688), which get a bezel, not chrome. */
  portrait?: boolean;
  /** Companion portrait capture, inset over the lower-right corner. */
  phone?: { src: string; alt: string };
  className?: string;
}) {
  if (portrait) {
    return (
      <div className={cn("flex justify-center", className)}>
        <div className="w-full max-w-[19rem] overflow-hidden rounded-[2.25rem] border border-rule-strong bg-paper-deep p-2 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)]">
          <Image
            src={src}
            alt={alt}
            width={780}
            height={1688}
            sizes="320px"
            priority={priority}
            className="h-auto w-full rounded-[1.75rem] ring-1 ring-inset ring-[color:var(--rule)]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-rule bg-paper-deep p-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] sm:p-3">
        <Chrome href={href} />

        {/* The inset ring is what keeps a white capture from bleeding into the
            mat and a dark one from vanishing into it. */}
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] ring-1 ring-inset ring-[color:var(--rule)]">
          <Image
            src={src}
            alt={alt}
            width={1440}
            height={900}
            sizes={sizes}
            priority={priority}
            className="h-auto w-full"
          />
        </div>
      </div>

      {phone && (
        // Held outside the mat's overflow so it can break the frame. Hidden
        // below `sm`, where it would cover a third of the desktop capture it
        // is supposed to be annotating.
        <div className="pointer-events-none absolute -bottom-6 right-6 hidden w-[15%] min-w-[104px] max-w-[168px] sm:block lg:-bottom-8 lg:right-10">
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-rule-strong bg-paper-deep p-1 shadow-[0_28px_50px_-20px_rgba(0,0,0,0.95)]">
            <Image
              src={phone.src}
              alt={phone.alt}
              width={780}
              height={1688}
              sizes="180px"
              className="h-auto w-full rounded-[calc(var(--radius-lg)-0.25rem)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * The window furniture. Three lights, and an address bar when there is a real
 * address to put in it.
 *
 * The host is derived from the link rather than authored, so it can never
 * drift from where the page actually points. With no URL the pill is dropped
 * rather than left empty — three lights alone still read as a window, and an
 * empty address bar reads as something that failed to load.
 */
function Chrome({ href }: { href?: string }) {
  let host: string | null = null;
  if (href) {
    try {
      host = new URL(href).host.replace(/^www\./, "");
    } catch {
      host = null;
    }
  }

  return (
    <div aria-hidden className="flex items-center gap-3 px-2 pb-2.5 pt-1 sm:px-3">
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[color:var(--rule-strong)]" />
        <span className="h-2 w-2 rounded-full bg-[color:var(--rule-strong)]" />
        <span className="h-2 w-2 rounded-full bg-[color:var(--rule-strong)]" />
      </div>

      {host && (
        <>
          <div className="flex min-w-0 flex-1 items-center justify-center">
            <span className="max-w-full truncate rounded-full border border-rule bg-[color:var(--field)] px-3 py-1 text-[0.6875rem] tracking-[0.04em] text-ink-mute">
              {host}
            </span>
          </div>
          {/* Balances the lights so the pill sits honestly centred. */}
          <span className="w-[38px] shrink-0" />
        </>
      )}
    </div>
  );
}
