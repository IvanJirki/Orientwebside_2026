import heroImage from "@/assets/images/hero-food-spread.jpg";

/** Layered hero backdrop: soft texture, photo, atmospheric gradients — restrained for readability. */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 bg-neutral-100 dark:bg-orient-dark">
      {/* Subtle grain — light vs dark so dots stay tasteful on each base */}
      <div className="absolute inset-0 block bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.045)_1px,transparent_0)] [background-size:22px_22px] opacity-[0.55] dark:hidden" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.05)_1px,transparent_0)] [background-size:22px_22px] opacity-35 dark:block" />

      <img
        src={heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.34] brightness-[0.98] saturate-[1.03] sm:opacity-[0.4]"
      />

      {/* Warm brand spotlight from above */}
      <div className="absolute inset-0 bg-gradient-to-b from-orient-red/[0.14] via-orient-red/[0.04] to-transparent dark:from-orient-red/[0.2] dark:via-orient-red/[0.06] dark:to-transparent" />

      {/* Vertical wash: keeps text legible, adds depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/70 via-neutral-100/15 to-neutral-200/75 dark:from-[hsl(240_10%_9%/0.88)] dark:via-transparent dark:to-black/[0.52]" />

      {/* Soft edge vignette — draws focus to center content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_105%_90%_at_50%_48%,transparent_48%,rgb(0_0_0/0.1)_100%)] dark:bg-[radial-gradient(ellipse_110%_95%_at_50%_50%,transparent_42%,rgb(0_0_0/0.48)_100%)]" />
    </div>
  );
}
