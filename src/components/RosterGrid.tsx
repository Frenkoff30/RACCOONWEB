"use client";

import { useMemo, useState } from "react";
import PlayerCard from "./PlayerCard";
import Reveal from "./Reveal";
import { IconClose } from "./Icons";
import {
  fullName,
  playerKey,
  positionOrder,
  positionPlural,
  type Player,
  type Position,
} from "@/data/players";

type Props = {
  players: Player[];
  positions: Position[];
};

/** Odstraní diakritiku, ať hledání funguje i bez háčků. */
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export default function RosterGrid({ players, positions }: Props) {
  const [filter, setFilter] = useState<Position | "all">("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return players.filter((p) => {
      if (filter !== "all" && p.position !== filter) return false;
      if (!q) return true;
      return (
        normalize(fullName(p)).includes(q) ||
        normalize(p.nickname ?? "").includes(q) ||
        String(p.number).startsWith(q)
      );
    });
  }, [players, filter, query]);

  /** Rozdělené do formací, jen když se nefiltruje ani nehledá. */
  const grouped = useMemo(() => {
    if (filter !== "all" || query.trim()) return null;
    const groups = positionOrder
      .map((position) => ({
        position,
        players: visible.filter((p) => p.position === position),
      }))
      .filter((g) => g.players.length > 0);
    const rest = visible.filter((p) => !p.position);
    return { groups, rest };
  }, [visible, filter, query]);

  const chips: { key: Position | "all"; label: string; count: number }[] = [
    { key: "all", label: "Všichni", count: players.length },
    ...positions.map((pos) => ({
      key: pos,
      label: positionPlural[pos],
      count: players.filter((p) => p.position === pos).length,
    })),
  ];

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        {positions.length > 0 && (
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filtr podle pozice"
          >
            {chips.map((chip) => {
              const active = filter === chip.key;
              return (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => setFilter(chip.key)}
                  aria-pressed={active}
                  className={`cond inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "border-pink bg-pink text-ink"
                      : "border-line text-muted hover:border-pink/60 hover:text-chalk"
                  }`}
                >
                  {chip.label}
                  <span className={active ? "text-ink/60" : "text-muted/70"}>
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div className="relative sm:w-64">
          <label htmlFor="hledat-hrace" className="sr-only">
            Hledat hráče podle jména nebo čísla
          </label>
          <input
            id="hledat-hrace"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hledat jméno nebo číslo"
            className="h-10 w-full rounded-full border border-line bg-white/[0.03] px-4 pr-10 text-sm text-chalk placeholder:text-muted focus:border-pink focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Vymazat hledání"
              className="absolute right-1 top-1 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:text-pink"
            >
              <IconClose className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {visible.length === 0 && (
        <div className="mt-16 text-center">
          <p className="display text-3xl text-chalk">Nikoho jsme nenašli</p>
          <p className="mt-3 text-muted">Zkus jiné jméno nebo číslo dresu.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="cond mt-6 inline-flex h-11 cursor-pointer items-center rounded-full border border-line px-6 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-chalk transition-colors hover:border-pink hover:text-pink"
          >
            Zrušit filtry
          </button>
        </div>
      )}

      {/* Rozdělené na formace */}
      {grouped && (
        <div className="space-y-16">
          {grouped.groups.map((group) => (
            <section key={group.position} className="mt-14 first:mt-14">
              <div className="flex items-baseline gap-4">
                <h2 className="display text-2xl text-chalk sm:text-3xl">
                  {positionPlural[group.position]}
                </h2>
                <span className="cond text-sm font-semibold text-pink">
                  {group.players.length}
                </span>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>
              <Grid players={group.players} />
            </section>
          ))}

          {grouped.rest.length > 0 && (
            <section className="mt-14">
              <div className="flex items-baseline gap-4">
                <h2 className="display text-2xl text-chalk sm:text-3xl">
                  Bez zařazení
                </h2>
                <span className="cond text-sm font-semibold text-pink">
                  {grouped.rest.length}
                </span>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>
              <Grid players={grouped.rest} />
            </section>
          )}
        </div>
      )}

      {/* Filtrovaný / vyhledaný výpis */}
      {!grouped && visible.length > 0 && <Grid players={visible} />}

      <p aria-live="polite" className="sr-only">
        Zobrazeno {visible.length} z {players.length} hráčů.
      </p>
    </>
  );
}

function Grid({ players }: { players: Player[] }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {players.map((p, i) => (
        <Reveal
          key={playerKey(p)}
          as="li"
          delay={Math.min(i, 9) * 45}
          className="h-full"
        >
          <PlayerCard player={p} />
        </Reveal>
      ))}
    </ul>
  );
}
