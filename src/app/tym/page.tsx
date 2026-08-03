import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import RosterGrid from "@/components/RosterGrid";
import { IconUsers } from "@/components/Icons";
import { roster, rosterSize, usedPositions } from "@/data/players";

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
        lead="Brankáři, obránci a útočníci. Hráče najdeš i podle jména, přezdívky nebo čísla dresu."
        aside={
          <div className="card flex items-center gap-5 px-6 py-5">
            <IconUsers className="h-7 w-7 text-pink" />
            <div>
              <p className="display text-4xl leading-none text-chalk">
                {rosterSize}
              </p>
              <p className="cond mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Hráčů na soupisce
              </p>
            </div>
          </div>
        }
      />

      <section className="wrap py-16 sm:py-20">
        <RosterGrid players={roster} positions={positions} />
      </section>
    </>
  );
}
