import type { MastLayout } from "./pearls";
import { Stage, type WarpSeed } from "./stage";

export type { MastLayout } from "./pearls";
export type { WarpSeed } from "./stage";

// One stage for the whole MONDO session. React can mount the pieces that
// talk to it in any order (and StrictMode mounts them twice in dev), so this
// remembers what they asked for and hands it over once the stage exists.
let stage: Stage | null = null;
let canvas: HTMLCanvasElement | null = null;
let disposeTimer: ReturnType<typeof setTimeout> | undefined;
let issue = "";
let mast: HTMLElement | null = null;
let layout: MastLayout | null = null;
let pending: WarpSeed | null = null;

/** Puts the stage's canvas in `host`, booting WebGL if needed. False if WebGL is unavailable. */
export function attachStage(host: HTMLElement, id: string) {
  clearTimeout(disposeTimer);
  issue = id;
  if (!stage) {
    canvas = document.createElement("canvas");
    canvas.className = "mondo-stage";
    try {
      stage = new Stage(canvas);
    } catch {
      canvas = null;
      return false;
    }
    if (pending) stage.warp(pending);
    pending = null;
    if (issue) stage.setIssue(issue);
    stage.setMasthead(mast, layout);
  }
  host.append(canvas!);
  return true;
}

/** Tears the stage down, unless something re-attaches it straight away. */
export function detachStage() {
  disposeTimer = setTimeout(() => {
    stage?.dispose();
    stage = null;
    canvas?.remove();
    canvas = null;
    issue = "";
  });
}

export function showIssue(id: string) {
  if (id === issue && stage) return;
  issue = id;
  stage?.setIssue(id);
}

export function placeMasthead(element: HTMLElement | null, next: MastLayout | null) {
  mast = element;
  layout = next;
  stage?.setMasthead(element, next);
}

export function warp(seed: WarpSeed) {
  if (stage) stage.warp(seed);
  else pending = seed;
}
