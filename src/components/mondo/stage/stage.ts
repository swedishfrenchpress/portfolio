import * as THREE from "three";
import { type Debris, type MastLayout, Pearls } from "./pearls";
import { SCENES } from "./scenes";
import type { Frame, IssueScene } from "./types";

/** What the page looked like just before a warp: its text as points, and its background. */
export type WarpSeed = Debris & { background: string };

// A reduced-motion still is taken this far into each issue's loop.
const STILL_TIME = 2.4;

/**
 * The fixed WebGL canvas behind the page: the issue's world, the chrome
 * masthead, and the warp between issues. Draws the backdrop (pixelated if
 * the issue asks), then a cover used to fade between pages and issues, then
 * the beads on top.
 */
export class Stage {
  private renderer: THREE.WebGLRenderer;
  private pearls: Pearls;
  private scene: IssueScene | null = null;
  private target: THREE.WebGLRenderTarget;
  private screen = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private blit: THREE.Scene;
  private blitMaterial: THREE.MeshBasicMaterial;
  private cover: THREE.Scene;
  private coverMaterial: THREE.MeshBasicMaterial;
  private quad = new THREE.PlaneGeometry(2, 2);

  private frame: Frame;
  private motion: boolean;
  private raf = 0;
  private last = 0;
  private cursor = { x: -1e4, y: -1e4, active: false };
  private aim = new THREE.Vector2();
  private lastScroll = 0;
  private mast: HTMLElement | null = null;

  // Warp choreography.
  private warpGoal = 0;
  private coverAlpha = 0;
  private coverHold = 0;
  private coverFade = 1;
  private pending: WarpSeed | null = null;
  private swapping = false;
  private emergeAt = 0;

  constructor(private canvas: HTMLCanvasElement) {
    this.motion = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.autoClear = false;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.5 : 2));

    this.target = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.HalfFloatType,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
    });
    this.blitMaterial = new THREE.MeshBasicMaterial({
      map: this.target.texture,
      depthTest: false,
      depthWrite: false,
    });
    this.blit = new THREE.Scene().add(new THREE.Mesh(this.quad, this.blitMaterial));
    this.coverMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    this.cover = new THREE.Scene().add(new THREE.Mesh(this.quad, this.coverMaterial));

    this.pearls = new Pearls(this.motion, coarse);
    this.frame = {
      time: this.motion ? 0 : STILL_TIME,
      delta: 0,
      width: 1,
      height: 1,
      pointer: new THREE.Vector2(),
      scroll: scrollY,
      scrollSpeed: 0,
      warp: 0,
      motion: this.motion,
    };
    this.lastScroll = scrollY;

    this.resize();
    addEventListener("resize", this.resize);
    addEventListener("pointermove", this.onPointer, { passive: true });
    addEventListener("pointerdown", this.onPointer, { passive: true });
    addEventListener("pointerup", this.onLift, { passive: true });
    addEventListener("pointercancel", this.onLift, { passive: true });
    document.documentElement.addEventListener("pointerleave", this.onLeave);
    addEventListener("blur", this.onLeave);
    if (this.motion) {
      this.raf = requestAnimationFrame(this.tick);
    } else {
      addEventListener("scroll", this.request, { passive: true });
    }
  }

  /** Switches the world. Mid-warp, it flashes in behind the flying beads. */
  setIssue(id: string) {
    const factory = SCENES[id];
    if (!factory) return;
    this.scene?.dispose();
    this.scene = factory(this.frame);
    this.scene.resize(this.frame.width, this.frame.height);
    this.pearls.setLook(this.scene.look);

    const seed = this.pending;
    this.pending = null;
    if (seed) {
      // Arriving from the plain site: the page's own background holds for
      // a beat while its text shatters, then melts into the new world.
      this.coverMaterial.color.set(seed.background);
      this.cover1(1, 0.18, 0.75);
      this.pearls.burst(seed);
      this.frame.warp = 1;
      this.emergeAt = this.frame.time + 0.3;
    } else if (this.swapping) {
      // Hyperspace: a white flash and the new world rushing in.
      this.coverMaterial.color.set("#fff");
      this.cover1(0.9, 0, 0.5);
      this.frame.warp = 1;
      this.pearls.reform(0.1);
    }
    this.swapping = false;
    this.warpGoal = 0;
    this.request();
  }

  private cover1(alpha: number, hold: number, fade: number) {
    this.coverAlpha = alpha;
    this.coverHold = hold;
    this.coverFade = fade;
  }

  /** The masthead's box in the page and its pixels inside it. */
  setMasthead(element: HTMLElement | null, layout: MastLayout | null) {
    this.mast = element;
    if (layout) {
      this.pearls.setLayout(layout, Math.max(0, this.emergeAt - this.frame.time));
    }
    this.request();
  }

  /**
   * Starts the warp out of the current page. With a world already up, the
   * text shatters over it and the masthead dives in; otherwise the seed
   * waits for the first setIssue.
   */
  warp(seed: WarpSeed) {
    if (!this.scene) {
      this.pending = seed;
      return;
    }
    this.swapping = true;
    this.warpGoal = 1;
    this.pearls.dive();
    this.pearls.burst(seed);
    this.request();
  }

  private resize = () => {
    const width = innerWidth;
    const height = innerHeight;
    this.frame.width = width;
    this.frame.height = height;
    this.renderer.setSize(width, height, false);
    this.pearls.resize(width, height);
    this.scene?.resize(width, height);
    this.request();
  };

  private onPointer = (event: PointerEvent) => {
    this.cursor.x = event.clientX;
    this.cursor.y = event.clientY;
    this.cursor.active = event.pointerType !== "touch" || event.buttons > 0 || event.type === "pointerdown";
    this.aim.set((event.clientX / innerWidth) * 2 - 1, 1 - (event.clientY / innerHeight) * 2);
  };

  /** A finger lifting is a cursor leaving. */
  private onLift = (event: PointerEvent) => {
    if (event.pointerType === "touch") this.onLeave();
  };

  private onLeave = () => {
    this.cursor.active = false;
    this.aim.set(0, 0);
  };

  /** Without motion there is no loop: draw once when something changes. */
  private request = () => {
    if (this.motion || this.raf) return;
    this.raf = requestAnimationFrame((ms) => {
      this.raf = 0;
      this.draw(ms);
    });
  };

  private tick = (ms: number) => {
    this.raf = requestAnimationFrame(this.tick);
    this.draw(ms);
  };

  private draw(ms: number) {
    const f = this.frame;
    const dt = this.last ? Math.min((ms - this.last) / 1000, 0.1) : 1 / 60;
    this.last = ms;

    if (this.motion) {
      f.time += dt;
      f.delta = dt;
      const ease = 1 - Math.exp(-dt * 4);
      f.pointer.lerp(this.aim, ease);
      const speed = (scrollY - this.lastScroll) / Math.max(dt, 1e-3);
      f.scrollSpeed += (speed - f.scrollSpeed) * (1 - Math.exp(-dt * 6));
      // Warp builds fast and dies away slowly.
      const rate = this.warpGoal > f.warp ? 7 : 1.6;
      f.warp += (this.warpGoal - f.warp) * (1 - Math.exp(-dt * rate));
      if (this.coverHold > 0) this.coverHold -= dt;
      else this.coverAlpha = Math.max(0, this.coverAlpha - dt / this.coverFade);
    } else {
      f.delta = 0;
      f.warp = 0;
      this.coverAlpha = 0;
    }
    // Reduced motion still redraws on scroll so the masthead follows the
    // page, but the world itself stays put: no scroll-linked camera.
    f.scroll = this.motion ? scrollY : 0;
    this.lastScroll = scrollY;

    const r = this.renderer;
    r.setRenderTarget(null);
    r.setClearColor(0x000000, 1);
    r.clear();

    const scene = this.scene;
    if (scene) {
      if (scene.pixelSize > 1) {
        const w = Math.ceil(f.width / scene.pixelSize);
        const h = Math.ceil(f.height / scene.pixelSize);
        if (this.target.width !== w || this.target.height !== h) this.target.setSize(w, h);
        r.setRenderTarget(this.target);
        r.clear();
        scene.render(r, f);
        r.setRenderTarget(null);
        r.render(this.blit, this.screen);
      } else {
        scene.render(r, f);
      }
    }

    if (this.coverAlpha > 0) {
      this.coverMaterial.opacity = Math.min(1, this.coverAlpha);
      r.render(this.cover, this.screen);
    }

    r.clearDepth();
    this.pearls.update(f, this.mast?.getBoundingClientRect() ?? null, this.cursor);
    r.render(this.pearls.scene, this.pearls.camera);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    removeEventListener("resize", this.resize);
    removeEventListener("pointermove", this.onPointer);
    removeEventListener("pointerdown", this.onPointer);
    removeEventListener("pointerup", this.onLift);
    removeEventListener("pointercancel", this.onLift);
    document.documentElement.removeEventListener("pointerleave", this.onLeave);
    removeEventListener("blur", this.onLeave);
    removeEventListener("scroll", this.request);
    this.scene?.dispose();
    this.pearls.dispose();
    this.target.dispose();
    this.quad.dispose();
    this.blitMaterial.dispose();
    this.coverMaterial.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}
