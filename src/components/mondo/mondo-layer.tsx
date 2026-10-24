"use client";

import { Marquee, VisitorCounter } from "@/components/mondo/furniture";
import { MASTHEADS, type Issue } from "@/components/mondo/issues";
import { Masthead } from "@/components/mondo/masthead";
import { attachStage, detachStage, showIssue } from "@/components/mondo/stage";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import "./mondo.css";
import "./art/cyberspace.css";
import "./art/raytrace.css";

export { FONT_VARIABLES, loadIssueFonts } from "@/components/mondo/fonts";
export { warp } from "@/components/mondo/stage";
export { sampleWarpSeed } from "@/components/mondo/stage/seed";

/** The fixed WebGL world behind the page. Without WebGL, issues fall back to CSS. */
function World({ issue }: { issue: Issue }) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(issue.id);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("mondo-nogl", !attachStage(ref.current!, first.current));
    return () => {
      detachStage();
      root.classList.remove("mondo-nogl");
    };
  }, []);

  useEffect(() => {
    showIssue(issue.id);
  }, [issue.id]);

  return <div ref={ref} className="mondo-bg" aria-hidden="true" />;
}

export function MondoTop({ issue }: { issue: Issue }) {
  const pathname = usePathname();

  return (
    <>
      <World issue={issue} />
      <div className="mondo-cover">
        <Masthead text={MASTHEADS[pathname] ?? MASTHEADS["/"]} />
        <Marquee />
      </div>
    </>
  );
}

export function MondoBottom() {
  return (
    <footer className="mondo-foot" aria-hidden="true">
      <VisitorCounter />
    </footer>
  );
}
