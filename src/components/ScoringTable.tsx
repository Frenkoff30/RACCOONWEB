import {
  fullName,
  playerKey,
  type Position,
  type ScoringView,
} from "@/data/players";
import { points, scoringTable } from "@/data/stats";

type Props = {
  /** Který pohled se zobrazuje – konkrétní sezóna nebo součet. */
  view: ScoringView;
  /** Zobrazit jen prvních N hráčů */
  limit?: number;
  /** Omezit na jednu formaci */
  position?: Position;
};

export default function ScoringTable({ view, limit, position }: Props) {
  const all = scoringTable(view, position);
  const rows = limit ? all.slice(0, limit) : all;

  if (rows.length === 0) {
    return (
      <div className="card p-8">
        <p className="display text-2xl text-chalk">Zatím bez statistik</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          V téhle sezóně tu ještě nikdo nemá zapsané body.
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
            {rows.map(({ player: p, stat }) => {
              const total = points(stat);
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
                  <td className="px-2 text-center text-muted">{stat.games}</td>
                  <td className="px-2 text-center text-muted">{stat.goals}</td>
                  <td className="px-2 text-center text-muted">{stat.assists}</td>
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
