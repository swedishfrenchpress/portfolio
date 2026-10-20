import type { IssueArt } from "@/components/mondo/mondo-layer";
import { useEffect, useRef } from "react";
import "./cyberdelic.css";

const SPARK_GAP_PX = 18;
const MAX_SPARKS = 14;

// The late-90s cursor trail: a few sparkles drift off behind the pointer.
// Mouse and trackpad only, and never with reduced motion.
function Sparkles() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    if (
      !layer ||
      !matchMedia("(pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let lastX = 0;
    let lastY = 0;
    const onMove = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event;
      if (Math.hypot(x - lastX, y - lastY) < SPARK_GAP_PX) return;
      if (layer.childElementCount >= MAX_SPARKS) return;
      lastX = x;
      lastY = y;

      const spark = document.createElement("i");
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.setProperty("--dx", `${(Math.random() - 0.5) * 28}px`);
      spark.addEventListener("animationend", () => spark.remove());
      layer.append(spark);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ref} className="cy-sparkles" />;
}

// Issue #1: the hip-badge cover, remixed. A violet nebula instead of murky
// water, twinkling glints instead of bubbles, a new holo letter, and a
// sparkle trail behind the cursor.
export const cyberdelic: IssueArt = {
  Background: () => (
    <>
      <svg>
        <filter id="mondo-nebula" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".0032 .0058"
            numOctaves="4"
            seed="8"
          />
          <feColorMatrix values=".33 .33 .33 0 0  .33 .33 .33 0 0  .33 .33 .33 0 0  0 0 0 0 1" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="2.8" intercept="-.9" />
            <feFuncG type="linear" slope="2.8" intercept="-.9" />
            <feFuncB type="linear" slope="2.8" intercept="-.9" />
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncR type="table" tableValues=".02 .06 .17 .44 .86 1" />
            <feFuncG type="table" tableValues=".01 .01 .03 .07 .3 .82" />
            <feFuncB type="table" tableValues=".06 .15 .32 .46 .5 .7" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#mondo-nebula)" />
      </svg>
      <div className="cy-glints" />
      <div className="cy-shade" />
      <Sparkles />
    </>
  ),
};
