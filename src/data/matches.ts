export type Match = {
  /** Datum ve tvaru YYYY-MM-DD */
  date: string;
  /** Čas začátku, např. "20:15" */
  time?: string;
  opponent: string;
  home: boolean;
  /** Kde se hraje, např. "Zimní stadion Hlinsko" */
  venue?: string;
  /** Skóre nech nevyplněné, dokud se zápas neodehraje – bere se pak jako nadcházející. */
  scoreUs?: number;
  scoreThem?: number;
  /** Rozhodnuto v prodloužení nebo po nájezdech */
  overtime?: boolean;
  /** Střelci, např. "Švec 2, Němec, Benc" */
  scorers?: string;
  /** Poznámka do zápisu */
  note?: string;
};

/* -------------------------------------------------------------------------
   ZÁPASY – UKÁZKOVÁ DATA
   Tohle jsou vymyšlené zápasy, aby web nebyl prázdný. Přepiš je reálnými.
   Bez `scoreUs` / `scoreThem` se zápas bere jako nadcházející a objeví se
   v sekci "Nejbližší zápas". Pořadí v poli nehraje roli, řadí se podle data.
   ------------------------------------------------------------------------- */
export const matches: Match[] = [
  // — nadcházející —
  {
    date: "2026-08-14",
    time: "20:00",
    opponent: "Ice Foxes",
    home: true,
    venue: "Zimní stadion",
  },
  {
    date: "2026-08-28",
    time: "19:30",
    opponent: "Steel Wolves",
    home: false,
    venue: "Hala soupeře",
  },

  // — odehrané —
  {
    date: "2026-05-10",
    opponent: "Wild Bears",
    home: true,
    scoreUs: 6,
    scoreThem: 3,
    scorers: "Němec 2, Švanda, Benc, Sotona, Horák",
    note: "Nejlepší třetina sezóny. Čtyři góly za deset minut.",
  },
  {
    date: "2026-04-26",
    opponent: "Ice Foxes",
    home: false,
    scoreUs: 2,
    scoreThem: 5,
    scorers: "Fousek, Zvolánek",
    note: "První třetina nám ujela, zbytek už jen kosmetika.",
  },
  {
    date: "2026-04-12",
    opponent: "Steel Wolves",
    home: true,
    scoreUs: 4,
    scoreThem: 4,
    overtime: true,
    scorers: "Suchý 2, Švanda, Remeš",
    note: "Vyrovnáno půl minuty před koncem, po nájezdech bod pro každého.",
  },
  {
    date: "2026-03-22",
    opponent: "Black Ravens",
    home: false,
    scoreUs: 3,
    scoreThem: 1,
    scorers: "Sotona 2, Vodvářka",
    note: "Tichý v bráně chytil, co se dalo.",
  },
];

/* ---------------------------- odvozené věci ---------------------------- */

export type PlayedMatch = Match & { scoreUs: number; scoreThem: number };

export function isPlayed(m: Match): m is PlayedMatch {
  return m.scoreUs !== undefined && m.scoreThem !== undefined;
}

export type Result = "V" | "R" | "P";

export function resultOf(m: PlayedMatch): Result {
  if (m.scoreUs > m.scoreThem) return "V";
  if (m.scoreUs < m.scoreThem) return "P";
  return "R";
}

/** Odehrané zápasy od nejnovějšího. */
export const playedMatches: PlayedMatch[] = matches
  .filter(isPlayed)
  .sort((a, b) => b.date.localeCompare(a.date));

/** Nadcházející zápasy od nejbližšího. */
export const upcomingMatches: Match[] = matches
  .filter((m) => !isPlayed(m))
  .sort((a, b) => a.date.localeCompare(b.date));

export const nextMatch: Match | undefined = upcomingMatches[0];

export function getSeasonStats() {
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let goalsFor = 0;
  let goalsAgainst = 0;

  for (const m of playedMatches) {
    goalsFor += m.scoreUs;
    goalsAgainst += m.scoreThem;
    const r = resultOf(m);
    if (r === "V") wins++;
    else if (r === "R") draws++;
    else losses++;
  }

  const played = playedMatches.length;
  const winRate = played ? Math.round((wins / played) * 100) : 0;

  return {
    played,
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    diff: goalsFor - goalsAgainst,
    winRate,
    /** Průměr vstřelených branek na zápas, na jedno desetinné místo */
    goalsPerGame: played ? Math.round((goalsFor / played) * 10) / 10 : 0,
  };
}

/** Forma – posledních N výsledků od nejnovějšího. */
export function getForm(count = 5): Result[] {
  return playedMatches.slice(0, count).map(resultOf);
}

/* ------------------------------- formát -------------------------------- */

const dateFmt = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

const dayFmt = new Intl.DateTimeFormat("cs-CZ", { weekday: "long" });

/** Formátuje datum bez závislosti na časové zóně prohlížeče. */
export function formatDate(iso: string) {
  return dateFmt.format(new Date(`${iso}T12:00:00`));
}

export function formatWeekday(iso: string) {
  const d = dayFmt.format(new Date(`${iso}T12:00:00`));
  return d.charAt(0).toUpperCase() + d.slice(1);
}

export function splitDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return { year, month, day };
}
