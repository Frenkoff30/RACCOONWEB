export type StandingsRow = {
  team: string;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  /** Nech prázdné a body se dopočítají podle `pointsRule` níž. */
  points?: number;
};

/** Kolik bodů za výhru / remízu / prohru. */
export const pointsRule = { win: 3, draw: 1, loss: 0 };

/** Jméno našeho týmu v tabulce – podle toho se řádek zvýrazní růžově. */
export const ourTeam = "Raccoons Hlinsko";

export const standings = {
  /** TODO: doplnit reálný název soutěže */
  league: "Hobby liga",
  season: "2026/27",
  /** Datum poslední aktualizace ve tvaru YYYY-MM-DD */
  updated: "2026-07-29",

  /* -----------------------------------------------------------------------
     UKÁZKOVÁ TABULKA
     Přepiš reálnými daty. Pořadí v poli nehraje roli, řadí se podle bodů,
     pak podle rozdílu skóre a vstřelených branek.
     ----------------------------------------------------------------------- */
  rows: [
    {
      team: ourTeam,
      games: 4,
      wins: 2,
      draws: 1,
      losses: 1,
      goalsFor: 15,
      goalsAgainst: 13,
    },
    {
      team: "Ice Foxes",
      games: 4,
      wins: 3,
      draws: 0,
      losses: 1,
      goalsFor: 18,
      goalsAgainst: 11,
    },
    {
      team: "Steel Wolves",
      games: 4,
      wins: 2,
      draws: 1,
      losses: 1,
      goalsFor: 14,
      goalsAgainst: 12,
    },
    {
      team: "Wild Bears",
      games: 4,
      wins: 1,
      draws: 1,
      losses: 2,
      goalsFor: 11,
      goalsAgainst: 14,
    },
    {
      team: "Black Ravens",
      games: 4,
      wins: 0,
      draws: 1,
      losses: 3,
      goalsFor: 8,
      goalsAgainst: 16,
    },
  ] as StandingsRow[],
};

/* ---------------------------- odvozené věci ---------------------------- */

export type RankedRow = StandingsRow & {
  rank: number;
  points: number;
  diff: number;
};

export function getStandings(): RankedRow[] {
  return standings.rows
    .map((r) => ({
      ...r,
      points:
        r.points ??
        r.wins * pointsRule.win +
          r.draws * pointsRule.draw +
          r.losses * pointsRule.loss,
      diff: r.goalsFor - r.goalsAgainst,
    }))
    .sort(
      (a, b) =>
        b.points - a.points || b.diff - a.diff || b.goalsFor - a.goalsFor,
    )
    .map((r, i) => ({ ...r, rank: i + 1 }));
}

export function ourPosition(): RankedRow | undefined {
  return getStandings().find((r) => r.team === ourTeam);
}
