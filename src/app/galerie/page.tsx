import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { IconCamera } from "@/components/Icons";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Fotky z ledu, z kabiny i po zápase, galerie hobby hokejového týmu Raccoons.",
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
      </section>
    </>
  );
}
