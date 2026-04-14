/**
 * Keeps English menu pizza names (left of " - ") from en.json, retains localized flavors.
 * Updates: de.json, ar.json, fr.json, ku.json, and fi/sv blocks in src/i18n.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const SEP = " - ";

const KEYS = [
  ...Array.from({ length: 41 }, (_, i) => `pizza${i + 1}`),
  ...Array.from({ length: 11 }, (_, i) => `giantPizza${i + 1}`),
];

function splitNF(s) {
  const i = s.indexOf(SEP);
  if (i === -1) return { name: s.trim(), flavors: "" };
  return { name: s.slice(0, i).trim(), flavors: s.slice(i + SEP.length).trim() };
}

function merge(enLine, locLine) {
  if (!locLine) return enLine;
  const { name: enName } = splitNF(enLine);
  const { flavors: locFlavors } = splitNF(locLine);
  if (!locFlavors) return enLine;
  return `${enName}${SEP}${locFlavors}`;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const enPath = path.join(root, "src/locales/en.json");
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));

for (const loc of ["de", "ar", "fr", "ku"]) {
  const p = path.join(root, "src/locales", `${loc}.json`);
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const k of KEYS) {
    if (en[k] && data[k]) {
      data[k] = merge(en[k], data[k]);
    }
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
  console.log("Updated", loc + ".json");
}

const i18nPath = path.join(root, "src/i18n.ts");
let ts = fs.readFileSync(i18nPath, "utf8");

function patchLangBlock(langKey, endMarker) {
  const startMarker = `  ${langKey}: {\n    translation: {`;
  const start = ts.indexOf(startMarker);
  const end = ts.indexOf(endMarker, start + 1);
  if (start === -1 || end === -1) {
    console.error("Could not find block", langKey, nextKey);
    process.exit(1);
  }
  let block = ts.slice(start, end);
  const origBlock = block;
  for (const k of KEYS) {
    if (!en[k]) continue;
    const lineRe = new RegExp(
      `^([ \\t]*${k}:\\s*)'([^']*)'`,
      "m",
    );
    const m = block.match(lineRe);
    if (!m) continue;
    const oldFull = m[2];
    const merged = merge(en[k], oldFull);
    if (merged === oldFull) continue;
    block = block.replace(lineRe, `$1'${merged.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`);
  }
  if (block !== origBlock) {
    ts = ts.slice(0, start) + block + ts.slice(end);
    console.log("Patched i18n block:", langKey);
  }
}

patchLangBlock("fi", `  en: {\n    translation: {`);
// sv block is followed by de, which uses `translation: de` (import), not an inline object
patchLangBlock("sv", `  de: {\n    translation: de,`);

fs.writeFileSync(i18nPath, ts);
console.log("Done.");
