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

## Julkaisu (itse hostattu)

Tuotantokäännös vaatii **`VITE_ADMIN_PASSWORD`** build-aikana (kopioi `.env.example` → `.env` tai aseta muuttuja CI:ssä / Docker-buildissä).

### Vaihtoehto A: Docker + Nginx (suositeltu)

Kansiossa `Orientwebside_2026/`:

1. Luo `.env` ja aseta `VITE_ADMIN_PASSWORD` (sama kuin kehityksessä).
2. Käynnistä:

```bash
docker compose up -d --build
```

Sivusto: `http://localhost:8080/` (portti vaihdettavissa: `HOST_PORT=80` env-muuttujalla).

Ilman Composea:

```bash
docker build --build-arg VITE_ADMIN_PASSWORD="oma-salasana" -t orient-kebab-web .
docker run -p 8080:80 orient-kebab-web
```

### Vaihtoehto B: Pelkkä `dist/` + Nginx palvelimella

1. Tuotantopaketti:

```bash
npm run build
```

tai Windowsissa `.env` luettuna: `powershell -File scripts/build-production.ps1`  
Linux/macOS: `chmod +x scripts/build-production.sh && ./scripts/build-production.sh`

2. Kopioi **`dist/`** sisältö palvelimelle (esim. `/var/www/orient-kebab/`).
3. Käytä Nginx-esimerkkiä tiedostosta **`deploy/nginx-site.conf`**: päivitä `server_name` ja `root`, ota käyttöön sivusto (`sites-enabled`), aja `nginx -t` ja `systemctl reload nginx`.
4. Ota **HTTPS** käyttöön (esim. Let’s Encrypt / certbot) tuotantoon.

React Router -polut vaativat **`try_files ... /index.html`** (esimerkissä valmiina).

### Pilvipalvelut (vapaaehtoinen)

`dist/` voidaan myös nostaa Netlifyyn, Cloudflare Pagesiin tms.: julkaisuhakemisto `dist`, SPA-redirect kaikki polut → `index.html`.

## Teknologiat

Vite, TypeScript, React 18, React Router, i18next, Tailwind CSS, Radix UI -primitiivit (shadcn-tyyli), Sonner (ilmoitukset), Lucide (ikonit).
