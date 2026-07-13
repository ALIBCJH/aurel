"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    num: "01",
    title: "Discover",
    body: "We learn your business, your customers, and the outcome that matters — before a line of code.",
  },
  {
    num: "02",
    title: "Design",
    body: "We shape the experience and the system deliberately, so everything built later has a reason.",
  },
  {
    num: "03",
    title: "Build",
    body: "We engineer it properly — fast, secure, and maintainable — with you in the loop throughout.",
  },
  {
    num: "04",
    title: "Grow",
    body: "We measure, refine, and automate, so the work keeps compounding long after launch.",
  },
];

/**
 * Approach — the four steps, joined by a thin gold "thread" that draws itself
 * as the section scrolls into view, so 01→04 reads as one journey. Horizontal
 * on desktop, vertical on smaller screens. Static (fully drawn) under
 * prefers-reduced-motion.
 */
export function Approach() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 62%"],
  });

  return (
    <section className="border-t border-border py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
            Design first. Build second. Automate last.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          {/* Horizontal thread (desktop) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-px bg-border lg:block">
            <motion.div
              className="h-full origin-left bg-accent"
              style={reduce ? { scaleX: 1 } : { scaleX: scrollYProgress }}
            />
          </div>
          {/* Vertical thread (mobile / tablet) */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-border lg:hidden">
            <motion.div
              className="h-full w-full origin-top bg-accent"
              style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }}
            />
          </div>

          <div className="grid gap-10 pl-8 lg:grid-cols-4 lg:gap-8 lg:pl-0">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.06} className="relative lg:pt-8">
                <span className="absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rotate-45 bg-accent lg:top-0 lg:translate-x-0 lg:-translate-y-1/2" />
                <span className="font-display text-2xl text-accent">
                  {step.num}
                </span>
                <h3 className="mt-3 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
