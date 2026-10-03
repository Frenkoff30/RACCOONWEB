import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { formatDate, getSeasonStats, playedMatches } from "@/data/matches";

export const alt = "Raccoons Hlinsko - hobby hokejovy tym";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const last = playedMatches[0];
  const stats = getSeasonStats();

  const detail = last
    ? `${formatDate(last.date)} · Raccoons ${last.scoreUs}:${last.scoreThem} ${last.opponent}`
    : `Sezóna začíná · ${stats.played} odehraných zápasů`;

  return ogImage({
    eyebrow: "Hokej",
    title: "Mývalí hokej z Hlinska",
    detail,
  });
}
