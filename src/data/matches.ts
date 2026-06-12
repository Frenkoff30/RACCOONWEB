export type Match = {
  date: string; // YYYY-MM-DD
  opponent: string;
  scoreUs: number;
  scoreThem: number;
  home: boolean;
  scorers?: string;
  note?: string;
};

export const matches: Match[] = [
  {
    date: "2026-05-10",
    opponent: "Wild Bears",
    scoreUs: 6,
    scoreThem: 3,
    home: true,
    scorers: "Novák 2, Svoboda, Dvořák, Černý, Malý",
    note: "Velké zranění komára na tribuně, jinak pohoda.",
  },
  {
    date: "2026-04-26",
    opponent: "Ice Foxes",
    scoreUs: 2,
    scoreThem: 5,
    home: false,
    scorers: "Svoboda, Novák",
    note: "Soupeř měl rozhodčího v rodině. Co dodat.",
  },
  {
    date: "2026-04-12",
    opponent: "Steel Wolves",
    scoreUs: 4,
    scoreThem: 4,
    home: true,
    scorers: "Dvořák 2, Novák, Malý",
    note: "Remíza po nájezdech, srdcová záležitost.",
  },
];

export function getStandingsSummary() {
  let wins = 0;
  let losses = 0;
  let draws = 0;
  let goalsFor = 0;
  let goalsAgainst = 0;

  for (const m of matches) {
    goalsFor += m.scoreUs;
    goalsAgainst += m.scoreThem;
    if (m.scoreUs > m.scoreThem) wins++;
    else if (m.scoreUs < m.scoreThem) losses++;
    else draws++;
  }

  return { played: matches.length, wins, losses, draws, goalsFor, goalsAgainst };
}
