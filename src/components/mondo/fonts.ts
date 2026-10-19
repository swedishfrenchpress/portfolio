import { Arimo, League_Spartan, Monoton, Tinos } from "next/font/google";

// Downloaded at build time and served from erik.day, never preloaded: a file
// is only fetched once an issue actually uses it. next/font needs literal
// options, hence the repetition.
const spartan = League_Spartan({ subsets: ["latin"], display: "swap", preload: false, weight: "900", variable: "--mondo-spartan" });
const tinos = Tinos({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], style: ["normal", "italic"], variable: "--mondo-tinos" });
const arimo = Arimo({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], variable: "--mondo-arimo" });
const monoton = Monoton({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--mondo-monoton" });

export const FONT_VARIABLES = [spartan, tinos, arimo, monoton].map(
  (font) => font.variable,
);

const family = (font: { style: { fontFamily: string } }) =>
  font.style.fontFamily;

// The faces each issue needs on first paint, as CSS font shorthands.
const ISSUE_FONTS: Record<string, string[]> = {
  cyberdelic: [`900 1em ${family(spartan)}`, `400 1em ${family(tinos)}`, `700 1em ${family(tinos)}`, `italic 700 1em ${family(tinos)}`],
  rave: [`900 1em ${family(spartan)}`, `400 1em ${family(arimo)}`, `700 1em ${family(arimo)}`],
};

export function loadIssueFonts(id: string) {
  return Promise.all(
    (ISSUE_FONTS[id] ?? []).map((font) => document.fonts.load(font)),
  );
}
