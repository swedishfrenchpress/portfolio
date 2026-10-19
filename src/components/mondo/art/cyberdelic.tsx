import type { IssueArt } from "@/components/mondo/mondo-layer";
import "./cyberdelic.css";

// Issue #1: the hip-badge cover, remixed. A violet nebula instead of murky
// water, glints instead of bubbles, and a new holo letter.
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
    </>
  ),
};
