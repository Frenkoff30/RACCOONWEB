import Link from "next/link";
import { formatDate } from "@/data/matches";
import type { NewsItem } from "@/data/news";
import { IconArrowRight } from "./Icons";

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="card card-hover flex h-full flex-col p-6 sm:p-7">
      <p className="cond flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em]">
        {item.tag && <span className="text-pink">{item.tag}</span>}
        <time dateTime={item.date} className="text-muted">
          {formatDate(item.date)}
        </time>
      </p>

      <h3 className="display mt-3 text-2xl leading-tight text-chalk">
        {item.title}
      </h3>

      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
        {item.body}
      </p>

      {item.href && (
        <Link
          href={item.href}
          className="cond group mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.16em] text-chalk transition-colors hover:text-pink"
        >
          {item.hrefLabel ?? "Číst dál"}
          <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      )}
    </article>
  );
}
