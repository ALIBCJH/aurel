"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pebble, usePebble } from "@/components/layout/pebble";
import {
  AboutGlyph,
  HomeGlyph,
  ServicesGlyph,
  WorkGlyph,
} from "@/components/layout/nav-icons";
import { cn } from "@/lib/utils";

/**
 * The thumb bar — the whole navigation, at the bottom of a phone.
 *
 * This replaced a hamburger that opened a full-screen index. The hamburger is a
 * learned convention: three lines mean "there is a menu behind this", which is
 * obvious once somebody has told you and invisible until then. It also puts
 * every destination two taps away and at the very top of the screen, which is
 * the one part of a phone a thumb cannot comfortably reach.
 *
 * A bar across the bottom is the shape of every application these readers
 * already use daily. Nothing is hidden, nothing has to be discovered, and every
 * destination is one tap from anywhere on the site. Each target is 56px tall
 * with the label written underneath — icons alone are a guessing game, and the
 * word is what makes this usable by someone who does not enjoy computers.
 *
 * The bar is four destinations and no call to action. The last slot used to be
 * a filled "Start" button pointing at /contact, removed at the owner's
 * request along with the hero CTA on this breakpoint.
 *
 * Worth knowing, since nothing else in this component says it: /contact is now
 * reachable on a phone only from the footer, which carries it in the nav list
 * plus a mailto, a tel and a WhatsApp link. If a persistent path back to
 * contact is wanted again, the honest fix is a fifth destination labelled
 * "Contact" rather than restoring a filled button.
 */
const DESTINATIONS = [
  { label: "Home", href: "/", Glyph: HomeGlyph },
  { label: "Services", href: "/services", Glyph: ServicesGlyph },
  { label: "Work", href: "/work", Glyph: WorkGlyph },
  { label: "About", href: "/about", Glyph: AboutGlyph },
] as const;

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function ThumbBar() {
  const pathname = usePathname();

  const activeHref =
    DESTINATIONS.find((d) => isActive(pathname, d.href))?.href ?? null;

  const { trackRef, register, pos, size, visible } = usePebble<HTMLDivElement>({
    activeKey: activeHref,
  });

  return (
    <nav
      aria-label="Main"
      // `pb` carries the home-indicator inset on phones that have one, so the
      // bar floats above the gesture area rather than under it.
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <div
        ref={trackRef}
        className="relative mx-auto flex max-w-md items-stretch rounded-[1.75rem] border border-rule bg-[color:color-mix(in_srgb,var(--paper)_88%,transparent)] p-1.5 shadow-[0_18px_44px_-24px_rgb(0_0_0/0.4)] backdrop-blur-xl backdrop-saturate-150"
      >
        <Pebble
          pos={pos}
          size={size}
          visible={visible}
          className="absolute inset-y-1.5 left-0 -z-0 rounded-[1.375rem] bg-[color:color-mix(in_srgb,var(--foil)_15%,transparent)]"
        />

        {DESTINATIONS.map(({ label, href, Glyph }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              ref={register(href)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative z-10 flex flex-1 flex-col items-center justify-center gap-1 rounded-[1.375rem] py-2.5",
                "transition-colors duration-300",
                // 56px of height and a quarter of the bar's width each. Below
                // that a thumb starts hitting the neighbour.
                "min-h-[56px]",
                active ? "text-ink" : "text-ink-mute",
              )}
            >
              <Glyph className={active ? "text-foil" : undefined} />
              <span
                className={cn(
                  "text-[0.6875rem] leading-none tracking-[-0.01em]",
                  active && "font-medium",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}

      </div>
    </nav>
  );
}
