import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import StandingsTable from "@/components/StandingsTable";
import ScoringTable from "@/components/ScoringTable";
import { FormStrip } from "@/components/MatchRow";
import { IconTrophy } from "@/components/Icons";
import { getForm } from "@/data/matches";
import { getStandings, ourPosition, pointsRule, standings } from "@/data/standings";
import { scoringTable } from "@/data/players";

export const metadata: Metadata = {
  title: "Tabulka a bodování",
  description:
    "Tabulka soutěže a kanadské bodování hráčů týmu Raccoons Hlinsko.",
};

export default function TabulkaPage() {
  const us = ourPosition();
  const rows = getStandings();
  const scorers = scoringTable();
  const form = getForm(5);

  return (
    <>
      <PageHero
        eyebrow={`${standings.league} · ${standings.season}`}
        title={
          <>
            Tabulka a <span className="text-pink">bodování</span>
          </>
        }
        lead="Postavení v soutěži a body jednotlivých hráčů. Aktualizujeme po každém odehraném kole."
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
                  z {rows.length} týmů
                  <span className="mt-0.5 block text-chalk">
                    {us.points} bodů
                  </span>
                </p>
              </div>
              {form.length > 0 && (
                <div className="mt-4 border-t border-line pt-4">
                  <p className="cond text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
                    Forma
                  </p>
                  <div className="mt-2">
                    <FormStrip form={form} />
                  </div>
                </div>
              )}
            </div>
          ) : undefined
        }
      />

      {/* Tabulka soutěže */}
      <section className="wrap py-16 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="display text-3xl text-chalk sm:text-4xl">
            Tabulka <span className="text-pink">soutěže</span>
          </h2>
          <p className="cond text-xs uppercase tracking-[0.16em] text-muted">
            Výhra {pointsRule.win} b · remíza {pointsRule.draw} b · prohra{" "}
            {pointsRule.loss} b
          </p>
        </div>

        <Reveal className="mt-8">
          <StandingsTable />
        </Reveal>
      </section>

      {/* Kanadské bodování */}
      <section className="border-t border-line bg-ink-2 py-16 sm:py-20">
        <div className="wrap">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 className="display text-3xl text-chalk sm:text-4xl">
              Kanadské <span className="text-pink">bodování</span>
            </h2>
            {scorers.length > 0 && (
              <p className="cond text-xs uppercase tracking-[0.16em] text-muted">
                {scorers.length}{" "}
                {scorers.length === 1 ? "hráč" : "hráčů"} s body
              </p>
            )}
          </div>

          <Reveal className="mt-8">
            <ScoringTable />
          </Reveal>

          <Reveal className="mt-6">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-muted">
              <IconTrophy className="mt-0.5 h-4 w-4 shrink-0 text-pink" />
              Body = góly + asistence. Při shodě rozhoduje víc vstřelených
              branek.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
