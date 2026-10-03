import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { formatDate } from "@/data/matches";
import { latestNews } from "@/data/news";

export const alt = "Aktuality Raccoons Hlinsko";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({
    eyebrow: "Aktuality",
    title: latestNews?.title ?? "Co je nového",
    detail: latestNews ? formatDate(latestNews.date) : undefined,
  });
}
