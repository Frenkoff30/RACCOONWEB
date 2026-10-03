/* -------------------------------------------------------------------------
   AKTUALITY

   Krátké zprávy pro tým i pro lidi, co chodí fandit: změny termínů, shrnutí
   zápasu, sraz, nábor. Nejnovější se řadí samy nahoru podle data, takže je
   jedno, kam novou zprávu v poli napíšeš.

   Vzor k okopírování:

   {
     date: "2026-10-09",
     tag: "Klub",
     title: "Hledáme brankáře na pátek",
     body: "Myška má noční, takže klec je volná. Kdo můžeš, ozvi se na Instagram.",
     href: "/kontakt",
     hrefLabel: "Napsat nám",
   },
   ------------------------------------------------------------------------- */

export type NewsItem = {
  /** Datum ve tvaru YYYY-MM-DD */
  date: string;
  /** Krátký štítek nad nadpisem, např. "Zápas", "Trénink", "Klub". */
  tag?: string;
  title: string;
  /** Jeden až dva odstavce textu. */
  body: string;
  /** Nepovinný odkaz na konci zprávy. */
  href?: string;
  hrefLabel?: string;
};

export const news: NewsItem[] = [
  {
    date: "2026-10-02",
    tag: "Zápas",
    title: "Sezónu otevíráme výhrou 5:4 nad Krounou",
    body:
      "První zápas ročníku a rovnou tři body. Góly dali Hamák, Němec, Horáček, " +
      "Benc a Holas, Hamák k tomu přidal dvě asistence. Díky všem, co dorazili " +
      "na stadion zařvat.",
    href: "/zapasy",
    hrefLabel: "Všechny výsledky",
  },
];

/* ---------------------------- odvozené věci ---------------------------- */

/** Zprávy od nejnovější. */
export const sortedNews: NewsItem[] = [...news].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const latestNews: NewsItem | undefined = sortedNews[0];
