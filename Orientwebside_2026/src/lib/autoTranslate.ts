import type { LocalizedString } from "@/types/siteConfig";

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Free-tier MyMemory API (browser). Subject to rate limits; falls back to copying Finnish on failure.
 * @see https://mymemory.translated.net/doc/spec.php
 */
async function fetchTranslation(text: string, langpair: string): Promise<string> {
  const q = text.trim();
  if (!q) return "";
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${langpair}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("network");
  const data = (await res.json()) as {
    responseStatus: number;
    responseData?: { translatedText?: string; error?: string };
    quotaFinished?: boolean;
  };
  if (data.quotaFinished) throw new Error("quota");
  const t = data.responseData?.translatedText;
  if (typeof t !== "string" || !t) throw new Error("empty");
  return t;
}

/** Translate short–medium Finnish text to English and Swedish (sequential to reduce rate limits). */
export async function translateFiToEnSv(fi: string): Promise<{ en: string; sv: string }> {
  const q = fi.trim();
  if (!q) return { en: "", sv: "" };
  const en = await fetchTranslation(q, "fi|en");
  await delay(80);
  const sv = await fetchTranslation(q, "fi|sv");
  return { en, sv };
}

/** Longer text: split by newlines, translate each non-empty line. */
export async function translateFiParagraph(fi: string): Promise<{ en: string; sv: string }> {
  const raw = fi.trim();
  if (!raw) return { en: "", sv: "" };
  if (raw.length <= 380) {
    return translateFiToEnSv(raw);
  }
  const lines = fi.split("\n");
  const enLines: string[] = [];
  const svLines: string[] = [];
  for (const line of lines) {
    if (!line.trim()) {
      enLines.push("");
      svLines.push("");
      continue;
    }
    try {
      const { en, sv } = await translateFiToEnSv(line.trim());
      enLines.push(en);
      svLines.push(sv);
    } catch {
      enLines.push(line.trim());
      svLines.push(line.trim());
    }
    await delay(100);
  }
  return { en: enLines.join("\n"), sv: svLines.join("\n") };
}

/** Menu dish lines: one row → one LocalizedString. */
export async function translateFiLinesToItems(fiText: string): Promise<LocalizedString[]> {
  const lines = fiText.split("\n");
  const out: LocalizedString[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    try {
      const { en, sv } = await translateFiToEnSv(t);
      out.push({ fi: t, en, sv });
    } catch {
      out.push({ fi: t, en: t, sv: t });
    }
    await delay(90);
  }
  return out;
}
