import type * as THREE from "three";

/** Everything a scene needs to draw one frame. */
export type Frame = {
  /** Seconds since the stage started; frozen when motion is off. */
  time: number;
  delta: number;
  /** Viewport in CSS pixels. */
  width: number;
  height: number;
  /** Smoothed cursor, -1…1 on both axes, y up. Rests at 0 on touch screens. */
  pointer: THREE.Vector2;
  /** window.scrollY, and how fast it is changing (px/s, smoothed). */
  scroll: number;
  scrollSpeed: number;
  /** 0…1: how hard the stage is warping between issues right now. */
  warp: number;
  /** False with prefers-reduced-motion: draw a still. */
  motion: boolean;
};

/** How the masthead beads look and idle in an issue. */
export type PearlLook = {
  /** A picture of a chrome ball reflecting this issue's world. */
  matcap: THREE.Texture;
  /** Colour of the beads' hard drop shadow; black if unset. */
  shadow?: THREE.ColorRepresentation;
  /** Low-poly faceted beads instead of round pearls. */
  faceted?: boolean;
  /** How the beads move while nobody is touching them. */
  idle: "wave" | "spin";
};

export type IssueScene = {
  /** CSS pixels per rendered pixel: above 1 draws chunky 90s pixels. */
  pixelSize: number;
  look: PearlLook;
  resize(width: number, height: number): void;
  /** Draws the backdrop into whatever render target is bound. */
  render(renderer: THREE.WebGLRenderer, frame: Frame): void;
  dispose(): void;
};

export type SceneFactory = (frame: Frame) => IssueScene;
