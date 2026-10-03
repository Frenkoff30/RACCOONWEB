import type { Metadata, Viewport } from "next";
import { Anton, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { siteUrl, team } from "@/data/team";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  /**
   * "./" se přeloží na aktuální cestu nad `metadataBase`, takže každá stránka
   * dostane kanonický odkaz na ostrou doménu. Bez toho Google indexuje
   * náhledovou adresu *.vercel.app, protože ji považuje za samostatný web.
   */
  alternates: { canonical: "./" },
  title: {
    default: team.tagline ? `${team.name} | ${team.tagline}` : team.fullName,
    template: `%s | ${team.name}`,
  },
  description:
    "Raccoons Hlinsko. Hobby hokejový tým. Soupiska, výsledky, tabulka soutěže, kanadské bodování a galerie.",
  keywords: [
    "hobby hokej",
    "hokejový tým",
    "Raccoons Hlinsko",
    "Hlinsko hokej",
    "amatérský hokej",
    "soupiska",
  ],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: team.name,
    url: "./",
    title: team.tagline ? `${team.name} | ${team.tagline}` : team.fullName,
    description: team.claim,
    /**
     * Náhledový obrázek se negeneruje tady, ale souborem `opengraph-image.tsx`
     * – v kořeni pro celý web a ve složkách jednotlivých stránek pro jejich
     * vlastní verzi. Kdyby se sem `images` vrátilo natvrdo, přebilo by je.
     */
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="cs"
      className={`${anton.variable} ${barlowCondensed.variable} ${barlow.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-ink text-chalk antialiased">
        <div className="grain" aria-hidden="true" />
        <ScrollProgress />
        <Navbar />
        <main id="obsah" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
