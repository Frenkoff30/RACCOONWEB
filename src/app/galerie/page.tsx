import Image from "next/image";
import { galleryItems } from "@/data/gallery";

export default function GaleriePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl md:text-5xl text-center mb-2">
        Galerie <span className="text-pink">momentek</span>
      </h1>
      <p className="text-center text-white/70 mb-10">
        Naše góly, dresy a chvíle, na které nezapomeneme (i ty, na které
        bychom rádi). 📸
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryItems.map((item) => (
          <div
            key={item.src}
            className="relative aspect-square overflow-hidden rounded-xl border-2 border-pink/30 bg-graphite"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <p className="text-center text-white/40 text-sm mt-8">
        Chybí ti tu tvoje fotka z posledního zápasu? Pošli ji do týmového
        chatu! 🦝
      </p>
    </div>
  );
}
