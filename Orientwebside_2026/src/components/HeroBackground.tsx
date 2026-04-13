import heroImage from "@/assets/images/hero-food-spread.jpg";

/** Same layered background as the home Hero (pattern + photo + gradient). */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-slate-100 dark:bg-orient-dark">
      <div className="absolute inset-0 opacity-30 sm:opacity-40">
        <div
          style={{
            backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 60px,
                  rgba(0, 0, 0, 0.3) 60px,
                  rgba(0, 0, 0, 0.3) 62px
                ),
                repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 60px,
                  rgba(0, 0, 0, 0.3) 60px,
                  rgba(0, 0, 0, 0.3) 62px
                )
              `,
            backgroundSize: "85px 85px",
            backgroundPosition: "0 0, 42.5px 0",
          }}
          className="absolute inset-0 dark:[background-image:repeating-linear-gradient(45deg,transparent,transparent_60px,rgba(255,255,255,0.5)_60px,rgba(255,255,255,0.5)_62px),repeating-linear-gradient(-45deg,transparent,transparent_60px,rgba(255,255,255,0.5)_60px,rgba(255,255,255,0.5)_62px)] sm:[background-size:120px_120px] sm:[background-position:0_0,60px_0]"
        />
      </div>
      <img
        src={heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center opacity-30 sm:opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200/70 via-orient-red/15 to-slate-200/70 dark:from-orient-dark/70 dark:via-orient-red/15 dark:to-orient-dark/70" />
    </div>
  );
}
