# Raccoons – web hobby hokejového týmu

Prezentační web týmu Raccoons: soupiska, výsledky, statistiky a galerie.
Next.js 16 (App Router) + Tailwind CSS 4, celé staticky předgenerované.

## Spuštění

```bash
npm install
npm run dev
```

Web pak běží na [http://localhost:3010](http://localhost:3010).

## Kde se co mění

Veškerý obsah je v `src/data/` – žádné komponenty upravovat nemusíš.

| Soubor | Co v něm je |
| --- | --- |
| `src/data/team.ts` | Název, claim, text „O nás“, e-mail, Instagram, stadion, text do běžícího pruhu. Řádky s `TODO` čekají na reálné údaje. |
| `src/data/players.ts` | Soupiska – čísla, jména, pozice, role (C/A), přezdívky, fotky, góly a asistence. |
| `src/data/matches.ts` | Zápasy. Bez `scoreUs` / `scoreThem` se zápas bere jako **nadcházející**, se skóre jako odehraný. |
| `src/data/standings.ts` | Tabulka soutěže – týmy, zápasy, výhry, skóre. Body i pořadí se dopočítají. |
| `src/data/merch.ts` | Obchod. Prázdné pole = stránka ukáže „připravujeme“. |
| `src/data/gallery.ts` | Fotky v galerii. |

Vše ostatní – bilance, úspěšnost, forma, kanadské bodování, pořadí v tabulce,
počet hráčů podle formací – se z těchto dat počítá samo.

### Tabulka soutěže

V `standings.ts` stačí u každého týmu vyplnit odehrané zápasy, výhry, remízy,
prohry a skóre. Body se spočítají podle `pointsRule` (teď 3 / 1 / 0) a pořadí
podle bodů, rozdílu skóre a vstřelených branek. Řádek s hodnotou `ourTeam` se
v tabulce zvýrazní růžově.

### Kanadské bodování

Vyplň hráčům `goals`, `assists` a případně `games` v `players.ts`. Hráči bez
zapsaných statistik se v tabulce neobjeví, takže se dá začít postupně.

### Soupiska

Hráči se na stránce Soupiska automaticky rozdělí na brankáře, obránce
a útočníky podle pole `position`. Kapitána a asistenty označíš `role: "C"`
/ `role: "A"` – na kartě se ukáže odznak.

### Obchod

`merchItems` je zatím prázdné a stránka ukazuje připravované kategorie
(`plannedCategories`). Jakmile přidáš první položku, přepne se to samo na
mřížku zboží s cenami a velikostmi. Košík ani platby tam nejsou – objednávky
se řeší přes e-mail nebo Instagram.

### Fotky

- Portréty hráčů → `public/images/hraci/`, cesta se zapíše do `photo` v `players.ts`
- Fotky do galerie → `public/images/galerie/`, řádek se přidá do `gallery.ts`
- Fotky zboží → `public/images/obchod/`, cesta se zapíše do `image` v `merch.ts`

Karta hráče bez fotky vypadá záměrně dobře i tak – místo portrétu se ukáže
číslo dresu a znak myvala.

## Značka

| | |
| --- | --- |
| Černá (podklad) | `#08080A` |
| Bílá / křída (text) | `#F4F4F6` |
| Růžová (akcent) | `#FF2E7E` |
| Nadpisy | Anton |
| Popisky, tlačítka | Barlow Condensed |
| Běžný text | Barlow |

Logo je v `public/brand/` jako SVG (z originálních křivek) i PNG.
Zdrojová PDF od grafika zůstávají v `brand-source/` mimo `public`, aby se
zbytečně neposílala do prohlížeče.

`public/og.png` je náhled pro sdílení na sítích, `src/app/icon.png` favicona.
Oba se generují z loga – když se logo změní, přegeneruj je taky.

## Stránky

- `/` – hero, o nás, nejbližší zápas, poslední výsledky, tabulka, kanadské bodování, galerie, obchod
- `/tym` – soupiska rozdělená na formace, s vyhledáváním a filtrem
- `/zapasy` – bilance sezóny, nadcházející i odehrané zápasy
- `/tabulka` – tabulka soutěže a kanadské bodování
- `/galerie` – mřížka fotek s lightboxem (šipky, Esc)
- `/obchod` – klubový merch (zatím připravený, bez zboží)
- `/kontakt` – formulář (otevře poštovního klienta), kontakty, kde hrajeme

## Kontrola před nasazením

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Nasazení

Doporučeně [Vercel](https://vercel.com/new) – propoj GitHub repozitář a každý
push do `main` se nasadí sám. Nezapomeň v `src/data/team.ts` přepsat `siteUrl`
na reálnou doménu, ať sedí odkazy v metadatech a náhled při sdílení.
