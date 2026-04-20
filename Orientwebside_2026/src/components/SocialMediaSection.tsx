import { useLanguage } from "@/contexts/LanguageContext";
import { SocialPlatformGrid } from "@/components/SocialPlatformGrid";

export const SocialMediaSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative border-t border-border/50 bg-muted/25 py-4 dark:border-white/5 dark:bg-gradient-to-b dark:from-orient-dark dark:to-[hsl(240_6%_4%)] sm:py-5">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="relative inline-block">
            <h2 className="text-balance text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {t("followUs")}
            </h2>
            <span
              className="absolute -bottom-1 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-orient-red to-orient-yellow"
              aria-hidden
            />
          </div>
          <p className="mx-auto mt-2 max-w-md text-pretty text-xs leading-tight text-muted-foreground sm:text-sm">
            {t("findUs")}
          </p>

          <SocialPlatformGrid className="mt-3" />
        </div>

        <div className="mx-auto mt-5 max-w-2xl border-t border-border/45 pt-4 text-center dark:border-white/[0.08]">
          <p className="mx-auto max-w-prose text-balance font-sans text-xs leading-tight text-foreground sm:text-sm">
            {t("footerTagline")}
          </p>
          <div className="mt-2 flex flex-col items-center gap-0 text-[0.65rem] text-muted-foreground sm:text-xs">
            <span>{t("footerCompanyLegal")}</span>
            <span>{t("allRightsReserved")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
