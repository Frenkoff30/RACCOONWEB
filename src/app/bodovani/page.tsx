import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScoringBoard from "@/components/ScoringBoard";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "Kanadské bodování",
  description:
    "Kanadské bodování hráčů Raccoons Hlinsko po sezónách i dohromady – brankáři, obránci a útočníci.",
};

export default function BodovaniPage() {
  return (
    <>
      <PageHero
        eyebrow="Statistiky"
        title={
          <>
            Kanadské <span className="text-pink">bodování</span>
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
    </>
  );
}
