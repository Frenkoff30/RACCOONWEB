import { playedMatches, resultOf } from "@/data/matches";
import { ResultChip } from "./MatchRow";

const resultWord = { V: "výhra", R: "remíza", P: "prohra" } as const;

/**
 * Forma – posledních pár odehraných zápasů jako řada koleček.
 * Čte se zleva doprava od nejstaršího po nejnovější.
 */
export default function FormStrip({
  count = 5,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const form = playedMatches.slice(0, count).reverse();
  if (form.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      <p className="cond text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted">
        Forma
      </p>
      <ul className="flex items-center gap-1.5">
        {form.map((m) => {
          const result = resultOf(m);
          return (
            <li
              key={`${m.date}-${m.opponent}`}
              title={`${m.opponent} ${m.scoreUs}:${m.scoreThem} – ${resultWord[result]}`}
            >
              <ResultChip result={result} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
