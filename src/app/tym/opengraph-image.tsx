import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { rosterSize } from "@/data/players";

export const alt = "Soupiska tymu Raccoons Hlinsko";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({
    eyebrow: "Soupiska",
    title: "Kdo za nás hraje",
    detail: `${rosterSize} hráčů · brankáři, obránci, útočníci`,
  });
}
