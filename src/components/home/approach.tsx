"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionOpener } from "@/components/editorial/typography";

/**
 * Approach — the working sequence, set as four movements.
 *
 * A single foil thread runs through all four and draws itself in step with the
 * reader's scroll, so 01→04 reads as one continuous method rather than four
 * separate claims. Horizontal on desktop, vertical where the column narrows.
 */
const movements = [
  {
    num: "01",
    title: "Discover",
    body: "We learn your business, your customers, and the outcome that matters — before a line of code is written.",
  },
  {
    num: "02",
    title: "Design",
    body: "We shape the experience and the system deliberately, so everything built later has a reason to exist.",
  },
  {
    num: "03",
    title: "Build",
    body: "We engineer it properly — fast, secure, and maintainable — with you in the loop the whole way through.",
  },
  {
    num: "04",
    title: "Grow",
    body: "We measure, refine, and automate, so the work keeps compounding long after the launch.",
  },
];

export function Approach() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 65%"],
  });

  return (
    <section className="border-t border-rule py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <SectionOpener
          label="Method"
          aside="The working sequence"
          title={["Design first. Build second.", <em key="a" className="foil font-normal italic">Automate last.</em>]}
          className="max-w-4xl"
        />

        <div ref={ref} className="relative mt-16 lg:mt-20">
          {/* the thread — horizontal on wide screens */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-px bg-rule lg:block"
          >
            <motion.div
              className="h-full origin-left bg-foil"
              style={reduce ? { scaleX: 1 } : { scaleX: scrollYProgress }}
            />
          </div>
          {/* the thread — vertical where the layout stacks */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full w-px bg-rule lg:hidden"
          >
            <motion.div
              className="h-full w-full origin-top bg-foil"
              style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }}
            />
          </div>

          <div className="grid gap-12 pl-8 sm:gap-14 lg:grid-cols-4 lg:gap-10 lg:pl-0">
            {movements.map((movement, index) => (
              <div
                key={movement.num}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${index * 0.09}s` }}
                className="relative lg:pt-10"
              >
                {/* the node where the movement meets the thread */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-foil lg:left-0 lg:top-0 lg:translate-x-0 lg:-translate-y-1/2"
                />
                <span className="text-label-sm text-foil">{movement.num}</span>
                <h3 className="font-display mt-4 text-[1.75rem] font-light tracking-[-0.02em]">
                  {movement.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-mute">
                  {movement.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
