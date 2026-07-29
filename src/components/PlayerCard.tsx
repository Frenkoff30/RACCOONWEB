import Image from "next/image";
import Logo from "./Logo";
import { hasStats, points, type Player } from "@/data/players";

const roleLabel: Record<"C" | "A", string> = {
  C: "Kapitán",
  A: "Asistent",
};

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <article className="card card-hover group flex aspect-[3/4] flex-col justify-between p-5 sm:p-6">
      {/* Fotka, nebo znak myvala jako výplň */}
      {player.photo ? (
        <>
          <Image
            src={player.photo}
            alt={`${player.firstName} ${player.lastName}`}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 300px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-6 -right-8 w-[68%] opacity-[0.055] transition-opacity duration-300 group-hover:opacity-[0.11]"
        >
          <Logo className="w-full" />
        </div>
      )}

      {/* Číslo */}
      <div className="relative flex items-start justify-between">
        <span
          className="jersey stroke-text text-[4.25rem] leading-[0.8] transition-[-webkit-text-stroke-color] duration-300 sm:text-[5rem]"
          aria-hidden
        >
          {player.number}
        </span>
        {player.role && (
          <span className="cond rounded-full border border-pink/50 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-pink">
            {player.role}
            <span className="sr-only"> – {roleLabel[player.role]}</span>
          </span>
        )}
      </div>

      {/* Jméno + pozice */}
      <div className="relative">
        <p className="cond text-sm font-medium uppercase tracking-[0.2em] text-muted">
          {player.firstName}
        </p>
        <h3 className="display mt-1 text-2xl text-chalk sm:text-[1.75rem]">
          {player.lastName}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-line pt-3">
          <span className="cond text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-pink">
            {player.position ?? `#${player.number}`}
          </span>
          {player.nickname && (
            <span className="text-[0.8125rem] text-muted">
              „{player.nickname}“
            </span>
          )}
          {hasStats(player) && (
            <span className="cond ml-auto text-[0.8125rem] font-semibold tracking-wide text-muted">
              <span className="text-chalk">{player.goals ?? 0}</span>+
              <span className="text-chalk">{player.assists ?? 0}</span> ={" "}
              <span className="text-pink">{points(player)}</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
