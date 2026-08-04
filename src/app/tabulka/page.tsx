import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import StandingsBoard from "@/components/StandingsBoard";
import SectionDivider from "@/components/SectionDivider";
import { IconArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Tabulka soutěže",
  description:
    "Tabulka LNH Hlinsko po sezónách s postavením týmu Raccoons Hlinsko.",
};

export default function TabulkaPage() {
  return (
    <>
      <PageHero
        eyebrow="NHL Hlinsko"
        title={
          <>
            Tabulka <span className="text-pink">soutěže</span>
          </>
        }
      />

      <SectionDivider from="dark" to="light" />

      <section className="section-light">
        <div className="wrap py-16 sm:py-20">
          <StandingsBoard />

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
