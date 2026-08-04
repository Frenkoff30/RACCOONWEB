import Logo from "./Logo";

type Props = {
  items: readonly string[];
  /** Růžový pruh vs. jemná varianta na tmavém podkladu */
  tone?: "pink" | "dark";
  fast?: boolean;
};

/** Zhruba kolik pixelů zabere jedna položka i s odsazením a znakem. */
const ITEM_WIDTH = 300;
/** Jak široká má být jedna skupina, aby přesáhla i velký monitor. */
const TARGET_WIDTH = 4200;

/**
 * Nekonečně běžící pruh.
 *
 * Aby smyčka nedrhla, musí být obsah širší než obrazovka: jedna „skupina“
 * proto obsahuje položky několikrát za sebou a vykreslí se dvakrát. Animace
 * posune stopu přesně o 50 %, což je právě jedna skupina – přechod je
 * neviditelný a nikde nevznikne prázdné místo.
 */
export default function Ticker({ items, tone = "pink", fast }: Props) {
  if (items.length === 0) return null;

  const repeats = Math.max(
    2,
    Math.ceil(TARGET_WIDTH / (items.length * ITEM_WIDTH)),
  );

  const group = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {Array.from({ length: repeats }).flatMap((_, r) =>
        items.map((text, i) => (
          <span key={`${r}-${i}`} className="flex items-center gap-7 px-7">
            <span className="cond whitespace-nowrap text-sm font-semibold uppercase tracking-[0.28em]">
              {text}
            </span>
            <Logo variant="mark" priority className="h-6 w-auto shrink-0" />
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
      <div
        className={`marquee-track py-3 ${fast ? "marquee-track--fast" : ""}`}
      >
        {group}
        {group}
      </div>
      {/* Pro čtečky stačí obsah jednou a beze smyčky */}
      <span className="sr-only">{items.join(" · ")}</span>
    </div>
  );
}
