import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ScoringTable from "@/components/ScoringTable";
import SectionDivider from "@/components/SectionDivider";
import {
  hasAnyStats,
  positionPlural,
  rosterSize,
  usedPositions,
} from "@/data/players";
import { standings } from "@/data/standings";

export const metadata: Metadata = {
  title: "Kanadské bodování",
  description:
    "Kanadské bodování hráčů Raccoons Hlinsko po formacích: brankáři, obránci a útočníci, sezóna 2026/2027.",
};

export default function BodovaniPage() {
  const positions = usedPositions();
  const started = hasAnyStats();

  return (
    <>
      <PageHero
        eyebrow={`Statistiky · ${standings.season}`}
        title={
          <>
            Kanadské <span className="text-pink">bodování</span>
          </>
        }
        lead="Góly, asistence a body po formacích. Doplňujeme po každém odehraném zápase."
        aside={
          <div className="card px-6 py-5">
            <p className="cond text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Sezóna
            </p>
            <p className="display mt-2 text-4xl leading-none text-chalk">
              {standings.season}
            </p>
            <p className="mt-2 text-sm text-muted">
              {rosterSize} hráčů na soupisce
            </p>
          </div>
        }
      />

      <SectionDivider from="dark" to="light" />

      <section className="section-light">
        <div className="wrap py-16 sm:py-20">
          {!started && (
            <p className="mb-8 text-sm text-muted">
              Sezóna ještě nezačala, všichni jsou na nule. Body se doplňují
              u hráčů v{" "}
              <code className="rounded bg-[var(--tint,rgb(255_255_255/0.06))] px-1.5 py-0.5 text-chalk">
                src/data/players.ts
              </code>
              .
            </p>
          )}

          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {positions.map((position, i) => (
              <Reveal key={position} delay={i * 70}>
                <div className="flex items-baseline gap-4">
                  <h2 className="display text-2xl text-chalk sm:text-3xl">
                    {positionPlural[position]}
                  </h2>
                  <span aria-hidden className="h-px flex-1 bg-line" />
                </div>
                <div className="mt-5">
                  <ScoringTable position={position} />
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      <SectionDivider from="light" to="dark" variant="wave" />
    </>
  );
}
