import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import {
  CURRENT_STANDINGS_SEASON,
  getSeasonStandings,
  getStandings,
  ourTeam,
} from "@/data/standings";

export const alt = "Tabulka souteze Raccoons Hlinsko";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const data = getSeasonStandings(CURRENT_STANDINGS_SEASON);
  const us = getStandings(data.rows).find((r) => r.team === ourTeam);

  return ogImage({
    eyebrow: "Soutěž",
    title: "Tabulka soutěže",
    detail: us?.games
      ? `${data.league} · ${us.rank}. místo`
      : `${data.league} · sezóna ${data.season}`,
  });
}
