import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { buildMenuSections } from "@/lib/buildMenuSections";
import { storedToMenuSections } from "@/lib/siteConfigStorage";
import type { SiteLang } from "@/types/siteConfig";
import type { MenuSectionData } from "@/components/MenuSelector";

export function useMenuSections(): MenuSectionData[] {
  const { t, language } = useLanguage();
  const { config } = useSiteConfig();

  return useMemo(() => {
    const lang = language as SiteLang;
    if (config.useCustomMenu && config.categories.length > 0) {
      return storedToMenuSections(config, lang);
    }
    return buildMenuSections(t);
  }, [config, language, t]);
}
