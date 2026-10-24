/** MONDO mode issues, in the order the globe cycles through them. */

export type Issue = {
  id: string;
  name: string;
};

export const ISSUES: readonly Issue[] = [
  { id: "cyberspace", name: "Cyberspace" },
  { id: "raytrace", name: "Raytrace" },
];

export const MASTHEADS: Readonly<Record<string, string>> = {
  "/": "Erik’s Webpage",
  "/projects": "Projects",
  "/talks": "Talks",
};
