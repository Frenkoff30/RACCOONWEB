# 🦝 Raccoons – web hobby hokejového týmu

Prezenční web týmu Raccoons – výsledky, statistiky, soupiska a galerie.
Postaveno na Next.js + Tailwind CSS.

## Spuštění

```bash
npm install
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000).

## Editace obsahu

Veškerá data jsou v `src/data/`:

- `players.ts` – soupiska, čísla, body, krátké bio
- `matches.ts` – seznam zápasů, výsledky, střelci, poznámky
- `gallery.ts` – fotky v galerii (uložit do `public/images/gallery/`)

Po úpravě dat se stránka automaticky překreslí (v dev režimu) nebo po novém
`npm run build` / nasazení.

## Sekce webu

- **Domů** – hero, sezónní statistiky, o nás
- **Tým** – soupiska hráčů
- **Zápasy & Statistiky** – výsledky zápasů + kanadské bodování
- **Galerie** – fotky z týmu a ze zápasů
- **Kontakt** – kontaktní info a sociální sítě

## Nasazení

Doporučeno nasadit na [Vercel](https://vercel.com/new) – propoj GitHub repozitář
a každý push na `main` se automaticky nasadí.
