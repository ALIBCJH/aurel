"use client";

import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { KineticHeadline } from "@/components/motion/kinetic-headline";
import { GemMark } from "@/components/brand/gem-mark";
import { Diamond } from "@/components/brand/facet";
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

const capabilities = [
  { label: "Software", float: "7s", delay: "0s" },
  { label: "AI", float: "8.4s", delay: "-2s" },
  { label: "Design", float: "7.6s", delay: "-4s" },
  { label: "Strategy", float: "8s", delay: "-1s" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // ---- Scroll choreography -------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, reduce ? 1 : 0],
  );

  // ---- Pointer: spotlight + parallax ---------------------------------------
  const spotX = useMotionValue(0.5);
  const spotY = useMotionValue(0.35);
  const spotXpc = useTransform(spotX, (v) => `${v * 100}%`);
  const spotYpc = useTransform(spotY, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${spotXpc} ${spotYpc}, color-mix(in srgb, var(--accent) 15%, transparent), transparent 60%)`;

  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const pcfg = { stiffness: 120, damping: 20, mass: 0.6 };
  const snx = useSpring(nx, pcfg);
  const sny = useSpring(ny, pcfg);

  function handleMove(e: PointerEvent<HTMLElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;
    spotX.set(rx);
    spotY.set(ry);
    nx.set(rx - 0.5);
    ny.set(ry - 0.5);
  }
  function handleLeave() {
    spotX.set(0.5);
    spotY.set(0.35);
    nx.set(0);
    ny.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-32 pb-24 sm:pt-36 lg:pt-40"
    >
      <LivingBackground
        bgY={bgY}
        spotlight={spotlight}
        snx={snx}
        sny={sny}
        reduce={!!reduce}
      />

      <Container className="relative w-full">
        <motion.div
          variants={containerV}
          initial="hidden"
          animate="show"
          style={{ y: contentY, opacity: contentOpacity }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemV}
            className="flex items-center gap-3 text-eyebrow text-accent"
          >
            <Diamond className="opacity-70" />
            Digital transformation studio
            <Diamond className="opacity-70" />
          </motion.p>

          {/* Kinetic headline */}
          <KineticHeadline
            className="mt-7 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[5.25rem] lg:leading-[0.98]"
            delay={0.15}
            lines={[
              [{ t: "Technology," }, { t: "held" }, { t: "to" }, { t: "a" }],
              [{ t: "higher", accent: true }, { t: "standard." }],
            ]}
          />

          <motion.p
            variants={itemV}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
          >
            Aurel helps ambitious businesses modernise, grow, and lead — custom
            software, AI, and design, crafted end to end by a partner you can
            trust.
          </motion.p>

          <motion.div
            variants={itemV}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
              <ArrowUpRightIcon width={18} height={18} />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore what we do
            </Button>
          </motion.div>

          {/* Floating capability pills */}
          <motion.div
            variants={itemV}
            className="mt-14 flex flex-wrap items-center justify-center gap-3"
          >
            {capabilities.map((cap) => (
              <FloatingPill
                key={cap.label}
                label={cap.label}
                float={cap.float}
                delay={cap.delay}
                snx={snx}
                sny={sny}
                reduce={!!reduce}
              />
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {!reduce && <ScrollCue />}
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function LivingBackground({
  bgY,
  spotlight,
  snx,
  sny,
  reduce,
}: {
  bgY: MotionValue<number>;
  spotlight: MotionValue<string>;
  snx: MotionValue<number>;
  sny: MotionValue<number>;
  reduce: boolean;
}) {
  const auroraX = useTransform(snx, (v) => v * 22);
  const auroraY = useTransform(sny, (v) => v * 16);
  const gemX = useTransform(snx, (v) => v * -34);
  const gemY = useTransform(sny, (v) => v * -22);

  return (
    <motion.div
      aria-hidden
      style={{ y: bgY }}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Slowly rotating gold aurora */}
      <motion.div
        style={{ x: auroraX, y: auroraY }}
        className="absolute left-1/2 top-[-22%] h-[82vh] w-[82vh] -translate-x-1/2"
      >
        <motion.div
          className="h-full w-full rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "conic-gradient(from 0deg, var(--accent-soft), transparent 35%, var(--accent-soft) 65%, transparent 100%)",
          }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
        />
      </motion.div>

      {/* Faint gold hairline grid */}
      <div className="bg-line-grid absolute inset-0 opacity-80" />

      {/* Large faceted gem watermark — parallaxes opposite the pointer */}
      <motion.div
        style={{ x: gemX, y: gemY }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <GemMark
          strokeWidth={1.5}
          className="w-[min(80vw,640px)] text-accent opacity-[0.06] drop-shadow-[0_0_40px_var(--accent-soft)]"
        />
      </motion.div>

      {/* Central bloom behind the headline */}
      <div className="hero-glow absolute left-1/2 top-[46%] h-[58vh] w-[58vh] -translate-x-1/2 -translate-y-1/2 opacity-70 blur-2xl" />

      {/* Cursor-tracked spotlight */}
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />

      {/* Film grain + bottom fade into the page */}
      <div className="bg-grain absolute inset-0 opacity-[0.05] mix-blend-overlay dark:opacity-[0.07]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </motion.div>
  );
}

function FloatingPill({
  label,
  float,
  delay,
  snx,
  sny,
  reduce,
}: {
  label: string;
  float: string;
  delay: string;
  snx: MotionValue<number>;
  sny: MotionValue<number>;
  reduce: boolean;
}) {
  const x = useTransform(snx, (v) => v * 30);
  const y = useTransform(sny, (v) => v * 18);
  return (
    <motion.span style={reduce ? undefined : { x, y }} className="inline-block">
      <span
        className={cnFloat(reduce)}
        style={
          {
            "--float-duration": float,
            "--float-delay": delay,
          } as React.CSSProperties
        }
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/40 px-4 py-2 text-sm text-muted backdrop-blur-md transition-colors duration-300 hover:border-accent/40 hover:text-foreground">
          <span className="h-1.5 w-1.5 rotate-45 bg-accent/80" />
          {label}
        </span>
      </span>
    </motion.span>
  );
}

// Small helper so the levitation class only applies when motion is allowed.
function cnFloat(reduce: boolean) {
  return reduce ? "inline-block" : "island-float inline-block";
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
