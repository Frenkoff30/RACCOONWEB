import type { ReactNode } from "react";
import Logo from "./Logo";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  /** Volitelný obsah vpravo – např. rychlé statistiky */
  aside?: ReactNode;
};

export default function PageHero({ eyebrow, title, lead, aside }: Props) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div aria-hidden className="absolute inset-0 rink-lines" />
      <div
        aria-hidden
        className="glow absolute -top-40 left-1/4 h-[420px] w-[720px] max-w-[130vw] -translate-x-1/2"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 w-[340px] -translate-y-1/2 opacity-[0.05] sm:-right-10"
      >
        <Logo className="w-full" />
      </div>

      <div className="wrap relative pb-14 pt-32 sm:pb-20 sm:pt-44">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-pink">
              <span aria-hidden className="h-px w-8 bg-pink/60" />
              {eyebrow}
            </p>
            <h1 className="display mt-5 text-5xl text-chalk sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            {lead && (
              <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-muted">
                {lead}
              </p>
            )}
          </div>

          {aside && <div className="shrink-0">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
