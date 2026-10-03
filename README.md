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
| `src/data/players.ts` | Soupiska – čísla, jména, pozice, role (C/A), přezdívky, fotky a **archivní** sezóny. |
| `src/data/matches.ts` | Zápasy. Bez `scoreUs` / `scoreThem` se zápas bere jako **nadcházející**, se skóre jako odehraný. Tady se zapisují i góly a asistence. |
| `src/data/news.ts` | Aktuality – krátké zprávy na `/aktuality` a na úvodce. |
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

### Zápis zápasu a bodování

**Po zápase se edituje jediné místo – `matches.ts`.** Ke skóre se dopíše,
kdo bodoval:

```ts
{
  date: "2026-10-02",
  opponent: "Wolves Krouna",
  home: true,
  scoreUs: 5,
  scoreThem: 4,
  scoring: {
    Hamák: [1, 2],   // [góly, asistence]
    Němec: [1, 1],
  },
  lineup: ["Fousek", "Kvapil"],   // kdo nastoupil bez bodu
}
```

Z toho se dopočítá všechno ostatní: střelci a nahrávači pod zápasem, kanadské
bodování, počet odehraných zápasů i klubové rekordy. Do `players.ts` se tedy
po zápase **nic nepřepisuje**.

Příjmení musí sedět na soupisku. Při překlepu build spadne a napíše, které
jméno nezná – radši chyba než tiše ztracené góly.

Hráče, který hraje aktuální sezónu, poznáš podle `active: true` v `players.ts`.
Objeví se díky tomu v tabulkách i s nulami. Hosté `active` nemají, takže
aktuální sezónu nezaplevelí.

Pole `stats` v `players.ts` je **jen archiv** sezón, které zápas po zápase
zapsané nemáme (2023/2024 až 2025/2026). Aktuální sezóna se tam nepíše.

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

### Nadpisy a diakritika

Třída `.display` má schválně natěsno řádkování (0.86). Když se takový nadpis
ořezává (`truncate`, tedy `overflow: hidden`), useklo by to háčky a čárky nad
velkými písmeny – z „MIKULÁŠ NĚMEC“ by zbylo „MIKULAS NEMEC“. Pravidlo
`.display.truncate` v `globals.css` proto ořezávanému nadpisu řádek povolí.
Kdybys psal nový nadpis s ořezáním, nic dělat nemusíš, platí to samo.

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

`src/app/icon.png` je favicona, generuje se z loga – když se logo změní,
přegeneruj ji taky.

### Náhledy pro sdílení

Obrázek, co se ukáže při hození odkazu do chatu nebo na sítě, se **generuje
z kódu** – soubory `opengraph-image.tsx` ve složkách stránek, společná šablona
v `src/lib/og.tsx`. Drží se tedy aktuálních dat: úvodka ukazuje poslední
výsledek, `/bodovani` vedoucího kanadského bodování, `/aktuality` poslední
zprávu. Není potřeba nic překreslovat po zápase.

Fonty se čtou z `assets/` (ne ze sítě), aby build nezávisel na dostupnosti
Google Fonts. Stránka bez vlastního `opengraph-image.tsx` zdědí ten z kořene.

Pozor: kdyby se do `metadata.openGraph` v `layout.tsx` vrátilo `images`
natvrdo, přebilo by to všechny generované náhledy.

## Stránky

- `/` – hero (s formou za posledních 5 zápasů), o nás, nejbližší zápas,
  poslední výsledky, aktuality, galerie, obchod
- `/aktuality` – novinky z týmu
- `/tym` – soupiska rozdělená na formace, s vyhledáváním a filtrem
- `/zapasy` – bilance sezóny, nadcházející i odehrané zápasy
- `/tabulka` – tabulka soutěže
- `/bodovani` – kanadské bodování po formacích a pod ním Síň slávy
  (klubové rekordy, nejlepší sezóny jednotlivců, tým po sezónách).
  Stará adresa `/rekordy` se přesměrovává na kotvu `#rekordy`.
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
