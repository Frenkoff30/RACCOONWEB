import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/team";

/**
 * Náhledové deploye (větve, pull requesty) z hledání schováme, ať se místo
 * ostrého webu neindexují rozpracované verze. Ostrou doménu necháme volnou.
 *
 * Adresu raccoonweb.vercel.app tu neřešíme – ta se trvale přesměrovává
 * na ostrou doménu v next.config.ts.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
