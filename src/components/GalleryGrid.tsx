"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Reveal from "./Reveal";
import {
  IconChevronLeft,
  IconChevronRight,
  IconClose,
  IconPlus,
} from "./Icons";
import type { GalleryItem } from "@/data/gallery";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) =>
        i === null ? i : (i + delta + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, step]);

  const active = openIndex === null ? null : items[openIndex];

  return (
    <>
      <ul className="grid auto-rows-[minmax(0,220px)] grid-cols-2 gap-4 sm:auto-rows-[minmax(0,250px)] lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={item.src}
            delay={Math.min(i, 8) * 60}
            className={`h-full ${
              item.span === "wide"
                ? "sm:col-span-2"
                : item.span === "tall"
                  ? "row-span-2"
                  : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="card card-hover group relative h-full w-full cursor-pointer"
              aria-label={`Zvětšit: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 48vw, (max-width: 1024px) 45vw, 400px"
                className={`transition-transform duration-500 group-hover:scale-[1.05] ${
                  item.fit === "contain"
                    ? "object-contain p-8"
                    : "object-cover"
                }`}
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="absolute bottom-4 left-4 right-4 flex translate-y-2 items-center gap-2 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              >
                <IconPlus className="h-4 w-4 shrink-0 text-pink" />
                {item.caption && (
                  <span className="cond truncate text-xs font-semibold uppercase tracking-[0.14em] text-chalk">
                    {item.caption}
                  </span>
                )}
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[200] flex flex-col bg-ink/97 backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Zavřít"
            className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-line text-chalk transition-colors hover:border-pink hover:text-pink sm:right-6 sm:top-6"
            autoFocus
          >
            <IconClose className="h-5 w-5" />
          </button>

          <div className="relative flex-1 p-4 pt-20 sm:p-10 sm:pt-24">
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-5 sm:px-10">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Předchozí fotka"
              disabled={items.length < 2}
              className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-line text-chalk transition-colors hover:border-pink hover:text-pink disabled:cursor-not-allowed disabled:opacity-30"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>

            <div className="min-w-0 text-center">
              {active.caption && (
                <p className="cond truncate text-sm uppercase tracking-[0.14em] text-chalk">
                  {active.caption}
                </p>
              )}
              <p className="cond text-xs tracking-[0.2em] text-muted">
                {(openIndex ?? 0) + 1} / {items.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Další fotka"
              disabled={items.length < 2}
              className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-line text-chalk transition-colors hover:border-pink hover:text-pink disabled:cursor-not-allowed disabled:opacity-30"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
