import type { WarpSeed } from "./stage";

const MAX_POINTS = 3200;
/** Everything on the page that shatters: the prose and MONDO's own furniture. */
const SHATTERS = "main, .mondo-marquee, .mondo-foot";

type Line = { left: number; top: number; width: number; height: number; size: number };

/**
 * Reads the text on screen as rows of bead-sized points, so the warp can
 * swap the page for chrome beads in exactly the same places.
 */
export function sampleWarpSeed(): WarpSeed {
  const lines: Line[] = [];
  const range = document.createRange();
  const sizes = new Map<Element, number>();

  for (const root of document.querySelectorAll(SHATTERS)) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const parent = node.parentElement;
      if (!parent || !node.textContent?.trim()) continue;
      let size = sizes.get(parent);
      if (size === undefined) {
        size = parseFloat(getComputedStyle(parent).fontSize) || 16;
        sizes.set(parent, size);
      }
      range.selectNodeContents(node);
      for (const rect of range.getClientRects()) {
        if (rect.width < 4 || rect.bottom < 0 || rect.top > innerHeight) continue;
        lines.push({ left: rect.left, top: rect.top, width: rect.width, height: rect.height, size });
      }
    }
  }

  // Two rows of beads per line of text, thinned out evenly if that's too many.
  const wanted = lines.reduce((sum, l) => sum + (2 * l.width) / (l.size * 0.42), 0);
  const thin = Math.max(1, wanted / MAX_POINTS);
  const points = new Float32Array(MAX_POINTS * 3);
  let count = 0;
  for (const l of lines) {
    const step = l.size * 0.42 * thin;
    for (const row of [0.4, 0.68]) {
      for (let x = l.left + step / 2; x < l.left + l.width && count < MAX_POINTS; x += step) {
        points[count * 3] = x + (Math.random() - 0.5) * step * 0.5;
        points[count * 3 + 1] = l.top + l.height * row + (Math.random() - 0.5) * l.size * 0.12;
        points[count * 3 + 2] = l.size * 0.2;
        count++;
      }
    }
  }

  const globe = document.querySelector(".mondo-planet")?.getBoundingClientRect();
  return {
    points,
    count,
    originX: globe ? globe.left + globe.width / 2 : innerWidth / 2,
    originY: globe ? globe.top + globe.height / 2 : 0,
    background: getComputedStyle(document.body).backgroundColor,
  };
}
