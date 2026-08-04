import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Button from "@/components/Button";
import NextMatchCard from "@/components/NextMatchCard";
import MatchRow, { MONTHS_SHORT } from "@/components/MatchRow";
import SectionDivider from "@/components/SectionDivider";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconAway,
  IconCalendar,
  IconClock,
  IconHome,
} from "@/components/Icons";
import { playedMatches, splitDate, upcomingMatches } from "@/data/matches";
import { standings } from "@/data/standings";
import { galleryItems } from "@/data/gallery";
import { team } from "@/data/team";

export default function Home() {
  const recent = playedMatches.slice(0, 3);
  const nextUp = upcomingMatches[0];
  const later = upcomingMatches.slice(1, 4);
  const preview = galleryItems.slice(0, 3);

  return (
    <>
      <Hero />

      <Ticker items={team.ticker} />

      {/* ---------------------------------------------------------- */}
      {/* O nás  světlá sekce                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="section-light">
        <div className="wrap overflow-hidden py-24 sm:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal className="max-w-2xl">
              <h2 className="display text-4xl text-chalk sm:text-5xl lg:text-[3.5rem]">
                RACCOONS<span className="text-pink"> Hlinsko</span>
              </h2>
              <p className="mt-7 text-[1.05rem] leading-relaxed text-muted">
                {team.about}
              </p>

              {team.social.instagram && (
                <a
                  href={team.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cond group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-chalk transition-colors hover:text-pink"
                >
                  {team.social.instagramHandle}
                  <IconArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </Reveal>

            <Reveal delay={80}>
              <Image
                src="/raccooncartoonn.png"
                alt="Maskot týmu Raccoons v dresu na ledě"
                width={1024}
                height={1536}
                sizes="(max-width: 1024px) 440px, 44vw"
                className="mx-auto h-auto w-full max-w-[440px]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider from="light" to="dark" />

      {/* ---------------------------------------------------------- */}
      {/* Nejbližší zápas                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="wrap py-24 sm:py-32">
        <SectionHead
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
              <div className="card flex flex-col items-start gap-3 p-9">
                <IconCalendar className="h-6 w-6 text-pink" />
                <p className="display text-3xl text-chalk">
                  Termín zatím nemáme
                </p>
                <p className="max-w-md text-muted">
                  Sezóna {standings.season} teprve začíná. Jakmile bude první
                  termín, objeví se tady.
                </p>
              </div>
            </Reveal>
          )}

          {later.length > 0 && (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {later.map((m, i) => {
                const { day, month } = splitDate(m.date);
                return (
                  <Reveal as="li" key={`${m.date}-${m.opponent}`} delay={i * 60}>
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
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Poslední zápasy                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-24 sm:py-32">
        <div className="wrap">
          <SectionHead
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
              <div className="card flex flex-col items-start gap-3 p-9">
                <IconCalendar className="h-6 w-6 text-pink" />
                <p className="display text-3xl text-chalk">Zatím bez zápasu</p>
                <p className="max-w-md text-muted">
                  První výsledek sezóny {standings.season} se tu objeví hned po
                  odehraném utkání.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <SectionDivider from="dark" to="light" variant="wave" />

      {/* ---------------------------------------------------------- */}
      {/* Galerie  světlá sekce                                       */}
      {/* ---------------------------------------------------------- */}
      {preview.length > 0 && (
        <section className="section-light">
          <div className="wrap py-24 sm:py-32">
            <SectionHead
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
      {/* Obchod  světlá sekce                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="section-light">
        <div className="wrap border-t border-line pb-24 pt-24 sm:pb-32">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 className="display text-4xl text-chalk sm:text-5xl lg:text-[3.5rem]">
                  Klubový <span className="text-pink">merch</span>
                </h2>
                  <p className="mt-6 max-w-lg text-muted">
                  Mikiny, trika, čepice a samolepky s myvalem. Zatím to
                  chystáme, mrkni, co bude v nabídce.
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
          </Reveal>
        </div>
      </section>

      <SectionDivider from="light" to="dark" />
    </>
  );
}
