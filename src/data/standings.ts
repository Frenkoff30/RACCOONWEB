export type StandingsRow = {
  team: string;
  /* Následující sloupce jsou nepovinné. V tabulce se objeví teprve tehdy,
     až je vyplníš aspoň u jednoho týmu. */
  games?: number;
  wins?: number;
  draws?: number;
  losses?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  /** Nech prázdné a body se dopočítají podle `pointsRule`. */
  points?: number;
};

/** Kolik bodů za výhru / remízu / prohru. */
export const pointsRule = { win: 2, draw: 1, loss: 0 };

/** Jak se jmenujeme v tabulce – podle toho se řádek zvýrazní růžově. */
export const ourTeam = "Raccoons";

export type SeasonStandings = {
  season: string;
  league: string;
  /** Datum poslední aktualizace ve tvaru YYYY-MM-DD */
  updated: string;
  /** true = k dispozici je jen konečné pořadí týmů, bez statistik. */
  rankOnly?: boolean;
  rows: StandingsRow[];
};

/** Aktuální (rozehraná / připravená) sezóna. */
export const CURRENT_STANDINGS_SEASON = "2026/2027";

/* -------------------------------------------------------------------------
   TABULKY PO SEZÓNÁCH (nejnovější dole)
   Pořadí určuje pořadí v poli. Stačí týmy přeskládat, čísla se přepočítají.
   ------------------------------------------------------------------------- */
export const standingsSeasons: SeasonStandings[] = [
  {
    season: "2024/2025",
    league: "NHL Hlinsko",
    updated: "2025-04-30",
    rows: [
      { team: "Bisoni", games: 21, wins: 18, draws: 0, losses: 3, goalsFor: 135, goalsAgainst: 72 },
      { team: "Světnov", games: 22, wins: 14, draws: 1, losses: 7, goalsFor: 162, goalsAgainst: 111 },
      { team: "Kameničky", games: 22, wins: 13, draws: 0, losses: 9, goalsFor: 145, goalsAgainst: 121 },
      { team: "Trhová Kamenice", games: 22, wins: 11, draws: 4, losses: 7, goalsFor: 142, goalsAgainst: 125 },
      { team: "Panthers Pardubice", games: 19, wins: 10, draws: 2, losses: 7, goalsFor: 109, goalsAgainst: 82 },
      { team: "Včelákov", games: 20, wins: 10, draws: 2, losses: 8, goalsFor: 102, goalsAgainst: 101 },
      { team: "Nalitý Ubožáci", games: 22, wins: 10, draws: 2, losses: 10, goalsFor: 125, goalsAgainst: 112 },
      { team: "Wolves Krouna", games: 20, wins: 9, draws: 1, losses: 10, goalsFor: 147, goalsAgainst: 126 },
      { team: "Kavalíři", games: 22, wins: 9, draws: 0, losses: 13, goalsFor: 93, goalsAgainst: 151 },
      { team: ourTeam, games: 21, wins: 7, draws: 3, losses: 11, goalsFor: 66, goalsAgainst: 102 },
      { team: "Prosetín", games: 21, wins: 7, draws: 1, losses: 13, goalsFor: 103, goalsAgainst: 140 },
      { team: "Perun", games: 21, wins: 5, draws: 3, losses: 13, goalsFor: 100, goalsAgainst: 132 },
      { team: "Otradov", games: 21, wins: 4, draws: 1, losses: 16, goalsFor: 72, goalsAgainst: 126 },
    ],
  },
  {
    // Konečné pořadí: v play-off jsme přeskočili Kavalíře na 10. místo.
    season: "2025/2026",
    league: "NHL Hlinsko",
    updated: "2026-04-30",
    rows: [
      { team: "Bisoni", games: 16, wins: 14, draws: 0, losses: 2, goalsFor: 139, goalsAgainst: 64 },
      { team: "TAZZ Světnov", games: 16, wins: 11, draws: 2, losses: 3, goalsFor: 111, goalsAgainst: 82 },
      { team: "Skulls", games: 16, wins: 11, draws: 1, losses: 4, goalsFor: 103, goalsAgainst: 55 },
      { team: "Štěpánov", games: 16, wins: 9, draws: 2, losses: 5, goalsFor: 82, goalsAgainst: 64 },
      { team: "Nalitý Ubožáci", games: 16, wins: 9, draws: 2, losses: 5, goalsFor: 66, goalsAgainst: 62 },
      { team: "Panthers Pardubice", games: 16, wins: 9, draws: 1, losses: 6, goalsFor: 111, goalsAgainst: 83 },
      { team: "Včelákov", games: 16, wins: 8, draws: 2, losses: 6, goalsFor: 82, goalsAgainst: 94 },
      { team: "Trhová Kamenice", games: 16, wins: 7, draws: 3, losses: 6, goalsFor: 106, goalsAgainst: 99 },
      { team: "Wolves Krouna", games: 16, wins: 7, draws: 1, losses: 8, goalsFor: 95, goalsAgainst: 90 },
      { team: ourTeam, games: 16, wins: 6, draws: 1, losses: 9, goalsFor: 65, goalsAgainst: 76 },
      { team: "Kavalíři", games: 16, wins: 7, draws: 0, losses: 9, goalsFor: 89, goalsAgainst: 110 },
      { team: "Prosetín", games: 16, wins: 5, draws: 2, losses: 9, goalsFor: 72, goalsAgainst: 105 },
      { team: "Bejčci", games: 16, wins: 5, draws: 1, losses: 10, goalsFor: 67, goalsAgainst: 69 },
      { team: "Kameničky", games: 16, wins: 5, draws: 1, losses: 10, goalsFor: 84, goalsAgainst: 101 },
      { team: "Otradov", games: 16, wins: 4, draws: 2, losses: 10, goalsFor: 59, goalsAgainst: 84 },
      { team: "Torpédo", games: 16, wins: 3, draws: 3, losses: 10, goalsFor: 71, goalsAgainst: 102 },
      { team: "Perun", games: 16, wins: 4, draws: 0, losses: 12, goalsFor: 60, goalsAgainst: 122 },
    ],
  },
  {
    /* -----------------------------------------------------------------------
       AKTUÁLNÍ SEZÓNA – vynulovaná a připravená.
       Zápasy a skóre jsou na začátku sezóny nuly, body se dopočítají podle
       `pointsRule`. Stačí doplňovat čísla během ročníku.
       ----------------------------------------------------------------------- */
    season: CURRENT_STANDINGS_SEASON,
    league: "NHL Hlinsko",
    updated: "2026-08-03",
    rows: [
      { team: "Skulls", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Bisoni", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Nalitý Ubožáci", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "TAZZ Světnov", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Včelákov", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Trhová Kamenice", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Štěpánov", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Panthers Pardubice", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Wolves Krouna", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: ourTeam, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Prosetín", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Kavalíři", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Kameničky", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Torpédo", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Bejčci", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Perun", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: "Otradov", games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
    ],
  },
];

/** Seznam sezón pro přepínač (nejnovější → nejstarší). */
export const standingsSeasonKeys = [...standingsSeasons]
  .reverse()
  .map((s) => s.season);

export function getSeasonStandings(season: string): SeasonStandings {
  return (
    standingsSeasons.find((s) => s.season === season) ??
    standingsSeasons[standingsSeasons.length - 1]
  );
}

/* ---------------------------- odvozené věci ---------------------------- */

export type RankedRow = Omit<StandingsRow, "points"> & {
  rank: number;
  /** null = tým ještě nemá zapsanou bilanci */
  points: number | null;
};

/** Má vůbec smysl ukazovat sloupce se zápasy a skóre? */
export function hasResultColumns(rows: StandingsRow[]) {
  return rows.some((r) => r.games !== undefined || r.goalsFor !== undefined);
}

export function getStandings(rows: StandingsRow[]): RankedRow[] {
  return rows.map((r, i) => {
    const rank = i + 1;
    const hasRecord =
      r.wins !== undefined || r.draws !== undefined || r.losses !== undefined;

    return {
      ...r,
      rank,
      points:
        r.points ??
        (hasRecord
          ? (r.wins ?? 0) * pointsRule.win +
            (r.draws ?? 0) * pointsRule.draw +
            (r.losses ?? 0) * pointsRule.loss
          : null),
    };
  });
}
