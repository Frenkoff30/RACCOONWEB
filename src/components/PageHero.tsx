import type { ReactNode } from "react";
import Logo from "./Logo";

type Props = {
  eyebrow: string;
  title: ReactNode;
};

export default function PageHero({ eyebrow, title }: Props) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 rink-lines" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 w-[340px] -translate-y-1/2 opacity-[0.05] sm:-right-10"
      >
        <Logo className="w-full" />
      </div>

      <div className="wrap relative pb-14 pt-32 sm:pb-20 sm:pt-44">
        <p className="eyebrow flex items-center gap-3 text-pink">
          <span aria-hidden className="h-px w-8 bg-pink/60" />
          {eyebrow}
        </p>
        <h1 className="display mt-5 text-5xl leading-[1.02] text-chalk sm:text-6xl lg:text-7xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
