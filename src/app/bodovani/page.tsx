import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScoringBoard from "@/components/ScoringBoard";
import RecordsBoard from "@/components/RecordsBoard";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "Bodování a rekordy",
  description:
    "Kanadské bodování hráčů Raccoons Hlinsko po sezónách i dohromady, klubové rekordy, nejlepší sezóny jednotlivců a umístění týmu po ročnících.",
};

export default function BodovaniPage() {
  return (
    <>
      <PageHero
        eyebrow="Statistiky"
        title={
          <>
            Bodování a <span className="text-pink">rekordy</span>
          </>
        }
      />

      <SectionDivider from="dark" to="light" />

      <section className="section-light">
        <div className="wrap py-16 sm:py-20">
          <ScoringBoard />
        </div>
      </section>

      <SectionDivider from="light" to="dark" variant="wave" />

      <RecordsBoard />
    </>
  );
}
