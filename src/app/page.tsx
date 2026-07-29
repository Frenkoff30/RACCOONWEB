import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import NextMatchCard from "@/components/NextMatchCard";
import MatchRow, { MONTHS_SHORT } from "@/components/MatchRow";
import StandingsTable from "@/components/StandingsTable";
import ScoringTable from "@/components/ScoringTable";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconAway,
  IconClock,
  IconHome,
} from "@/components/Icons";
import { playedMatches, splitDate, upcomingMatches } from "@/data/matches";
import { positionPlural, rosterByPosition, rosterSize } from "@/data/players";
import { standings } from "@/data/standings";
import { galleryItems } from "@/data/gallery";
import { team } from "@/data/team";

export default function Home() {
  const recent = playedMatches.slice(0, 3);
  const nextUp = upcomingMatches[0];
  const later = upcomingMatches.slice(1, 4);
  const { groups } = rosterByPosition();
  const preview = galleryItems.slice(0, 3);

  return (
    <>
      <Hero />

      <Ticker items={team.ticker} />

      {/* ---------------------------------------------------------- */}
      {/* O nás                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="wrap overflow-hidden py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="cond text-xs font-semibold tracking-[0.2em] text-pink">
                01
              </span>
              <span aria-hidden className="h-px w-10 bg-line" />
              <span className="eyebrow text-muted">O nás</span>
            </div>
            <h2 className="display mt-6 text-4xl text-chalk sm:text-5xl lg:text-[3.5rem]">
              Hobby hokej v <span className="text-pink">Hlinsku</span>
            </h2>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-muted">
              {team.about}
            </p>

            {team.social.instagram && (
              <a
                href={team.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="cond group mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-chalk transition-colors hover:text-pink"
              >
                {team.social.instagramHandle}
                <IconArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </Reveal>

          <Reveal delay={80}>
            <div className="card relative h-full p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -right-10 w-44 opacity-[0.05]"
              >
                <Logo className="w-full" />
              </div>

              <p className="eyebrow relative text-muted">Tým v číslech</p>
              <dl className="relative mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
                <Fact label="Hráčů" value={String(rosterSize)} />
                {groups.map((g) => (
                  <Fact
                    key={g.position}
                    label={positionPlural[g.position]}
                    value={String(g.players.length)}
                  />
                ))}
              </dl>

              <dl className="relative mt-8 space-y-4 border-t border-line pt-6">
                <Row label="Stadion" value={team.rink} />
                <Row label="Trénink" value={team.trainingSlot} />
                {team.founded && (
                  <Row label="Založeno" value={String(team.founded)} />
                )}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Nejbližší zápas                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="border-y border-line bg-ink-2 py-24 sm:py-32">
        <div className="wrap">
          <SectionHead
            index={2}
          eyebrow="Program"
            title={
              <>
                Nejbližší <span className="text-pink">zápas</span>
              </>
            }
            action={{ href: "/zapasy", label: "Všechny termíny" }}
          />

          <div className="mt-12">
            {nextUp ? (
              <Reveal>
                <NextMatchCard match={nextUp} />
              </Reveal>
            ) : (
              <Reveal>
                <div className="card p-9">
                  <p className="display text-3xl text-chalk">
                    Termín zatím nemáme
                  </p>
                  <p className="mt-3 max-w-md text-muted">
                    Jakmile se domluví další zápas, objeví se tady.
                  </p>
                </div>
              </Reveal>
            )}

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
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Poslední zápasy                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="wrap py-24 sm:py-32">
        <SectionHead
          index={3}
          eyebrow="Výsledky"
          title={
            <>
              Poslední <span className="text-pink">zápasy</span>
            </>
          }
          action={{ href: "/zapasy", label: "Kompletní přehled" }}
        />

        {recent.length > 0 ? (
          <ul className="mt-12 space-y-4">
            {recent.map((m, i) => (
              <Reveal as="li" key={`${m.date}-${m.opponent}`} delay={i * 60}>
                <MatchRow match={m} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-12">
            <div className="card p-8">
              <p className="display text-2xl text-chalk">Zatím bez zápasu</p>
              <p className="mt-3 text-sm text-muted">
                První výsledek se tu objeví po odehraném utkání.
              </p>
            </div>
          </Reveal>
        )}
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Tabulka                                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="border-y border-line bg-ink-2 py-24 sm:py-32">
        <div className="wrap">
          <SectionHead
            index={4}
            eyebrow={`${standings.league} · ${standings.season}`}
            title={
              <>
                Tabulka <span className="text-pink">soutěže</span>
              </>
            }
            action={{ href: "/tabulka", label: "Detail tabulky" }}
          />
          <Reveal className="mt-12">
            <StandingsTable />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Kanadské bodování                                           */}
      {/* ---------------------------------------------------------- */}
      <section className="wrap py-24 sm:py-32">
        <SectionHead
          index={5}
          eyebrow="Statistiky"
          title={
            <>
              Kanadské <span className="text-pink">bodování</span>
            </>
          }
          action={{ href: "/tabulka", label: "Celé pořadí" }}
        />
        <Reveal className="mt-12">
          <ScoringTable limit={8} />
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Galerie                                                     */}
      {/* ---------------------------------------------------------- */}
      {preview.length > 0 && (
        <section className="border-t border-line bg-ink-2 py-24 sm:py-32">
          <div className="wrap">
            <SectionHead
              index={6}
              eyebrow="Galerie"
              title={
                <>
                  Fotky <span className="text-pink">z ledu</span>
                </>
              }
              action={{ href: "/galerie", label: "Celá galerie" }}
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {preview.map((item, i) => (
                <Reveal key={item.src} delay={i * 70}>
                  <Link
                    href="/galerie"
                    className="card card-hover group relative flex aspect-[4/3] items-center justify-center"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
                      className={`transition-transform duration-500 group-hover:scale-[1.04] ${
                        item.fit === "contain"
                          ? "object-contain p-10"
                          : "object-cover"
                      }`}
                    />
                    <span className="absolute bottom-4 left-5 right-5 flex items-center justify-between gap-3">
                      <span className="cond truncate text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        {item.caption ?? item.alt}
                      </span>
                      <IconArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-pink" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- */}
      {/* Obchod                                                      */}
      {/* ---------------------------------------------------------- */}
      <section className="wrap py-24 sm:py-32">
        <Reveal>
          <div className="card relative overflow-hidden">
            <div aria-hidden className="hairline absolute inset-x-0 top-0" />
            <div
              aria-hidden
              className="glow absolute -right-24 top-0 h-72 w-96"
            />
            <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="flex items-center gap-4">
                  <span className="cond text-xs font-semibold tracking-[0.2em] text-pink">
                    07
                  </span>
                  <span aria-hidden className="h-px w-10 bg-line" />
                  <span className="eyebrow text-muted">Obchod</span>
                </div>
                <h2 className="display mt-6 text-4xl text-chalk sm:text-5xl">
                  Klubový <span className="text-pink">merch</span>
                </h2>
                <p className="mt-5 max-w-lg text-muted">
                  Mikiny, trika, čepice a samolepky s myvalem. Zatím to
                  chystáme – mrkni, co bude v nabídce.
                </p>
              </div>
              <Button
                href="/obchod"
                size="lg"
                icon={
                  <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                }
              >
                Do obchodu
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ----------------------------- dílčí kusy ----------------------------- */

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="cond text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </dt>
      <dd className="display mt-1.5 text-3xl text-chalk">{value}</dd>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="cond text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </dt>
      <dd className="text-right text-[0.95rem] text-chalk">{value}</dd>
    </div>
  );
}
