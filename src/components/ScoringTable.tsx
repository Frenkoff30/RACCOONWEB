import {
  fullName,
  playerKey,
  points,
  scoringTable,
  type Position,
} from "@/data/players";

type Props = {
  /** Zobrazit jen prvních N hráčů */
  limit?: number;
  /** Omezit na jednu formaci */
  position?: Position;
};

export default function ScoringTable({ limit, position }: Props) {
  const all = scoringTable(position);
  const rows = limit ? all.slice(0, limit) : all;

  if (rows.length === 0) {
    return (
      <div className="card p-8">
        <p className="display text-2xl text-chalk">Nikdo na soupisce</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Přidej hráče v <Code>src/data/players.ts</Code>.
        </p>
      </div>
    );
  }

  const th =
    "cond px-2 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted";

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-compact w-full min-w-[360px] text-sm">
          <caption className="sr-only">
            Kanadské bodování{position ? ` ${positionCaption(position)}` : ""}:
            góly, asistence a body jednotlivých hráčů
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={`${th} pl-4 text-left`}>
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
            {rows.map((p) => {
              const total = points(p);
              return (
                <tr
                  key={playerKey(p)}
                  className="row-hover border-b border-line/70 transition-colors last:border-0"
                >
                  <th
                    scope="row"
                    className="px-2 pl-4 text-left font-normal"
                  >
                    <span className="jersey mr-2.5 inline-block w-7 text-sm text-pink">
                      {p.number}
                    </span>
                    <span className="text-chalk">{fullName(p)}</span>
                  </th>
                  <td className="px-2 text-center text-muted">
                    {p.games ?? 0}
                  </td>
                  <td className="px-2 text-center text-muted">
                    {p.goals ?? 0}
                  </td>
                  <td className="px-2 text-center text-muted">
                    {p.assists ?? 0}
                  </td>
                  <td
                    className={`cond px-2 pr-4 text-center text-base font-bold ${
                      total > 0 ? "text-pink" : "text-muted"
                    }`}
                  >
                    {total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {limit && all.length > limit && (
        <p className="border-t border-line px-4 py-3 text-xs text-muted">
          Zobrazeno {limit} z {all.length} hráčů.
        </p>
      )}
    </div>
  );
}

function positionCaption(position: Position) {
  return position === "Brankář"
    ? "brankáři"
    : position === "Obránce"
      ? "obránci"
      : "útočníci";
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-[var(--tint,rgb(255_255_255/0.06))] px-1.5 py-0.5 text-chalk">
      {children}
    </code>
  );
}
