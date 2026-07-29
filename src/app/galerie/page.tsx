import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/Reveal";
import { IconCamera } from "@/components/Icons";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Fotky z ledu, z kabiny i po zápase – galerie hobby hokejového týmu Raccoons.",
};

export default function GaleriePage() {
  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title={
          <>
            Fotky <span className="text-pink">z ledu</span>
          </>
        }
        lead="Zápasy, dresy a kabina. Klikni na fotku pro zvětšení."
        aside={
          <div className="card flex items-center gap-5 px-6 py-5">
            <IconCamera className="h-7 w-7 text-pink" />
            <div>
              <p className="display text-4xl leading-none text-chalk">
                {galleryItems.length}
              </p>
              <p className="cond mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Položek v galerii
              </p>
            </div>
          </div>
        }
      />

      <section className="wrap py-16 sm:py-20">
        {galleryItems.length > 0 ? (
          <GalleryGrid items={galleryItems} />
        ) : (
          <div className="card mx-auto max-w-lg p-10 text-center">
            <IconCamera className="mx-auto h-8 w-8 text-pink" />
            <p className="display mt-5 text-3xl text-chalk">
              Zatím tu nic není
            </p>
            <p className="mt-3 text-muted">
              Fotky přibudou po nejbližším zápase.
            </p>
          </div>
        )}

        <Reveal className="mt-14">
          <div className="card card-dashed flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center">
            <IconCamera className="h-7 w-7 shrink-0 text-pink" />
            <div>
              <p className="display text-2xl text-chalk">Přidat fotky</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Nakopíruj je do{" "}
                <code className="rounded bg-white/5 px-1.5 py-0.5 text-chalk">
                  public/images/galerie/
                </code>{" "}
                a přidat řádek v{" "}
                <code className="rounded bg-white/5 px-1.5 py-0.5 text-chalk">
                  src/data/gallery.ts
                </code>
                .
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
