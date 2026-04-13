import { SpecialOffersBanner } from "@/components/SpecialOffersBanner";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { activeSpecialOffers } from "@/lib/siteConfigStorage";

export function IndexOffersStrip() {
  const { config } = useSiteConfig();
  if (activeSpecialOffers(config.specialOffers).length === 0) return null;

  return (
    <div className="relative z-20 border-b border-border/40 bg-background/80 px-4 py-6 backdrop-blur-md dark:bg-background/60">
      <div className="container mx-auto max-w-4xl">
        <SpecialOffersBanner />
      </div>
    </div>
  );
}
