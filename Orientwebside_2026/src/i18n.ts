import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import de from "./locales/de.json";
import ar from "./locales/ar.json";
import fr from "./locales/fr.json";
import ku from "./locales/ku.json";
import ckb from "./locales/ckb.json";
import bah from "./locales/bah.json";

const resources = {
  fi: {
    translation: {
      // Navigation
      home: 'Etusivu',
      about: 'Tietoa',
      menu: 'Ruokalista',
      contact: 'Yhteystiedot',
      mobileNavTitle: 'Valikko',
      
      // Hero
      heroTitle: 'Paikallinen Pizzeria Iissä',
      heroSubtitle: 'Vuodesta 2002 palvellut pizzeriamme tarjoaa herkullisia pizzoja, tuoreita kebabeja, maukkaita rullakebab-annoksia sekä muita herkkuja. Tervetuloa nauttimaan hyvästä ruoasta!',
      aboutUs: 'Tietoa meistä',
      callAndOrder: 'Soita ja tilaa',
      
      // Social Media
      followUs: 'Seuraa meitä somessa',
      findUs: 'Löydä meiltä päivän tarjouksia, ruokakuvia ja uutisia!',
      
      // About Page
      aboutWelcomeTitle: 'Tervetuloa Orient Ravintolaan',
      aboutParagraph1: 'Ravintola Orient on perheyritys, jonka tarina alkoi Torniossa vuonna 2002. Kolme vuotta myöhemmin, vuonna 2005, päätimme tuoda saman maukkaan ruoan ja ystävällisen palvelun myös Iihin – ja avasimme paikkakunnan ensimmäisen pizzerian. Siitä lähtien olemme saaneet palvella asiakkaitamme jo yli kahden vuosikymmenen ajan.',
      aboutParagraph2: 'Meille Orientissa ruoka on enemmän kuin pelkkä ateria – se on osa yhteisöllisyyttä ja hyvää oloa. Valmistamme ruoan aina tuoreista raaka-aineista ja rakkaudella, yhdistäen perinteet ja omat reseptimme. Listaltamme löydät monipuolisen valikoiman herkullisia pitsoja, kebab-, kana- ja falafel-annoksia, joista jokainen löytää varmasti oman suosikkinsa.',
      aboutParagraph3: 'Orient on lämminhenkinen kohtaamispaikka, jossa hyvä ruoka ja ystävällinen palvelu tekevät jokaisesta käynnistä mukavan kokemuksen. Tervetuloa nauttimaan ja viihtymään – meillä olet aina tervetullut kuin ystävä.',
      viewInstagram: 'Katso Instagram-profiili',
      aboutMapTitle: 'Sijainti',
      aboutMapAddress: 'Laurintie 2, Ii, 91100',
      aboutMapOpenInGoogleMaps: 'Avaa Google Mapsissa',
      
      // Contact Page
      contactTitle: 'Ota yhteyttä',
      contactSubtitle: 'Tarjoamme aitoja kebabeja, uunituoreita pizzoja ja lämmintä palvelua koko yhteisölle.',
      contactLocation: 'Paikallinen ravintola Iissä vuodesta 2002.',
      contactInfoTitle: 'Yhteystiedot',
      contactAddress: 'Osoite',
      contactPhone: 'Puhelin',
      contactEmail: 'Sähköposti',
      openingHoursTitle: 'Aukioloajat',
      openDays: '7 päivää viikossa',
      openLabel: 'Avoinna',
      mondayThursday: 'Maanantai - Torstai',
      fridaySaturday: 'Perjantai - Lauantai',
      sunday: 'Sunnuntai',
      
      // Menu Page
      menuTitle: 'Ruokalista',
      menuSubtitle: 'Tutustu herkulliseen valikoimaamme',
      
      // Menu Sections
      menuPizzas: 'Pizzat',
      menuPizzasDesc: 'Tuoreet, uunituoreet pizzat perinteisillä ja erikoisilla täytteillä',
      menuKidsMenu: 'Lasten Menu',
      menuKidsMenuDesc: 'Lasten suosikkeja - pizzaa ja nugetteja',
      menuDishes: 'Annokset',
      menuDishesDesc: 'Tuoreita annoksia leivällä, riisillä tai ranskalaisilla',
      menuDrinks: 'Juomat',
      menuDrinksDesc: 'Virvokkeet',
      selectPromptTitle: 'Mitä haluaisit syödä?',
      selectPromptSubtitle: 'Valitse kategoria nähdäksesi täydellisen valikoiman',
      backToSelection: 'Takaisin valintaan',
      menuChooseGroup: 'Valitse ryhmä',
      menuPickGroupHint: 'Valitse ylhäältä ryhmä nähdäksesi hinnat ja annokset.',
      
      // Menu Section Buttons and Content
      hideToppings: 'Piilota lisätäytteet',
      showToppings: 'Näytä kaikki lisätäytteet ja hinnat',
      toppingPricesTitle: 'Lisätäytehinnat',
      normalPizza: 'Normaali pizza:',
      specialPizza: 'Erikoispizza:',
      familyPizza: 'Perhepizza:',
      largeFamilyPizza: 'Isoperhepizza:',
      giantPizza: 'Jättipizza:',
      saladOnPizza: 'Salaatti pizzan päällä:',
      normalSaladCup: 'Normaali salaattikuppi:',
      doubleMeat: 'Lihatäytteet tuplana:',
      garlicCup: 'Valkosipulikuppi:',
      pizzaSplit: 'Pizzan puolitus:',
      toppingNote: 'Kasvis vaihdettuna lihaan lasketaan lisätäytteenä',
      noteLabel: 'Huomio:',
      normalToppings: 'Normaali täytteet:',
      specialToppings: 'Erikois täytteet:',
      normalToppingsList: 'Kinkku, Salami, Tonnikala, Jauheliha, Pekoni, Pepperonimakkara, Aurajuusto, Fetajuusto, Simpukka, Katkarapu, Kanamuna, Ananas, Herkkusieni, Paprika, Oliivi, Chili, Jalapeño, Tomaattisiivuja, Kapris, Sipuli, Valkosipuli, Mexicankastike, Orientkastike, Hot Orientkastike, Majoneesi, Currykastike, Juusto',
      specialToppingsList: 'Kebabliha, Kanaliha, Shawarma, Savuporo, Falafel, Sucuk (Turkkilainen makkara)',
      
      // Menu Items - Pizza Categories
      normalPizzas: 'Normaali Pizzat (1-20)',
      kebabChickenPizzas: 'Kebab- ja Kanapizzat (21-33)',
      specialPizzas: 'Erikoispizzat (34-41)',
      giantPizzaSize: 'Jättipizza (60x60cm, 5-7 hengelle)',
      
      // Pizza Size Options
      pizzaBaseOptionsHeading: 'Pizzapohjat, Koko- ja pohjavaihtoehdot',
      /** Sama teksti kaikille kolmelle pohjariville (näytetään kerran yhdistetyssä lohkossa). */
      pizzaBaseSharedNoteNormal:
        'Pizzat (1–20) saatavilla myös gluteenittomana, pannupohjalla sekä perhe- ja isoperhekoossa.',
      pizzaBaseSharedNoteKebab:
        'Kebab- ja kanapizzat (21–33) saatavilla myös gluteenittomana, pannupohjalla sekä perhe- ja isoperhekoossa.',
      pizzaBaseSharedNoteSpecial:
        'Erikoispizzat (34–41) saatavilla myös gluteenittomana, pannupohjalla sekä perhe- ja isoperhekoossa.',
      pannuGluteeniton: 'Pannu / Gluteeniton',
      /** Yksi lause kaikille pohja/hinta-riveille: ryhmä + tyyppi (pannu/perhe/isoperhe). */
      pizzaAvailability: 'Kaikki {{group}} saatavilla {{variant}}',
      pizzaGroupNormal: 'normaalipizzat (1-20)',
      pizzaGroupKebab: 'kebab- ja kanapizzat (21-33)',
      pizzaGroupSpecial: 'erikoispizzat (34-41)',
      pizzaVariantPanGluten: 'pannupizzana tai gluteenittomana',
      pizzaVariantFamily: 'perhekokoisena',
      pizzaVariantLargeFamily: 'isoperhekokoisena',
      perhepizzaTitle: 'Perhepizza (Ø 40cm)',
      isoPerhepizzaTitle: 'Iso Perhepizza (50x50cm, 5:lle hengelle)',
      normalSize: 'Normaali (Ø 30cm)',
      giantPizzas: 'Jättipizzat',
      
      // Normal Pizzas (1-20)
      pizza1: 'ORIENT - Kinkku, Salami, Tonnikala, Ananas',
      pizza2: 'IIN HAMINA - Kinkku, Salami, Katkarapu',
      pizza3: 'GONDOLA - Jauheliha',
      pizza4: 'AMORE - Kinkku, Kapris, Valkosipuli',
      pizza5: 'OPERA - Kinkku, Tonnikala',
      pizza6: 'FINLANDIA - Kinkku, Salami, Jauheliha',
      pizza7: 'ITALIA - Kinkku, Salami',
      pizza8: 'MEXICANO - Jauheliha, Jalapeño, Ananas, Mexicankastike',
      pizza9: 'VEGETARIANA - Herkkusieni, Paprika, Oliivi, Ananas',
      pizza10: 'SISILIA - Kinkku, Ananas, Aurajuusto',
      pizza11: 'QUATRO STAGIONI - Kinkku, Herkkusieni, Katkarapu',
      pizza12: 'PEPPERONI - Pepperonimakkara, Tonnikala',
      pizza13: 'VESUVIO - Kinkku',
      pizza14: 'FRUTTI DI MARE - Tonnikala, Katkarapu, Simpukka',
      pizza15: 'HAWAII - Kinkku, Ananas',
      pizza16: 'BUSSOLA - Kinkku, Katkarapu',
      pizza17: 'CAPRICCIOSA - Kinkku, Herkkusieni',
      pizza18: 'MILANO - Herkkusieni, Katkarapu, Tomaattisiivuja, Kapris',
      pizza19: 'VERONA - Tonnikala, Ananas',
      pizza20: 'AL CAPONE - Pekoni, Salami, Kanamuna',
      
      // Kebab & Chicken Pizzas (21-33)
      pizza21: 'CALZONE (folded) - Kinkku, Herkkusieni, Aurajuusto',
      pizza22: 'HOUSE SPECIAL - Kebabliha, Katkarapu, Sipuli, Jalapeño',
      pizza23: 'ORIENTALE - Kebabliha, Tomaattisiivuja, Sipuli, Chili, Aurajuusto',
      pizza24: 'TORINO - Kebabliha, Paprika, Herkkusieni, Orientkastike',
      pizza25: 'ORIENT SPECIAL - Kebabliha, Sipuli, Orientkastike',
      pizza26: 'KEBAB SPECIAL - Kebabliha, Sipuli, Herkkusieni, Jalapeño, Orientkastike',
      pizza27: 'PIRA DELAL - Kebabliha, Paprika, Sipuli, Herkkusieni',
      pizza28: 'CHICKEN SPECIAL - Kanaliha, Tomaattisiivuja, Sipuli, Chili, Aurajuusto',
      pizza29: 'CHICKEN MEXICANO - Kanaliha, Ananas, Jalapeño, Mexicankastike',
      pizza30: 'CHICKEN PIZZA - Kanaliha, Ananas, Aurajuusto',
      pizza31: 'VEGGIE CHICKEN - Kanaliha, Herkkusieni, Paprika, Sipuli, Chili',
      pizza32: 'AKI SPECIAL - Kebabliha, Kinkku, Ananas, Orientkastike',
      pizza33: 'PETE SPECIAL - Kebabliha, Kinkku, Pekoni, Orientkastike',
      
      // Special Pizzas (34-41)
      pizza34: 'SMOKED REINDEER PIZZA - Savuporo, Ananas, Aurajuusto',
      pizza35: 'HAMINA REINDEER - Savuporo, Ananas, Pekoni, Sipuli',
      pizza36: 'HOT SMOKED REINDEER - Savuporo, Pepperonimakkara, Ananas, Jalapeño, Mexicankastike',
      pizza37: 'SUCUK PIZZA - Sucuk (Turkkilainen makkara), Kebabliha, Jalapeño, Hot Orientkastike',
      pizza38: 'HOT SUCUK - Sucuk (Turkkilainen makkara), Kana, Ananas, Jalapeño, Hot Orientkastike',
      pizza39: 'DALAL SUCUK - Sucuk (Turkkilainen makkara), Chili, Tomaattisiivuja, Sipuli, Aurajuusto',
      pizza40: 'FALAFEL PIZZA - Falafel (Kasvispyörykät), Tomaattisiivuja, Sipuli, Paprika, Orientkastike',
      pizza41: 'HOT FALAFEL - Falafel (Kasvispyörykät), Jalapeño, Ananas, Hot Orientkastike',
      
      // Giant Pizzas
      giantPizza1: 'VESUVIO - Kinkku',
      giantPizza2: 'BUCCOLA - Kinkku, Katkarapu',
      giantPizza3: 'STAR FAMILY - Kinkku, Salami',
      giantPizza4: 'HAWAII - Kinkku, Ananas',
      giantPizza5: 'OPERA - Kinkku, Tonnikala',
      giantPizza6: 'OPERA SPECIAL - Kinkku, Tonnikala, Salami',
      giantPizza7: 'QUATTRO STAGIONI - Kinkku, Herkkusieni, Katkarapu',
      giantPizza8: 'SISILIA - Kinkku, Ananas, Aurajuusto',
      giantPizza9: 'KEBAB PIZZA - Kebabliha, Sipuli, Jalapeño, Orientkastike',
      giantPizza10: 'SMOKED REINDEER PIZZA - Savuporo, Ananas, Aurajuusto',
      giantPizza11: 'HAMINA REINDEER - Savuporo, Ananas, Pekoni, Sipuli',
      
      // Kids Menu
      kidsMenuTitle: 'Lasten menu',
      kidsMenuSubtitle: 'Lasten',
      kidsPizza: 'Lasten pizza - 3 Normaali Täytettä',
      kidsNuggetsAndFries: 'Nugetit (10kpl) & Ranskalaiset',
      kidsNuggets: 'Nugetit (10kpl)',
      kidsFries: 'Pelkät ranskalaiset',
      
      // Dishes - Kebab
      kebabDishesTitle: 'Kebab annokset',
      kebabTitle: 'Kebab',
      pitaKebab: 'Pitakebab - Kebabliha, Pitaleipä, Salaatti, Kastike',
      rullaKebab: 'Rullakebab - Kebabliha, Talonleipä, Salaatti, Kastike',
      rullaKebabCheese: 'Rullakebab aura- tai fetalla - Kebabliha, Talonleipä, Aura- tai Fetajuusto, Salaatti, Kastike',
      kebabRice: 'Kebab riisillä - Kebabliha, Riisi, Salaatti, Kastike',
      kebabIskender: 'Kebab iskender - Kebabliha, Leivän palat, Jogurtti, Salaatti, Kastike',
      kebabFries: 'Kebab ranskalaisilla - Kebabliha, Ranskalaiset, Salaatti, Kastike',
      kebabWedges: 'Kebab lohkoperunoilla - Kebabliha, Lohkoperunat, Salaatti, Kastike',
      orientSpecialDish: 'Orient special - Kebabliha, Ranskalaiset, Riisi, Salaatti, Kastike',
      largeKebabTitle: 'Isot Kebab Annokset',
      familyKebab: 'Perhekebab annos - ½ kg Kebabliha, ½ kg Ranskalaiset, Salaatti, Kastike',
      giantKebab: 'Jättikebab annos - 1kg Kebabliha, 1kg Ranskalaiset, Salaatti, Kastike',
      
      // Dishes - Chicken
      chickenDishesTitle: 'Kana annos',
      chickenTitle: 'Kana',
      chickenWrap: 'Kanarulla - Kanaliha, Talonleipä, Salaatti, curry- tai tomaattikastike',
      chickenRice: 'Kana riisillä - Kanaliha, Riisi, Salaatti, curry- tai tomaattikastike',
      shawarmaFries: 'Shawarma ranskalaisilla - Shawarma (Kanakebab), Ranskalaiset, Salaatti, curry- tai tomaattikastike',
      shawarmaWedges: 'Shawarma lohkoperunoilla - Shawarma (Kanakebab), Lohkoperunat, Salaatti, curry- tai tomaattikastike',
      pitaShawarma: 'Pita shawarma - Shawarma (Kanakebab), Pitaleipä, Salaatti, Kastike',
      shawarmaRice: 'Shawarma riisillä - Shawarma (Kanakebab), Riisi, Salaatti, Kastike',
      shawarmWrap: 'Rulla shawarma - Shawarma (Kanakebab), Talonleipä, Salaatti, Kastike',
      
      // Dishes - Falafel
      falafelDishesTitle: 'Falafel annos',
      falafelTitle: 'Falafel (Kasvispyörykät)',
      pitaFalafel: 'Pita-falafel - Falafel, Pitaleipä, Salaatti, Kastike',
      falafelFries: 'Falafel ranskalaisilla - Falafel, Ranskalaiset, Salaatti, Kastike',
      falafelWedges: 'Falafel lohkoperunoilla - Falafel, Lohkoperunat, Salaatti, Kastike',
      falafelRice: 'Falafel riisillä - Falafel, Riisi, Salaatti, Kastike',
      falafelWrap: 'Rulla falafel - Falafel, Talonleipä, Salaatti, Kastike',
      
      // Dishes - Salads
      saladDishesTitle: 'Salaatti annokset',
      saladTitle: 'Salaatti',
      chickenSalad: 'Kanasalaatti - Kanaliha, Jäävuorisalaatti, Kurkku, Tomaatti',
      kebabSalad: 'Kebabsalaatti - Kebabliha, Jäävuorisalaatti, Kurkku, Tomaatti',
      tunaSalad: 'Tonnikalasalaatti - Tonnikala, Jäävuorisalaatti, Kurkku, Tomaatti',
      shawarmaSalad: 'Shawarmasalaatti - Shawarma, Jäävuorisalaatti, Kurkku, Tomaatti',
      falafelSalad: 'Falafelsalaatti - Falafel (Kasvispyörykät), Jogurtti, Jäävuorisalaatti, Kurkku, Tomaatti',
      shrimpSalad: 'Katkarapusalaatti - Katkarapu, Jäävuorisalaatti, Kurkku, Tomaatti',
      greekSalad: 'Kreikkalainen salaatti - Fetajuusto, Oliivi, Sipuli, Paprika, Jäävuorisalaatti, Kurkku, Tomaatti',
      
      // Drinks
      drinksTitle: 'Juomat',
      drinksSubtitle: 'Virvokkeet',
      soda033: 'Limu 0,33L',
      soda05: 'Limu 0,5L',
      soda15: 'Limu 1,5L',
      milk: 'Maito 0,5L',
      water033: 'Lähdevesi 0,33L',
      water05: 'Lähdevesi 0,5L',
      
      specialOffersTitle: 'Tarjoukset',
      offerValidUntil: 'Voimassa asti',
      welcomeTitle: 'Tervetuloa Orient Kebabin sivulle',
      welcomeSubtitle:
        'Valitse kieli ja tutustu ruokalistaan, aukioloaikoihin ja tarjouksiin.',
      welcomeChooseLabel: 'Valitse kieli',
      welcomeContinue: 'Jatka tällä kielellä',

      // Footer
      footerTagline: 'Aitoja kebabeja ja uunituoreita pizzoja valmistettu rakkaudella ja perinteisesti',
      footerCompanyLegal: '© 2026 Jirki Oy · Y-tunnus: 3156993-7',
      allRightsReserved: 'Kaikki oikeudet pidätetään',
    },
  },
  en: {
    translation: {
      // Navigation
      home: 'Home',
      about: 'About',
      menu: 'Menu',
      contact: 'Contact',
      mobileNavTitle: 'Navigation',
      
      // Hero
      heroTitle: 'Local Pizzeria in Ii',
      heroSubtitle: 'Serving since 2002, our pizzeria offers delicious pizzas, fresh kebabs, tasty kebab rolls and other delicacies. Welcome to enjoy good food!',
      aboutUs: 'About us',
      callAndOrder: 'Call and order',
      
      // Social Media
      followUs: 'Follow us on social media',
      findUs: 'Find daily offers, food pictures and news!',
      
      // About Page
      aboutWelcomeTitle: 'Welcome to Orient Restaurant',
      aboutParagraph1: 'Orient Restaurant is a family business whose story began in Tornio in 2002. Three years later, in 2005, we decided to bring the same delicious food and friendly service to Ii – and opened the town\'s first pizzeria. Since then, we have had the pleasure of serving our customers for over two decades.',
      aboutParagraph2: 'For us at Orient, food is more than just a meal – it is part of community and well-being. We always prepare our food from fresh ingredients and with love, combining traditions and our own recipes. On our menu you will find a wide selection of delicious pizzas, kebab, chicken and falafel dishes, from which everyone will surely find their favorite.',
      aboutParagraph3: 'Orient is a warm meeting place where good food and friendly service make every visit a pleasant experience. Welcome to enjoy and relax – you are always welcome like a friend.',
      viewInstagram: 'View Instagram profile',
      aboutMapTitle: 'Location',
      aboutMapAddress: 'Laurintie 2, Ii, 91100',
      aboutMapOpenInGoogleMaps: 'Open in Google Maps',
      
      // Contact Page
      contactTitle: 'Get in touch',
      contactSubtitle: 'We offer authentic kebabs, fresh pizzas and warm service to the whole community.',
      contactLocation: 'Local restaurant in Ii since 2002.',
      contactInfoTitle: 'Contact Information',
      contactAddress: 'Address',
      contactPhone: 'Phone',
      contactEmail: 'Email',
      openingHoursTitle: 'Opening Hours',
      openDays: '7 days a week',
      openLabel: 'Open',
      mondayThursday: 'Monday - Thursday',
      fridaySaturday: 'Friday - Saturday',
      sunday: 'Sunday',
      
      // Menu Page
      menuTitle: 'Menu',
      menuSubtitle: 'Discover our delicious selection',
      
      // Menu Sections
      menuPizzas: 'Pizzas',
      menuPizzasDesc: 'Fresh, oven-baked pizzas with traditional and special toppings',
      menuKidsMenu: 'Kids Menu',
      menuKidsMenuDesc: 'Kids favorites - pizza and nuggets',
      menuDishes: 'Dishes',
      menuDishesDesc: 'Fresh dishes with bread, rice or french fries',
      menuDrinks: 'Drinks',
      menuDrinksDesc: 'Refreshments',
      selectPromptTitle: 'What would you like to eat?',
      selectPromptSubtitle: 'Choose a category to see the full selection',
      backToSelection: 'Back to selection',
      menuChooseGroup: 'Choose a group',
      menuPickGroupHint: 'Choose a group above to see prices and dishes.',
      
      // Menu Section Buttons and Content
      hideToppings: 'Hide toppings',
      showToppings: 'Show all toppings and prices',
      toppingPricesTitle: 'Topping Prices',
      normalPizza: 'Normal pizza:',
      specialPizza: 'Special pizza:',
      familyPizza: 'Family pizza:',
      largeFamilyPizza: 'Large family pizza:',
      giantPizza: 'Giant pizza:',
      saladOnPizza: 'Salad on pizza:',
      normalSaladCup: 'Normal salad cup:',
      doubleMeat: 'Double meat toppings:',
      garlicCup: 'Garlic cup:',
      pizzaSplit: 'Pizza split:',
      toppingNote: 'Vegetable changed to meat counts as extra topping',
      noteLabel: 'Note:',
      normalToppings: 'Normal toppings:',
      specialToppings: 'Special toppings:',
      normalToppingsList: 'Ham, Salami, Tuna, Ground beef, Bacon, Pepperoni, Blue cheese, Feta cheese, Clam, Shrimp, Egg, Pineapple, Mushroom, Pepper, Olive, Chili, Jalapeño, Tomato slices, Capers, Onion, Garlic, Mexican sauce, Orient sauce, Hot Orient sauce, Mayonnaise, Curry sauce, Cheese',
      specialToppingsList: 'Kebab meat, Chicken, Shawarma, Smoked reindeer, Falafel, Sucuk (Turkish sausage)',
      
      // Menu Items - Pizza Categories
      normalPizzas: 'Normal Pizzas (1-20)',
      kebabChickenPizzas: 'Kebab & Chicken Pizzas (21-33)',
      specialPizzas: 'Special Pizzas (34-41)',
      giantPizzaSize: 'Giant Pizza (60x60cm, serves 5-7)',
      
      // Pizza Size Options
      pizzaBaseOptionsHeading: 'Pizza bases, size and base options',
      pizzaBaseSharedNoteNormal:
        'Pizzas (1–20) are also available gluten-free, with a pan base, and in family and large family sizes.',
      pizzaBaseSharedNoteKebab:
        'Kebab and chicken pizzas (21–33) are also available gluten-free, with a pan base, and in family and large family sizes.',
      pizzaBaseSharedNoteSpecial:
        'Special pizzas (34–41) are also available gluten-free, with a pan base, and in family and large family sizes.',
      pannuGluteeniton: 'Pan / Gluten-free',
      pizzaAvailability: 'All {{group}} available {{variant}}',
      pizzaGroupNormal: 'normal pizzas (1-20)',
      pizzaGroupKebab: 'kebab & chicken pizzas (21-33)',
      pizzaGroupSpecial: 'special pizzas (34-41)',
      pizzaVariantPanGluten: 'as pan pizza or gluten-free',
      pizzaVariantFamily: 'in family size',
      pizzaVariantLargeFamily: 'in large family size',
      perhepizzaTitle: 'Family pizza (Ø 40cm)',
      isoPerhepizzaTitle: 'Large Family Pizza (50x50cm, serves 5)',
      normalSize: 'Normal (Ø 30cm)',
      giantPizzas: 'Giant Pizzas',
      
      // Normal Pizzas (1-20)
      pizza1: 'ORIENT - Ham, Salami, Tuna, Pineapple',
      pizza2: 'IIN HAMINA - Ham, Salami, Shrimp',
      pizza3: 'GONDOLA - Ground beef',
      pizza4: 'AMORE - Ham, Capers, Garlic',
      pizza5: 'OPERA - Ham, Tuna',
      pizza6: 'FINLANDIA - Ham, Salami, Ground beef',
      pizza7: 'ITALIA - Ham, Salami',
      pizza8: 'MEXICANO - Ground beef, Jalapeño, Pineapple, Mexican sauce',
      pizza9: 'VEGETARIANA - Mushroom, Pepper, Olive, Pineapple',
      pizza10: 'SISILIA - Ham, Pineapple, Blue cheese',
      pizza11: 'QUATRO STAGIONI - Ham, Mushroom, Shrimp',
      pizza12: 'PEPPERONI - Pepperoni, Tuna',
      pizza13: 'VESUVIO - Ham',
      pizza14: 'FRUTTI DI MARE - Tuna, Shrimp, Clam',
      pizza15: 'HAWAII - Ham, Pineapple',
      pizza16: 'BUSSOLA - Ham, Shrimp',
      pizza17: 'CAPRICCIOSA - Ham, Mushroom',
      pizza18: 'MILANO - Mushroom, Shrimp, Tomato slices, Capers',
      pizza19: 'VERONA - Tuna, Pineapple',
      pizza20: 'AL CAPONE - Bacon, Salami, Egg',
      
      // Kebab & Chicken Pizzas (21-33)
      pizza21: 'CALZONE (folded) - Ham, Mushroom, Blue cheese',
      pizza22: 'HOUSE SPECIAL - Kebab meat, Shrimp, Onion, Jalapeño',
      pizza23: 'ORIENTALE - Kebab meat, Tomato slices, Onion, Chili, Blue cheese',
      pizza24: 'TORINO - Kebab meat, Pepper, Mushroom, Orient sauce',
      pizza25: 'ORIENT SPECIAL - Kebab meat, Onion, Orient sauce',
      pizza26: 'KEBAB SPECIAL - Kebab meat, Onion, Mushroom, Jalapeño, Orient sauce',
      pizza27: 'PIRA DELAL - Kebab meat, Pepper, Onion, Mushroom',
      pizza28: 'CHICKEN SPECIAL - Chicken, Tomato slices, Onion, Chili, Blue cheese',
      pizza29: 'CHICKEN MEXICANO - Chicken, Pineapple, Jalapeño, Mexican sauce',
      pizza30: 'CHICKEN PIZZA - Chicken, Pineapple, Blue cheese',
      pizza31: 'VEGGIE CHICKEN - Chicken, Mushroom, Pepper, Onion, Chili',
      pizza32: 'AKI SPECIAL - Kebab meat, Ham, Pineapple, Orient sauce',
      pizza33: 'PETE SPECIAL - Kebab meat, Ham, Bacon, Orient sauce',
      
      // Special Pizzas (34-41)
      pizza34: 'SMOKED REINDEER PIZZA - Smoked reindeer, Pineapple, Blue cheese',
      pizza35: 'HAMINA REINDEER - Smoked reindeer, Pineapple, Bacon, Onion',
      pizza36: 'HOT SMOKED REINDEER - Smoked reindeer, Pepperoni, Pineapple, Jalapeño, Mexican sauce',
      pizza37: 'SUCUK PIZZA - Sucuk (Turkish sausage), Kebab meat, Jalapeño, Hot Orient sauce',
      pizza38: 'HOT SUCUK - Sucuk (Turkish sausage), Chicken, Pineapple, Jalapeño, Hot Orient sauce',
      pizza39: 'DALAL SUCUK - Sucuk (Turkish sausage), Chili, Tomato slices, Onion, Blue cheese',
      pizza40: 'FALAFEL PIZZA - Falafel (Veggie balls), Tomato slices, Onion, Pepper, Orient sauce',
      pizza41: 'HOT FALAFEL - Falafel (Veggie balls), Jalapeño, Pineapple, Hot Orient sauce',
      
      // Giant Pizzas
      giantPizza1: 'VESUVIO - Ham',
      giantPizza2: 'BUCCOLA - Ham, Shrimp',
      giantPizza3: 'STAR FAMILY - Ham, Salami',
      giantPizza4: 'HAWAII - Ham, Pineapple',
      giantPizza5: 'OPERA - Ham, Tuna',
      giantPizza6: 'OPERA SPECIAL - Ham, Tuna, Salami',
      giantPizza7: 'QUATTRO STAGIONI - Ham, Mushroom, Shrimp',
      giantPizza8: 'SISILIA - Ham, Pineapple, Blue cheese',
      giantPizza9: 'KEBAB PIZZA - Kebab meat, Onion, Jalapeño, Orient sauce',
      giantPizza10: 'SMOKED REINDEER PIZZA - Smoked reindeer, Pineapple, Blue cheese',
      giantPizza11: 'HAMINA REINDEER - Smoked reindeer, Pineapple, Bacon, Onion',
      
      // Kids Menu
      kidsMenuTitle: 'Kids Menu',
      kidsMenuSubtitle: 'Kids',
      kidsPizza: 'Kids Pizza - 3 Normal Toppings',
      kidsNuggetsAndFries: 'Nuggets (10pcs) & French Fries',
      kidsNuggets: 'Nuggets (10pcs)',
      kidsFries: 'French Fries Only',
      
      // Dishes - Kebab
      kebabDishesTitle: 'Kebab Dishes',
      kebabTitle: 'Kebab',
      pitaKebab: 'Pita Kebab - Kebab meat, Pita bread, Salad, Sauce',
      rullaKebab: 'Kebab Roll - Kebab meat, House bread, Salad, Sauce',
      rullaKebabCheese: 'Kebab Roll with Cheese - Kebab meat, House bread, Blue or Feta cheese, Salad, Sauce',
      kebabRice: 'Kebab with Rice - Kebab meat, Rice, Salad, Sauce',
      kebabIskender: 'Kebab Iskender - Kebab meat, Bread pieces, Yogurt, Salad, Sauce',
      kebabFries: 'Kebab with Fries - Kebab meat, French fries, Salad, Sauce',
      kebabWedges: 'Kebab with Wedges - Kebab meat, Potato wedges, Salad, Sauce',
      orientSpecialDish: 'Orient Special - Kebab meat, French fries, Rice, Salad, Sauce',
      largeKebabTitle: 'Large Kebab Dishes',
      familyKebab: 'Family Kebab Dish - ½ kg Kebab meat, ½ kg French fries, Salad, Sauce',
      giantKebab: 'Giant Kebab Dish - 1kg Kebab meat, 1kg French fries, Salad, Sauce',
      
      // Dishes - Chicken
      chickenDishesTitle: 'Chicken dish',
      chickenTitle: 'Chicken',
      chickenWrap: 'Chicken Roll - Chicken, House bread, Salad, curry or tomato sauce',
      chickenRice: 'Chicken with Rice - Chicken, Rice, Salad, curry or tomato sauce',
      shawarmaFries: 'Shawarma with Fries - Shawarma (Chicken kebab), French fries, Salad, curry or tomato sauce',
      shawarmaWedges: 'Shawarma with Wedges - Shawarma (Chicken kebab), Potato wedges, Salad, curry or tomato sauce',
      pitaShawarma: 'Pita Shawarma - Shawarma (Chicken kebab), Pita bread, Salad, Sauce',
      shawarmaRice: 'Shawarma with Rice - Shawarma (Chicken kebab), Rice, Salad, Sauce',
      shawarmWrap: 'Shawarma Roll - Shawarma (Chicken kebab), House bread, Salad, Sauce',
      
      // Dishes - Falafel
      falafelDishesTitle: 'Falafel dish',
      falafelTitle: 'Falafel (Veggie balls)',
      pitaFalafel: 'Pita-Falafel - Falafel, Pita bread, Salad, Sauce',
      falafelFries: 'Falafel with Fries - Falafel, French fries, Salad, Sauce',
      falafelWedges: 'Falafel with Wedges - Falafel, Potato wedges, Salad, Sauce',
      falafelRice: 'Falafel with Rice - Falafel, Rice, Salad, Sauce',
      falafelWrap: 'Falafel Roll - Falafel, House bread, Salad, Sauce',
      
      // Dishes - Salads
      saladDishesTitle: 'Salad Dishes',
      saladTitle: 'Salad',
      chickenSalad: 'Chicken Salad - Chicken, Iceberg lettuce, Cucumber, Tomato',
      kebabSalad: 'Kebab Salad - Kebab meat, Iceberg lettuce, Cucumber, Tomato',
      tunaSalad: 'Tuna Salad - Tuna, Iceberg lettuce, Cucumber, Tomato',
      shawarmaSalad: 'Shawarma Salad - Shawarma, Iceberg lettuce, Cucumber, Tomato',
      falafelSalad: 'Falafel Salad - Falafel (Veggie balls), Yogurt, Iceberg lettuce, Cucumber, Tomato',
      shrimpSalad: 'Shrimp Salad - Shrimp, Iceberg lettuce, Cucumber, Tomato',
      greekSalad: 'Greek Salad - Feta cheese, Olive, Onion, Pepper, Iceberg lettuce, Cucumber, Tomato',
      
      // Drinks
      drinksTitle: 'Drinks',
      drinksSubtitle: 'Refreshments',
      soda033: 'Soda 0.33L',
      soda05: 'Soda 0.5L',
      soda15: 'Soda 1.5L',
      milk: 'Milk 0.5L',
      water033: 'Water 0.33L',
      water05: 'Water 0.5L',
      
      specialOffersTitle: 'Special offers',
      offerValidUntil: 'Valid until',
      welcomeTitle: 'Welcome to Orient Kebab',
      welcomeSubtitle:
        'Choose your language to explore our menu, opening hours and special offers.',
      welcomeChooseLabel: 'Choose language',
      welcomeContinue: 'Continue with current language',

      // Footer
      footerTagline: 'Authentic kebabs and fresh pizzas made with love and tradition',
      footerCompanyLegal: '© 2026 Jirki Oy · Business ID 3156993-7',
      allRightsReserved: 'All rights reserved',
    },
  },
  sv: {
    translation: {
      // Navigation
      home: 'Hem',
      about: 'Om oss',
      menu: 'Meny',
      contact: 'Kontakt',
      mobileNavTitle: 'Meny',
      
      // Hero
      heroTitle: 'Lokalt Pizzeria i Ii',
      heroSubtitle: 'Sedan 2002 erbjuder vårt pizzeria läckra pizzor, färska kebaber, goda kebabrullar och andra delikatesser. Välkommen att njuta av god mat!',
      aboutUs: 'Om oss',
      callAndOrder: 'Ring och beställ',
      
      // Social Media
      followUs: 'Följ oss på sociala medier',
      findUs: 'Hitta dagliga erbjudanden, matbilder och nyheter!',
      
      // About Page
      aboutWelcomeTitle: 'Välkommen till Orient Restaurant',
      aboutParagraph1: 'Orient Restaurant är ett familjeföretag vars historia började i Torneå 2002. Tre år senare, 2005, bestämde vi oss för att ta med samma goda mat och vänliga service till Ii – och öppnade stadens första pizzeria. Sedan dess har vi haft nöjet att tjäna våra kunder i över två decennier.',
      aboutParagraph2: 'För oss på Orient är mat mer än bara en måltid – det är en del av gemenskap och välbefinnande. Vi förbereder alltid vår mat från färska ingredienser och med kärlek, kombinerar traditioner och våra egna recept. På vår meny hittar du ett brett urval av läckra pizzor, kebab-, kyckling- och falafelrätter, från vilka alla säkert hittar sin favorit.',
      aboutParagraph3: 'Orient är en varm mötesplats där god mat och vänlig service gör varje besök till en trevlig upplevelse. Välkommen att njuta och koppla av – du är alltid välkommen som en vän.',
      viewInstagram: 'Visa Instagram-profil',
      aboutMapTitle: 'Plats',
      aboutMapAddress: 'Laurintie 2, Ii, 91100',
      aboutMapOpenInGoogleMaps: 'Öppna i Google Maps',
      
      // Contact Page
      contactTitle: 'Kontakta oss',
      contactSubtitle: 'Vi erbjuder äkta kebab, färska pizzor och varm service till hela samhället.',
      contactLocation: 'Lokal restaurang i Ii sedan 2002.',
      contactInfoTitle: 'Kontaktinformation',
      contactAddress: 'Adress',
      contactPhone: 'Telefon',
      contactEmail: 'E-post',
      openingHoursTitle: 'Öppettider',
      openDays: '7 dagar i veckan',
      openLabel: 'Öppet',
      mondayThursday: 'Måndag - Torsdag',
      fridaySaturday: 'Fredag - Lördag',
      sunday: 'Söndag',
      
      // Menu Page
      menuTitle: 'Meny',
      menuSubtitle: 'Upptäck vårt läckra utbud',
      
      // Menu Sections
      menuPizzas: 'Pizzor',
      menuPizzasDesc: 'Färska, ugnsbakade pizzor med traditionella och speciella pålägg',
      menuKidsMenu: 'Barnmeny',
      menuKidsMenuDesc: 'Barnfavoriter - pizza och nuggets',
      menuDishes: 'Rätter',
      menuDishesDesc: 'Färska rätter med bröd, ris eller pommes frites',
      menuDrinks: 'Drycker',
      menuDrinksDesc: 'Förfriskningar',
      selectPromptTitle: 'Vad vill du äta?',
      selectPromptSubtitle: 'Välj en kategori för att se hela utbudet',
      backToSelection: 'Tillbaka till val',
      menuChooseGroup: 'Välj grupp',
      menuPickGroupHint: 'Välj en grupp ovan för att se priser och rätter.',
      
      // Menu Section Buttons and Content
      hideToppings: 'Göm pålägg',
      showToppings: 'Visa alla pålägg och priser',
      toppingPricesTitle: 'Påläggets priser',
      normalPizza: 'Normal pizza:',
      specialPizza: 'Specialpizza:',
      familyPizza: 'Familjepizza:',
      largeFamilyPizza: 'Stor familjepizza:',
      giantPizza: 'Jättepizza:',
      saladOnPizza: 'Sallad på pizza:',
      normalSaladCup: 'Normal salladkopp:',
      doubleMeat: 'Dubbla köttpålägg:',
      garlicCup: 'Vitlökskopp:',
      pizzaSplit: 'Pizza delning:',
      toppingNote: 'Grönsak bytt till kött räknas som extra pålägg',
      noteLabel: 'Observera:',
      normalToppings: 'Normala pålägg:',
      specialToppings: 'Speciella pålägg:',
      normalToppingsList: 'Skinka, Salami, Tonfisk, Köttfärs, Bacon, Pepperoni, Ädelost, Fetaost, Mussla, Räka, Ägg, Ananas, Champinjon, Paprika, Oliv, Chili, Jalapeño, Tomatskivor, Kapris, Lök, Vitlök, Mexikansk sås, Orientsås, Hot Orientsås, Majonnäs, Currysås, Ost',
      specialToppingsList: 'Kebabkött, Kyckling, Shawarma, Rökren, Falafel, Sucuk (Turkisk korv)',
      
      // Menu Items - Pizza Categories
      normalPizzas: 'Normal Pizzor (1-20)',
      kebabChickenPizzas: 'Kebab- och Kycklingpizzor (21-33)',
      specialPizzas: 'Specialpizzor (34-41)',
      giantPizzaSize: 'Jättepizza (60x60cm, för 5-7 personer)',
      
      // Pizza Size Options
      pizzaBaseOptionsHeading: 'Pizzabotten, storleks- och bottenalternativ',
      pizzaBaseSharedNoteNormal:
        'Pizzor (1–20) finns även glutenfria, med pannbotten samt i familje- och stor familjestorlek.',
      pizzaBaseSharedNoteKebab:
        'Kebab- och kycklingpizzor (21–33) finns även glutenfria, med pannbotten samt i familje- och stor familjestorlek.',
      pizzaBaseSharedNoteSpecial:
        'Specialpizzor (34–41) finns även glutenfria, med pannbotten samt i familje- och stor familjestorlek.',
      pannuGluteeniton: 'Panna / Glutenfri',
      pizzaAvailability: 'Alla {{group}} finns {{variant}}',
      pizzaGroupNormal: 'normala pizzor (1-20)',
      pizzaGroupKebab: 'kebab- och kycklingpizzor (21-33)',
      pizzaGroupSpecial: 'specialpizzor (34-41)',
      pizzaVariantPanGluten: 'som pannpizza eller glutenfri',
      pizzaVariantFamily: 'i familjestorlek',
      pizzaVariantLargeFamily: 'i stor familjestorlek',
      perhepizzaTitle: 'Familjepizza (Ø 40cm)',
      isoPerhepizzaTitle: 'Stor Familjepizza (50x50cm, för 5 personer)',
      normalSize: 'Normal (Ø 30cm)',
      giantPizzas: 'Jättepizzor',
      
      // Normal Pizzas (1-20)
      pizza1: 'ORIENT - Skinka, Salami, Tonfisk, Ananas',
      pizza2: 'IIN HAMINA - Skinka, Salami, Räka',
      pizza3: 'GONDOLA - Köttfärs',
      pizza4: 'AMORE - Skinka, Kapris, Vitlök',
      pizza5: 'OPERA - Skinka, Tonfisk',
      pizza6: 'FINLANDIA - Skinka, Salami, Köttfärs',
      pizza7: 'ITALIA - Skinka, Salami',
      pizza8: 'MEXICANO - Köttfärs, Jalapeño, Ananas, Mexikansk sås',
      pizza9: 'VEGETARIANA - Champinjon, Paprika, Oliv, Ananas',
      pizza10: 'SISILIA - Skinka, Ananas, Ädelost',
      pizza11: 'QUATRO STAGIONI - Skinka, Champinjon, Räka',
      pizza12: 'PEPPERONI - Pepperoni, Tonfisk',
      pizza13: 'VESUVIO - Skinka',
      pizza14: 'FRUTTI DI MARE - Tonfisk, Räka, Mussla',
      pizza15: 'HAWAII - Skinka, Ananas',
      pizza16: 'BUSSOLA - Skinka, Räka',
      pizza17: 'CAPRICCIOSA - Skinka, Champinjon',
      pizza18: 'MILANO - Champinjon, Räka, Tomatskivor, Kapris',
      pizza19: 'VERONA - Tonfisk, Ananas',
      pizza20: 'AL CAPONE - Bacon, Salami, Ägg',
      
      // Kebab & Chicken Pizzas (21-33)
      pizza21: 'CALZONE (folded) - Skinka, Champinjon, Ädelost',
      pizza22: 'HOUSE SPECIAL - Kebabkött, Räka, Lök, Jalapeño',
      pizza23: 'ORIENTALE - Kebabkött, Tomatskivor, Lök, Chili, Ädelost',
      pizza24: 'TORINO - Kebabkött, Paprika, Champinjon, Orientsås',
      pizza25: 'ORIENT SPECIAL - Kebabkött, Lök, Orientsås',
      pizza26: 'KEBAB SPECIAL - Kebabkött, Lök, Champinjon, Jalapeño, Orientsås',
      pizza27: 'PIRA DELAL - Kebabkött, Paprika, Lök, Champinjon',
      pizza28: 'CHICKEN SPECIAL - Kyckling, Tomatskivor, Lök, Chili, Ädelost',
      pizza29: 'CHICKEN MEXICANO - Kyckling, Ananas, Jalapeño, Mexikansk sås',
      pizza30: 'CHICKEN PIZZA - Kyckling, Ananas, Ädelost',
      pizza31: 'VEGGIE CHICKEN - Kyckling, Champinjon, Paprika, Lök, Chili',
      pizza32: 'AKI SPECIAL - Kebabkött, Skinka, Ananas, Orientsås',
      pizza33: 'PETE SPECIAL - Kebabkött, Skinka, Bacon, Orientsås',
      
      // Special Pizzas (34-41)
      pizza34: 'SMOKED REINDEER PIZZA - Rökren, Ananas, Ädelost',
      pizza35: 'HAMINA REINDEER - Rökren, Ananas, Bacon, Lök',
      pizza36: 'HOT SMOKED REINDEER - Rökren, Pepperoni, Ananas, Jalapeño, Mexikansk sås',
      pizza37: 'SUCUK PIZZA - Sucuk (Turkisk korv), Kebabkött, Jalapeño, Hot Orientsås',
      pizza38: 'HOT SUCUK - Sucuk (Turkisk korv), Kyckling, Ananas, Jalapeño, Hot Orientsås',
      pizza39: 'DALAL SUCUK - Sucuk (Turkisk korv), Chili, Tomatskivor, Lök, Ädelost',
      pizza40: 'FALAFEL PIZZA - Falafel (Grönsaksbullar), Tomatskivor, Lök, Paprika, Orientsås',
      pizza41: 'HOT FALAFEL - Falafel (Grönsaksbullar), Jalapeño, Ananas, Hot Orientsås',
      
      // Giant Pizzas
      giantPizza1: 'VESUVIO - Skinka',
      giantPizza2: 'BUCCOLA - Skinka, Räka',
      giantPizza3: 'STAR FAMILY - Skinka, Salami',
      giantPizza4: 'HAWAII - Skinka, Ananas',
      giantPizza5: 'OPERA - Skinka, Tonfisk',
      giantPizza6: 'OPERA SPECIAL - Skinka, Tonfisk, Salami',
      giantPizza7: 'QUATTRO STAGIONI - Skinka, Champinjon, Räka',
      giantPizza8: 'SISILIA - Skinka, Ananas, Ädelost',
      giantPizza9: 'KEBAB PIZZA - Kebabkött, Lök, Jalapeño, Orientsås',
      giantPizza10: 'SMOKED REINDEER PIZZA - Rökren, Ananas, Ädelost',
      giantPizza11: 'HAMINA REINDEER - Rökren, Ananas, Bacon, Lök',
      
      // Kids Menu
      kidsMenuTitle: 'Barnmeny',
      kidsMenuSubtitle: 'Barn',
      kidsPizza: 'Barnpizza - 3 Normala Pålägg',
      kidsNuggetsAndFries: 'Nuggets 10st & Pommes Frites',
      kidsNuggets: 'Nuggets 10st',
      kidsFries: 'Bara Pommes Frites',
      
      // Dishes - Kebab
      kebabDishesTitle: 'Kebabrätter',
      kebabTitle: 'Kebab',
      pitaKebab: 'Pita Kebab - Kebabkött, Pitabröd, Sallad, Sås',
      rullaKebab: 'Kebab Rulle - Kebabkött, Husets bröd, Sallad, Sås',
      rullaKebabCheese: 'Kebab Rulle med Ost - Kebabkött, Husets bröd, Ädel- eller Fetaost, Sallad, Sås',
      kebabRice: 'Kebab med Ris - Kebabkött, Ris, Sallad, Sås',
      kebabIskender: 'Kebab Iskender - Kebabkött, Brödstycken, Yoghurt, Sallad, Sås',
      kebabFries: 'Kebab med Pommes - Kebabkött, Pommes frites, Sallad, Sås',
      kebabWedges: 'Kebab med Potatisklyf - Kebabkött, Potatisklyf, Sallad, Sås',
      orientSpecialDish: 'Orient Special - Kebabkött, Pommes frites, Ris, Sallad, Sås',
      largeKebabTitle: 'Stora Kebabrätter',
      familyKebab: 'Familj Kebab Portion - ½ kg Kebabkött, ½ kg Pommes frites, Sallad, Sås',
      giantKebab: 'Jätte Kebab Portion - 1kg Kebabkött, 1kg Pommes frites, Sallad, Sås',
      
      // Dishes - Chicken
      chickenDishesTitle: 'Kycklingrätt',
      chickenTitle: 'Kyckling',
      chickenWrap: 'Kyckling Rulle - Kyckling, Husets bröd, Sallad, curry- eller tomatsås',
      chickenRice: 'Kyckling med Ris - Kyckling, Ris, Sallad, curry- eller tomatsås',
      shawarmaFries: 'Shawarma med Pommes - Shawarma (Kycklingkebab), Pommes frites, Sallad, curry- eller tomatsås',
      shawarmaWedges: 'Shawarma med Potatisklyf - Shawarma (Kycklingkebab), Potatisklyf, Sallad, curry- eller tomatsås',
      pitaShawarma: 'Pita Shawarma - Shawarma (Kycklingkebab), Pitabröd, Sallad, Sås',
      shawarmaRice: 'Shawarma med Ris - Shawarma (Kycklingkebab), Ris, Sallad, Sås',
      shawarmWrap: 'Shawarma Rulle - Shawarma (Kycklingkebab), Husets bröd, Sallad, Sås',
      
      // Dishes - Falafel
      falafelDishesTitle: 'Falafelrätt',
      falafelTitle: 'Falafel (Grönsaksbullar)',
      pitaFalafel: 'Pita-Falafel - Falafel, Pitabröd, Sallad, Sås',
      falafelFries: 'Falafel med Pommes - Falafel, Pommes frites, Sallad, Sås',
      falafelWedges: 'Falafel med Potatisklyf - Falafel, Potatisklyf, Sallad, Sås',
      falafelRice: 'Falafel med Ris - Falafel, Ris, Sallad, Sås',
      falafelWrap: 'Falafel Rulle - Falafel, Husets bröd, Sallad, Sås',
      
      // Dishes - Salads
      saladDishesTitle: 'Salladrätter',
      saladTitle: 'Sallad',
      chickenSalad: 'Kycklings allad - Kyckling, Isbergssallad, Gurka, Tomat',
      kebabSalad: 'Kebabsallad - Kebabkött, Isbergssallad, Gurka, Tomat',
      tunaSalad: 'Tonfisksallad - Tonfisk, Isbergssallad, Gurka, Tomat',
      shawarmaSalad: 'Shawarmasallad - Shawarma, Isbergssallad, Gurka, Tomat',
      falafelSalad: 'Falafelsallad - Falafel (Grönsaksbullar), Yoghurt, Isbergssallad, Gurka, Tomat',
      shrimpSalad: 'Räksallad - Räka, Isbergssallad, Gurka, Tomat',
      greekSalad: 'Grekisk Sallad - Fetaost, Oliv, Lök, Paprika, Isbergssallad, Gurka, Tomat',
      
      // Drinks
      drinksTitle: 'Drycker',
      drinksSubtitle: 'Förfriskningar',
      soda033: 'Läsk 0,33L',
      soda05: 'Läsk 0,5L',
      soda15: 'Läsk 1,5L',
      milk: 'Mjölk 0,5L',
      water033: 'Vatten 0,33L',
      water05: 'Vatten 0,5L',
      
      specialOffersTitle: 'Erbjudanden',
      offerValidUntil: 'Gäller till',
      welcomeTitle: 'Välkommen till Orient Kebab',
      welcomeSubtitle:
        'Välj språk för att se menyn, öppettider och erbjudanden.',
      welcomeChooseLabel: 'Välj språk',
      welcomeContinue: 'Fortsätt med detta språk',

      // Footer
      footerTagline: 'Äkta kebaber och färska pizzor gjorda med kärlek och tradition',
      footerCompanyLegal: '© 2026 Jirki Oy · FO-nummer 3156993-7',
      allRightsReserved: 'Alla rättigheter förbehållna',
    },
  },
  de: {
    translation: de,
  },
  ar: {
    translation: ar,
  },
  fr: {
    translation: fr,
  },
  ku: {
    translation: ku,
  },
  ckb: {
    translation: ckb,
  },
  bah: {
    translation: bah,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fi",
    supportedLngs: ["fi", "en", "sv", "de", "ar", "fr", "ku", "ckb", "bah"],
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
