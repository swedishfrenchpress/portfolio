import type { IssueArt } from "@/components/mondo/mondo-layer";
import "./rave.css";

// Issue #2: a '92 rave flyer. Posterized rainbow plasma behind, a melted
// masthead swaying with the smiley, and the recent rotation set like a lineup.
export const rave: IssueArt = {
  Background: () => (
    <>
      <svg>
        <filter id="mondo-acid" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="turbulence"
            baseFrequency=".0026 .0038"
            numOctaves="3"
            seed="23"
          />
          <feColorMatrix values=".33 .33 .33 0 0  .33 .33 .33 0 0  .33 .33 .33 0 0  0 0 0 0 1" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="1 1 .1 0 .1 1 1 1 .1 0 .1 1 1" />
            <feFuncG type="table" tableValues="0 .85 1 .9 0 0 .4 .85 1 .9 0 0 .4" />
            <feFuncB type="table" tableValues=".6 0 0 1 1 .9 .1 0 0 1 1 .9 .1" />
          </feComponentTransfer>
        </filter>
        <filter id="mondo-melt" x="-5%" y="-15%" width="110%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".005 .02"
            numOctaves="2"
            seed="5"
          />
          <feDisplacementMap
            in="SourceGraphic"
            scale="24"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#mondo-acid)" />
      </svg>
      <div className="rv-dim" />
    </>
  ),
  Foot: () => <div className="rv-smiley" />,
};
