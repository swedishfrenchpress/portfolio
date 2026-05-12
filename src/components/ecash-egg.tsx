"use client";

import { useEffect, useState } from "react";

const SECRET = "ecash";
const BUFFER_TIMEOUT_MS = 1500;
const TOAST_DURATION_MS = 1800;

/**
 * Listens for the typed sequence "ecash" anywhere on the page (outside form
 * inputs). On match, shows a brief "unblinded." toast. Discovery-only;
 * never announced.
 */
export function EcashEgg() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let buffer = "";
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key.length !== 1) return;

      buffer = (buffer + e.key.toLowerCase()).slice(-SECRET.length);

      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        buffer = "";
      }, BUFFER_TIMEOUT_MS);

      if (buffer === SECRET) {
        buffer = "";
        setShow(true);
        if (hideTimer) clearTimeout(hideTimer);
        hideTimer = setTimeout(() => setShow(false), TOAST_DURATION_MS);
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (resetTimer) clearTimeout(resetTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className="egg-toast fixed bottom-24 right-6 z-50 rounded-full bg-foreground text-background px-4 py-1.5 text-sm font-medium tracking-tight pointer-events-none select-none"
    >
      unblinded.
    </div>
  );
}
