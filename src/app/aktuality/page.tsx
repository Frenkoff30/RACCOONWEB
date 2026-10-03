import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import NewsCard from "@/components/NewsCard";
import { IconCalendar } from "@/components/Icons";
import { sortedNews } from "@/data/news";

export const metadata: Metadata = {
  title: "Aktuality",
  description:
    "Novinky z týmu Raccoons Hlinsko: shrnutí zápasů, změny termínů a dění kolem klubu.",
};

export default function AktualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Aktuality"
        title={
          <>
            Co je <span className="text-pink">nového</span>
          </>
        }
      />

      <section className="wrap py-16 sm:py-20">
        {sortedNews.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2">
            {sortedNews.map((item, i) => (
              <Reveal as="li" key={`${item.date}-${item.title}`} delay={Math.min(i, 6) * 60}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal>
            <div className="card flex flex-col items-start gap-3 p-8">
              <IconCalendar className="h-6 w-6 text-pink" />
              <p className="display text-2xl text-chalk">Zatím ticho</p>
              <p className="text-sm leading-relaxed text-muted">
                Jakmile se něco semele, najdeš to tady.
              </p>
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}
