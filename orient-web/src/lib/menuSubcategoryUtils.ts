import type { StoredSubcategory } from "@/types/siteConfig";

/** "Pannu / Gluteeniton - 14,00€" → { headline, price } */
export function parseTrailingPrice(title: string): { headline: string; price: string | null } {
  const m = title.match(/^(.*?)\s*-\s*(\d+[,.]\d+€)\s*$/);
  if (m) return { headline: m[1].trim(), price: m[2] };
  return { headline: title, price: null };
}

/** Parsed menu row for consistent name / price layout on every menu branch. */
export type ParsedMenuDishLine =
  | { kind: "three"; name: string; ingredients: string; price: string }
  | { kind: "two"; name: string; price: string }
  | { kind: "trailing"; headline: string; price: string }
  | { kind: "plain"; text: string };

/**
 * Detects dish lines in the same order as admin SubcategoryItemsEditor join (`nimi - … - hinta` or `nimi - hinta`).
 */
export function parseMenuDishLine(item: string): ParsedMenuDishLine {
  const trimmed = item.trim();
  if (!trimmed) return { kind: "plain", text: "" };

  const three = trimmed.match(/^([A-ZÅÄÖa-zåäö\s\-()]+?)\s+-\s+(.+?)(?:\s+-\s+(\d+[,.]\d+€))$/);
  if (three?.[3]) {
    return { kind: "three", name: three[1].trim(), ingredients: three[2].trim(), price: three[3] };
  }

  const two = trimmed.match(/^(.+?)\s+-\s+(\d+[,.]\d+€)\s*$/);
  if (two) {
    return { kind: "two", name: two[1].trim(), price: two[2] };
  }

  const { headline, price } = parseTrailingPrice(trimmed);
  if (price) {
    return { kind: "trailing", headline, price };
  }

  return { kind: "plain", text: trimmed };
}

/** Admin SubcategoryItemsEditor: one nimi-kenttä (sis. täytteet) + hinta; sama logiikka kuin parseMenuDishLine. */
export function splitDishLineForEditor(line: string): { name: string; price: string } {
  const trimmed = line.trim();
  if (!trimmed) return { name: "", price: "" };
  const p = parseMenuDishLine(trimmed);
  if (p.kind === "three") return { name: `${p.name} - ${p.ingredients}`, price: p.price };
  if (p.kind === "two") return { name: p.name, price: p.price };
  if (p.kind === "trailing") return { name: p.headline, price: p.price };
  return { name: p.text, price: "" };
}

/** Yhdistää admin-kentät takaisin tallennemuotoon (julkinen lista + käännökset). */
export function joinDishLineForEditor(name: string, price: string): string {
  const n = name.trim();
  const p = price.trim().replace(/\s*€\s*$/i, "").trim();
  if (!p) return n;
  const priceWithEuro = p.includes("€") ? p : `${p}€`;
  if (!n) return priceWithEuro;
  return `${n} - ${priceWithEuro}`;
}

export function isDishMenuLine(item: string): boolean {
  const p = parseMenuDishLine(item);
  return p.kind === "three" || p.kind === "two" || p.kind === "trailing";
}

/** Julkinen lista: hinta otsikossa + ei pizzariviä (tyhjä tai yksi info-rivi). */
export function isVariantAvailabilitySubcat(sub: { title: string; items: string[] }): boolean {
  const { price: titlePrice } = parseTrailingPrice(sub.title);
  if (!titlePrice) return false;
  if (sub.items.length === 0) return true;
  if (sub.items.length !== 1) return false;
  return !isDishMenuLine(sub.items[0]);
}

/** Admin: sama tunnistus suomenkielisellä tekstillä. */
export function isVariantAvailabilityStoredSubcat(sub: StoredSubcategory): boolean {
  const { price: titlePrice } = parseTrailingPrice(sub.title.fi);
  if (!titlePrice) return false;
  if (sub.items.length === 0) return true;
  if (sub.items.length !== 1) return false;
  return !isDishMenuLine(sub.items[0].fi);
}

/** Ensimmäiset kolme riviä ovat pizzapohja-blokki (pannu, perhe, isoperhe). */
export function shouldMergePizzaBaseBlock(
  isPizzaCategory: boolean,
  subs: { title: string; items: string[] }[] | undefined,
): boolean {
  if (!isPizzaCategory || !subs || subs.length < 3) return false;
  return [0, 1, 2].every((i) => isVariantAvailabilitySubcat(subs[i]));
}

export function shouldMergePizzaBaseBlockStored(
  isPizzaCategory: boolean,
  subs: StoredSubcategory[] | undefined,
): boolean {
  if (!isPizzaCategory || !subs || subs.length < 3) return false;
  return [0, 1, 2].every((i) => isVariantAvailabilityStoredSubcat(subs[i]));
}
