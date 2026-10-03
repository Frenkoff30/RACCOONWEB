import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/team";

/** Všechny veřejné stránky webu. Novou stránku sem přidej i sem. */
const routes = [
  { path: "", priority: 1 },
  { path: "/aktuality", priority: 0.9 },
  { path: "/tym", priority: 0.8 },
  { path: "/zapasy", priority: 0.8 },
  { path: "/tabulka", priority: 0.7 },
  { path: "/bodovani", priority: 0.7 },
  { path: "/galerie", priority: 0.6 },
  { path: "/obchod", priority: 0.5 },
  { path: "/kontakt", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority,
  }));
}
