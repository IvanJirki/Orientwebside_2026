import { cn } from "@/lib/utils";

/** Emoji-lippu tai valinnainen kuva (esim. Suomen / Kurdistanin lippu). */
export function LanguageOptionIcon({
  flag,
  iconSrc,
  active,
  className,
}: {
  flag?: string;
  /** Vite-import polku (png/svg) — näytetään emojiin sijaan */
  iconSrc?: string;
  /** Tervetulodialogin valittu tila (gradient-painike) */
  active?: boolean;
  className?: string;
}) {
  if (iconSrc) {
    return (
      <span
        className={cn(
          "inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm shadow-sm",
          active
            ? "border border-white/50 ring-1 ring-white/30"
            : "border border-border/50 bg-muted/30 dark:bg-muted/20",
          className,
        )}
        aria-hidden
      >
        <img
          src={iconSrc}
          alt=""
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-[1.75rem] items-center justify-center text-[1.35rem] leading-none select-none",
        className,
      )}
      aria-hidden
    >
      {flag}
    </span>
  );
}
