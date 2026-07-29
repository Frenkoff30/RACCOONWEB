import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { IconArrowRight } from "./Icons";

type Props = {
  eyebrow: string;
  title: ReactNode;
  /** Pořadové číslo sekce, např. 2 → „02“ */
  index?: number;
  /** Popisek pod nadpisem */
  lead?: string;
  /** Odkaz vpravo, např. na celý výpis */
  action?: { href: string; label: string };
  className?: string;
};

export default function SectionHead({
  eyebrow,
  title,
  index,
  lead,
  action,
  className = "",
}: Props) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-4">
        {index !== undefined && (
          <span className="cond text-xs font-semibold tracking-[0.2em] text-pink">
            {String(index).padStart(2, "0")}
          </span>
        )}
        <span aria-hidden className="h-px w-10 bg-line" />
        <span className="eyebrow text-muted">{eyebrow}</span>
      </div>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="display text-4xl text-chalk sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h2>
          {lead && (
            <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">
              {lead}
            </p>
          )}
        </div>

        {action && (
          <Link
            href={action.href}
            className="cond group inline-flex shrink-0 items-center gap-2 border-b border-line pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-chalk transition-colors hover:border-pink hover:text-pink"
          >
            {action.label}
            <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}
