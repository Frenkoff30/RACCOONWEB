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
    src: "/images/galerie/8d5d1fd1-c675-4115-8668-c193666e9f4a.jpg",
    alt: "Tým Raccoons pózuje s pohárem v hale zimního stadionu",
    span: "tall",
  },
  {
    src: "/images/galerie/e40ae2ed-335b-4719-adc8-f95643857fe9.jpg",
    alt: "Dva hráči Raccoons drží na ledě zlatý pohár",
  },
  {
    src: "/images/galerie/ddea4d73-60a0-4507-b931-84eae01b3722.jpg",
    alt: "Hráči Raccoons nastoupení u mantinelu před zápasem",
    span: "wide",
  },
  {
    src: "/images/galerie/210e22ae-8ff0-4096-94eb-13ffe8f397bb.jpg",
    alt: "Hráč Raccoons veze pohár po ledě, spoluhráči slaví",
    span: "wide",
  },
  {
    src: "/images/galerie/daa8af89-fa2a-436b-9ee0-2ca479c9d92b.jpg",
    alt: "Brankář a hráč Raccoons se zdraví u branky",
  },
  {
    src: "/images/galerie/441d25d8-ac66-4cee-8579-a7d89f15cb0a.jpg",
    alt: "Hráči Raccoons v akci na ledě během zápasu",
  },
  {
    src: "/images/galerie/ad0560e1-cbdd-4144-9bb0-7663fc828d56.jpg",
    alt: "Tým Raccoons na letním hřišti po hokejbalovém zápase",
    span: "tall",
  },
  {
    src: "/brand/raccoon-full.png",
    alt: "Logo Raccoons s nápisem",
    fit: "contain",
  },
  {
    src: "/brand/raccoon-head.png",
    alt: "Hlava mývala ze znaku Raccoons",
    fit: "contain",
  },
];
