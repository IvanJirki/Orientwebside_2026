# Orient Kebab – nettisivu

Sovelluksen juuri on **[`Orientwebside_2026/`](Orientwebside_2026/)** (Vite + React + TypeScript; `package.json`, `node_modules` ja `src/` ovat tässä kansiossa).

```bash
cd Orientwebside_2026
npm install
npm run dev
```

Avaa **http://localhost:5173/** (tai anna selaimen avautua itsestään). Jos portti on varattu, sulje toinen kehityspalvelin.

**Rakenne:** `src/styles/` (`globals.css`), `src/components/`, `src/assets/images/`.

### Kaksi `orient-web`-kansiota?

Ainoa oikea projekti on **`Orientwebside_2026/`** (siellä `package.json`, `src/`, `node_modules`).  
Jos työtilan juuressa on vielä kansio **`orient-web/`**, se on yleensä vain vanha Vite-/npm-jäänne (`node_modules`, `.vite`). Sen voi **poistaa**, kun suljet IDE:n ja terminaalit, jotka pitävät kansiota lukittuna. Halutessasi voit sen jälkeen luoda junction-linkin nimellä `orient-web` → `Orientwebside_2026`: katso `Orientwebside_2026/scripts/link-orient-web-junction.ps1`.
