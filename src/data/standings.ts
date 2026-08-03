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
export const pointsRule = { win: 3, draw: 1, loss: 0 };

/** Jak se jmenujeme v tabulce – podle toho se řádek zvýrazní růžově. */
export const ourTeam = "Raccoons";

export const standings = {
  /** TODO: doplnit oficiální název soutěže */
  league: "Hobby liga",
  season: "2026/2027",
  /** Datum poslední aktualizace ve tvaru YYYY-MM-DD */
  updated: "2026-08-03",

  /* -----------------------------------------------------------------------
     POŘADÍ URČUJE POŘADÍ V POLI.
     Stačí týmy přeskládat, čísla se přepočítají sama.
     Zápasy a skóre jsou na začátku sezóny vynulované, body se dopočítají
     podle `pointsRule`.
     ----------------------------------------------------------------------- */
  rows: [
    {
      team: "Skulls",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Bisoni",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Nalitý Ubožáci",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "TAZZ Světnov",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Včelákov",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Trhová Kamenice",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Štěpánov",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Panthers Pardubice",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Wolves Krouna",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: ourTeam,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Prosetín",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Kavalíři",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Kameničky",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Torpédo",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Bejčci",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Perun",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
    {
      team: "Otradov",
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    },
  ] as StandingsRow[],
};

/* ---------------------------- odvozené věci ---------------------------- */

export type RankedRow = Omit<StandingsRow, "points"> & {
  rank: number;
  /** null = tým ještě nemá zapsanou bilanci */
  points: number | null;
};

/** Má vůbec smysl ukazovat sloupce se zápasy a skóre? */
export function hasResultColumns() {
  return standings.rows.some(
    (r) => r.games !== undefined || r.goalsFor !== undefined,
  );
}

export function getStandings(): RankedRow[] {
  return standings.rows.map((r, i) => {
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

export function ourPosition(): RankedRow | undefined {
  return getStandings().find((r) => r.team === ourTeam);
}
