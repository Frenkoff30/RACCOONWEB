import Link from "next/link";
import { getStandingsSummary } from "@/data/matches";

export default function Home() {
  const stats = getStandingsSummary();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-graphite to-ink">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-32 text-center">
          <div className="text-7xl md:text-9xl mb-4 animate-raccoon-bounce inline-block">
            🦝
          </div>
          <h1 className="font-display text-5xl md:text-8xl text-white leading-tight">
            JSME <span className="text-pink">RACCOONS</span>
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white/80 max-w-2xl mx-auto">
            Hobby hokejová parta, co bere led vážně jen v útoku, na hlášky
            v kabině úplně nevážně. 🏒🐾
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/zapasy"
              className="bg-pink text-ink font-display text-xl px-8 py-3 rounded-full hover:bg-pink-light transition-colors"
            >
              Naše výsledky
            </Link>
            <Link
              href="/galerie"
              className="border-2 border-pink text-white font-display text-xl px-8 py-3 rounded-full hover:bg-pink hover:text-ink transition-colors"
            >
              Galerie
            </Link>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-8">
          Sezóna v <span className="text-pink">číslech</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <StatBox label="Zápasy" value={stats.played} />
          <StatBox label="Výhry" value={stats.wins} accent />
          <StatBox label="Prohry" value={stats.losses} />
          <StatBox label="Remízy" value={stats.draws} />
          <StatBox
            label="Skóre"
            value={`${stats.goalsFor}:${stats.goalsAgainst}`}
          />
        </div>
      </section>

      {/* About */}
      <section className="bg-graphite py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            O <span className="text-pink">nás</span>
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Raccoons jsou hobby hokejový tým plný kámošů, kteří si jednou
            týdně dokazují, že brusle se neztratily v análech minulosti.
            Hrajeme pro radost, fandíme si i protihráčům a po zápase
            neodmítneme pivo. Barvy růžová, bílá a černá nejsou náhoda –
            jsme tým, který to nebere úplně vážně, ale na ledě to chce
            vyhrát. 🦝
          </p>
        </div>
      </section>
    </div>
  );
}

function StatBox({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="bg-graphite rounded-xl p-4 border-2 border-pink/30">
      <p
        className={`font-display text-3xl md:text-4xl ${
          accent ? "text-pink" : "text-white"
        }`}
      >
        {value}
      </p>
      <p className="text-sm text-white/60 mt-1">{label}</p>
    </div>
  );
}
