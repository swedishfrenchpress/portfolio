"use client";

import { GUESTBOOK_PATH } from "@/components/mondo/issues";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NOTICE = "*** THIS PAGE IS UNDER CONSTRUCTION ***";
const CALL = "SIGN MY GUESTBOOK";
/** Enough copies of the line that half of them always overfill the marquee. */
const COPIES = 4;

/**
 * A <marquee>, minus the deprecation. The line repeats end to end; only the
 * first copy is real to screen readers and the keyboard, and the scroll
 * holds still under the cursor or focus so the link can be caught.
 */
export function Marquee() {
  const chars = ((NOTICE.length + CALL.length + 2) * COPIES) / 2;

  return (
    <div className="mondo-marquee">
      <div className="mondo-marquee-track" style={{ "--chars": chars } as React.CSSProperties}>
        {Array.from({ length: COPIES }, (_, i) => (
          <span key={i} aria-hidden={i > 0 || undefined}>
            {NOTICE}{" "}
            <Link href={GUESTBOOK_PATH} tabIndex={i > 0 ? -1 : undefined}>
              {CALL}
            </Link>{" "}
          </span>
        ))}
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
