"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const WELCOME: Readonly<Record<string, string>> = {
  "/": "WELCOME TO ERIK’S WEBPAGE",
  "/projects": "YOU ARE NOW ENTERING THE PROJECTS ZONE",
  "/talks": "LIVE ON STAGE: ERIK’S TALKS",
};

const GAGS = [
  "NOW IN 3D!!!",
  "BEST VIEWED IN NETSCAPE NAVIGATOR 3.0 AT 800×600",
  "THIS PAGE IS UNDER CONSTRUCTION",
  "ECASH ACCEPTED HERE",
  "SIGN MY GUESTBOOK",
  "ADD ME TO YOUR WEBRING",
  "THIS PAGE IS NEVER FINISHED",
];

/** A <marquee>, minus the deprecation: two copies scrolling end to end. */
export function Marquee() {
  const pathname = usePathname();
  const line = `*** ${[WELCOME[pathname] ?? WELCOME["/"], ...GAGS].join(" *** ")} `;

  return (
    <div className="mondo-marquee">
      <div className="mondo-marquee-track" style={{ "--chars": line.length } as React.CSSProperties}>
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  );
}

// The count is the number of days since the first website went up
// (6 August 1991), plus one for every page opened while MONDO is on.
const FIRST_WEBSITE = Date.UTC(1991, 7, 6);
const DIGITS = 6;
let views = 0;
let lastPath = "";

export function VisitorCounter() {
  const pathname = usePathname();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (pathname !== lastPath) {
      lastPath = pathname;
      views++;
    }
    setCount(Math.floor((Date.now() - FIRST_WEBSITE) / 86_400_000) + views);
  }, [pathname]);

  if (count === null) return null;
  const digits = String(count).padStart(DIGITS, "0").split("");

  return (
    <p className="mondo-counter">
      <span>you are visitor number</span>
      <span className="mondo-digits">
        {digits.map((digit, i) => (
          // A new key per value, so a changed digit rolls in.
          <span key={`${i}-${digit}`} className="mondo-digit">
            {digit}
          </span>
        ))}
      </span>
    </p>
  );
}
