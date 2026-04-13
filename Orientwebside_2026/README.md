# Orient Kebab Pizzeria – verkkosivu

Julkinen sivusto ja kevyesti suojattu hallintanäkymä (ruokalista / tarjoukset). Rakennettu **Vite + React + TypeScript** -pinolla; tyylit **Tailwind CSS** ja **shadcn/ui** -tyyliset komponentit.

**Tämä kansio (`Orientwebside_2026/`) on projektin juuri:** `package.json`, `vite.config.ts`, `node_modules`, `src/`, `public/`.

## Kansiot

| Polku | Sisältö |
|--------|---------|
| `src/styles/` | Globaalit tyylit (`globals.css`), vanha staattinen viite erillisenä tiedostona |
| `src/components/` | Sivukohtaiset komponentit; `components/ui/` on UI-primitiivejä |
| `src/assets/images/` | Kuvat (importit `@/assets/images/...`) |
| `src/pages/` | Reitit (React Router) |
| `public/` | Staattiset tiedostot juureen (esim. `robots.txt`, favicon-viite) |

## Käynnistä kehitysympäristö

Vaatii **Node.js** (LTS) ja npm.

```bash
npm install
npm run dev
```

Oletusosoite kehityksessä: `http://localhost:5173/` (katso `vite.config.ts`).

## Skriptit

| Komento | Kuvaus |
|---------|--------|
| `npm run dev` | Kehityspalvelin |
| `npm run build` | Tuotantokäännös → `dist/` |
| `npm run preview` | Esikatselu tuotantopaketista |
| `npm run lint` | ESLint |

## Hallinta (`/admin`)

Kopioi `.env.example` → `.env` ja aseta `VITE_ADMIN_PASSWORD`. Käynnistä dev-palvelin uudelleen salasanan jälkeen.

## Julkaisu

`npm run build` tuottaa staattisen sisällön kansioon **`dist/`**. Voit hostata sen millä tahansa staattisella palvelulla (esim. Netlify, Cloudflare Pages, Azure Static Web Apps): juurihakemistoksi `dist`, kaikki polut SPA:lle samaan `index.html` -tiedostoon.

## Teknologiat

Vite, TypeScript, React 18, React Router, i18next, Tailwind CSS, Radix UI -primitiivit (shadcn-tyyli), Sonner (ilmoitukset), Lucide (ikonit).
