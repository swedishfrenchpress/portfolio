/** MONDO mode issues, in the order the globe cycles through them. */

export type Issue = {
  id: string;
  name: string;
  /** Letter materials, cycled across the masthead's letters. */
  cycle: readonly string[];
};

export const ISSUES: readonly Issue[] = [
  {
    id: "cyberdelic",
    name: "Cyberdelic Cover",
    cycle: ["chrome", "rainbow", "lava", "halo", "marble", "grid", "holo"],
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
