import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import RosterGrid from "@/components/RosterGrid";
import { roster, usedPositions } from "@/data/players";

export const metadata: Metadata = {
  title: "Soupiska",
  description:
    "Soupiska hobby hokejového týmu Raccoons Hlinsko: brankáři, obránci a útočníci s čísly dresů.",
};

export default function TymPage() {
  const positions = usedPositions();

  return (
    <>
      <PageHero
        eyebrow="Soupiska"
        title={
          <>
            Kdo za nás <span className="text-pink">jezdí</span>
          </>
        }
      />

      <section className="wrap py-16 sm:py-20">
        <RosterGrid players={roster} positions={positions} />
      </section>
    </>
  );
}
