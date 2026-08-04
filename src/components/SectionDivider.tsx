export type Tone = "dark" | "light";

/** Skutečné barvy pozadí sekcí – musí sedět s tokeny v globals.css. */
const toneColor: Record<Tone, string> = {
  dark: "#08080a",
  light: "#f4f4f7",
};

type Props = {
  /** Odstín sekce nad předělem */
  from: Tone;
  /** Odstín sekce pod předělem */
  to: Tone;
  variant?: "stripes" | "wave";
};

/**
 * Předěl mezi sekcemi. Buď šikmé růžovo-černo-bílé pruhy, nebo vlnka.
 * Je to čistě dekorace, takže je celý schovaný před čtečkami.
 */
export default function SectionDivider({
  from,
  to,
  variant = "stripes",
}: Props) {
  if (variant === "wave") {
    return (
      <div aria-hidden className="relative -my-px leading-[0]">
        <svg
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          className="block h-14 w-full sm:h-20"
        >
          <rect width="1440" height="72" fill={toneColor[from]} />
          <path
            d="M0 34 C 200 4 340 4 540 34 S 900 68 1120 40 1440 20 1440 20 L1440 72 L0 72 Z"
            fill={toneColor[to]}
          />
          <path
            d="M0 34 C 200 4 340 4 540 34 S 900 68 1120 40 1440 20 1440 20"
            fill="none"
            stroke="#ff2e7e"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="relative h-14 overflow-hidden sm:h-[4.5rem]"
      style={{
        background: `linear-gradient(180deg, ${toneColor[from]} 0 50%, ${toneColor[to]} 50% 100%)`,
      }}
    >
      <div className="stripe-overlay absolute inset-0" />
    </div>
  );
}

/** Krátký tříbarevný proužek – akcent pod nadpisem. */
export function BrandBars({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`brand-bars ${className}`}>
      <i className="bg-pink" />
      <i className="bg-chalk" />
      <i className="bg-ink" />
    </span>
  );
}

