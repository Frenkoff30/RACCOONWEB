import { formatDate } from "@/data/matches";
import { getStandings, ourTeam, standings } from "@/data/standings";

export default function StandingsTable({ compact }: { compact?: boolean }) {
  const rows = getStandings();

  if (rows.length === 0) {
    return (
      <div className="card p-8">
        <p className="display text-2xl text-chalk">Tabulka zatím není</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Doplň týmy v <Code>src/data/standings.ts</Code> a tabulka se vykreslí
          sama i s pořadím a body.
        </p>
      </div>
    );
  }

  const th =
    "cond px-2 py-4 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted";

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <caption className="sr-only">
            Tabulka soutěže {standings.league}, sezóna {standings.season}
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={`${th} w-10 text-left`}>
                #
              </th>
              <th scope="col" className={`${th} text-left`}>
                Tým
              </th>
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
              <th
                scope="col"
                className={`${th} pr-4 text-pink`}
                title="Body"
              >
                B
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const us = r.team === ourTeam;
              return (
                <tr
                  key={r.team}
                  className={`border-b border-line/70 last:border-0 transition-colors ${
                    us ? "bg-pink/10" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <td className="px-2 py-4 text-center">
                    <span
                      className={`cond inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${
                        us ? "bg-pink text-ink" : "text-muted"
                      }`}
                    >
                      {r.rank}
                    </span>
                  </td>
                  <th
                    scope="row"
                    className={`cond px-2 py-4 text-left text-[0.95rem] font-semibold ${
                      us ? "text-pink" : "text-chalk"
                    }`}
                  >
                    {r.team}
                  </th>
                  <td className="px-2 py-4 text-center text-muted">
                    {r.games}
                  </td>
                  <td className="px-2 py-4 text-center text-muted">{r.wins}</td>
                  <td className="px-2 py-4 text-center text-muted">
                    {r.draws}
                  </td>
                  <td className="px-2 py-4 text-center text-muted">
                    {r.losses}
                  </td>
                  <td className="cond px-2 py-4 text-center text-chalk">
                    {r.goalsFor}:{r.goalsAgainst}
                  </td>
                  <td
                    className={`cond px-2 py-4 pr-4 text-center text-base font-bold ${
                      us ? "text-pink" : "text-chalk"
                    }`}
                  >
                    {r.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!compact && (
        <p className="border-t border-line px-4 py-4 text-xs text-muted">
          {standings.league} · sezóna {standings.season} · aktualizováno{" "}
          {formatDate(standings.updated)}
        </p>
      )}
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-white/5 px-1.5 py-0.5 text-chalk">
      {children}
    </code>
  );
}
