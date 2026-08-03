/* -------------------------------------------------------------------------
   ZÁKLADNÍ ÚDAJE O TÝMU
   Tady se mění všechno, co se opakuje napříč webem (patička, kontakt, SEO).
   Řádky označené TODO doplň reálnými údaji.
   ------------------------------------------------------------------------- */

export const team = {
  name: "Raccoons",
  fullName: "Raccoons Hlinsko",
  legalName: "Raccoons Hlinsko",
  tagline: "Hobby hokejový tým",
  city: "Hlinsko",

  /** Jedna věta do patičky a pod nadpis. */
  claim: "Hobby hokejový tým z Hlinska.",

  /** Odstavec do sekce „O nás“. */
  about:
    "Hrajeme hobby hokej v Hlinsku. Scházíme se jednou týdně na tréninku " +
    "a k tomu odehrajeme zápasy proti okolním týmům. Na webu najdeš soupisku, " +
    "výsledky, tabulku a kanadské bodování. Všechno průběžně doplňujeme.",

  /** Rok založení – nech `null`, dokud ho nepotvrdíte. TODO */
  founded: null as number | null,

  /** TODO: doplnit přesný název stadionu */
  rink: "Zimní stadion Hlinsko",
  /** TODO: doplnit reálný termín tréninků */
  trainingSlot: "Jednou týdně",

  contact: {
    /** TODO: doplnit reálný e-mail */
    email: "raccoons@example.com",
    /** Nepovinné – nech prázdné, pokud telefon zveřejňovat nechcete */
    phone: "",
  },

  /** Odkazy s prázdnou hodnotou se nikde nevykreslí. */
  social: {
    instagram: "https://www.instagram.com/raccoons.hlinsko/",
    instagramHandle: "@raccoons.hlinsko",
    facebook: "",
  },

  /** Text do běžícího pruhu. */
  ticker: ["Go Raccoons Go"],
};

export const siteUrl = "https://raccoons.cz"; // TODO: doplnit reálnou doménu
