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

// A real hit counter: a visitor's first MONDO page in a browser session bumps
// the count on the server (src/app/api/visits). Their number is kept for the
// rest of the session, so moving between pages, reloading, switching issues or
// React remounting the counter never counts them again.
const SESSION_KEY = "mondo:visitor";
let visit: Promise<number | null> | null = null;

/** sessionStorage, or nothing where the browser blocks it. */
function session(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function countVisit() {
  if (!visit) {
    const seen = Number(session()?.getItem(SESSION_KEY));
    visit =
      seen > 0
        ? Promise.resolve(seen)
        : fetch("/api/visits", { method: "POST" })
            .then((res) => (res.ok ? res.json() : null))
            .then((body) => (typeof body?.count === "number" ? body.count : null))
            .catch(() => null)
            .then((count) => {
              if (count === null) {
                visit = null; // nothing was counted, so the next page may try again
              } else {
                try {
                  session()?.setItem(SESSION_KEY, String(count));
                } catch {}
              }
              return count;
            });
  }
  return visit;
}

export function VisitorCounter() {
  const pathname = usePathname();
  const [count, setCount] = useState<number | null>(null);

  // Asked again on each page only so a failed count gets another try.
  useEffect(() => {
    let live = true;
    countVisit().then((n) => {
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
