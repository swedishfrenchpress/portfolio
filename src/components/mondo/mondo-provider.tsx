"use client";

import { GlobeDefs } from "@/components/mondo/globe";
import { ISSUES, type Issue } from "@/components/mondo/issues";
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
        await Promise.race([
          loaded.loadIssueFonts(target.id),
          new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT_MS)),
        ]);
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
      if (!animate || reduceMotion || !document.startViewTransition) {
        flushSync(apply);
        return;
      }

      // Into or between issues: the CRT. Back to normal: the theme crossfade.
      root.classList.toggle("mondo-crt", target !== null);
      const transition = document.startViewTransition(() => {
        flushSync(apply);
      });
      await transition.finished.catch(() => {});
      root.classList.remove("mondo-crt");
    } finally {
      busy.current = false;
    }
  }, []);

  const next = useCallback(() => {
    const index = issue ? ISSUES.indexOf(issue) : -1;
    show(ISSUES[index + 1] ?? null, true);
  }, [issue, show]);

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
