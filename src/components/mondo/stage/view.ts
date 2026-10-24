import type * as THREE from "three";

/**
 * Renders a window cut from a bigger frame so the camera's vanishing point
 * lands at (x, y) on screen, as fractions from the top left, instead of dead
 * centre where the prose panel would hide it.
 */
export function aim(camera: THREE.PerspectiveCamera, width: number, height: number, x: number, y: number) {
  const fullWidth = width * 2 * Math.max(x, 1 - x);
  const fullHeight = height * 2 * Math.max(y, 1 - y);
  camera.setViewOffset(fullWidth, fullHeight, fullWidth / 2 - x * width, fullHeight / 2 - y * height, width, height);
}
