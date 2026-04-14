/**
 * Patch fr.json / ku.json for non-pizza dish strings (kebab, salads, kids, …).
 * Pizza lines (pizza*, giantPizza*) use English names from en.json + translated
 * toppings — maintain with: node scripts/merge-pizza-names-from-en.mjs
 * Run from repo root: node scripts/apply-fr-ku-full-menu.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(__dirname, "../src/locales");

const frMenu = {
  kidsPizza: "Pizza enfant - 3 garnitures normales",
  kidsNuggetsAndFries: "Nuggets (10) & frites",
  kidsNuggets: "Nuggets (10)",
  kidsFries: "Frites seules",
  pitaKebab: "Pita kebab - Viande kebab, pain pita, salade, sauce",
  rullaKebab: "Roulé kebab - Viande kebab, pain maison, salade, sauce",
  rullaKebabCheese:
    "Roulé kebab au fromage - Viande kebab, pain maison, bleu ou feta, salade, sauce",
  kebabRice: "Kebab au riz - Viande kebab, riz, salade, sauce",
  kebabIskender:
    "Kebab iskender - Viande kebab, morceaux de pain, yaourt, salade, sauce",
  kebabFries: "Kebab aux frites - Viande kebab, frites, salade, sauce",
  kebabWedges:
    "Kebab aux quartiers de pomme de terre - Viande kebab, pommes en quartiers, salade, sauce",
  orientSpecialDish:
    "Orient spécial - Viande kebab, frites, riz, salade, sauce",
  largeKebabTitle: "Grands plats kebab",
  familyKebab:
    "Kebab famille - ½ kg viande kebab, ½ kg frites, salade, sauce",
  giantKebab: "Kebab géant - 1 kg viande kebab, 1 kg frites, salade, sauce",
  chickenWrap:
    "Roulé poulet - Poulet, pain maison, salade, sauce curry ou tomate",
  chickenRice:
    "Poulet au riz - Poulet, riz, salade, sauce curry ou tomate",
  shawarmaFries:
    "Shawarma aux frites - Shawarma (kebab poulet), frites, salade, sauce curry ou tomate",
  shawarmaWedges:
    "Shawarma aux quartiers - Shawarma (kebab poulet), pommes en quartiers, salade, sauce curry ou tomate",
  pitaShawarma:
    "Pita shawarma - Shawarma (kebab poulet), pain pita, salade, sauce",
  shawarmaRice:
    "Shawarma au riz - Shawarma (kebab poulet), riz, salade, sauce",
  shawarmWrap:
    "Roulé shawarma - Shawarma (kebab poulet), pain maison, salade, sauce",
  pitaFalafel: "Pita falafel - Falafel, pain pita, salade, sauce",
  falafelFries: "Falafel aux frites - Falafel, frites, salade, sauce",
  falafelWedges:
    "Falafel aux quartiers - Falafel, pommes en quartiers, salade, sauce",
  falafelRice: "Falafel au riz - Falafel, riz, salade, sauce",
  falafelWrap: "Roulé falafel - Falafel, pain maison, salade, sauce",
  chickenSalad:
    "Salade poulet - Poulet, laitue iceberg, concombre, tomate",
  kebabSalad:
    "Salade kebab - Viande kebab, laitue iceberg, concombre, tomate",
  tunaSalad: "Salade thon - Thon, laitue iceberg, concombre, tomate",
  shawarmaSalad:
    "Salade shawarma - Shawarma, laitue iceberg, concombre, tomate",
  falafelSalad:
    "Salade falafel - Falafel (boulettes végétales), yaourt, laitue iceberg, concombre, tomate",
  shrimpSalad:
    "Salade crevettes - Crevettes, laitue iceberg, concombre, tomate",
  greekSalad:
    "Salade grecque - Feta, olive, oignon, poivron, laitue iceberg, concombre, tomate",
};

const kuMenu = {
  kidsPizza: "Pizza ya zarokan - 3 tevlêbûnên normal",
  kidsNuggetsAndFries: "Nuggets (10) û patates",
  kidsNuggets: "Nuggets (10)",
  kidsFries: "Tenê patates",
  pitaKebab: "Pita kebab - Goştê kebab, nanê pita, salat, sos",
  rullaKebab: "Rûlê kebab - Goştê kebab, nanê malê, salat, sos",
  rullaKebabCheese:
    "Rûlê kebab bi penêr - Goştê kebab, nanê malê, penêr şîn an feta, salat, sos",
  kebabRice: "Kebab bi birinc - Goştê kebab, birinc, salat, sos",
  kebabIskender:
    "Kebab iskender - Goştê kebab, parçeyên nan, mast, salat, sos",
  kebabFries: "Kebab bi patates - Goştê kebab, patates, salat, sos",
  kebabWedges:
    "Kebab bi patatesên perçe - Goştê kebab, patatesên perçe, salat, sos",
  orientSpecialDish:
    "Orient taybet - Goştê kebab, patates, birinc, salat, sos",
  largeKebabTitle: "Xwarinên kebab ê mezin",
  familyKebab:
    "Kebab malbatî - ½ kg goştê kebab, ½ kg patates, salat, sos",
  giantKebab: "Kebab dev - 1 kg goştê kebab, 1 kg patates, salat, sos",
  chickenWrap:
    "Rûlê mirîşk - Mirîşk, nanê malê, salat, sosê kari an tomatê",
  chickenRice:
    "Mirîşk bi birinc - Mirîşk, birinc, salat, sosê kari an tomatê",
  shawarmaFries:
    "Şawarma bi patates - Şawarma (kebabê mirîşk), patates, salat, sosê kari an tomatê",
  shawarmaWedges:
    "Şawarma bi patatesên perçe - Şawarma (kebabê mirîşk), patatesên perçe, salat, sosê kari an tomatê",
  pitaShawarma:
    "Pita şawarma - Şawarma (kebabê mirîşk), nanê pita, salat, sos",
  shawarmaRice:
    "Şawarma bi birinc - Şawarma (kebabê mirîşk), birinc, salat, sos",
  shawarmWrap:
    "Rûlê şawarma - Şawarma (kebabê mirîşk), nanê malê, salat, sos",
  pitaFalafel: "Pita falafel - Falafel, nanê pita, salat, sos",
  falafelFries: "Falafel bi patates - Falafel, patates, salat, sos",
  falafelWedges:
    "Falafel bi patatesên perçe - Falafel, patatesên perçe, salat, sos",
  falafelRice: "Falafel bi birinc - Falafel, birinc, salat, sos",
  falafelWrap: "Rûlê falafel - Falafel, nanê malê, salat, sos",
  chickenSalad:
    "Salata mirîşk - Mirîşk, kahu ya qeşmer, kîyar, tomat",
  kebabSalad:
    "Salata kebab - Goştê kebab, kahu ya qeşmer, kîyar, tomat",
  tunaSalad: "Salata ton - Ton, kahu ya qeşmer, kîyar, tomat",
  shawarmaSalad:
    "Salata şawarma - Şawarma, kahu ya qeşmer, kîyar, tomat",
  falafelSalad:
    "Salata falafel - Falafel (gogikên riwe), mast, kahu ya qeşmer, kîyar, tomat",
  shrimpSalad:
    "Salata şirimp - Şirimp, kahu ya qeşmer, kîyar, tomat",
  greekSalad:
    "Salata Yewnan - Feta, zeytûn, pîvaz, fîlf, kahu ya qeşmer, kîyar, tomat",
};

function patch(pathname, overrides) {
  const p = path.join(localesDir, pathname);
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const [k, v] of Object.entries(overrides)) {
    if (!(k in data)) {
      console.error(`Missing key in ${pathname}: ${k}`);
      process.exit(1);
    }
    data[k] = v;
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

patch("fr.json", frMenu);
patch("ku.json", kuMenu);
console.log("Patched fr.json and ku.json with full menu translations.");
