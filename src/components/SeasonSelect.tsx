"use client";

import { useEffect, useRef, useState } from "react";
import { IconArrowRight } from "./Icons";

type Props<T extends string> = {
  views: readonly T[];
  active: T;
  onChange: (view: T) => void;
  /** Popisek pro čtečky – např. "sezónu". */
  label?: string;
};

export default function SeasonSelect<T extends string>({
  views,
  active,
  onChange,
  label = "sezónu",
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block w-full max-w-[16rem]">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Vyber ${label}`}
        onClick={() => setOpen((v) => !v)}
        className="cond flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-ink px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.12em] text-chalk transition-colors hover:border-pink/60"
      >
        {active}
        <IconArrowRight
          aria-hidden
          className={`h-4 w-4 text-pink transition-transform duration-200 ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-[calc(100%+0.5rem)] z-20 w-full overflow-hidden rounded-xl border border-line bg-ink shadow-2xl shadow-black/40"
        >
          {views.map((view) => {
            const isActive = view === active;
            return (
              <li key={view} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(view);
                    setOpen(false);
                  }}
                  className={`cond block w-full px-4 py-2.5 text-left text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? "bg-pink text-ink"
                      : "text-muted hover:bg-white/5 hover:text-chalk"
                  }`}
                >
                  {view}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
