import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ScoringTable from "@/components/ScoringTable";
import SectionDivider from "@/components/SectionDivider";
import { positionPlural, usedPositions } from "@/data/players";
import { standings } from "@/data/standings";

export const metadata: Metadata = {
  title: "Kanadské bodování",
  description:
    "Kanadské bodování hráčů Raccoons Hlinsko po formacích: brankáři, obránci a útočníci, sezóna 2026/2027.",
};

export default function BodovaniPage() {
  const positions = usedPositions();

  return (
    <>
      <PageHero
        eyebrow={`Statistiky · ${standings.season}`}
        title={
          <>
            Kanadské <span className="text-pink">bodování</span>
          </>
        }
      />

      <SectionDivider from="dark" to="light" />

      <section className="section-light">
        <div className="wrap py-16 sm:py-20">
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
