"use client";

import { Globe } from "@/components/mondo/globe";
import type { Issue } from "@/components/mondo/issues";
import { type CSSProperties, useLayoutEffect, useRef } from "react";

const MEASURE_PX = 100;
const INLINE_MIN_WIDTH = 720;
const WORD_GAP_EM = 0.22;

// O and 0 alternate: the Earth, then the ouroboros.
function OLetter({ globe, style }: { globe: boolean; style: CSSProperties }) {
  return globe ? (
    <span className="L o-globe" style={style}>
      <Globe className="block size-full" />
    </span>
  ) : (
    <span className="L o-ouro" style={style}>
      <i className="o-a" />
      <i className="o-b" />
    </span>
  );
}

/** Resolves a CSS length token (px, vh, vw, rem) to pixels. */
function toPx(token: string, fallback: number) {
  const value = parseFloat(token);
  if (Number.isNaN(value)) return fallback;
  if (token.endsWith("vh")) return (value * window.innerHeight) / 100;
  if (token.endsWith("vw")) return (value * window.innerWidth) / 100;
  if (token.endsWith("rem")) return value * 16;
  return value;
}

/**
 * The hip-badge "The Office" masthead: every letter its own material, O and 0
 * alternate between two objects, and each word gets the largest size that
 * fits. Wide screens set the words on one line instead of stacking them.
 */
export function Masthead({ text, issue }: { text: string; issue: Issue }) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.toUpperCase().split(/\s+/).filter(Boolean);

  useLayoutEffect(() => {
    const mast = ref.current;
    if (!mast) return;

    const fit = () => {
      const lines = Array.from(mast.children) as HTMLElement[];
      const avail = mast.clientWidth;
      if (!avail) return;
      const max = toPx(
        getComputedStyle(mast).getPropertyValue("--mast-max").trim(),
        160,
      );
      const inline = avail >= INLINE_MIN_WIDTH && lines.length > 1;
      mast.classList.toggle("is-inline", inline);

      const widths = lines.map((line) => {
        line.style.fontSize = `${MEASURE_PX}px`;
        return line.offsetWidth;
      });

      if (inline) {
        const total =
          widths.reduce((sum, w) => sum + w, 0) +
          WORD_GAP_EM * MEASURE_PX * (lines.length - 1);
        const size = Math.min(max, (MEASURE_PX * avail) / total);
        for (const line of lines) line.style.fontSize = `${size}px`;
      } else {
        lines.forEach((line, i) => {
          const size = Math.min(max, (MEASURE_PX * avail) / widths[i]);
          line.style.fontSize = `${size}px`;
        });
      }

      // Measuring at one size and scaling is almost exact; shave off any
      // rounding that still pushes a line past the edge.
      const shrink = (line: HTMLElement, by: number) => {
        line.style.fontSize = `${parseFloat(line.style.fontSize) / by}px`;
      };
      if (inline) {
        const size = parseFloat(lines[0].style.fontSize);
        const total =
          lines.reduce((sum, line) => sum + line.offsetWidth, 0) +
          WORD_GAP_EM * size * (lines.length - 1);
        if (total > avail) for (const line of lines) shrink(line, total / avail);
      } else {
        for (const line of lines) {
          if (line.offsetWidth > avail) shrink(line, line.offsetWidth / avail);
        }
      }
    };

    fit();
    // Refit whenever a face finishes loading, in case it swapped in after the
    // first measurement (slow network, or the font wait timed out).
    document.fonts.ready.then(fit);
    document.fonts.addEventListener("loadingdone", fit);
    const observer = new ResizeObserver(fit);
    observer.observe(mast);
    return () => {
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", fit);
    };
  }, [text, issue.id]);

  let o = 0;
  let k = 0;
  // Each letter's position across the whole masthead, so issues can stagger
  // animations from left to right.
  let n = 0;

  return (
    <div ref={ref} className="mondo-mast" aria-hidden="true">
      {words.map((word, w) => (
        <div key={`${word}-${w}`} className="mondo-word">
          {Array.from(word).map((ch, i) => {
            const style = { "--i": n++ } as CSSProperties;
            if (ch === "O" || ch === "0") {
              return <OLetter key={i} globe={o++ % 2 === 0} style={style} />;
            }
            const material = issue.cycle[k++ % issue.cycle.length];
            return (
              <span
                key={i}
                className={`L m-${material}`}
                data-ch={ch}
                style={style}
              >
                {ch}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
