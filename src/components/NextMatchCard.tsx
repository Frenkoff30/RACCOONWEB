import { formatDate, formatWeekday, type Match } from "@/data/matches";
import { IconAway, IconCalendar, IconClock, IconHome, IconPin } from "./Icons";
import Logo from "./Logo";

export default function NextMatchCard({ match }: { match: Match }) {
  const meta = [
    { Icon: IconCalendar, label: formatDate(match.date) },
    match.time ? { Icon: IconClock, label: match.time } : null,
    match.venue ? { Icon: IconPin, label: match.venue } : null,
  ].filter(Boolean) as { Icon: typeof IconPin; label: string }[];

  return (
    <article className="card relative overflow-hidden p-7 sm:p-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-6 w-44 opacity-[0.06] sm:w-56"
      >
        <Logo className="w-full" />
      </div>

      <div className="relative">
        <p className="eyebrow flex items-center gap-2 text-pink">
          <span className="relative flex h-2 w-2">
            <span className="breathe absolute inline-flex h-full w-full rounded-full bg-pink" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-pink" />
          </span>
          Nejbližší zápas
        </p>

        <p className="cond mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          {formatWeekday(match.date)}
        </p>

        <h3 className="display mt-2 text-4xl text-chalk sm:text-5xl lg:text-6xl">
          Raccoons <span className="text-pink">vs</span>{" "}
          <br className="hidden sm:block" />
          {match.opponent}
        </h3>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="cond inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-chalk">
            {match.home ? (
              <IconHome className="h-4 w-4 text-pink" />
            ) : (
              <IconAway className="h-4 w-4 text-pink" />
            )}
            {match.home ? "Domácí" : "Venkovní"}
          </span>

          {meta.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 text-[0.95rem] text-muted"
            >
              <Icon className="h-4 w-4 text-pink" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
