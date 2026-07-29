import { IconPuck } from "./Icons";

type Props = {
  items: readonly string[];
  /** Růžový pruh vs. jemná varianta na tmavém podkladu */
  tone?: "pink" | "dark";
  fast?: boolean;
};

/**
 * Nekonečně běžící pruh.
 *
 * Aby smyčka nedrhla, musí být obsah širší než obrazovka: jedna „skupina“
 * proto obsahuje položky několikrát za sebou a vykreslí se dvakrát. Animace
 * pak posune stopu přesně o 50 %, což je právě jedna skupina – přechod je
 * neviditelný a nikde nevznikne prázdné místo.
 */
const REPEATS = 6;

export default function Ticker({ items, tone = "pink", fast }: Props) {
  if (items.length === 0) return null;

  const group = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {Array.from({ length: REPEATS }).flatMap((_, r) =>
        items.map((text, i) => (
          <span key={`${r}-${i}`} className="flex items-center gap-8 px-8">
            <span className="cond whitespace-nowrap text-sm font-semibold uppercase tracking-[0.28em]">
              {text}
            </span>
            <IconPuck className="h-3.5 w-3.5 shrink-0 opacity-60" />
          </span>
        )),
      )}
    </div>
  );

  return (
    <div
      className={`marquee relative overflow-hidden ${
        tone === "pink"
          ? "border-y border-pink-deep/40 bg-pink text-ink"
          : "border-y border-line bg-ink-2 text-muted"
      }`}
    >
      <div className={`marquee-track py-3.5 ${fast ? "marquee-track--fast" : ""}`}>
        {group}
        {group}
      </div>
      {/* Pro čtečky stačí obsah jednou a beze smyčky */}
      <span className="sr-only">{items.join(" · ")}</span>
    </div>
  );
}
