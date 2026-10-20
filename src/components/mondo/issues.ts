/** MONDO mode issues, in the order the globe cycles through them. */

export type Issue = {
  id: string;
  name: string;
  /** Letter materials, cycled across the masthead's letters. */
  cycle: readonly string[];
  /** Hand-picked materials for a masthead, letter by letter (O and 0 don't
   *  count). Overrides the cycle wherever it would land in a visible pattern. */
  spell?: Readonly<Record<string, readonly string[]>>;
};

export const ISSUES: readonly Issue[] = [
  {
    id: "cyberdelic",
    name: "Cyberdelic Cover",
    cycle: ["chrome", "rainbow", "lava", "halo", "marble", "grid", "holo"],
    spell: {
      // The plain cycle stacks halo, marble and grid in the same spots on
      // both lines. WEBPAGE runs cool to warm instead, against ERIK’S.
      "Erik’s Webpage": [
        "chrome", "rainbow", "lava", "halo", "marble", "grid",
        "holo", "grid", "halo", "marble", "chrome", "lava", "rainbow",
      ],
    },
  },
  {
    id: "rave",
    name: "Rave Flyer",
    cycle: ["acid", "liquid", "smiley", "uv", "candy"],
  },
];

export const MASTHEADS: Readonly<Record<string, string>> = {
  "/": "Erik’s Webpage",
  "/projects": "Projects",
  "/talks": "Talks",
};
