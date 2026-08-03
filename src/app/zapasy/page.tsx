import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import Reveal from "@/components/Reveal";
import MatchRow, { FormStrip, MONTHS_SHORT } from "@/components/MatchRow";
import NextMatchCard from "@/components/NextMatchCard";
import {
  IconArrowRight,
  IconAway,
  IconCalendar,
  IconClock,
  IconHome,
} from "@/components/Icons";
import {
  getForm,
  getSeasonStats,
  nextMatch,
  playedMatches,
  splitDate,
  upcomingMatches,
} from "@/data/matches";

export const metadata: Metadata = {
  title: "Zápasy",
  description:
    "Program a výsledky zápasů týmu Raccoons Hlinsko včetně střelců a bilance sezóny.",
};

export default function ZapasyPage() {
  const stats = getSeasonStats();
  const form = getForm(5);
  const later = upcomingMatches.slice(1);

  return (
    <>
      <PageHero
        eyebrow="Zápasy"
        title={
          <>
            Program a <span className="text-pink">výsledky</span>
          </>
        }
        lead="Nadcházející termíny i odehraná utkání se skóre a střelci."
        aside={
          form.length > 0 ? (
            <div className="card px-6 py-5">
              <p className="cond text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Forma · poslední zápasy
              </p>
              <div className="mt-3">
                <FormStrip form={form} />
              </div>
            </div>
          ) : undefined
        }
      />

      {/* Bilance */}
      <section className="wrap py-14 sm:py-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-6">
            <Cell label="Zápasů" value={stats.played} />
            <Cell label="Výher" value={stats.wins} accent />
            <Cell label="Remíz" value={stats.draws} />
            <Cell label="Proher" value={stats.losses} />
            <Cell
              label="Skóre"
              value={`${stats.goalsFor}:${stats.goalsAgainst}`}
            />
            <Cell label="Úspěšnost" value={`${stats.winRate} %`} accent />
          </div>
        </Reveal>

        <Reveal className="mt-4">
          <Link
            href="/tabulka"
            className="cond group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-chalk transition-colors hover:text-pink"
          >
            Tabulka soutěže
            <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      {/* Nadcházející */}
      <section className="border-y border-line bg-ink-2 py-16 sm:py-20">
        <div className="wrap">
          <h2 className="display text-3xl text-chalk sm:text-4xl">
            Nadcházející <span className="text-pink">zápasy</span>
          </h2>

          {nextMatch ? (
            <>
              <Reveal className="mt-8">
                <NextMatchCard match={nextMatch} />
              </Reveal>

              {later.length > 0 && (
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {later.map((m, i) => {
                    const { day, month } = splitDate(m.date);
                    return (
                      <Reveal
                        as="li"
                        key={`${m.date}-${m.opponent}`}
                        delay={i * 60}
                      >
                        <div className="card card-hover flex h-full items-center gap-5 p-5">
                          <div className="w-12 shrink-0 text-center">
                            <p className="display text-2xl leading-none text-chalk">
                              {Number(day)}
                            </p>
                            <p className="cond mt-1 text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                              {MONTHS_SHORT[Number(month) - 1]}
                            </p>
                          </div>
                          <div className="min-w-0">
                            <p className="cond flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted">
                              {m.home ? (
                                <IconHome className="h-3 w-3" />
                              ) : (
                                <IconAway className="h-3 w-3" />
                              )}
                              {m.home ? "Doma" : "Venku"}
                              {m.time && (
                                <>
                                  <IconClock className="ml-1 h-3 w-3" />
                                  {m.time}
                                </>
                              )}
                            </p>
                            <p className="display mt-1 truncate text-lg text-chalk">
                              {m.opponent}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </ul>
              )}
            </>
          ) : (
            <Reveal className="mt-8">
              <div className="card flex flex-col items-start gap-3 p-8">
                <IconCalendar className="h-6 w-6 text-pink" />
                <p className="display text-2xl text-chalk">
                  Žádný termín v plánu
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  Jakmile se domluví další zápas, objeví se tady.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <SectionDivider from="dark" to="light" />

      {/* Odehrané – světlá sekce */}
      <section className="section-light">
        <div className="wrap py-16 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="display text-3xl text-chalk sm:text-4xl">
            Odehrané <span className="text-pink">zápasy</span>
          </h2>
          <p className="cond text-xs uppercase tracking-[0.16em] text-muted">
            Doma {playedMatches.filter((m) => m.home).length} · venku{" "}
            {playedMatches.filter((m) => !m.home).length}
          </p>
        </div>

        {playedMatches.length > 0 ? (
          <ul className="mt-8 space-y-4">
            {playedMatches.map((m, i) => (
              <Reveal
                as="li"
                key={`${m.date}-${m.opponent}`}
                delay={Math.min(i, 6) * 50}
              >
                <MatchRow match={m} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-8">
            <div className="card flex flex-col items-start gap-3 p-8">
              <IconCalendar className="h-6 w-6 text-pink" />
              <p className="display text-2xl text-chalk">Zatím bez zápasu</p>
              <p className="text-sm leading-relaxed text-muted">
                První výsledek se tu objeví po odehraném utkání.
              </p>
            </div>
          </Reveal>
        )}
        </div>
      </section>
    </>
  );
}

function Cell({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="bg-ink px-5 py-6">
      <p
        className={`display text-4xl sm:text-5xl ${
          accent ? "text-pink" : "text-chalk"
        }`}
      >
        {value}
      </p>
      <p className="cond mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
    </div>
  );
}
