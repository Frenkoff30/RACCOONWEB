/* -------------------------------------------------------------------------
   NÁHLEDOVÉ OBRÁZKY PRO SDÍLENÍ (Open Graph)

   Tohle je obrázek, který se ukáže, když někdo hodí odkaz na web do chatu,
   na Instagram nebo na Facebook. Generuje se z kódu, takže se obsah drží
   aktuálních dat – není to statická fotka, kterou by bylo potřeba
   překreslovat po každém zápase.

   Stránka si ho vyžádá souborem `opengraph-image.tsx` ve své složce.
   ------------------------------------------------------------------------- */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#08080a";
const CHALK = "#f4f4f6";
const MUTED = "#9b9baa";
const PINK = "#ff2e7e";
const LINE = "#272730";

/** Fonty se čtou z `assets/`, aby build nezávisel na síti. */
async function brandFonts() {
  const [anton, barlow] = await Promise.all([
    readFile(join(process.cwd(), "assets", "Anton-Regular.ttf")),
    readFile(join(process.cwd(), "assets", "BarlowCondensed-SemiBold.ttf")),
  ]);

  return [
    { name: "Anton", data: anton, weight: 400 as const, style: "normal" as const },
    { name: "Barlow", data: barlow, weight: 600 as const, style: "normal" as const },
  ];
}

/** Šikmé růžovo-bílé pruhy, stejné jako v hlavičce webu. */
function BrandBars() {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {[PINK, CHALK, PINK, LINE, PINK].map((color, i) => (
        <div
          key={i}
          style={{
            width: i === 0 ? 120 : 46,
            height: 12,
            backgroundColor: color,
            transform: "skewX(-20deg)",
          }}
        />
      ))}
    </div>
  );
}

type Props = {
  /** Malý popisek nad nadpisem, např. "Zápasy". */
  eyebrow: string;
  /** Hlavní nadpis – drž ho krátký, ať se vejde na dva řádky. */
  title: string;
  /** Řádek pod nadpisem, např. výsledek posledního zápasu. */
  detail?: string;
};

export async function ogImage({ eyebrow, title, detail }: Props) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          padding: "72px 80px",
          fontFamily: "Barlow",
        }}
      >
        {/* Horní lišta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Raccoons Hlinsko
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: PINK,
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Nadpis */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <BrandBars />
          <div
            style={{
              display: "flex",
              marginTop: 38,
              fontFamily: "Anton",
              fontSize: title.length > 34 ? 86 : 112,
              lineHeight: 1.02,
              color: CHALK,
              textTransform: "uppercase",
            }}
          >
            {title}
          </div>
          {detail && (
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: 36,
                letterSpacing: 2,
                color: MUTED,
              }}
            >
              {detail}
            </div>
          )}
        </div>

        {/* Patička */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          raccoonshlinsko.cz
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await brandFonts() },
  );
}
