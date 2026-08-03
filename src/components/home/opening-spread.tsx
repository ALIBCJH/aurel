import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/icons";
import { cases } from "@/config/cases";
import { primaryCta } from "@/config/site";

/**
 * The hero.
 *
 * Centred claim, then the work immediately underneath at full width. The
 * previous split layout gave the headline and the screenshot half a viewport
 * each and neither got to be big. Stacking them lets both be enormous, which is
 * the entire trick: impact here comes from scale and confidence, not from
 * ornament or commissioned art.
 *
 * Nothing above the fold is decorative. Claim, proof, and one action.
 */
export function OpeningSpread() {
  const feature = cases[0];

  return (
    <section className="pt-16 sm:pt-20 lg:pt-24">
      <Container size="wide">
        {/* ---- the claim ---- */}
        <div className="mx-auto max-w-4xl text-center">
          <h1
            data-reveal="fade"
            className="text-[clamp(2.5rem,7.5vw,5.75rem)] font-semibold leading-[1] tracking-[-0.04em]"
          >
            We build software that ships
          </h1>

          <p
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "0.08s" }}
            className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-[1.6] text-ink-soft sm:mt-7 sm:text-xl"
          >
            AI automation, mobile apps, websites and search — engineered for
            businesses across Kenya and East Africa.
          </p>

          <div
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "0.16s" }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button href={primaryCta.href} size="lg" className="w-full sm:w-auto">
              {primaryCta.label}
              <ArrowUpRightIcon width={15} height={15} />
            </Button>
            <Button
              href="/work"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              See the work
            </Button>
          </div>
        </div>

        {/* ---- the work, full width ---- */}
        <figure data-reveal="plate" className="mt-14 sm:mt-16 lg:mt-20">
          <Link
            href={`/work/${feature.slug}`}
            className="group/shot block overflow-hidden rounded-[var(--radius-card)] bg-paper-deep"
          >
            <Image
              src={feature.image.src}
              alt={feature.image.alt}
              width={1440}
              height={900}
              sizes="(min-width: 1536px) 88rem, 100vw"
              priority
              className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/shot:scale-[1.02]"
            />
          </Link>

          <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <span className="text-lg font-medium tracking-[-0.02em]">
              {feature.client}
            </span>
            <span className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-mute">
              {feature.summary}
            </span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
