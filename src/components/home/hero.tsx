"use client";

import { useRef, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/icons";
import { primaryCta } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const itemV = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const capabilities = ["Software", "AI", "Design", "Strategy"];

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const showcaseY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const showcaseOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.4]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);

  // pointer-driven tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), {
    stiffness: 120,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), {
    stiffness: 120,
    damping: 16,
  });

  function handleMouse(event: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }
  function resetMouse() {
    px.set(0);
    py.set(0);
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden pt-32 pb-20 sm:pt-36 lg:min-h-[92vh] lg:pt-40 lg:pb-16"
    >
      <AnimatedBackground style={{ y: bgY }} reduce={!!reduce} />

      <Container className="w-full">
        <motion.div
          variants={containerV}
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10"
        >
          {/* Left — copy */}
          <div className="max-w-2xl">
            <motion.p variants={itemV} className="text-eyebrow text-accent">
              Digital transformation studio
            </motion.p>
            <motion.h1
              variants={itemV}
              className="mt-6 text-5xl sm:text-6xl lg:text-[5rem] lg:leading-[0.98]"
            >
              Technology, held to a{" "}
              <span className="italic text-accent">higher</span> standard.
            </motion.h1>
            <motion.p
              variants={itemV}
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
            >
              Aurel helps ambitious businesses modernise, grow, and lead —
              custom software, AI, and design, crafted end to end by a partner
              you can trust.
            </motion.p>
            <motion.div
              variants={itemV}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
                <ArrowUpRightIcon width={18} height={18} />
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Explore what we do
              </Button>
            </motion.div>
            <motion.div
              variants={itemV}
              className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-6"
            >
              {capabilities.map((cap, i) => (
                <span key={cap} className="flex items-center gap-5 text-sm text-muted">
                  {cap}
                  {i < capabilities.length - 1 && (
                    <span className="h-1 w-1 rotate-45 bg-accent/70" />
                  )}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — animated product showcase (shown on all sizes) */}
          <motion.div
            variants={itemV}
            className="mx-auto w-full max-w-md sm:max-w-lg lg:mx-0 lg:max-w-none"
          >
            <motion.div
              style={{ y: showcaseY, opacity: showcaseOpacity }}
              onMouseMove={handleMouse}
              onMouseLeave={resetMouse}
              className="relative [perspective:1400px]"
            >
              {/* gold glow behind the devices */}
              <div
                aria-hidden
                className="hero-glow absolute -inset-8 rounded-full opacity-70 blur-3xl"
              />
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative"
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, -14, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                  className="relative"
                >
                  <BrowserApp reduce={!!reduce} />
                  <PhoneApp reduce={!!reduce} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {!reduce && <ScrollCue />}
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function AnimatedBackground({
  style,
  reduce,
}: {
  style: MotionStyle;
  reduce: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      style={style}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* slowly rotating gold aurora */}
      <motion.div
        className="absolute left-1/2 top-[-25%] h-[85vh] w-[85vh] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, var(--accent-soft), transparent 35%, var(--accent-soft) 65%, transparent 100%)",
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
      />
      <div className="hero-dots absolute inset-0 opacity-60" />
      <div className="bg-grain absolute inset-0 opacity-[0.05] mix-blend-overlay dark:opacity-[0.07]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </motion.div>
  );
}

const CHART = [42, 68, 50, 82, 58, 96, 72, 63];

function BrowserApp({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40">
      {/* light sweep */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-130%", "130%"] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "linear", repeatDelay: 2 }}
        />
      )}

      {/* chrome */}
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/20" />
        <span className="ml-3 h-5 w-1/2 max-w-48 rounded-full bg-surface-muted" />
      </div>

      <div className="flex">
        {/* sidebar */}
        <div className="hidden w-16 flex-col gap-3 border-r border-border p-3 sm:flex">
          <span className="h-8 w-8 rounded-lg bg-accent/25" />
          {[70, 50, 60, 40].map((w, i) => (
            <span
              key={i}
              className="h-2 rounded-full bg-muted/30"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>

        {/* main */}
        <div className="flex-1 space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <span className="block h-3 w-28 rounded bg-foreground/70" />
              <span className="block h-2 w-20 rounded bg-muted/40" />
            </div>
            <span className="h-8 w-20 rounded-full bg-accent" />
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2 rounded-lg border border-border p-3">
                <span className="block h-2 w-10 rounded bg-muted/40" />
                <span className="block h-4 w-14 rounded bg-foreground/80" />
                <span
                  className={`block h-1.5 rounded ${i === 1 ? "bg-accent" : "bg-accent/40"}`}
                  style={{ width: `${60 + i * 15}%` }}
                />
              </div>
            ))}
          </div>

          {/* chart */}
          <div className="rounded-lg border border-border p-4">
            <span className="mb-3 block h-2 w-16 rounded bg-muted/40" />
            <div className="flex h-24 items-end gap-2">
              {CHART.map((h, i) => (
                <motion.span
                  key={i}
                  className={`flex-1 origin-bottom rounded-t ${h > 80 ? "bg-accent" : "bg-muted/30"}`}
                  style={{ height: `${h}%` }}
                  initial={reduce ? undefined : { scaleY: 0 }}
                  animate={reduce ? undefined : { scaleY: 1 }}
                  transition={{ delay: 0.7 + i * 0.07, duration: 0.6, ease: EASE }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneApp({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="absolute -bottom-10 -right-4 hidden w-36 rounded-[2rem] border border-border bg-surface p-2 shadow-2xl shadow-black/50 sm:right-[-1.5rem] sm:block sm:w-40"
      animate={reduce ? undefined : { y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.6 }}
    >
      <div className="overflow-hidden rounded-[1.6rem] border border-border bg-background">
        <div className="flex justify-center py-2">
          <span className="h-1 w-10 rounded-full bg-muted/40" />
        </div>
        <div className="space-y-3 p-3">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-full bg-accent/25" />
            <div className="flex-1 space-y-1.5">
              <span className="block h-2 w-3/4 rounded bg-foreground/60" />
              <span className="block h-1.5 w-1/2 rounded bg-muted/40" />
            </div>
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2">
              <span className="h-6 w-6 rounded-md bg-surface-muted" />
              <div className="flex-1 space-y-1">
                <span className="block h-1.5 w-full rounded bg-muted/40" />
                <span className="block h-1.5 w-2/3 rounded bg-muted/25" />
              </div>
            </div>
          ))}
          <span className="mt-1 block h-8 rounded-lg bg-accent" />
        </div>
      </div>
    </motion.div>
  );
}

function ScrollCue() {
  return (
    <div className="absolute inset-x-0 bottom-8 hidden justify-center lg:flex">
      <motion.div
        className="flex flex-col items-center gap-2 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-eyebrow">Scroll</span>
        <motion.span
          className="block h-8 w-px bg-gradient-to-b from-accent to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </div>
  );
}
