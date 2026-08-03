"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.2, 0.7, 0.2, 1] as const;

export type HeadlineToken = { t: string; accent?: boolean };

/**
 * KineticHeadline — the hero's centrepiece.
 *
 * Each word rises out of a clip mask with a blur→sharp settle, staggered
 * across the whole headline. Once settled, a gold light-sweep travels through
 * the letters (an overlay whose gradient is clipped to the text). Both effects
 * fall back to plain static text under prefers-reduced-motion.
 *
 * `lines` is an array of visual lines; each line is an array of word tokens.
 */
export function KineticHeadline({
  lines,
  className,
  delay = 0,
}: {
  lines: HeadlineToken[][];
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  // Global word index so the stagger flows continuously across lines.
  let wordIndex = 0;

  return (
    <h1 className={cn("relative", className)}>
      {/* Base layer — the readable, animated headline */}
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((tok, wi) => {
            const i = wordIndex++;
            return (
              <Fragment key={wi}>
                <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
                  <motion.span
                    className={cn(
                      "inline-block",
                      tok.accent && "italic text-accent",
                    )}
                    initial={
                      reduce
                        ? undefined
                        : { y: "115%", opacity: 0, filter: "blur(8px)" }
                    }
                    animate={
                      reduce
                        ? undefined
                        : { y: 0, opacity: 1, filter: "blur(0px)" }
                    }
                    transition={{ duration: 0.75, ease: EASE, delay: delay + i * 0.07 }}
                  >
                    {tok.t}
                  </motion.span>
                </span>
                {wi < line.length - 1 && " "}
              </Fragment>
            );
          })}
        </span>
      ))}

      {/* Sheen overlay — a gold band sweeps across, clipped to the same text.
          The gradient is set on this root so it sweeps the full headline; the
          word spans just carry the (transparent) glyph shapes to clip against. */}
      {!reduce && (
        <span
          aria-hidden
          className="animate-text-sheen pointer-events-none absolute inset-0 bg-clip-text"
          style={{
            color: "transparent",
            WebkitTextFillColor: "transparent",
            backgroundImage:
              "linear-gradient(100deg, transparent 42%, color-mix(in srgb, var(--accent) 88%, #fff) 50%, transparent 58%)",
            backgroundSize: "220% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {lines.map((line, li) => (
            <span key={li} className="block">
              {line.map((tok, wi) => (
                <Fragment key={wi}>
                  <span className="inline-block pb-[0.14em] -mb-[0.14em] align-bottom">
                    {tok.t}
                  </span>
                  {wi < line.length - 1 && " "}
                </Fragment>
              ))}
            </span>
          ))}
        </span>
      )}
    </h1>
  );
}
