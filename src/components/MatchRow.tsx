import {
  resultOf,
  splitDate,
  type PlayedMatch,
  type Result,
} from "@/data/matches";
import { IconAway, IconHome } from "./Icons";

export const MONTHS_SHORT = [
  "led",
  "úno",
  "bře",
  "dub",
  "kvě",
  "čvn",
  "čvc",
  "srp",
  "zář",
  "říj",
  "lis",
  "pro",
];

const resultStyle: Record<Result, string> = {
  V: "bg-pink text-ink",
  R: "bg-white/12 text-chalk",
  P: "border border-line text-muted",
};

const resultLabel: Record<Result, string> = {
  V: "Výhra",
  R: "Remíza",
  P: "Prohra",
};

export function ResultChip({ result }: { result: Result }) {
  return (
    <span
      className={`cond inline-flex h-7 w-7 items-center justify-center rounded-full text-[0.8125rem] font-bold ${resultStyle[result]}`}
      title={resultLabel[result]}
    >
      <span aria-hidden>{result}</span>
      <span className="sr-only">{resultLabel[result]}</span>
    </span>
  );
}

export function FormStrip({ form }: { form: Result[] }) {
  if (!form.length) return null;
  return (
    <div className="flex items-center gap-1.5">
      {form.map((r, i) => (
        <ResultChip key={i} result={r} />
      ))}
    </div>
  );
}

export default function MatchRow({ match }: { match: PlayedMatch }) {
  const { day, month, year } = splitDate(match.date);
  const result = resultOf(match);

  return (
    <article className="card card-hover p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        {/* Datum */}
        <div className="w-14 shrink-0 text-center">
          <p className="display text-3xl leading-none text-chalk">
            {Number(day)}
          </p>
          <p className="cond mt-1 text-xs uppercase tracking-[0.18em] text-muted">
            {MONTHS_SHORT[Number(month) - 1]} {year.slice(2)}
          </p>
        </div>

        <span aria-hidden className="hidden h-12 w-px bg-line sm:block" />

        {/* Soupeř */}
        <div className="min-w-[190px] flex-1">
          <p className="cond flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {match.home ? (
              <IconHome className="h-3.5 w-3.5" />
            ) : (
              <IconAway className="h-3.5 w-3.5" />
            )}
            {match.home ? "Doma" : "Venku"}
            {match.overtime && (
              <span className="text-pink">· po prodloužení</span>
            )}
          </p>
          <h3 className="display mt-1.5 text-xl text-chalk sm:text-2xl">
            Raccoons <span className="text-muted">vs</span> {match.opponent}
          </h3>
        </div>

        {/* Skóre */}
        <div className="ml-auto flex items-center gap-3">
          <ResultChip result={result} />
          <p className="display text-3xl leading-none text-chalk sm:text-4xl">
            <span className={result === "V" ? "text-pink" : undefined}>
              {match.scoreUs}
            </span>
            <span className="mx-1.5 text-muted">:</span>
            {match.scoreThem}
          </p>
        </div>
      </div>

      {(match.scorers || match.note) && (
        <div className="mt-4 border-t border-line pt-4">
          {match.scorers && (
            <p className="text-[0.9rem] text-chalk">
              <span className="cond mr-2 text-xs font-semibold uppercase tracking-[0.18em] text-pink">
                Branky
              </span>
              {match.scorers}
            </p>
          )}
          {match.note && (
            <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">
              {match.note}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
