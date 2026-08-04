export type Position = "Brankář" | "Obránce" | "Útočník";

export type Player = {
  /** Číslo na dresu */
  number: number;
  firstName: string;
  lastName: string;
  /** Nech nevyplněné, dokud pozici neznáš – filtry na /tym se objeví samy, jakmile ji doplníš. */
  position?: Position;
  /** "C" = kapitán, "A" = asistent */
  role?: "C" | "A";
  /** Přezdívka z kabiny (zobrazí se na kartě) */
  nickname?: string;
  /** Fotka: ulož do public/images/hraci/ a napiš sem "/images/hraci/soubor.jpg" */
  photo?: string;
  goals?: number;
  assists?: number;
  games?: number;
};

/* -------------------------------------------------------------------------
   SOUPISKA
   Doplň u hráčů `position` ("Brankář" | "Obránce" | "Útočník"), případně
   `role`, `nickname`, `photo` a statistiky. Zbytek se dopočítá sám.
   ------------------------------------------------------------------------- */
export const players: Player[] = [
  { number: 1, firstName: "Jiří", lastName: "Hamák",position: "Obránce" ,nickname: "Hami"},
  { number: 5, firstName: "Honza", lastName: "Holas",position: "Útočník" },
  { number: 8, firstName: "Michal", lastName: "Horáček",position: "Útočník" },
  { number: 9, firstName: "Vítek", lastName: "Myška",position: "Brankář" },
  { number: 11, firstName: "Vojtěch", lastName: "Benc",position:"Útočník", nickname: "Bencík"},
  { number: 12, firstName: "Jan", lastName: "Kvapil",position:  "Obránce", nickname:"Kvápa"},
  { number: 19, firstName: "Matěj", lastName: "Švanda",position: "Útočník",nickname: "Švadů" },
  { number: 21, firstName: "David", lastName: "Fousek",position: "Obránce" },
  { number: 23, firstName: "Marek", lastName: "Zvolánek",position: "Obránce",nickname: "Zvolda" },
  { number: 23, firstName: "Vojtěch", lastName: "Suchý",position: "Útočník",nickname: "Smek" },
  { number: 25, firstName: "Tadeáš", lastName: "Remeš",position:  "Útočník",nickname: "Remik" },
  { number: 30, firstName: "Jiří", lastName: "Švec",position: "Brankář",nickname: "Borec" },
  { number: 31, firstName: "Milan", lastName: "Tichý",position: "Útočník" },
  { number: 33, firstName: "Tomáš", lastName: "Wilder",position: "Obránce",nickname: "Wildy" },
  { number: 55, firstName: "Marek", lastName: "Horák",position: "Útočník",nickname: "Hory" },
  { number: 66, firstName: "Leoš", lastName: "Vodvárka",position: "Obránce" },
  { number: 77, firstName: "Mikuláš", lastName: "Němec",position:"Obránce",nickname: "Miky" },
  { number: 87, firstName: "Ladislav", lastName: "Jandík",position: "Útočník",nickname: "Ládík" },
  { number: 89, firstName: "Petr", lastName: "Sodomka",position: "Útočník",nickname: "Sody" },
  { number: 99, firstName: "Patrik", lastName: "Sotona",position: "Útočník",nickname: "Soty" },
  {number:10, firstName: "Matouš", lastName:"Borna",position:"Útočník",}
];

/* ---------------------------- odvozené věci ---------------------------- */

export const positionOrder: Position[] = ["Brankář", "Obránce", "Útočník"];

/** Množné číslo pro filtry a nadpisy */
export const positionPlural: Record<Position, string> = {
  Brankář: "Brankáři",
  Obránce: "Obránci",
  Útočník: "Útočníci",
};

export function fullName(p: Player) {
  return `${p.firstName} ${p.lastName}`;
}

/** Stabilní klíč – čísla se můžou opakovat, kombinace se jménem ne. */
export function playerKey(p: Player) {
  return `${p.number}-${p.lastName}-${p.firstName}`;
}

export function points(p: Player) {
  return (p.goals ?? 0) + (p.assists ?? 0);
}

export function hasStats(p: Player) {
  return p.goals !== undefined || p.assists !== undefined;
}

/** Pozice, které jsou reálně vyplněné – podle toho se vykreslí filtry. */
export function usedPositions(): Position[] {
  return positionOrder.filter((pos) => players.some((p) => p.position === pos));
}

/** Soupiska seřazená podle čísla dresu. */
export const roster = [...players].sort(
  (a, b) => a.number - b.number || a.lastName.localeCompare(b.lastName, "cs"),
);

/**
 * Kanadské bodování. Vypisuje celou soupisku (i s nulami), aby byla tabulka
 * připravená na začátek sezóny. Volitelně jen jednu formaci.
 */
export function scoringTable(position?: Position) {
  return roster
    .filter((p) => !position || p.position === position)
    .sort(
      (a, b) =>
        points(b) - points(a) ||
        (b.goals ?? 0) - (a.goals ?? 0) ||
        a.lastName.localeCompare(b.lastName, "cs"),
    );
}

export const rosterSize = players.length;
