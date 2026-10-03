import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { fullName } from "@/data/players";
import { allTimeLeaders } from "@/data/stats";

export const alt = "Bodovani a rekordy Raccoons Hlinsko";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const [top] = allTimeLeaders("points", 1);

  return ogImage({
    eyebrow: "Statistiky",
    title: "Bodování a rekordy",
    detail: top
      ? `Vede ${fullName(top.player)} · ${top.value} bodů`
      : "Góly, asistence a body hráčů",
  });
}
