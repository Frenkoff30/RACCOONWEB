export type Position = "Brankář" | "Obránce" | "Útočník";

/** Statistika hráče v jedné sezóně. */
export type SeasonStat = {
  /** Odehrané zápasy */
  games: number;
  goals: number;
  assists: number;
};

/* -------------------------------------------------------------------------
   SEZÓNY
   Nejnovější dole. `current` je ta, která se nuluje na začátku ročníku.
   ------------------------------------------------------------------------- */
export const SEASONS = [
  "2023/2024",
  "2024/2025",
  "2025/2026",
  "2026/2027",
] as const;

export type SeasonKey = (typeof SEASONS)[number];

/** Aktuální (rozehraná / připravená) sezóna. */
export const CURRENT_SEASON: SeasonKey = "2026/2027";

/** Klíč pro součet přes všechny sezóny. */
export const TOTAL_KEY = "Dohromady" as const;
export type ScoringView = SeasonKey | typeof TOTAL_KEY;

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
  /**
   * Hraje v aktuální sezóně? Objeví se díky tomu v soupisce i v bodování,
   * i když zatím nemá jediný bod. Hosty nech bez tohohle příznaku.
   */
  active?: boolean;
  /**
   * Statistiky za **minulé** sezóny. Aktuální sezóna se sem nepíše –
   * ta se počítá sama ze zápisů v `matches.ts`.
   */
  stats?: Partial<Record<SeasonKey, SeasonStat>>;
};

/** Zkratka pro zápis: [zápasy, góly, asistence]. */
function s(games: number, goals: number, assists: number): SeasonStat {
  return { games, goals, assists };
}

/* -------------------------------------------------------------------------
   SOUPISKA
   Doplň u hráčů `position`, případně `role`, `nickname`, `photo`.
   `active: true` = hraje aktuální sezónu. Body za aktuální sezónu se sem
   nepíšou, ty se berou ze zápasů v `matches.ts`. V `stats` jsou jen archivní
   sezóny, které zápas po zápase zapsané nemáme.
   ------------------------------------------------------------------------- */
export const players: Player[] = [
  {
    number: 1,
    firstName: "Jiří",
    lastName: "Hamák",
    position: "Obránce",
    nickname: "Hami",
    active: true,
    stats: {
      "2025/2026": s(9, 16, 0),
    },
  },
  {
    number: 5,
    firstName: "Jan",
    lastName: "Holas",
    position: "Útočník",
    active: true,
    stats: {
      "2023/2024": s(19, 2, 1),
      "2024/2025": s(13, 3, 3),
      "2025/2026": s(13, 1, 2),
    },
  },
  {
    number: 8,
    firstName: "Michal",
    lastName: "Horáček",
    position: "Útočník",
    active: true,
    stats: {
      "2023/2024": s(20, 7, 4),
      "2024/2025": s(17, 4, 2),
      "2025/2026": s(14, 5, 5),
    },
  },
  {
    number: 9,
    firstName: "Vítek",
    lastName: "Myška",
    position: "Brankář",
    active: true,
    stats: {
      "2024/2025": s(1, 0, 0),
      "2025/2026": s(1, 0, 1),
    },
  },
  {
    number: 11,
    firstName: "Vojtěch",
    lastName: "Benc",
    position: "Útočník",
    nickname: "Bencík",
    active: true,
    stats: {
      "2023/2024": s(21, 3, 4),
      "2024/2025": s(18, 4, 1),
      "2025/2026": s(13, 5, 0),
    },
  },
  {
    number: 12,
    firstName: "Jan",
    lastName: "Kvapil",
    position: "Obránce",
    nickname: "Kvápa",
    active: true,
    stats: {
      "2023/2024": s(19, 2, 1),
      "2024/2025": s(11, 4, 0),
      "2025/2026": s(5, 0, 0),
    },
  },
  {
    number: 19,
    firstName: "Matěj",
    lastName: "Švanda",
    position: "Útočník",
    nickname: "Švadů",
    active: true,
    stats: {
      "2023/2024": s(13, 0, 0),
      "2024/2025": s(17, 1, 0),
      "2025/2026": s(9, 3, 2),
    },
  },
  {
    number: 21,
    firstName: "David",
    lastName: "Fousek",
    position: "Obránce",
    active: true,
    stats: {
      "2023/2024": s(21, 0, 1),
      "2024/2025": s(10, 0, 0),
      "2025/2026": s(10, 1, 0),
    },
  },
  {
    number: 22,
    firstName: "Marek",
    lastName: "Zvolánek",
    position: "Obránce",
    nickname: "Zvolda",
    active: true,
    stats: {
      "2023/2024": s(16, 11, 3),
      "2024/2025": s(11, 11, 5),
      "2025/2026": s(2, 0, 0),
    },
  },
  {
    number: 23,
    firstName: "Vojtěch",
    lastName: "Suchý",
    position: "Útočník",
    nickname: "Smek",
    active: true,
    stats: {
      "2023/2024": s(16, 0, 3),
      "2024/2025": s(14, 3, 1),
      "2025/2026": s(11, 1, 1),
    },
  },
  {
    number: 25,
    firstName: "Tadeáš",
    lastName: "Remeš",
    position: "Útočník",
    nickname: "Remik",
    active: true,
    stats: {
      "2023/2024": s(20, 1, 1),
      "2024/2025": s(11, 1, 0),
      "2025/2026": s(12, 1, 1),
    },
  },
  {
    number: 30,
    firstName: "Jiří",
    lastName: "Švec",
    position: "Brankář",
    nickname: "Borec",
    active: true,
    stats: {
      "2023/2024": s(21, 0, 5),
      "2024/2025": s(17, 0, 4),
      "2025/2026": s(10, 0, 1),
    },
  },
  {
    number: 31,
    firstName: "Milan",
    lastName: "Tichý",
    position: "Útočník",
    active: true,
    stats: {
      "2024/2025": s(2, 0, 0),
      "2025/2026": s(4, 1, 0),
    },
  },
  {
    number: 33,
    firstName: "Tomáš",
    lastName: "Wilder",
    position: "Obránce",
    nickname: "Wildy",
    active: true,
    stats: {
      "2023/2024": s(12, 2, 6),
      "2024/2025": s(4, 0, 1),
      "2025/2026": s(4, 0, 2),
    },
  },
  {
    number: 55,
    firstName: "Marek",
    lastName: "Horák",
    position: "Útočník",
    nickname: "Hory",
    active: true,
    stats: {
      "2023/2024": s(20, 2, 1),
      "2024/2025": s(16, 2, 2),
      "2025/2026": s(13, 0, 0),
    },
  },
  {
    number: 66,
    firstName: "Leoš",
    lastName: "Vodvárka",
    position: "Obránce",
    active: true,
    stats: {
      "2023/2024": s(20, 0, 1),
      "2024/2025": s(16, 0, 1),
      "2025/2026": s(6, 0, 0),
    },
  },
  {
    number: 77,
    firstName: "Mikuláš",
    lastName: "Němec",
    position: "Obránce",
    nickname: "Miky",
    active: true,
    stats: {
      "2023/2024": s(19, 29, 1),
      "2024/2025": s(16, 27, 3),
      "2025/2026": s(10, 18, 2),
    },
  },
  {
    number: 87,
    firstName: "Ladislav",
    lastName: "Jandík",
    position: "Útočník",
    nickname: "Ládík",
    active: true,
    stats: {
      "2023/2024": s(12, 1, 2),
      "2024/2025": s(11, 2, 1),
      "2025/2026": s(4, 0, 0),
    },
  },
  {
    // Host / neznámé jméno – v tabulkách se ukazuje jako "#88".
    number: 88,
    firstName: "",
    lastName: "",
    position: "Útočník",
    stats: {
      "2023/2024": s(1, 4, 0),
      "2025/2026": s(2, 1, 0),
    },
  },
  {
    number: 89,
    firstName: "Petr",
    lastName: "Sodomka",
    position: "Útočník",
    nickname: "Sody",
    active: true,
    stats: {
      "2024/2025": s(6, 6, 3),
      "2025/2026": s(4, 0, 3),
    },
  },
  {
    number: 99,
    firstName: "Patrik",
    lastName: "Sotona",
    position: "Útočník",
    nickname: "Soty",
    active: true,
    stats: {
      "2023/2024": s(11, 0, 1),
      "2024/2025": s(14, 5, 1),
      "2025/2026": s(5, 0, 0),
    },
  },
  {
    number: 10,
    firstName: "Matouš",
    lastName: "Borna",
    position: "Útočník",
    active: true,
  },
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
  const name = `${p.firstName} ${p.lastName}`.trim();
  return name || `#${p.number}`;
}

/** Stabilní klíč – čísla se můžou opakovat, kombinace se jménem ne. */
export function playerKey(p: Player) {
  return `${p.number}-${p.lastName}-${p.firstName}`;
}

/** Pozice, které jsou reálně vyplněné – podle toho se vykreslí filtry. */
export function usedPositions(): Position[] {
  return positionOrder.filter((pos) => players.some((p) => p.position === pos));
}

/** Soupiska seřazená podle čísla dresu (bez hostů bez jména). */
export const roster = [...players]
  .filter((p) => p.lastName)
  .sort(
    (a, b) => a.number - b.number || a.lastName.localeCompare(b.lastName, "cs"),
  );

export const rosterSize = roster.length;
