import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pizza, UtensilsCrossed, Baby, Coffee } from "lucide-react";
import { MenuSection } from "@/components/MenuSection";
import { useLanguage } from "@/contexts/LanguageContext";

interface MenuSubCategory {
  title: string;
  items: string[];
}

interface MenuSizeCategory {
  size: string;
  subcategories: MenuSubCategory[];
}

export interface MenuSectionData {
  id: string;
  title: string;
  image: string;
  description: string;
  items?: string[];
  sizeCategories?: MenuSizeCategory[];
}

interface MenuSelectorProps {
  menuSections: MenuSectionData[];
}

export const MenuSelector = ({ menuSections }: MenuSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [selectedCategory]);

  const categories = [
    { id: "pizza", icon: Pizza, title: t('menuPizzas'), description: t('menuPizzasDesc') },
    { id: "dishes", icon: UtensilsCrossed, title: t('menuDishes'), description: t('menuDishesDesc') },
    { id: "kids", icon: Baby, title: t('menuKidsMenu'), description: t('menuKidsMenuDesc') },
    { id: "drinks", icon: Coffee, title: t('menuDrinks'), description: t('menuDrinksDesc') }
  ];

  const getCategoryContent = () => {
    if (!selectedCategory) return null;
    return menuSections.find((s) => s.id === selectedCategory) ?? null;
  };

  const selectedContent = getCategoryContent();

  if (selectedCategory && selectedContent) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-6 font-sans">
        <nav
          className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-card/85 p-3 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-4 dark:bg-card/70"
          aria-label={t("menu")}
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => setSelectedCategory(null)}
            className="h-11 w-full shrink-0 gap-2 bg-background/90 sm:w-auto dark:bg-muted/40 dark:hover:bg-muted/60"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            {t("backToSelection")}
          </Button>
          <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-end">
            {t("menuTitle")}
          </p>
        </nav>

        <MenuSection
          categoryId={selectedContent.id}
          title={selectedContent.title}
          image={selectedContent.image}
          description={selectedContent.description}
          items={"items" in selectedContent ? selectedContent.items : undefined}
          sizeCategories={"sizeCategories" in selectedContent ? selectedContent.sizeCategories : undefined}
        />
      </div>
    );
  }

  return (
      <div className="space-y-8 font-sans animate-in fade-in-50 duration-500 sm:space-y-10">
      <div className="space-y-2 text-center sm:space-y-3">
        <h3 className="text-2xl font-bold text-white drop-shadow-md sm:text-3xl md:text-4xl" style={{ textShadow: '0 2px 4px rgba(255, 255, 255, 0.2), 0 1px 2px rgba(255, 255, 255, 0.15)' }}>
          {t('selectPromptTitle')}
        </h3>
        <p className="mx-auto max-w-2xl px-1 text-sm text-muted-foreground drop-shadow-sm sm:text-base">
          {t('selectPromptSubtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="group relative cursor-pointer overflow-hidden border-2 border-transparent bg-gradient-to-br from-card via-card to-muted/30 p-6 shadow-md transition-all duration-500 animate-in fade-in-50 slide-in-from-bottom-4 hover:border-orient-red/30 hover:shadow-[var(--shadow-elegant)] touch-manipulation sm:p-8"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orient-yellow/5 to-orient-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex flex-col items-center text-center space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-orient-red to-orient-yellow shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-10 h-10 text-white drop-shadow-lg" strokeWidth={2.5} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-foreground group-hover:text-orient-red transition-colors duration-300 drop-shadow-md">
                    {category.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed drop-shadow-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
