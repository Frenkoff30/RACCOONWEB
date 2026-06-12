import { matches, getStandingsSummary } from "@/data/matches";
import { players } from "@/data/players";

export default function ZapasyPage() {
  const stats = getStandingsSummary();
  const topScorers = [...players]
    .sort((a, b) => (b.goals ?? 0) + (b.assists ?? 0) - ((a.goals ?? 0) + (a.assists ?? 0)))
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl md:text-5xl text-center mb-2">
        Zápasy & <span className="text-pink">statistiky</span>
      </h1>
      <p className="text-center text-white/70 mb-10">
        Vítězství slavíme nahlas, prohry hned zapomeneme. 🏒
      </p>

      {/* Standings summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center mb-12">
        <SummaryBox label="Zápasy" value={stats.played} />
        <SummaryBox label="Výhry" value={stats.wins} accent />
        <SummaryBox label="Prohry" value={stats.losses} />
        <SummaryBox label="Remízy" value={stats.draws} />
        <SummaryBox label="Skóre" value={`${stats.goalsFor}:${stats.goalsAgainst}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Match list */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl mb-4 text-pink">Poslední zápasy</h2>
          <div className="space-y-4">
            {matches.map((m) => {
              const won = m.scoreUs > m.scoreThem;
              const draw = m.scoreUs === m.scoreThem;
              return (
                <div
                  key={`${m.date}-${m.opponent}`}
                  className="bg-graphite rounded-xl p-4 border-2 border-pink/30"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="text-sm text-white/50">
                        {new Date(m.date).toLocaleDateString("cs-CZ")} ·{" "}
                        {m.home ? "Doma" : "Venku"}
                      </p>
                      <p className="font-display text-xl">
                        Raccoons vs {m.opponent}
                      </p>
                    </div>
                    <div
                      className={`font-display text-3xl px-4 py-1 rounded-lg ${
                        won
                          ? "bg-pink text-ink"
                          : draw
                          ? "bg-white/20 text-white"
                          : "bg-white/5 text-white/70"
                      }`}
                    >
                      {m.scoreUs}:{m.scoreThem}
                    </div>
                  </div>
                  {m.scorers && (
                    <p className="text-sm text-white/70 mt-2">
                      <span className="text-pink">Branky:</span> {m.scorers}
                    </p>
                  )}
                  {m.note && (
                    <p className="text-sm text-white/50 mt-1 italic">
                      {m.note}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Top scorers */}
        <div>
          <h2 className="font-display text-2xl mb-4 text-pink">Kanadské bodování</h2>
          <div className="bg-graphite rounded-xl border-2 border-pink/30 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-pink text-ink font-display text-base">
                <tr>
                  <th className="text-left py-2 px-3">Hráč</th>
                  <th className="py-2 px-2">G</th>
                  <th className="py-2 px-2">A</th>
                  <th className="py-2 px-2">B</th>
                </tr>
              </thead>
              <tbody>
                {topScorers.map((p) => (
                  <tr key={p.number} className="border-t border-white/10">
                    <td className="py-2 px-3">
                      #{p.number} {p.name}
                    </td>
                    <td className="text-center py-2 px-2">{p.goals ?? 0}</td>
                    <td className="text-center py-2 px-2">{p.assists ?? 0}</td>
                    <td className="text-center py-2 px-2 text-pink font-bold">
                      {(p.goals ?? 0) + (p.assists ?? 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryBox({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="bg-graphite rounded-xl p-4 border-2 border-pink/30">
      <p
        className={`font-display text-3xl md:text-4xl ${
          accent ? "text-pink" : "text-white"
        }`}
      >
        {value}
      </p>
      <p className="text-sm text-white/60 mt-1">{label}</p>
    </div>
  );
}
