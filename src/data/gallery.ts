export type GalleryItem = {
  src: string;
  alt: string;
  /** Popisek pod fotkou v lightboxu */
  caption?: string;
  /** "wide" zabere v mřížce dva sloupce, "tall" dva řádky */
  span?: "wide" | "tall";
  /** "contain" pro loga a grafiku na průhledném pozadí, jinak "cover" */
  fit?: "cover" | "contain";
};

/* -------------------------------------------------------------------------
   GALERIE
   Fotky ulož do public/images/galerie/ a přidej sem řádek. Formát klidně
   .jpg nebo .webp – Next.js si je sám zmenší a převede.
   ------------------------------------------------------------------------- */
export const galleryItems: GalleryItem[] = [
  {
    src: "/brand/raccoon-full.png",
    alt: "Logo Raccoons s nápisem",
    caption: "Klubové logo, hlavní verze",
    span: "tall",
    fit: "contain",
  },
  {
    src: "/brand/raccoon-head.png",
    alt: "Hlava myvala ze znaku Raccoons",
    caption: "Znak bez nápisu, na dresy a nálepky",
    fit: "contain",
  },
];
