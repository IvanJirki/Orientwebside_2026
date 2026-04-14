import type { MenuSectionData } from "@/components/MenuSelector";
import { resolveLocalized, type SiteConfig, type SiteLang, type SpecialOffer, type StoredMenuCategory } from "@/types/siteConfig";
import i18n from "@/i18n";
import { buildMenuSections } from "@/lib/buildMenuSections";
import pizzaImage from "@/assets/images/pizza-menu.jpg";
import kidsMenuImage from "@/assets/images/kids-menu.jpg";
import kebabFriesImage from "@/assets/images/kebab-wrap-with-fries.jpg";
import drinksImage from "@/assets/images/drinks-sodas.jpg";

export const SITE_CONFIG_STORAGE_KEY = "orient-site-config-v1";

const IMAGE_BY_ID: Record<StoredMenuCategory["imageId"], string> = {
  pizza: pizzaImage,
  kids: kidsMenuImage,
  dishes: kebabFriesImage,
  drinks: drinksImage,
};

function zipMenu(
  fi: MenuSectionData[],
  en: MenuSectionData[],
  sv: MenuSectionData[],
): StoredMenuCategory[] {
  return fi.map((catFi, i) => {
    const catEn = en[i];
    const catSv = sv[i];
    const imageId = catFi.id as StoredMenuCategory["imageId"];
    return {
      id: catFi.id,
      imageId,
      title: { fi: catFi.title, en: catEn.title, sv: catSv.title },
      description: { fi: catFi.description, en: catEn.description, sv: catSv.description },
      sizeCategories: catFi.sizeCategories!.map((scFi, j) => {
        const scEn = catEn.sizeCategories![j];
        const scSv = catSv.sizeCategories![j];
        return {
          size: { fi: scFi.size, en: scEn.size, sv: scSv.size },
          subcategories: scFi.subcategories.map((subFi, k) => {
            const subEn = scEn.subcategories[k];
            const subSv = scSv.subcategories[k];
            const items = subFi.items.map((lineFi, m) => ({
              fi: lineFi,
              en: subEn.items[m] ?? lineFi,
              sv: subSv.items[m] ?? lineFi,
            }));
            return {
              title: { fi: subFi.title, en: subEn.title, sv: subSv.title },
              items,
            };
          }),
        };
      }),
    };
  });
}

/** Snapshot current i18n menus into editable stored format (all 3 languages). */
export function buildStoredMenuFromI18n(): SiteConfig {
  const tFi = i18n.getFixedT("fi");
  const tEn = i18n.getFixedT("en");
  const tSv = i18n.getFixedT("sv");
  const a = buildMenuSections(tFi);
  const b = buildMenuSections(tEn);
  const c = buildMenuSections(tSv);
  const existing = loadSiteConfig();
  const defaults = getDefaultSiteConfig();
  return {
    version: 1,
    useCustomMenu: true,
    categories: zipMenu(a, b, c),
    specialOffers: existing?.specialOffers ?? [],
    useCustomHome: existing?.useCustomHome ?? false,
    homeHero: existing?.homeHero ?? defaults.homeHero,
  };
}

export function storedToMenuSections(config: SiteConfig, lang: SiteLang): MenuSectionData[] {
  return config.categories.map((cat) => ({
    id: cat.id,
    title: resolveLocalized(cat.title, lang),
    description: resolveLocalized(cat.description, lang),
    image: IMAGE_BY_ID[cat.imageId],
    sizeCategories: cat.sizeCategories.map((sc) => ({
      size: resolveLocalized(sc.size, lang),
      subcategories: sc.subcategories.map((sub) => ({
        title: resolveLocalized(sub.title, lang),
        items: sub.items.map((line) => resolveLocalized(line, lang)),
      })),
    })),
  }));
}

export function loadSiteConfig(): SiteConfig | null {
  try {
    const raw = localStorage.getItem(SITE_CONFIG_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SiteConfig;
    if (parsed.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSiteConfig(config: SiteConfig): void {
  localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(config));
}

const emptyLocalized = (): { fi: string; en: string; sv: string } => ({
  fi: "",
  en: "",
  sv: "",
});

export function getDefaultSiteConfig(): SiteConfig {
  return {
    version: 1,
    useCustomMenu: false,
    categories: [],
    specialOffers: [],
    useCustomHome: false,
    homeHero: {
      title: emptyLocalized(),
      subtitle: emptyLocalized(),
    },
  };
}

export function mergeConfigWithStorage(): SiteConfig {
  const loaded = loadSiteConfig();
  const defaults = getDefaultSiteConfig();
  if (!loaded) return defaults;
  return {
    version: 1,
    useCustomMenu: loaded.useCustomMenu ?? false,
    useCustomHome: loaded.useCustomHome ?? false,
    categories: loaded.categories ?? [],
    specialOffers: loaded.specialOffers ?? [],
    homeHero: loaded.homeHero ?? defaults.homeHero,
  };
}

export function activeSpecialOffers(offers: SpecialOffer[]): SpecialOffer[] {
  const today = new Date().toISOString().slice(0, 10);
  return offers.filter((o) => {
    if (!o.active) return false;
    if (!o.validUntil) return true;
    return o.validUntil >= today;
  });
}
