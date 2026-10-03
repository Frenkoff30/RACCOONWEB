/* -------------------------------------------------------------------------
   ODVOZENÉ STATISTIKY

   Tenhle soubor se needituje – jen spojuje dohromady soupisku (`players.ts`)
   a zápasy (`matches.ts`).

   Aktuální sezóna se počítá ze zápis zápas po zápasu, archivní sezóny se
   berou z ručně zapsaného `stats` u hráče. Díky tomu stačí po zápase vyplnit
   jediné místo – `scoring` v `matches.ts` – a bodování, soupiska i střelci
   pod zápasem se srovnají samy.
   ------------------------------------------------------------------------- */
import {
  playedMatches,
  type PlayedMatch,
} from "./matches";
import {
  CURRENT_SEASON,
  SEASONS,
  TOTAL_KEY,
  players,
  type Player,
  type Position,
  type ScoringView,
  type SeasonStat,
} from "./players";

function emptyStat(): SeasonStat {
  return { games: 0, goals: 0, assists: 0 };
}

/* ----------------------- kontrola zápisu zápasů ------------------------ */

const byLastName = new Map(
  players.filter((p) => p.lastName).map((p) => [p.lastName, p]),
);

/**
 * Jméno z `matches.ts`, které není na soupisce, je skoro jistě překlep.
 * Radši spadnout při buildu než tiše ztratit někomu góly.
 */
function resolve(lastName: string, matchDate: string): Player {
  const player = byLastName.get(lastName);
  if (!player) {
    throw new Error(
      `Zápas ${matchDate}: hráč "${lastName}" není na soupisce v players.ts. ` +
        `Zkontroluj překlep nebo hráče doplň.`,
    );
  }
  return player;
}

/* ------------------- aktuální sezóna ze zápisů zápasů ------------------ */

/** Příjmení → statistika v aktuální sezóně, spočítaná ze všech zápasů. */
const currentSeason: Map<string, SeasonStat> = (() => {
  const acc = new Map<string, SeasonStat>();

  for (const m of playedMatches) {
    // Zápas se počítá každému ze sestavy i každému, kdo bodoval.
    const played = new Set([
      ...(m.lineup ?? []),
      ...Object.keys(m.scoring ?? {}),
    ]);

    for (const lastName of played) {
      resolve(lastName, m.date);
      const stat = acc.get(lastName) ?? emptyStat();
      const [goals, assists] = m.scoring?.[lastName] ?? [0, 0];
      stat.games += 1;
      stat.goals += goals;
      stat.assists += assists;
      acc.set(lastName, stat);
    }
  }

  return acc;
})();

/** Střelci a nahrávači zápasu jako text pod výsledek. */
export function scorersLine(m: PlayedMatch): string | undefined {
  const goals = Object.entries(m.scoring ?? {})
    .filter(([, [g]]) => g > 0)
    .sort((a, b) => b[1][0] - a[1][0] || a[0].localeCompare(b[0], "cs"))
    .map(([name, [g]]) => (g > 1 ? `${name} ${g}` : name));

  return goals.length ? goals.join(", ") : undefined;
}

/** Nahrávači zápasu jako text. */
export function assistsLine(m: PlayedMatch): string | undefined {
  const assists = Object.entries(m.scoring ?? {})
    .filter(([, [, a]]) => a > 0)
    .sort((a, b) => b[1][1] - a[1][1] || a[0].localeCompare(b[0], "cs"))
    .map(([name, [, a]]) => (a > 1 ? `${name} ${a}` : name));

  return assists.length ? assists.join(", ") : undefined;
}

/* --------------------------- statistiky hráče -------------------------- */

/**
 * Statistika hráče pro daný pohled: konkrétní sezóna nebo součet přes všechny.
 * Vrací vždy objekt (i s nulami), aby se s ním dalo počítat.
 */
export function statFor(p: Player, view: ScoringView): SeasonStat {
  if (view === TOTAL_KEY) {
    return SEASONS.reduce<SeasonStat>((acc, key) => {
      const st = statFor(p, key);
      return {
        games: acc.games + st.games,
        goals: acc.goals + st.goals,
        assists: acc.assists + st.assists,
      };
    }, emptyStat());
  }
  if (view === CURRENT_SEASON) {
    return currentSeason.get(p.lastName) ?? emptyStat();
  }
  return p.stats?.[view] ?? emptyStat();
}

export function points(stat: SeasonStat) {
  return stat.goals + stat.assists;
}

/** Figuruje hráč v daném pohledu – odehrál ho, nebo je na soupisce? */
export function playedIn(p: Player, view: ScoringView): boolean {
  if (view === TOTAL_KEY) {
    return p.active === true || SEASONS.some((key) => playedIn(p, key));
  }
  if (view === CURRENT_SEASON) {
    return p.active === true || currentSeason.has(p.lastName);
  }
  return p.stats?.[view] !== undefined;
}

/** Má hráč čísla aspoň v jedné sezóně? */
export function hasAnyStats(p: Player) {
  return SEASONS.some((key) => playedIn(p, key));
}

/**
 * Kanadské bodování pro daný pohled (sezóna nebo součet).
 * Vypisuje hráče, kteří v daném pohledu figurují. Volitelně jen jednu formaci.
 */
export function scoringTable(view: ScoringView, position?: Position) {
  return players
    .filter((p) => !position || p.position === position)
    .filter((p) => playedIn(p, view))
    .map((p) => ({ player: p, stat: statFor(p, view) }))
    .sort(
      (a, b) =>
        points(b.stat) - points(a.stat) ||
        b.stat.goals - a.stat.goals ||
        a.player.lastName.localeCompare(b.player.lastName, "cs"),
    );
}

/* ------------------------------- rekordy ------------------------------- */

export type Metric = "goals" | "assists" | "points" | "games";

export const metricLabel: Record<Metric, string> = {
  goals: "Góly",
  assists: "Asistence",
  points: "Body",
  games: "Zápasy",
};

function valueOf(stat: SeasonStat, metric: Metric): number {
  return metric === "points" ? points(stat) : stat[metric];
}

export type LeaderRow = { player: Player; value: number };

/**
 * Pořadí hráčů přes všechny sezóny v jedné metrice.
 * Hráči s nulou se vynechávají, ať tabulka není samá nula.
 */
export function allTimeLeaders(metric: Metric, limit = 5): LeaderRow[] {
  return players
    .map((p) => ({ player: p, value: valueOf(statFor(p, TOTAL_KEY), metric) }))
    .filter((row) => row.value > 0)
    .sort(
      (a, b) =>
        b.value - a.value ||
        a.player.lastName.localeCompare(b.player.lastName, "cs"),
    )
    .slice(0, limit);
}

export type SeasonRecord = {
  player: Player;
  season: (typeof SEASONS)[number];
  stat: SeasonStat;
};

/** Nejlepší jednotlivé sezóny podle bodů – přes všechny hráče a ročníky. */
export function bestSeasons(limit = 8): SeasonRecord[] {
  const rows: SeasonRecord[] = [];

  for (const player of players) {
    for (const season of SEASONS) {
      if (!playedIn(player, season)) continue;
      const stat = statFor(player, season);
      if (points(stat) > 0) rows.push({ player, season, stat });
    }
  }

  return rows
    .sort(
      (a, b) =>
        points(b.stat) - points(a.stat) ||
        b.stat.goals - a.stat.goals ||
        a.player.lastName.localeCompare(b.player.lastName, "cs"),
    )
    .slice(0, limit);
}
