"use client";

import { cyberdelic } from "@/components/mondo/art/cyberdelic";
import { rave } from "@/components/mondo/art/rave";
import { MASTHEADS, type Issue } from "@/components/mondo/issues";
import { Masthead } from "@/components/mondo/masthead";
import { usePathname } from "next/navigation";
import "./mondo.css";

export { FONT_VARIABLES, loadIssueFonts } from "@/components/mondo/fonts";

/** Per-issue artwork that CSS alone can't draw. */
export type IssueArt = {
  /** Fixed, full-viewport layer behind everything. */
  Background?: React.ComponentType;
  /** Footer furniture after the page content. */
  Foot?: React.ComponentType;
};

const ART: Record<string, IssueArt> = {
  cyberdelic,
  rave,
};

export function MondoTop({ issue }: { issue: Issue }) {
  const pathname = usePathname();
  const { Background } = ART[issue.id] ?? {};

  return (
    <>
      <div className="mondo-bg" aria-hidden="true">
        {Background && <Background />}
      </div>
      <div className="mondo-cover" aria-hidden="true">
        <Masthead text={MASTHEADS[pathname] ?? MASTHEADS["/"]} issue={issue} />
      </div>
    </>
  );
}

export function MondoBottom({ issue }: { issue: Issue }) {
  const { Foot } = ART[issue.id] ?? {};
  if (!Foot) return null;

  return (
    <footer className="mondo-foot" aria-hidden="true">
      <Foot />
    </footer>
  );
}
