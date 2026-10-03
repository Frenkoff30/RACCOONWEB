import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { formatDate, getSeasonStats, nextMatch } from "@/data/matches";

export const alt = "Program a vysledky zapasu Raccoons Hlinsko";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const stats = getSeasonStats();

  const detail = nextMatch
    ? `Další: ${nextMatch.opponent} · ${formatDate(nextMatch.date)}`
    : `${stats.played} zápasů · ${stats.wins}–${stats.draws}–${stats.losses}`;

  return ogImage({ eyebrow: "Zápasy", title: "Program a výsledky", detail });
}
