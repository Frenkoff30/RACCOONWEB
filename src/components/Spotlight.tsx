"use client";

import { useEffect } from "react";

/**
 * Nastavuje kartám souřadnice kurzoru, aby se pod ním rozsvítilo jemné
 * růžové světlo. Jeden posluchač na celý dokument, zápis vždy až v dalším
 * snímku – žádné přepočítávání layoutu navíc.
 */
export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let pending: { card: HTMLElement; x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      const { card, x, y } = pending;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      pending = null;
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const card = target.closest<HTMLElement>(".card");
      if (!card) return;

      const rect = card.getBoundingClientRect();
      pending = {
        card,
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
      };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
