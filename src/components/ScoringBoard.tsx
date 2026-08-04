"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import ScoringTable from "./ScoringTable";
import SeasonSelect from "./SeasonSelect";
import {
  SEASONS,
  TOTAL_KEY,
  positionPlural,
  usedPositions,
  type ScoringView,
} from "@/data/players";

/** Pořadí přepínače: všechny sezóny (i aktuální) → Dohromady na konci. */
const VIEWS: ScoringView[] = [...SEASONS, TOTAL_KEY];

export default function ScoringBoard() {
  const [view, setView] = useState<ScoringView>(TOTAL_KEY);
  const positions = usedPositions();

  return (
    <>
      <SeasonSelect views={VIEWS} active={view} onChange={setView} />

      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {positions.map((position, i) => (
          <Reveal key={`${view}-${position}`} delay={i * 70}>
            <div className="flex items-baseline gap-4">
              <h2 className="display text-2xl text-chalk sm:text-3xl">
                {positionPlural[position]}
              </h2>
              <span aria-hidden className="h-px flex-1 bg-line" />
            </div>
            <div className="mt-5">
              <ScoringTable view={view} position={position} />
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
