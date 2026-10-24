import * as THREE from "three";

export type RGB = readonly [number, number, number];

/** The world a chrome ball reflects: a direction (y up, z toward the viewer) to an sRGB colour, 0…1. */
export type Env = (x: number, y: number, z: number) => RGB;

export const rgb = (hex: number): RGB => [
  ((hex >> 16) & 255) / 255,
  ((hex >> 8) & 255) / 255,
  (hex & 255) / 255,
];

export const mix = (a: RGB, b: RGB, t: number): RGB => {
  const k = Math.min(1, Math.max(0, t));
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
};

export const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Walks a matcap's pixels with the direction a perfect mirror ball reflects
 * there, for a camera looking down -z. Pixels past the rim reuse the rim.
 */
function forEachReflection(
  size: number,
  visit: (index: number, x: number, y: number, z: number) => void,
) {
  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      let nx = ((i + 0.5) / size) * 2 - 1;
      let ny = 1 - ((j + 0.5) / size) * 2;
      const d2 = nx * nx + ny * ny;
      if (d2 > 0.998) {
        const k = Math.sqrt(0.998 / d2);
        nx *= k;
        ny *= k;
      }
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      visit(j * size + i, 2 * nz * nx, 2 * nz * ny, 2 * nz * nz - 1);
    }
  }
}

/** A matcap of a chrome ball sitting in `env`: the trick 90s renderers used for "raytraced" metal. */
export function chromeMatcap(env: Env, size = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const image = ctx.createImageData(size, size);
  const { data } = image;

  forEachReflection(size, (index, x, y, z) => {
    const [r, g, b] = env(x, y, z);
    data[index * 4] = r * 255;
    data[index * 4 + 1] = g * 255;
    data[index * 4 + 2] = b * 255;
    data[index * 4 + 3] = 255;
  });

  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
