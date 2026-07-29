export type MerchItem = {
  id: string;
  name: string;
  /** Cena v korunách. Nech `null`, dokud ji neznáš – ukáže se „cena na dotaz“. */
  price: number | null;
  /** Krátký popis – jedna dvě věty. */
  description?: string;
  /** Fotka: ulož do public/images/obchod/ a napiš sem "/images/obchod/soubor.jpg" */
  image?: string;
  /** Dostupné velikosti, např. ["S", "M", "L", "XL"] */
  sizes?: string[];
  /** Kategorie pro filtr, např. "Oblečení" nebo "Doplňky" */
  category?: string;
  /** false = vyprodáno / zatím nedostupné */
  available?: boolean;
};

/* -------------------------------------------------------------------------
   OBCHOD
   Zatím prázdný – stránka ukáže připravované kategorie a poznámku, že se
   merch chystá. Jakmile sem přidáš první položku, přepne se na mřížku zboží.

   Objednávky zatím řešíme e-mailem / na Instagramu, žádná košík logika tu
   není. Až bude potřeba, dá se to navěsit na `MerchGrid`.
   ------------------------------------------------------------------------- */
export const merchItems: MerchItem[] = [
  // {
  //   id: "mikina-logo",
  //   name: "Mikina s logem",
  //   price: 890,
  //   description: "Černá mikina s vyšitým myvalem na hrudi.",
  //   image: "/images/obchod/mikina.jpg",
  //   sizes: ["S", "M", "L", "XL", "XXL"],
  //   category: "Oblečení",
  //   available: true,
  // },
];

/** Co se chystá – ukáže se, dokud je `merchItems` prázdné. */
export const plannedCategories = [
  { name: "Mikiny", note: "S vyšitým myvalem" },
  { name: "Trika", note: "Klubové logo vpředu" },
  { name: "Čepice", note: "Zimní i kšiltovky" },
  { name: "Samolepky", note: "Na auto, lahev, cokoliv" },
];

export function formatPrice(price: number | null) {
  if (price === null) return "Cena na dotaz";
  return `${price.toLocaleString("cs-CZ")} Kč`;
}
