export type Player = {
  number: number;
  name: string;
  position: "Brankář" | "Obránce" | "Útočník";
  photo?: string;
  goals?: number;
  assists?: number;
  bio?: string;
};

export const players: Player[] = [
  {
    number: 1,
    name: "Jméno Příjmení",
    position: "Brankář",
    goals: 0,
    assists: 0,
    bio: "Náš poslední bod jistoty. Zázraky za pár.",
  },
  {
    number: 8,
    name: "Jméno Příjmení",
    position: "Obránce",
    goals: 1,
    assists: 4,
    bio: "Beton vzadu, vtipy v kabině.",
  },
  {
    number: 17,
    name: "Jméno Příjmení",
    position: "Útočník",
    goals: 10,
    assists: 6,
    bio: "Rychlé nohy, rychlé hlášky.",
  },
  {
    number: 23,
    name: "Jméno Příjmení",
    position: "Útočník",
    goals: 7,
    assists: 9,
    bio: "Vidí přihrávky, které ostatní ani netuší.",
  },
];
