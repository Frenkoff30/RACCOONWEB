import { formatDate } from "@/data/matches";
import {
  getStandings,
  hasResultColumns,
  ourTeam,
  standings,
} from "@/data/standings";

export default function StandingsTable() {
  const rows = getStandings();
  const withResults = hasResultColumns();

  if (rows.length === 0) {
    return (
      <div className="card p-8">
        <p className="display text-2xl text-chalk">Tabulka zatím není</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Doplň týmy v <Code>src/data/standings.ts</Code> a tabulka se vykreslí
          sama i s pořadím a šipkami.
        </p>
      </div>
    );
  }

  const th =
    "cond px-2 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted";

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table
          className={`table-compact w-full text-sm ${withResults ? "min-w-[620px]" : "min-w-[340px]"}`}
        >
          <caption className="sr-only">
            Tabulka soutěže {standings.league}, sezóna {standings.season}
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={`${th} w-14 pl-4 text-left`}>
                Pořadí
              </th>
              <th scope="col" className={`${th} text-left`}>
                Tým
              </th>
              {withResults && (
                <>
                  <th scope="col" className={th} title="Odehrané zápasy">
                    Z
                  </th>
                  <th scope="col" className={th} title="Výhry">
                    V
                  </th>
                  <th scope="col" className={th} title="Remízy">
                    R
                  </th>
                  <th scope="col" className={th} title="Prohry">
                    P
                  </th>
                  <th scope="col" className={th}>
                    Skóre
                  </th>
                  <th scope="col" className={`${th} pr-4 text-pink`} title="Body">
                    B
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const us = r.team === ourTeam;
              return (
                <tr
                  key={r.team}
                  className={`row-hover border-b border-line/70 transition-colors last:border-0 ${
                    us ? "bg-pink/10" : ""
                  }`}
                >
                  <td className="px-2 pl-4">
                    <span
                      className={`cond inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${
                        us ? "bg-pink text-white" : "text-muted"
                      }`}
                    >
                      {r.rank}
                    </span>
                  </td>
                  <th
                    scope="row"
                    className={`cond px-2 text-left text-[0.95rem] font-semibold ${
                      us ? "text-pink" : "text-chalk"
                    }`}
                  >
                    {r.team}
                  </th>

                  {withResults && (
                    <>
                      <td className="px-2 text-center text-muted">
                        {r.games ?? 0}
                      </td>
                      <td className="px-2 text-center text-muted">
                        {r.wins ?? 0}
                      </td>
                      <td className="px-2 text-center text-muted">
                        {r.draws ?? 0}
                      </td>
                      <td className="px-2 text-center text-muted">
                        {r.losses ?? 0}
                      </td>
                      <td className="cond px-2 text-center text-chalk">
                        {r.goalsFor ?? 0}:{r.goalsAgainst ?? 0}
                      </td>
                      <td
                        className={`cond px-2 pr-4 text-center text-base font-bold ${
                          us ? "text-pink" : "text-chalk"
                        }`}
                      >
                        {r.points ?? 0}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="border-t border-line px-4 py-3 text-xs text-muted">
        {standings.league} · sezóna {standings.season} · aktualizováno{" "}
        {formatDate(standings.updated)}
      </p>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-[var(--tint,rgb(255_255_255/0.06))] px-1.5 py-0.5 text-chalk">
      {children}
    </code>
  );
}
