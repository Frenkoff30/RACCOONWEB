import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import StandingsTable from "@/components/StandingsTable";
import SectionDivider from "@/components/SectionDivider";
import { IconArrowRight } from "@/components/Icons";
import { ourPosition, pointsRule, standings } from "@/data/standings";

export const metadata: Metadata = {
  title: "Tabulka soutěže",
  description:
    "Tabulka hobby ligy pro sezónu 2026/2027 s postavením týmu Raccoons Hlinsko.",
};

export default function TabulkaPage() {
  const us = ourPosition();

  return (
    <>
      <PageHero
        eyebrow={`${standings.league} · ${standings.season}`}
        title={
          <>
            Tabulka <span className="text-pink">soutěže</span>
          </>
        }
        lead="Postavení všech týmů v soutěži. Aktualizujeme po každém odehraném kole."
        aside={
          us ? (
            <div className="card px-6 py-5">
              <p className="cond text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Naše místo
              </p>
              <div className="mt-3 flex items-end gap-4">
                <p className="display text-5xl leading-none text-pink">
                  {us.rank}.
                </p>
                <p className="cond pb-1 text-sm text-muted">
                  z {standings.rows.length} týmů
                  <span className="mt-0.5 block text-chalk">
                    {us.points ?? 0} bodů
                  </span>
                </p>
              </div>
            </div>
          ) : undefined
        }
      />

      <SectionDivider from="dark" to="light" />

      <section className="section-light">
        <div className="wrap py-16 sm:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="cond text-xs uppercase tracking-[0.16em] text-muted">
              {standings.rows.length} týmů · sezóna {standings.season}
            </p>
            <p className="cond text-xs uppercase tracking-[0.16em] text-muted">
              Výhra {pointsRule.win} b · remíza {pointsRule.draw} b · prohra{" "}
              {pointsRule.loss} b
            </p>
          </div>

          <Reveal className="mt-6">
            <StandingsTable />
          </Reveal>

          <Reveal className="mt-10">
            <Link
              href="/bodovani"
              className="cond group inline-flex items-center gap-2 border-b border-line pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-chalk transition-colors hover:border-pink hover:text-pink"
            >
              Kanadské bodování hráčů
              <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SectionDivider from="light" to="dark" variant="wave" />
    </>
  );
}
