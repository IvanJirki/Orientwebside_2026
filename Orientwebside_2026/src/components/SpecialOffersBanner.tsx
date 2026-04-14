import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { activeSpecialOffers } from "@/lib/siteConfigStorage";
import { resolveLocalized, type SiteLang } from "@/types/siteConfig";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpecialOffersBannerProps {
  /** Menu page uses light text on photo background */
  variant?: "default" | "onImage";
}

export function SpecialOffersBanner({ variant = "default" }: SpecialOffersBannerProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { config } = useSiteConfig();
  const lang = language as SiteLang;
  const offers = activeSpecialOffers(config.specialOffers);

  if (offers.length === 0) return null;

  const onImage = variant === "onImage";

  return (
    <div className={cn("space-y-4", onImage ? "mb-8 sm:mb-10" : "mb-0")}>
      <div
        className={cn(
          "flex items-center justify-center gap-2",
          onImage ? "text-white" : "text-foreground",
        )}
      >
        <Sparkles className={cn("h-5 w-5", onImage ? "text-orient-yellow" : "text-orient-red")} aria-hidden />
        <span
          className={cn(
            "text-sm font-semibold uppercase tracking-wide",
            onImage ? "text-white/90" : "text-muted-foreground",
          )}
        >
          {t("specialOffersTitle")}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {offers.map((offer) => (
          <Card
            key={offer.id}
            className="border-orient-red/30 bg-card/95 p-4 text-left shadow-lg backdrop-blur-sm dark:bg-card/90"
          >
            <p className="text-xs font-semibold uppercase text-orient-red">{offer.priceLabel}</p>
            <h3 className="mt-1 font-sans text-lg font-bold tracking-tight text-foreground">
              {resolveLocalized(offer.title, lang)}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{resolveLocalized(offer.description, lang)}</p>
            {offer.validUntil && (
              <p className="mt-3 text-xs text-muted-foreground">
                {t("offerValidUntil")} {offer.validUntil}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
