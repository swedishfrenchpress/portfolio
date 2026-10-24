import { Tinos } from "next/font/google";
import localFont from "next/font/local";

// Served from erik.day and never preloaded: nothing is fetched until MONDO
// is switched on. next/font needs literal options, hence the repetition.

// Alpha Lyrae by Fontfabric for Vega (SIL OFL, see fonts/OFL.md), shipped
// unmodified. MONDO sets it with SS05, the pixel set with displaced pixels.
const lyrae = localFont({ src: "./fonts/AlphaLyrae-Medium.woff2", weight: "500", display: "swap", preload: false, variable: "--mondo-lyrae" });
const tinos = Tinos({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], style: ["normal", "italic"], variable: "--mondo-tinos" });

export const FONT_VARIABLES = [lyrae, tinos].map((font) => font.variable);

const family = (font: { style: { fontFamily: string } }) =>
  font.style.fontFamily;

// Every issue sets headings in Alpha Lyrae and prose in Times.
const FACES = [`500 1em ${family(lyrae)}`, `400 1em ${family(tinos)}`, `700 1em ${family(tinos)}`, `italic 400 1em ${family(tinos)}`];

export function loadIssueFonts() {
  return Promise.all(FACES.map((font) => document.fonts.load(font)));
}
