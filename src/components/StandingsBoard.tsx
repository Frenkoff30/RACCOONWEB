"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SeasonSelect from "./SeasonSelect";
import StandingsTable from "./StandingsTable";
import {
  CURRENT_STANDINGS_SEASON,
  getSeasonStandings,
  pointsRule,
  standingsSeasonKeys,
} from "@/data/standings";

export default function StandingsBoard() {
  const [season, setSeason] = useState<string>(CURRENT_STANDINGS_SEASON);
  const data = getSeasonStandings(season);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <SeasonSelect
          views={standingsSeasonKeys}
          active={season}
          onChange={setSeason}
        />
        {!data.rankOnly && (
          <p className="cond text-xs uppercase tracking-[0.16em] text-muted">
            Výhra {pointsRule.win} b · remíza {pointsRule.draw} b · prohra{" "}
            {pointsRule.loss} b
          </p>
        )}
      </div>

      {data.rankOnly && (
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Z téhle sezóny máme jen konečné pořadí týmů – kompletní statistiky se
          nedochovaly.
        </p>
      )}

      <Reveal key={season} className="mt-6">
        <StandingsTable data={data} />
      </Reveal>
    </>
  );
}
