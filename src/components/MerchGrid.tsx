import Image from "next/image";
import Reveal from "./Reveal";
import Logo from "./Logo";
import { formatPrice, type MerchItem } from "@/data/merch";

export default function MerchGrid({ items }: { items: MerchItem[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const soldOut = item.available === false;
        return (
          <Reveal as="li" key={item.id} delay={Math.min(i, 6) * 60}>
            <article className="card card-hover group flex h-full flex-col">
              <div className="relative aspect-square overflow-hidden border-b border-line bg-white/[0.02]">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
                    className={`object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
                      soldOut ? "opacity-40" : ""
                    }`}
                  />
                ) : (
                  <div
                    aria-hidden
                    className="flex h-full items-center justify-center p-12 opacity-[0.08]"
                  >
                    <Logo className="w-full" />
                  </div>
                )}

                {soldOut && (
                  <span className="cond absolute left-4 top-4 rounded-full bg-ink/90 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    Vyprodáno
                  </span>
                )}
                {item.category && !soldOut && (
                  <span className="cond absolute left-4 top-4 rounded-full border border-line bg-ink/80 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    {item.category}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="display text-xl text-chalk">{item.name}</h3>
                {item.description && (
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                )}

                {item.sizes && item.sizes.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.sizes.map((size) => (
                      <li
                        key={size}
                        className="cond rounded-md border border-line px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-muted"
                      >
                        {size}
                      </li>
                    ))}
                  </ul>
                )}

                <p className="display mt-auto pt-5 text-2xl text-pink">
                  {formatPrice(item.price)}
                </p>
              </div>
            </article>
          </Reveal>
        );
      })}
    </ul>
  );
}
