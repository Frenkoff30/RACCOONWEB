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
| `src/data/standings.ts` | Tabulka soutěže – pořadí určuje pořadí v poli, `previous` je umístění z minulého kola. |
| `src/data/merch.ts` | Obchod. Prázdné pole = stránka ukáže „připravujeme“. |
| `src/data/gallery.ts` | Fotky v galerii. |

Vše ostatní – bilance, úspěšnost, forma, kanadské bodování, pořadí v tabulce,
počet hráčů podle formací – se z těchto dat počítá samo.

### Tabulka soutěže

Pořadí se bere z pořadí týmů v poli `rows` – stačí je přeskládat a čísla se
přepočítají. Řádek s hodnotou `ourTeam` se zvýrazní růžově.

Sloupce Z / V / R / P / skóre / body jsou nepovinné. Objeví se teprve tehdy,
až je vyplníš aspoň u jednoho týmu – body se spočítají podle `pointsRule`
(teď 3 / 1 / 0). Na začátku sezóny jsou všude nuly.

### Kanadské bodování

Vyplň hráčům `goals`, `assists` a případně `games` v `players.ts`. Na stránce
`/bodovani` je rozdělené na brankáře, obránce a útočníky; tabulky vypisují
celou soupisku včetně nul, takže jsou na začátku sezóny připravené.

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

### Světlé a tmavé sekce

Web střídá tmavé a světlé bloky. Stačí sekci obalit třídou `section-light`
– ta přebarví značkové tokeny (`--color-ink`, `--color-chalk`, `--color-pink`…),
takže se všechny utility uvnitř otočí samy. Mezi bloky se vkládá
`<SectionDivider from="dark" to="light" />` – buď šikmé růžovo-černo-bílé
pruhy, nebo `variant="wave"` pro vlnku.

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

- `/` – hero, o nás, nejbližší zápas, poslední výsledky, galerie, obchod
- `/tym` – soupiska rozdělená na formace, s vyhledáváním a filtrem
- `/zapasy` – bilance sezóny, nadcházející i odehrané zápasy
- `/tabulka` – tabulka soutěže
- `/bodovani` – kanadské bodování po formacích
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
