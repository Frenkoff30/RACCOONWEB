import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Loga vykreslujeme přes <img>, next/image tak zpracovává jen fotky.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
