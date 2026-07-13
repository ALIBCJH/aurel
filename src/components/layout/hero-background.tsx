import { cn } from "@/lib/utils";

/**
 * HeroBackground — layered ambient texture for the hero.
 *
 * Three restrained layers, all theme-aware and purely decorative:
 *   1. a masked dot grid that fades toward the edges,
 *   2. two soft gold glows for depth and warmth,
 *   3. a fine film grain for editorial richness.
 *
 * Pure CSS (no client JS), pointer-events disabled, and sits behind content.
 */
export function HeroBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* 1 — dot grid */}
      <div className="hero-dots absolute inset-0 opacity-70" />

      {/* 2 — ambient gold glows */}
      <div className="hero-glow absolute -top-40 right-[-8%] h-[560px] w-[560px] rounded-full blur-2xl" />
      <div className="hero-glow absolute bottom-[-30%] left-[-10%] h-[460px] w-[460px] rounded-full opacity-60 blur-2xl" />

      {/* 3 — film grain */}
      <div className="bg-grain absolute inset-0 opacity-[0.035] mix-blend-overlay dark:opacity-[0.06]" />

      {/* soft fade into the page below */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
