"use client";

import { placeMasthead } from "@/components/mondo/stage";
import { CAP_HEIGHT, PIXEL, SPACE, WORDS } from "@/components/mondo/stage/beads";
import { useLayoutEffect, useRef } from "react";

const INLINE_MIN_WIDTH = 720;
/** Tallest a line of beads gets, as a share of the viewport and in px. */
const MAX_CAP_VH = 0.22;
const MAX_CAP_PX = 170;
/** Space between stacked words, in cap heights. */
const LINE_GAP = 0.3;
/** Bead diameter per font pixel: a touch over 1, so neighbours kiss like a string of pearls. */
const BEAD = 1.22;

/**
 * The chrome masthead's footprint. The beads themselves are drawn by the
 * stage behind the page; this box reserves their space, works out where each
 * pixel of each SS05 letter goes, and is what they follow as you scroll.
 * Wide screens set the words on one line; narrow ones stack them, each word
 * as large as fits.
 */
export function Masthead({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const box = ref.current;
    if (!box) return;
    const words = text
      .toUpperCase()
      .split(/\s+/)
      .filter((word) => WORDS[word]);
    const total = words.reduce((sum, word) => sum + WORDS[word].beads.length / 5, 0);

    const fit = () => {
      const avail = box.clientWidth;
      if (!avail) return;
      const maxCap = Math.min(innerHeight * MAX_CAP_VH, MAX_CAP_PX);
      const rows = avail >= INLINE_MIN_WIDTH ? [words] : words.map((word) => [word]);
      const beads = new Float32Array(total * 5);
      let n = 0;
      let top = 0;
      let gap = 0;
      let letters = 0;

      for (const row of rows) {
        const width = row.reduce((sum, word) => sum + WORDS[word].width, 0) + SPACE * (row.length - 1);
        const scale = Math.min(avail / width, maxCap / CAP_HEIGHT);
        const pad = (PIXEL * scale) / 2;
        let pen = (avail - width * scale) / 2;

        for (const word of row) {
          const { beads: source, width: advance } = WORDS[word];
          let last = 0;
          for (let i = 0; i < source.length; i += 5) {
            beads[n * 5] = pen + source[i] * scale;
            beads[n * 5 + 1] = top + pad + (CAP_HEIGHT - source[i + 1]) * scale;
            beads[n * 5 + 2] = (source[i + 2] * PIXEL * scale * BEAD) / 2;
            beads[n * 5 + 3] = (source[i + 3] * PIXEL * scale * BEAD) / 2;
            beads[n * 5 + 4] = letters + source[i + 4];
            last = Math.max(last, source[i + 4]);
            n++;
          }
          letters += last + 1;
          pen += (advance + SPACE) * scale;
        }
        gap = CAP_HEIGHT * scale * LINE_GAP;
        top += CAP_HEIGHT * scale + pad * 2 + gap;
        box.style.setProperty("--cap", `${CAP_HEIGHT * scale}px`);
      }

      box.style.height = `${top - gap}px`;
      placeMasthead(box, { beads, count: n });
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      removeEventListener("resize", fit);
      placeMasthead(null, null);
    };
  }, [text]);

  return (
    <div ref={ref} className="mondo-mast" aria-hidden="true">
      {/* Only shown when WebGL isn't available. */}
      <span className="mondo-mast-text">{text}</span>
    </div>
  );
}
