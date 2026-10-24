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

const DIGITS = 6;

// A real hit counter: every MONDO page view bumps the count on the server
// (src/app/api/visits). Each page is counted once, however many times React
// mounts the counter, and switching issues on the same page isn't a new view.
let lastPath = "";
let latest: Promise<number | null> = Promise.resolve(null);

function countVisit(pathname: string) {
  if (pathname !== lastPath) {
    lastPath = pathname;
    latest = fetch("/api/visits", { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => (typeof body?.count === "number" ? body.count : null))
      .catch(() => null);
  }
  return latest;
}

export function VisitorCounter() {
  const pathname = usePathname();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let live = true;
    countVisit(pathname).then((n) => {
      if (live) setCount(n);
    });
    return () => {
      live = false;
    };
  }, [pathname]);

  // No count, no counter: it never shows a made-up number.
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
