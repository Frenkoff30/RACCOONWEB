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
   ZÁPASY – SEZÓNA 2026/2027
   Zatím prázdné, čeká se na první termíny.

   Bez `scoreUs` / `scoreThem` se zápas bere jako nadcházející a objeví se
   v sekci „Nejbližší zápas“. Se skóre se z něj stane odehraný zápas a rovnou
   se dopočítá bilance, forma i úspěšnost. Pořadí v poli nehraje roli,
   řadí se podle data.

   Vzor k okopírování:

   {
     date: "2026-10-09",
     time: "20:00",
     opponent: "Wolves Krouna",
     home: true,
     venue: "Zimní stadion Hlinsko",
     scoreUs: 4,
     scoreThem: 2,
     scorers: "Sotona 2, Benc, Švanda",
     note: "Poznámka do zápisu.",
   },
   ------------------------------------------------------------------------- */
export const matches: Match[] = [];


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
