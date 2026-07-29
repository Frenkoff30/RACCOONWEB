import { fullName, playerKey, points, scoringTable } from "@/data/players";

export default function ScoringTable({ limit }: { limit?: number }) {
  const all = scoringTable();
  const rows = limit ? all.slice(0, limit) : all;

  if (rows.length === 0) {
    return (
      <div className="card p-8">
        <p className="display text-2xl text-chalk">Body zatím nevedeme</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Doplň hráčům <Code>goals</Code> a <Code>assists</Code> v{" "}
          <Code>src/data/players.ts</Code> a tabulka se vykreslí sama i
          s pořadím.
        </p>
      </div>
    );
  }

  const th =
    "cond px-2 py-4 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted";

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[440px] text-sm">
          <caption className="sr-only">
            Kanadské bodování – góly, asistence a body jednotlivých hráčů
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={`${th} w-10 text-left`}>
                #
              </th>
              <th scope="col" className={`${th} text-left`}>
                Hráč
              </th>
              <th scope="col" className={th} title="Odehrané zápasy">
                Z
              </th>
              <th scope="col" className={th} title="Góly">
                G
              </th>
              <th scope="col" className={th} title="Asistence">
                A
              </th>
              <th scope="col" className={`${th} pr-4 text-pink`} title="Body">
                B
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p, i) => (
              <tr
                key={playerKey(p)}
                className="border-b border-line/70 transition-colors last:border-0 hover:bg-white/[0.02]"
              >
                <td className="cond px-2 py-4 text-center text-xs text-muted">
                  {i + 1}
                </td>
                <th scope="row" className="px-2 py-4 text-left font-normal">
                  <span className="jersey mr-2 inline-block text-sm text-pink">
                    {p.number}
                  </span>
                  <span className="text-chalk">{fullName(p)}</span>
                </th>
                <td className="px-2 py-4 text-center text-muted">
                  {p.games ?? "–"}
                </td>
                <td className="px-2 py-4 text-center text-muted">
                  {p.goals ?? 0}
                </td>
                <td className="px-2 py-4 text-center text-muted">
                  {p.assists ?? 0}
                </td>
                <td className="cond px-2 py-4 pr-4 text-center text-base font-bold text-pink">
                  {points(p)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {limit && all.length > limit && (
        <p className="border-t border-line px-4 py-4 text-xs text-muted">
          Zobrazeno {limit} z {all.length} hráčů se zapsanými body.
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
