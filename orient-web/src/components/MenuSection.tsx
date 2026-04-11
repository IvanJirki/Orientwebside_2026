import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  isDishMenuLine,
  parseMenuDishLine,
  parseTrailingPrice,
  shouldMergePizzaBaseBlock,
} from "@/lib/menuSubcategoryUtils";
import { cn } from "@/lib/utils";

function MenuSubheading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
      <span
        className="h-6 w-1 shrink-0 rounded-full bg-gradient-to-b from-orient-red to-orient-yellow shadow-sm"
        aria-hidden
      />
      <span>{children}</span>
    </h4>
  );
}

const menuItemCardClass =
  "rounded-xl border border-border/80 bg-card p-4 shadow-sm transition-all duration-300 hover:border-border hover:bg-muted/40 hover:shadow-md dark:bg-card/90";

/** Same name / price layout for size-based lists, flat subcategories, and legacy flat items. */
function MenuDishItemCard({ item }: { item: string }) {
  const parsed = parseMenuDishLine(item);
  switch (parsed.kind) {
    case "three":
      return (
        <div className={cn(menuItemCardClass)}>
          <div className="mb-2 flex items-start justify-between gap-4">
            <h5 className="text-lg font-semibold tracking-tight text-foreground">{parsed.name}</h5>
            <span className="text-base font-bold whitespace-nowrap text-orient-red">{parsed.price}</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{parsed.ingredients}</p>
        </div>
      );
    case "two":
      return (
        <div className={cn(menuItemCardClass)}>
          <div className="flex items-start justify-between gap-4">
            <h5 className="text-lg font-semibold tracking-tight text-foreground">{parsed.name}</h5>
            <span className="text-base font-bold whitespace-nowrap text-orient-red">{parsed.price}</span>
          </div>
        </div>
      );
    case "trailing":
      return (
        <div className={cn(menuItemCardClass)}>
          <div className="flex items-start justify-between gap-4">
            <h5 className="text-lg font-semibold tracking-tight text-foreground">{parsed.headline}</h5>
            <span className="text-base font-bold whitespace-nowrap text-orient-red">{parsed.price}</span>
          </div>
        </div>
      );
    default:
      return (
        <div className={cn(menuItemCardClass)}>
          <span className="text-base font-medium leading-relaxed text-foreground">{parsed.text}</span>
        </div>
      );
  }
}

interface SubCategory {
  title: string;
  items: string[];
}

interface SizeCategory {
  size: string;
  subcategories: SubCategory[];
}

interface MenuSectionProps {
  /** Matches `MenuSectionData.id` — used for pizza-only extras (toppings). */
  categoryId?: string;
  title: string;
  image: string;
  description: string;
  items?: string[];
  subcategories?: SubCategory[];
  sizeCategories?: SizeCategory[];
}

export const MenuSection = ({
  categoryId,
  title,
  image,
  description,
  items,
  subcategories,
  sizeCategories,
}: MenuSectionProps) => {
  const { t } = useLanguage();
  // Auto-select if there's only one size category
  const initialSize = sizeCategories && sizeCategories.length === 1 ? sizeCategories[0].size : null;
  const [selectedSize, setSelectedSize] = useState<string | null>(initialSize);
  const [showToppings, setShowToppings] = useState(false);

  const isPizzaSection = categoryId === "pizza";
  
  return (
    <div className="group animate-in fade-in-50 slide-in-from-bottom-4 font-sans duration-500">
      <Card className="overflow-hidden border-0 bg-card text-card-foreground shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] dark:shadow-[0_0_28px_rgba(0,0,0,0.55)] dark:hover:shadow-[0_0_36px_rgba(0,0,0,0.65)]">
        <div className="relative h-36 overflow-hidden sm:h-40 md:h-44">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
        <div className="space-y-6 p-6 md:p-8">
          <header className="space-y-3 border-b border-border/60 pb-6">
            <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h3>
            <p className="leading-relaxed text-muted-foreground">{description}</p>
          </header>
          
          {isPizzaSection && (
            <>
              <div>
                <Button
                  variant="outline"
                  className="group relative w-full overflow-hidden py-6 text-base font-semibold shadow-md transition-all duration-300"
                  onClick={() => setShowToppings(!showToppings)}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {showToppings ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        {t('hideToppings')}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        {t('showToppings')}
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orient-red/0 via-orient-yellow/10 to-orient-red/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
                
                {showToppings && (
                  <div className="mt-6 space-y-6 rounded-xl border border-border bg-muted/30 p-6 shadow-inner animate-in fade-in-50 slide-in-from-top-4 duration-500 dark:bg-muted/20">
                    <div>
                      <div className="mb-4">
                        <MenuSubheading>{t("toppingPricesTitle")}</MenuSubheading>
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-transparent via-orient-yellow/5 to-transparent p-2.5 shadow-sm transition-colors duration-200 hover:via-orient-yellow/15 dark:via-orient-yellow/10 dark:hover:via-orient-yellow/20">
                          <span className="text-sm text-muted-foreground">{t('normalPizza')}</span>
                          <span className="font-bold text-orient-red">1,00€</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-transparent via-orient-yellow/5 to-transparent p-2.5 shadow-sm transition-colors duration-200 hover:via-orient-yellow/15 dark:via-orient-yellow/10 dark:hover:via-orient-yellow/20">
                          <span className="text-sm text-muted-foreground">{t('specialPizza')}</span>
                          <span className="font-bold text-orient-red">2,00€</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-transparent via-orient-yellow/5 to-transparent p-2.5 shadow-sm transition-colors duration-200 hover:via-orient-yellow/15 dark:via-orient-yellow/10 dark:hover:via-orient-yellow/20">
                          <span className="text-sm text-muted-foreground">{t('familyPizza')}</span>
                          <span className="font-bold text-orient-red">3,00€</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-transparent via-orient-yellow/5 to-transparent p-2.5 shadow-sm transition-colors duration-200 hover:via-orient-yellow/15 dark:via-orient-yellow/10 dark:hover:via-orient-yellow/20">
                          <span className="text-sm text-muted-foreground">{t('largeFamilyPizza')}</span>
                          <span className="font-bold text-orient-red">4,00€</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-transparent via-orient-yellow/5 to-transparent p-2.5 shadow-sm transition-colors duration-200 hover:via-orient-yellow/15 dark:via-orient-yellow/10 dark:hover:via-orient-yellow/20">
                          <span className="text-sm text-muted-foreground">{t('giantPizza')}</span>
                          <span className="font-bold text-orient-red">6,00€</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2.5 pt-5">
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-transparent via-orient-yellow/5 to-transparent p-2.5 shadow-sm transition-colors duration-200 hover:via-orient-yellow/15 dark:via-orient-yellow/10 dark:hover:via-orient-yellow/20">
                          <span className="text-sm text-muted-foreground">{t('saladOnPizza')}</span>
                          <span className="font-bold text-orient-red">2,00€</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-transparent via-orient-yellow/5 to-transparent p-2.5 shadow-sm transition-colors duration-200 hover:via-orient-yellow/15 dark:via-orient-yellow/10 dark:hover:via-orient-yellow/20">
                          <span className="text-sm text-muted-foreground">{t('normalSaladCup')}</span>
                          <span className="font-bold text-orient-red">2,00€</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-transparent via-orient-yellow/5 to-transparent p-2.5 shadow-sm transition-colors duration-200 hover:via-orient-yellow/15 dark:via-orient-yellow/10 dark:hover:via-orient-yellow/20">
                          <span className="text-sm text-muted-foreground">{t('doubleMeat')}</span>
                          <span className="font-bold text-orient-red">1,00€</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-transparent via-orient-yellow/5 to-transparent p-2.5 shadow-sm transition-colors duration-200 hover:via-orient-yellow/15 dark:via-orient-yellow/10 dark:hover:via-orient-yellow/20">
                          <span className="text-sm text-muted-foreground">{t('garlicCup')}</span>
                          <span className="font-bold text-orient-red">3,00€</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-transparent via-orient-yellow/5 to-transparent p-2.5 shadow-sm transition-colors duration-200 hover:via-orient-yellow/15 dark:via-orient-yellow/10 dark:hover:via-orient-yellow/20">
                          <span className="text-sm text-muted-foreground">{t('pizzaSplit')}</span>
                          <span className="font-bold text-orient-red">2,00€</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 rounded-lg bg-muted/80 p-3 dark:bg-muted/50">
                        <p className="flex items-center gap-2 text-xs italic text-muted-foreground">
                          <Lightbulb className="w-4 h-4 text-orient-yellow" />
                          <strong>{t('noteLabel')}</strong> {t('toppingNote')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-5">
                      <div className="flex items-start justify-between rounded-lg bg-gradient-to-r from-transparent via-orient-yellow/5 to-transparent p-2.5 shadow-sm transition-colors duration-200 hover:via-orient-yellow/15 dark:via-orient-yellow/10 dark:hover:via-orient-yellow/20">
                        <span className="text-sm font-bold text-foreground">{t('normalToppings')}</span>
                        <span className="ml-4 flex-1 text-right text-sm leading-relaxed text-muted-foreground">
                          {t('normalToppingsList')}
                        </span>
                      </div>
                      
                      <div className="flex items-start justify-between rounded-lg bg-gradient-to-r from-transparent via-orient-yellow/5 to-transparent p-2.5 shadow-sm transition-colors duration-200 hover:via-orient-yellow/15 dark:via-orient-yellow/10 dark:hover:via-orient-yellow/20">
                        <span className="text-sm font-bold text-foreground">{t('specialToppings')}</span>
                        <span className="ml-4 flex-1 text-right text-sm leading-relaxed text-muted-foreground">
                          {t('specialToppingsList')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          
          {sizeCategories ? (
            <div className="space-y-6">
              {sizeCategories.length > 1 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <p
                    id="menu-group-picker-label"
                    className="text-sm font-semibold text-foreground"
                  >
                    {t("menuChooseGroup")}
                  </p>
                  <div
                    className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                    role="group"
                    aria-labelledby="menu-group-picker-label"
                  >
                  {sizeCategories.slice(0, 3).map((sizecat, index) => (
                    <Button
                      key={sizecat.size}
                      style={{ animationDelay: `${index * 50}ms` }}
                      variant={selectedSize === sizecat.size ? "default" : "outline"}
                      className={`group relative min-h-[4rem] overflow-hidden whitespace-normal px-3 py-6 text-center text-sm font-semibold leading-tight transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-2 ${
                        selectedSize === sizecat.size ? "scale-105 shadow-lg" : ""
                      }`}
                      onClick={() => setSelectedSize(selectedSize === sizecat.size ? null : sizecat.size)}
                    >
                      <span className="relative z-10 break-words">{sizecat.size}</span>
                      {selectedSize !== sizecat.size && (
                        <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-orient-yellow/0 via-orient-yellow/10 to-orient-yellow/0 transition-transform duration-700 group-hover:translate-x-[100%] dark:via-orient-yellow/15" />
                      )}
                    </Button>
                  ))}
                </div>
                {sizeCategories.length > 3 && (
                  <div className="grid grid-cols-1">
                    {sizeCategories.slice(3).map((sizecat, index) => (
                      <Button
                        key={sizecat.size}
                        style={{ animationDelay: `${(index + 3) * 50}ms` }}
                        variant={selectedSize === sizecat.size ? "default" : "outline"}
                        className={`group relative min-h-[4rem] overflow-hidden whitespace-normal px-3 py-6 text-center text-sm font-semibold leading-tight transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-2 ${
                          selectedSize === sizecat.size ? "scale-105 shadow-lg" : ""
                        }`}
                        onClick={() => setSelectedSize(selectedSize === sizecat.size ? null : sizecat.size)}
                      >
                        <span className="relative z-10 break-words">{sizecat.size}</span>
                        {selectedSize !== sizecat.size && (
                          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-orient-yellow/0 via-orient-yellow/10 to-orient-yellow/0 transition-transform duration-700 group-hover:translate-x-[100%] dark:via-orient-yellow/15" />
                        )}
                      </Button>
                    ))}
                  </div>
                )}
                </div>
                {!selectedSize && (
                  <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 px-4 py-8 text-center dark:bg-muted/10">
                    <p className="text-sm leading-relaxed text-muted-foreground">{t("menuPickGroupHint")}</p>
                  </div>
                )}
              </div>
              )}

              {selectedSize && (
                <div className="space-y-6 rounded-xl border border-border bg-muted/25 p-6 shadow-inner animate-in fade-in-50 slide-in-from-top-4 duration-500 dark:bg-muted/15">
                  {(() => {
                    const subs = sizeCategories.find((sc) => sc.size === selectedSize)?.subcategories ?? [];
                    const mergePizzaBaseBlock = shouldMergePizzaBaseBlock(isPizzaSection, subs);
                    const subcatsToRender = mergePizzaBaseBlock ? subs.slice(3) : subs;

                    const renderSubcategory = (subcat: SubCategory, subcatIndex: number) => {
                      const { headline, price: titlePrice } = parseTrailingPrice(subcat.title);
                      const isSingleAvailabilityRow =
                        subcat.items.length === 1 &&
                        titlePrice !== null &&
                        !isDishMenuLine(subcat.items[0]);

                      if (isSingleAvailabilityRow) {
                        return (
                          <div
                            key={subcatIndex}
                            className={cn(
                              menuItemCardClass,
                              "space-y-0 border-border/90 bg-gradient-to-b from-card to-muted/20 p-4 sm:p-5 dark:from-card dark:to-muted/10",
                            )}
                          >
                            <div className="flex flex-col gap-3 border-b border-border/60 pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                              <div className="flex min-w-0 items-center gap-2">
                                <span
                                  className="h-6 w-1 shrink-0 rounded-full bg-gradient-to-b from-orient-red to-orient-yellow shadow-sm"
                                  aria-hidden
                                />
                                <h4 className="text-lg font-bold leading-snug tracking-tight text-foreground">
                                  {headline}
                                </h4>
                              </div>
                              <span className="shrink-0 pl-8 text-xl font-bold tabular-nums text-orient-red sm:pl-0">
                                {titlePrice}
                              </span>
                            </div>
                            <p className="pt-3 text-sm leading-relaxed text-muted-foreground">{subcat.items[0]}</p>
                          </div>
                        );
                      }

                      return (
                        <div key={subcatIndex} className="space-y-3">
                          <MenuSubheading>
                            {titlePrice ? (
                              <span className="flex w-full min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                <span className="min-w-0">{headline}</span>
                                <span className="shrink-0 text-lg font-bold tabular-nums text-orient-red">{titlePrice}</span>
                              </span>
                            ) : (
                              subcat.title
                            )}
                          </MenuSubheading>
                          <div className="space-y-2.5">
                            {subcat.items.map((item, itemIndex) => (
                              <MenuDishItemCard key={itemIndex} item={item} />
                            ))}
                          </div>
                        </div>
                      );
                    };

                    return (
                      <>
                        {mergePizzaBaseBlock && (() => {
                          const baseSubs = subs.slice(0, 3);
                          const noteTrimmed = baseSubs.map((s) => (s.items[0] ?? "").trim());
                          const allNotesMatch =
                            Boolean(noteTrimmed[0]) &&
                            noteTrimmed[0] === noteTrimmed[1] &&
                            noteTrimmed[1] === noteTrimmed[2];
                          /** Yksi selite koko lohkolle: sama tallenne kaikilla kolmella rivillä, muuten ryhmän oletusteksti (korvaa vanhat rivikohtaiset "Kaikki … saatavilla …"). */
                          const resolvedPizzaBaseFooter =
                            allNotesMatch
                              ? noteTrimmed[0]
                              : selectedSize === t("normalPizzas")
                                ? t("pizzaBaseSharedNoteNormal")
                                : selectedSize === t("kebabChickenPizzas")
                                  ? t("pizzaBaseSharedNoteKebab")
                                  : selectedSize === t("specialPizzas")
                                    ? t("pizzaBaseSharedNoteSpecial")
                                    : noteTrimmed.find((n) => n) ?? "";

                          return (
                            <div className="space-y-3">
                              <MenuSubheading>{t("pizzaBaseOptionsHeading")}</MenuSubheading>
                              <div
                                className={cn(
                                  menuItemCardClass,
                                  "overflow-hidden border-border/90 bg-gradient-to-b from-card to-muted/20 p-0 dark:from-card dark:to-muted/10",
                                )}
                              >
                                {baseSubs.map((subcat, i) => {
                                  const { headline, price: titlePrice } = parseTrailingPrice(subcat.title);
                                  return (
                                    <div
                                      key={`pizza-base-${i}`}
                                      className={cn(
                                        "px-4 py-4 sm:px-5",
                                        i < baseSubs.length - 1 && "border-b border-border/60",
                                      )}
                                    >
                                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                                        <h5 className="text-base font-bold leading-snug text-foreground sm:text-lg">{headline}</h5>
                                        <span className="shrink-0 text-lg font-bold tabular-nums text-orient-red sm:text-xl">
                                          {titlePrice}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                                {resolvedPizzaBaseFooter.trim() !== "" && (
                                  <div className="border-t border-border/60 bg-muted/15 px-4 py-3 sm:px-5 dark:bg-muted/10">
                                    <p className="text-sm leading-relaxed text-muted-foreground">{resolvedPizzaBaseFooter}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                        {subcatsToRender.map((subcat, idx) => renderSubcategory(subcat, mergePizzaBaseBlock ? idx + 3 : idx))}
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          ) : subcategories ? (
            <div className="space-y-6">
              {subcategories.map((subcat, subcatIndex) => (
                <div key={subcatIndex} className="space-y-3">
                  <MenuSubheading>{subcat.title}</MenuSubheading>
                  <div className="space-y-2.5">
                    {subcat.items.map((item, itemIndex) => (
                      <MenuDishItemCard key={itemIndex} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2.5">
              {items?.map((item, index) => (
                <MenuDishItemCard key={index} item={item} />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};