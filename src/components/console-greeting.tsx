"use client";

import { useEffect } from "react";

/**
 * Greets developers who open DevTools. Runs once on first mount.
 */
export function ConsoleGreeting() {
  useEffect(() => {
    const heading =
      "font-size: 14px; font-weight: 700; line-height: 1.5; color: #171717;";
    const body =
      "font-size: 13px; line-height: 1.6; color: #555;";

    /* eslint-disable no-console */
    console.log(
      "%cHi.\n%cI'm Erik. If you're poking around, that's fair. I'd do the same.\n\nemail · erikcativo@pm.me\nx · x.com/eriklocalhost\ngithub · github.com/swedishfrenchpress",
      heading,
      body
    );
    /* eslint-enable no-console */
  }, []);

  return null;
}
