import { players } from "@/data/players";

export default function TymPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl md:text-5xl text-center mb-2">
        Naše <span className="text-pink">soupiska</span>
      </h1>
      <p className="text-center text-white/70 mb-10">
        Banda, která to na ledě (a po něm) rozjíždí. 🦝
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {players.map((player) => (
          <div
            key={player.number}
            className="bg-graphite rounded-2xl p-6 border-2 border-pink/30 hover:border-pink transition-colors text-center"
          >
            <div className="font-display text-5xl text-pink mb-2">
              #{player.number}
            </div>
            <h2 className="font-display text-2xl mb-1">{player.name}</h2>
            <p className="text-sm uppercase tracking-wide text-white/50 mb-3">
              {player.position}
            </p>
            {(player.goals !== undefined || player.assists !== undefined) && (
              <p className="text-sm text-white/70 mb-2">
                ⚽ {player.goals ?? 0} gólů &nbsp;·&nbsp; 🎯{" "}
                {player.assists ?? 0} asistencí
              </p>
            )}
            {player.bio && (
              <p className="text-white/60 text-sm italic">
                &ldquo;{player.bio}&rdquo;
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
