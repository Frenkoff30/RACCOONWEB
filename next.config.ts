import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Loga vykreslujeme přes <img>, next/image tak zpracovává jen fotky.
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      /**
       * Web běží i na raccoonweb.vercel.app, což Google bere jako samostatnou
       * stránku a indexuje ji místo ostré domény. Trvalé přesměrování ji sloučí
       * s www.raccoonshlinsko.cz a z výsledků hledání časem zmizí.
       */
      {
        source: "/:path*",
        has: [{ type: "host", value: "raccoonweb.vercel.app" }],
        destination: "https://www.raccoonshlinsko.cz/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
