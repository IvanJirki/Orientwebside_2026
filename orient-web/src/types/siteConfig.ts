export type SiteLang = "fi" | "en" | "sv";

export interface LocalizedString {
  fi: string;
  en: string;
  sv: string;
}

/** One dish row per language (same index = same dish). */
export interface StoredSubcategory {
  title: LocalizedString;
  items: LocalizedString[];
}

export interface StoredSizeCategory {
  size: LocalizedString;
  subcategories: StoredSubcategory[];
}

export interface StoredMenuCategory {
  id: string;
  imageId: "pizza" | "kids" | "dishes" | "drinks";
  title: LocalizedString;
  description: LocalizedString;
  sizeCategories: StoredSizeCategory[];
}

export interface SpecialOffer {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  /** e.g. "Alkaen 10 €" */
  priceLabel: string;
  active: boolean;
  /** ISO date YYYY-MM-DD or null */
  validUntil: string | null;
}

export interface SiteConfig {
  version: 1;
  useCustomMenu: boolean;
  categories: StoredMenuCategory[];
  specialOffers: SpecialOffer[];
  /** When true, Hero uses homeHero where a field is non-empty; otherwise i18n. */
  useCustomHome: boolean;
  homeHero: {
    title: LocalizedString;
    subtitle: LocalizedString;
  };
}
