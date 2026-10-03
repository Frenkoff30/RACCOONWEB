import SectionDivider from "./SectionDivider";
import Reveal from "./Reveal";
import { fullName, playerKey } from "@/data/players";
import {
  allTimeLeaders,
  bestSeasons,
  metricLabel,
  points,
  type Metric,
} from "@/data/stats";
import {
  archivePlacements,
  getSeasonStandings,
  getStandings,
  ourTeam,
  standingsSeasonKeys,
} from "@/data/standings";

const BOARDS: Metric[] = ["points", "goals", "assists", "games"];

type Placement = {
  season: string;
  league: string;
  rank: number;
  teams?: number;
  /** Bilance – jen u sezón, kde máme celou tabulku. */
  record?: { games: number; wins: number; draws: number; losses: number };
  score?: { for: number; against: number };
};

/**
 * Umístění po sezónách, od nejnovější. Spojuje sezóny s kompletní tabulkou
 * s archivními, kde víme jen pořadí.
 */
function ourPlacements(): Placement[] {
  const fromStandings = standingsSeasonKeys
    .map((season): Placement | null => {
      const data = getSeasonStandings(season);
      const rows = getStandings(data.rows);
      const row = rows.find((r) => r.team === ourTeam);
      if (!row?.games) return null;

      return {
        season,
        league: data.league,
        rank: row.rank,
        teams: rows.length,
        record: {
          games: row.games,
          wins: row.wins ?? 0,
          draws: row.draws ?? 0,
          losses: row.losses ?? 0,
        },
        score: { for: row.goalsFor ?? 0, against: row.goalsAgainst ?? 0 },
      };
    })
    .filter((x) => x !== null);

  return [...fromStandings, ...archivePlacements].sort((a, b) =>
    b.season.localeCompare(a.season),
  );
}

/**
 * Síň slávy – žebříčky za celou historii, nejlepší sezóny jednotlivců
 * a umístění týmu po sezónách. Čísla se počítají ze zápasů a archivních sezón.
 */
export default function RecordsBoard() {
  const seasons = bestSeasons();
  const placements = ourPlacements();

  return (
    <>
      {/* Žebříčky napříč historií */}
      <section id="rekordy" className="wrap scroll-mt-24 py-20 sm:py-24">
        <Reveal>
          <h2 className="display text-4xl text-chalk sm:text-5xl">
            Síň <span className="text-pink">slávy</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {BOARDS.map((metric, boardIndex) => {
            const leaders = allTimeLeaders(metric);
            if (leaders.length === 0) return null;
            const top = leaders[0];

            return (
              <Reveal key={metric} delay={boardIndex * 60}>
                <article className="card h-full p-6 sm:p-7">
                  <p className="cond text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-pink">
                    {metricLabel[metric]}
                  </p>

                  <div className="mt-4 flex items-baseline gap-3">
                    <p className="display text-5xl leading-none text-chalk">
                      {top.value}
                    </p>
                    <p className="display truncate text-xl text-chalk">
                      {fullName(top.player)}
                    </p>
                  </div>

                  <ol className="mt-6 space-y-2 border-t border-line pt-4">
                    {leaders.slice(1).map((row, i) => (
                      <li
                        key={playerKey(row.player)}
                        className="flex items-baseline gap-3 text-[0.9rem]"
                      >
                        <span className="cond w-5 shrink-0 text-xs text-muted">
                          {i + 2}.
                        </span>
                        <span className="min-w-0 flex-1 truncate text-chalk">
                          {fullName(row.player)}
                        </span>
                        <span className="cond font-semibold text-muted">
                          {row.value}
                        </span>
                      </li>
                    ))}
                  </ol>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <SectionDivider from="dark" to="light" />

      {/* Nejlepší sezóny jednotlivců */}
      <section className="section-light">
        <div className="wrap py-16 sm:py-20">
          <h2 className="display text-3xl text-chalk sm:text-4xl">
            Nejlepší <span className="text-pink">sezóny</span>
          </h2>

          {seasons.length > 0 ? (
            <Reveal className="mt-8">
              <div className="card overflow-x-auto">
                <table className="table-compact w-full min-w-[320px] border-collapse text-sm">
                  <caption className="sr-only">
                    Nejlepší sezóny jednotlivců podle kanadského bodování
                  </caption>
                  <thead>
                    <tr className="cond border-b border-line text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                      <th
                        scope="col"
                        className="px-4 py-3 text-left font-normal"
                      >
                        Hráč
                      </th>
                      <th
                        scope="col"
                        className="hidden px-2 py-3 text-left font-normal sm:table-cell"
                      >
                        Sezóna
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-right font-normal"
                      >
                        Z
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-right font-normal"
                      >
                        G
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-right font-normal"
                      >
                        A
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-right font-normal"
                      >
                        B
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {seasons.map((row, i) => (
                      <tr
                        key={`${playerKey(row.player)}-${row.season}`}
                        className="border-b border-line/60 last:border-0"
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 text-left font-normal text-chalk"
                        >
                          <span className="cond mr-2 text-xs text-muted">
                            {row.player.number}
                          </span>
                          {fullName(row.player)}
                          {/* Na úzkém displeji se sloupec Sezóna schová sem,
                              ať na mobilu zbyde místo na góly a body. */}
                          <span className="cond block text-xs text-muted sm:hidden">
                            {row.season}
                          </span>
                        </th>
                        <td className="cond hidden px-2 py-3 text-muted sm:table-cell">
                          {row.season}
                        </td>
                        <td className="px-2 py-3 text-right text-muted">
                          {row.stat.games}
                        </td>
                        <td className="px-2 py-3 text-right text-chalk">
                          {row.stat.goals}
                        </td>
                        <td className="px-2 py-3 text-right text-chalk">
                          {row.stat.assists}
                        </td>
                        <td
                          className={`cond px-4 py-3 text-right font-bold ${
                            i === 0 ? "text-pink" : "text-chalk"
                          }`}
                        >
                          {points(row.stat)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          ) : (
            <p className="mt-8 text-muted">Zatím nemáme co počítat.</p>
          )}
        </div>
      </section>

      {/* Tým po sezónách */}
      {placements.length > 0 && (
        <>
          <SectionDivider from="light" to="dark" />

          <section className="wrap py-16 sm:py-20">
            <h2 className="display text-3xl text-chalk sm:text-4xl">
              Tým po <span className="text-pink">sezónách</span>
            </h2>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {placements.map((p, i) => (
                <Reveal as="li" key={p.season} delay={i * 60}>
                  <div className="card h-full p-6">
                    <p className="cond text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted">
                      {p.season} · {p.league}
                    </p>
                    <p className="display mt-3 text-4xl leading-none text-chalk">
                      {p.rank}.
                      <span className="ml-2 text-lg text-muted">
                        místo{p.teams ? ` z ${p.teams}` : ""}
                      </span>
                    </p>
                    {p.record && p.score && (
                      <p className="mt-4 text-[0.9rem] text-muted">
                        {p.record.games} zápasů · {p.record.wins}–
                        {p.record.draws}–{p.record.losses} · skóre{" "}
                        {p.score.for}:{p.score.against}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
}
