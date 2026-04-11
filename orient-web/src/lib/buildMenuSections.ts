import type { TFunction } from "i18next";
import type { MenuSectionData } from "@/components/MenuSelector";
import pizzaImage from "@/assets/pizza-menu.jpg";
import kebabImage from "@/assets/kebab-menu.jpg";
import kidsMenuImage from "@/assets/kids-menu.jpg";
import kebabFriesImage from "@/assets/kebab-wrap-with-fries.jpg";
import drinksImage from "@/assets/drinks-sodas.jpg";

/** Default menu from i18n (same structure as previous inline Menu.tsx). */
export function buildMenuSections(t: TFunction): MenuSectionData[] {
  return [
    {
      id: "pizza",
      title: t("menuPizzas"),
      image: pizzaImage,
      description: t("menuPizzasDesc"),
      sizeCategories: [
        {
          size: t("normalPizzas"),
          subcategories: [
            {
              title: `${t("pannuGluteeniton")} - 14,00€`,
              items: [t("pizzaBaseSharedNoteNormal")],
            },
            {
              title: `${t("perhepizzaTitle")} - 23,00€`,
              items: [t("pizzaBaseSharedNoteNormal")],
            },
            {
              title: `${t("isoPerhepizzaTitle")} - 35,00€`,
              items: [t("pizzaBaseSharedNoteNormal")],
            },
            {
              title: t("normalSize"),
              items: [
                `${t("pizza1")} - 11,00€`,
                `${t("pizza2")} - 11,00€`,
                `${t("pizza3")} - 11,00€`,
                `${t("pizza4")} - 11,00€`,
                `${t("pizza5")} - 11,00€`,
                `${t("pizza6")} - 11,00€`,
                `${t("pizza7")} - 11,00€`,
                `${t("pizza8")} - 11,00€`,
                `${t("pizza9")} - 11,00€`,
                `${t("pizza10")} - 11,00€`,
                `${t("pizza11")} - 11,00€`,
                `${t("pizza12")} - 11,00€`,
                `${t("pizza13")} - 11,00€`,
                `${t("pizza14")} - 11,00€`,
                `${t("pizza15")} - 11,00€`,
                `${t("pizza16")} - 11,00€`,
                `${t("pizza17")} - 11,00€`,
                `${t("pizza18")} - 11,00€`,
                `${t("pizza19")} - 11,00€`,
              ],
            },
          ],
        },
        {
          size: t("kebabChickenPizzas"),
          subcategories: [
            {
              title: `${t("pannuGluteeniton")} - 15,00€`,
              items: [t("pizzaBaseSharedNoteKebab")],
            },
            {
              title: `${t("perhepizzaTitle")} - 25,00€`,
              items: [t("pizzaBaseSharedNoteKebab")],
            },
            {
              title: `${t("isoPerhepizzaTitle")} - 37,00€`,
              items: [t("pizzaBaseSharedNoteKebab")],
            },
            {
              title: t("normalSize"),
              items: [
                `${t("pizza20")} - 12,00€`,
                `${t("pizza21")} - 12,00€`,
                `${t("pizza22")} - 12,00€`,
                `${t("pizza23")} - 12,00€`,
                `${t("pizza24")} - 12,00€`,
                `${t("pizza25")} - 12,00€`,
                `${t("pizza26")} - 12,00€`,
                `${t("pizza27")} - 12,00€`,
                `${t("pizza28")} - 12,00€`,
                `${t("pizza29")} - 12,00€`,
                `${t("pizza30")} - 12,00€`,
                `${t("pizza31")} - 12,00€`,
                `${t("pizza32")} - 12,00€`,
                `${t("pizza33")} - 12,00€`,
              ],
            },
          ],
        },
        {
          size: t("specialPizzas"),
          subcategories: [
            {
              title: `${t("pannuGluteeniton")} - 17,00€`,
              items: [t("pizzaBaseSharedNoteSpecial")],
            },
            {
              title: `${t("perhepizzaTitle")} - 30,00€`,
              items: [t("pizzaBaseSharedNoteSpecial")],
            },
            {
              title: `${t("isoPerhepizzaTitle")} - 40,00€`,
              items: [t("pizzaBaseSharedNoteSpecial")],
            },
            {
              title: t("normalSize"),
              items: [
                `${t("pizza34")} - 14,00€`,
                `${t("pizza35")} - 14,00€`,
                `${t("pizza36")} - 14,00€`,
                `${t("pizza37")} - 14,00€`,
                `${t("pizza38")} - 14,00€`,
                `${t("pizza39")} - 14,00€`,
                `${t("pizza40")} - 14,00€`,
                `${t("pizza41")} - 14,00€`,
              ],
            },
          ],
        },
        {
          size: t("giantPizzaSize"),
          subcategories: [
            {
              title: t("giantPizzas"),
              items: [
                `${t("giantPizza1")} - 35,00€`,
                `${t("giantPizza2")} - 37,00€`,
                `${t("giantPizza3")} - 37,00€`,
                `${t("giantPizza4")} - 37,00€`,
                `${t("giantPizza5")} - 39,00€`,
                `${t("giantPizza6")} - 39,00€`,
                `${t("giantPizza7")} - 39,00€`,
                `${t("giantPizza8")} - 39,00€`,
                `${t("giantPizza9")} - 42,00€`,
                `${t("giantPizza10")} - 46,00€`,
                `${t("giantPizza11")} - 49,00€`,
              ],
            },
          ],
        },
      ],
    },
    {
      id: "kids",
      title: t("menuKidsMenu"),
      image: kidsMenuImage,
      description: t("menuKidsMenuDesc"),
      sizeCategories: [
        {
          size: t("kidsMenuTitle"),
          subcategories: [
            {
              title: t("kidsMenuSubtitle"),
              items: [
                `${t("kidsPizza")} - 7,00€`,
                `${t("kidsNuggetsAndFries")} - 10,00€`,
                `${t("kidsNuggets")} - 5,00€`,
                `${t("kidsFries")} - 5,00€`,
              ],
            },
          ],
        },
      ],
    },
    {
      id: "dishes",
      title: t("menuDishes"),
      image: kebabFriesImage,
      description: t("menuDishesDesc"),
      sizeCategories: [
        {
          size: t("kebabDishesTitle"),
          subcategories: [
            {
              title: t("kebabTitle"),
              items: [
                `${t("pitaKebab")} - 12,00€`,
                `${t("rullaKebab")} - 12,00€`,
                `${t("rullaKebabCheese")} - 14,00€`,
                `${t("kebabRice")} - 12,00€`,
                `${t("kebabIskender")} - 12,00€`,
                `${t("kebabFries")} - 12,00€`,
                `${t("kebabWedges")} - 12,00€`,
                `${t("orientSpecialDish")} - 14,00€`,
              ],
            },
            {
              title: t("largeKebabTitle"),
              items: [`${t("familyKebab")} - 25,00€`, `${t("giantKebab")} - 45,00€`],
            },
          ],
        },
        {
          size: t("chickenDishesTitle"),
          subcategories: [
            {
              title: t("chickenTitle"),
              items: [
                `${t("chickenWrap")} - 12,00€`,
                `${t("chickenRice")} - 12,00€`,
                `${t("shawarmaFries")} - 14,00€`,
                `${t("shawarmaWedges")} - 14,00€`,
                `${t("pitaShawarma")} - 14,00€`,
                `${t("shawarmaRice")} - 14,00€`,
                `${t("shawarmWrap")} - 14,00€`,
              ],
            },
          ],
        },
        {
          size: t("falafelDishesTitle"),
          subcategories: [
            {
              title: t("falafelTitle"),
              items: [
                `${t("pitaFalafel")} - 9,00€`,
                `${t("falafelFries")} - 14,00€`,
                `${t("falafelWedges")} - 14,00€`,
                `${t("falafelRice")} - 14,00€`,
                `${t("falafelWrap")} - 14,00€`,
              ],
            },
          ],
        },
        {
          size: t("saladDishesTitle"),
          subcategories: [
            {
              title: t("saladTitle"),
              items: [
                `${t("chickenSalad")} - 12,00€`,
                `${t("kebabSalad")} - 12,00€`,
                `${t("tunaSalad")} - 12,00€`,
                `${t("shawarmaSalad")} - 13,00€`,
                `${t("falafelSalad")} - 12,00€`,
                `${t("shrimpSalad")} - 13,00€`,
                `${t("greekSalad")} - 13,00€`,
              ],
            },
          ],
        },
      ],
    },
    {
      id: "drinks",
      title: t("menuDrinks"),
      image: drinksImage,
      description: t("menuDrinksDesc"),
      sizeCategories: [
        {
          size: t("drinksTitle"),
          subcategories: [
            {
              title: t("drinksSubtitle"),
              items: [
                `${t("soda033")} - 2,50€`,
                `${t("soda05")} - 3,50€`,
                `${t("soda15")} - 5,00€`,
                `${t("milk")} - 2,00€`,
                `${t("water033")} - 1,50€`,
                `${t("water05")} - 2,00€`,
              ],
            },
          ],
        },
      ],
    },
  ];
}
