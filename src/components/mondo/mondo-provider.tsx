"use client";

import { GlobeDefs } from "@/components/mondo/globe";
import { GUESTBOOK_PATH, ISSUES, type Issue } from "@/components/mondo/issues";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

type MondoLayer = typeof import("@/components/mondo/mondo-layer");

// Everything MONDO (CSS, fonts, furniture) lives in one lazy chunk, so the
// normal site never downloads it.
let layerPromise: Promise<MondoLayer> | undefined;
export function loadMondoLayer() {
  layerPromise ??= import("@/components/mondo/mondo-layer");
  return layerPromise;
}

const FONT_TIMEOUT_MS = 800;
// The warp: the page shatters into beads at once; between issues the old
// world plays on for a beat before the new one flashes in; the page then
// rushes back out of the vanishing point while the masthead re-forms.
const WARP_SWAP_MS = 420;
const WARP_CONTENT_MS = 650;
const WARP_SETTLE_MS = 800;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type MondoState = {
  issue: Issue | null;
  layer: MondoLayer | null;
  /** Off → first issue → … → last issue → off. */
  next: () => void;
};

const MondoContext = createContext<MondoState>({
  issue: null,
  layer: null,
  next: () => {},
});

export function useMondo() {
  return useContext(MondoContext);
}

export function MondoProvider({ children }: { children: React.ReactNode }) {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [layer, setLayer] = useState<MondoLayer | null>(null);
  const busy = useRef(false);

  const show = useCallback(async (target: Issue | null, animate: boolean) => {
    if (busy.current) return;
    busy.current = true;
    const root = document.documentElement;

    try {
      let loaded: MondoLayer | null = null;
      if (target) {
        loaded = await loadMondoLayer();
        root.classList.add(...loaded.FONT_VARIABLES);
        await Promise.race([loaded.loadIssueFonts(), wait(FONT_TIMEOUT_MS)]);
      }

      const apply = () => {
        if (target) root.dataset.mondo = target.id;
        else delete root.dataset.mondo;
        if (loaded) setLayer(loaded);
        setIssue(target);
      };

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      // Sync either way, so the issue CSS never paints over the old DOM.
      if (!animate || reduceMotion) {
        flushSync(apply);
        return;
      }

      // Into or between issues: the warp. Hiding the page and seeding the
      // stage happen in one frame, so the text turns to beads in place.
      if (loaded) {
        const between = "mondo" in root.dataset;
        loaded.warp(loaded.sampleWarpSeed());
        root.classList.add("mondo-warp");
        if (between) await wait(WARP_SWAP_MS);
        flushSync(apply);
        await wait(WARP_CONTENT_MS);
        root.classList.replace("mondo-warp", "mondo-warp-in");
        await wait(WARP_SETTLE_MS);
        root.classList.remove("mondo-warp-in");
        return;
      }

      // Back to normal: the theme crossfade.
      if (!document.startViewTransition) {
        flushSync(apply);
        return;
      }
      const transition = document.startViewTransition(() => {
        flushSync(apply);
      });
      // A hidden tab aborts the animation; the switch itself still happens.
      transition.ready.catch(() => {});
      await transition.finished.catch(() => {});
    } finally {
      busy.current = false;
    }
  }, []);

  const pathname = usePathname();
  const router = useRouter();
  /** Set while switching MONDO off on the guestbook, until the way home lands. */
  const leaving = useRef(false);

  const next = useCallback(() => {
    const index = issue ? ISSUES.indexOf(issue) : -1;
    const target = ISSUES[index + 1] ?? null;
    // The guestbook only exists in MONDO, so leaving MONDO leaves it too.
    if (!target && pathname === GUESTBOOK_PATH) {
      leaving.current = true;
      router.push("/");
    }
    show(target, true);
  }, [issue, pathname, router, show]);

  // Landing on the guestbook directly, or reloading it, switches MONDO on.
  useEffect(() => {
    if (pathname !== GUESTBOOK_PATH) {
      leaving.current = false;
    } else if (!leaving.current && !("mondo" in document.documentElement.dataset)) {
      show(ISSUES[0], false);
    }
  }, [pathname, show]);

  // Dev only: ?issue=<id> opens straight into an issue while iterating.
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const id = new URLSearchParams(window.location.search).get("issue");
    const target = ISSUES.find((i) => i.id === id);
    if (target) show(target, false);
  }, [show]);

  return (
    <MondoContext.Provider value={{ issue, layer, next }}>
      <GlobeDefs />
      {children}
    </MondoContext.Provider>
  );
}
