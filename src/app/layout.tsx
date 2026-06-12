import type { Metadata } from "next";
import { Bangers, Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bangers = Bangers({
  variable: "--font-bangers",
  subsets: ["latin"],
  weight: "400",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raccoons | Hobby hokejový tým",
  description:
    "Raccoons – parta kámošů, co to na ledě hodně rádo rozdávájí. Sledujte naše výsledky, statistiky a fotky ze zápasů.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${bangers.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
