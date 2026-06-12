export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center">
      <h1 className="font-display text-4xl md:text-5xl mb-2">
        Chceš si <span className="text-pink">zahrát</span> s námi?
      </h1>
      <p className="text-white/70 mb-10">
        Sháníme posily, fanoušky i protihráče, kteří to umí ustát s humorem.
        Ozvi se!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-graphite rounded-xl p-6 border-2 border-pink/30">
          <p className="font-display text-2xl text-pink mb-2">E-mail</p>
          <a
            href="mailto:raccoons@example.com"
            className="text-white/80 hover:text-pink transition-colors"
          >
            raccoons@example.com
          </a>
        </div>
        <div className="bg-graphite rounded-xl p-6 border-2 border-pink/30">
          <p className="font-display text-2xl text-pink mb-2">Instagram</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-pink transition-colors"
          >
            @raccoons.hockey
          </a>
        </div>
      </div>

      <div className="mt-10 bg-graphite rounded-xl p-6 border-2 border-pink/30">
        <p className="font-display text-2xl text-pink mb-2">Tréninky & zápasy</p>
        <p className="text-white/80">
          Hrajeme každý týden – sleduj naši stránku s{" "}
          <a href="/zapasy" className="text-pink underline">
            výsledky a statistikami
          </a>{" "}
          pro aktuální termíny.
        </p>
      </div>
    </div>
  );
}
