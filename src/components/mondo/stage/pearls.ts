import * as THREE from "three";
import type { Frame, PearlLook } from "./types";

const CAPACITY = 4096;
/** Depth of the vanishing point every bead flies in from and out to. */
const FAR = -9000;
const FOV = 30;

// Spring that pulls a bead home: underdamped, so it lands with a wobble.
const STIFFNESS = 130;
const DAMPING = 13;

const DEAD = 0;
const HOME = 1; // on its masthead pixel, springing
const EMERGE = 2; // flying out of the vanishing point to its pixel
const FLY = 3; // flying away into the vanishing point, then gone

/** Masthead pixels, in px from the masthead box's top left: [x, y, rx, ry, letter] each. */
export type MastLayout = { beads: Float32Array; count: number };

/** Points to shatter into beads, in client px: [x, y, radius] each. */
export type Debris = { points: Float32Array; count: number; originX: number; originY: number };

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * The chrome beads: the masthead's pixels, and the debris a page shatters
 * into between issues. One instanced mesh, drawn in a space where one unit is
 * one CSS pixel at z = 0, so beads line up with the DOM exactly.
 */
export class Pearls {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(FOV, 1, 10, 30000);

  private mesh: THREE.InstancedMesh;
  private material = new THREE.MeshMatcapMaterial();
  /** Every bead's hard drop shadow, so the letters hold up over a busy world. */
  private shadow: THREE.InstancedMesh;
  private shadowMaterial = new THREE.MeshBasicMaterial({ depthWrite: false });
  private round: THREE.BufferGeometry;
  private faceted = new THREE.IcosahedronGeometry(1, 1);
  private look: PearlLook | null = null;

  private mode = new Uint8Array(CAPACITY);
  private px = new Float32Array(CAPACITY);
  private py = new Float32Array(CAPACITY);
  private pz = new Float32Array(CAPACITY);
  private vx = new Float32Array(CAPACITY);
  private vy = new Float32Array(CAPACITY);
  private vz = new Float32Array(CAPACITY);
  // Flight path: a quadratic Bézier from a through b to c, from t0 for dur.
  private ax = new Float32Array(CAPACITY);
  private ay = new Float32Array(CAPACITY);
  private az = new Float32Array(CAPACITY);
  private bx = new Float32Array(CAPACITY);
  private by = new Float32Array(CAPACITY);
  private bz = new Float32Array(CAPACITY);
  private cx = new Float32Array(CAPACITY);
  private cy = new Float32Array(CAPACITY);
  private t0 = new Float32Array(CAPACITY);
  private dur = new Float32Array(CAPACITY);
  private rx = new Float32Array(CAPACITY);
  private ry = new Float32Array(CAPACITY);
  /** Index into the masthead layout, for beads that live there. */
  private pixel = new Int32Array(CAPACITY);
  private spin = new Float32Array(CAPACITY);
  private spinRate = new Float32Array(CAPACITY);
  private axis: THREE.Vector3[] = [];

  private free: number[] = [];
  /** Slots of the masthead beads, in layout order. */
  private mast: number[] = [];
  private layout: MastLayout | null = null;
  private now = 0;
  private width = 1;
  private height = 1;

  // Scratch objects for composing instance matrices.
  private m = new THREE.Matrix4();
  private q = new THREE.Quaternion();
  private v = new THREE.Vector3();
  private s = new THREE.Vector3();

  constructor(private motion: boolean, coarse: boolean) {
    this.round = new THREE.SphereGeometry(1, coarse ? 14 : 22, coarse ? 10 : 16);
    this.mesh = new THREE.InstancedMesh(this.round, this.material, CAPACITY);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.mesh.count = 0;

    // The shadow pass shares the beads' matrices: each bead again, fattened,
    // nudged down-right and pushed back, in a flat colour.
    this.shadowMaterial.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace("#include <begin_vertex>", "vec3 transformed = position * 1.3;")
        .replace(
          "#include <project_vertex>",
          `#include <project_vertex>
          float r = length(instanceMatrix[0].xyz);
          mvPosition.xy += vec2(0.32, -0.4) * r;
          mvPosition.z -= r * 1.5;
          gl_Position = projectionMatrix * mvPosition;`,
        );
    };
    this.shadow = new THREE.InstancedMesh(this.round, this.shadowMaterial, CAPACITY);
    this.shadow.instanceMatrix = this.mesh.instanceMatrix;
    this.shadow.frustumCulled = false;
    this.shadow.count = 0;
    this.scene.add(this.shadow, this.mesh);

    for (let i = CAPACITY - 1; i >= 0; i--) {
      this.free.push(i);
      this.axis[i] = new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize();
    }
  }

  setLook(look: PearlLook) {
    this.look = look;
    this.material.matcap = look.matcap;
    this.material.flatShading = !!look.faceted;
    this.material.needsUpdate = true;
    this.mesh.geometry = this.shadow.geometry = look.faceted ? this.faceted : this.round;
    this.shadowMaterial.color.set(look.shadow ?? 0x000000);
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.camera.aspect = width / height;
    this.camera.position.set(0, 0, height / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
    this.camera.updateProjectionMatrix();
  }

  private alloc() {
    const slot = this.free.pop();
    if (slot === undefined) return -1;
    this.pixel[slot] = -1;
    this.vx[slot] = this.vy[slot] = this.vz[slot] = 0;
    this.spin[slot] = 0;
    this.spinRate[slot] = rand(-2, 2);
    return slot;
  }

  private release(slot: number) {
    this.mode[slot] = DEAD;
    this.free.push(slot);
  }

  /** Sends a bead off into the vanishing point from wherever it is. */
  private flyAway(slot: number, delay: number, kick: number) {
    const x = this.px[slot];
    const y = this.py[slot];
    const z = this.pz[slot];
    const out = Math.hypot(x, y) || 1;
    this.mode[slot] = FLY;
    this.ax[slot] = x;
    this.ay[slot] = y;
    this.az[slot] = z;
    this.bx[slot] = x + (x / out) * kick + rand(-60, 60);
    this.by[slot] = y + (y / out) * kick + rand(-60, 60);
    this.bz[slot] = z + rand(150, 650);
    this.cx[slot] = rand(-90, 90);
    this.cy[slot] = rand(-90, 90);
    this.t0[slot] = this.now + delay;
    this.dur[slot] = rand(0.95, 1.45);
    this.spinRate[slot] = rand(-14, 14);
  }

  /** Masthead pixels in client px, or null if the bead has no pixel. */
  private home(slot: number, rect: DOMRect, out: { x: number; y: number }) {
    const layout = this.layout;
    const i = this.pixel[slot];
    if (!layout || i < 0 || i >= layout.count) return false;
    out.x = rect.left + layout.beads[i * 5] - this.width / 2;
    out.y = this.height / 2 - (rect.top + layout.beads[i * 5 + 1]);
    return true;
  }

  /**
   * Points the masthead at a new layout. Beads already on screen spring
   * across to their new pixels, missing ones fly in from the vanishing point
   * and spare ones fly off into it.
   */
  setLayout(layout: MastLayout, emergeDelay = 0) {
    this.layout = layout;
    const n = layout.count;

    for (let i = 0; i < Math.min(n, this.mast.length); i++) {
      this.pixel[this.mast[i]] = i;
    }
    for (let i = n; i < this.mast.length; i++) {
      this.pixel[this.mast[i]] = -1;
      this.flyAway(this.mast[i], 0, 120);
    }
    for (let i = this.mast.length; i < n; i++) {
      const slot = this.alloc();
      if (slot < 0) break;
      this.pixel[slot] = i;
      this.mast.push(slot);
      if (this.motion) {
        this.mode[slot] = EMERGE;
        this.ax[slot] = this.px[slot] = rand(-30, 30);
        this.ay[slot] = this.py[slot] = rand(-30, 30);
        this.az[slot] = this.pz[slot] = FAR;
        this.bx[slot] = rand(-500, 500);
        this.by[slot] = rand(-300, 300);
        this.bz[slot] = rand(700, 1100);
        this.t0[slot] = this.now + emergeDelay + layout.beads[i * 5 + 4] * 0.03 + rand(0, 0.06);
        this.dur[slot] = rand(0.6, 0.8);
      } else {
        this.mode[slot] = HOME;
        this.pz[slot] = 0;
      }
    }
    this.mast.length = Math.min(this.mast.length, n);
  }

  /** The whole masthead dives into the vanishing point (switching issues). */
  dive() {
    if (!this.motion) {
      for (const slot of this.mast) this.release(slot);
      this.mast = [];
      return;
    }
    for (const slot of this.mast) {
      this.pixel[slot] = -1;
      this.flyAway(slot, rand(0, 0.12), rand(80, 260));
    }
    this.mast = [];
  }

  /** Re-forms the current layout out of the vanishing point. */
  reform(delay: number) {
    if (this.layout) this.setLayout(this.layout, delay);
  }

  /**
   * Shatters a page into beads: each one holds until the shockwave from
   * the origin reaches it, then blasts outward and away into the scene.
   */
  burst({ points, count, originX, originY }: Debris) {
    if (!this.motion) return;
    const ox = originX - this.width / 2;
    const oy = this.height / 2 - originY;
    for (let i = 0; i < count; i++) {
      const slot = this.alloc();
      if (slot < 0) break;
      const x = points[i * 3] - this.width / 2;
      const y = this.height / 2 - points[i * 3 + 1];
      const r = points[i * 3 + 2];
      const dx = x - ox;
      const dy = y - oy;
      const d = Math.hypot(dx, dy) || 1;
      const kick = rand(140, 420);

      this.px[slot] = this.ax[slot] = x;
      this.py[slot] = this.ay[slot] = y;
      this.pz[slot] = this.az[slot] = 0;
      this.rx[slot] = this.ry[slot] = r;
      this.mode[slot] = FLY;
      this.bx[slot] = x + (dx / d) * kick + rand(-50, 50);
      this.by[slot] = y + (dy / d) * kick + rand(-50, 50);
      this.bz[slot] = rand(200, 800);
      this.cx[slot] = rand(-120, 120);
      this.cy[slot] = rand(-120, 120);
      this.t0[slot] = this.now + d / 3400 + rand(0, 0.05);
      this.dur[slot] = rand(0.9, 1.5);
      this.spinRate[slot] = rand(-16, 16);
    }
  }

  update(frame: Frame, rect: DOMRect | null, cursor: { x: number; y: number; active: boolean }) {
    this.now = frame.time;
    const dt = Math.min(frame.delta, 1 / 30);
    const t = frame.time;
    const idle = this.look?.idle ?? "wave";
    const layout = this.layout;
    const home = { x: 0, y: 0 };
    const mx = cursor.x - this.width / 2;
    const my = this.height / 2 - cursor.y;
    let n = 0;

    for (let slot = 0; slot < CAPACITY; slot++) {
      const mode = this.mode[slot];
      if (mode === DEAD) continue;

      let sx = this.rx[slot];
      let sy = this.ry[slot];
      const hasHome = rect !== null && this.home(slot, rect, home);
      if (hasHome && layout) {
        const i = this.pixel[slot];
        this.rx[slot] = sx = layout.beads[i * 5 + 2];
        this.ry[slot] = sy = layout.beads[i * 5 + 3];
      }

      if (mode === HOME) {
        if (!hasHome) {
          this.release(slot);
          continue;
        }
        const pitch = sx + sy;
        const letter = layout!.beads[this.pixel[slot] * 5 + 4];
        let tx = home.x;
        let ty = home.y;
        let tz = 0;

        // Letters ripple like a Java applet, or roll toward the viewer in a wave.
        if (frame.motion) {
          if (idle === "wave") ty += Math.sin(t * 2.6 - letter * 0.55) * pitch * 0.3;
          else tz = Math.sin(t * 1.7 - letter * 0.5) * pitch * 2.2;
        }

        if (!this.motion) {
          this.px[slot] = tx;
          this.py[slot] = ty;
          this.pz[slot] = tz;
        } else {
          let fx = STIFFNESS * (tx - this.px[slot]) - DAMPING * this.vx[slot];
          let fy = STIFFNESS * (ty - this.py[slot]) - DAMPING * this.vy[slot];
          let fz = STIFFNESS * (tz - this.pz[slot]) - DAMPING * this.vz[slot];

          // Beads scatter away from the cursor and pop toward the viewer.
          if (cursor.active) {
            const reach = Math.max(80, pitch * 7);
            const dx = this.px[slot] - mx;
            const dy = this.py[slot] - my;
            const d = Math.hypot(dx, dy);
            if (d < reach) {
              const f = (1 - d / reach) ** 2 * STIFFNESS * reach * 1.4;
              fx += (dx / (d || 1)) * f;
              fy += (dy / (d || 1)) * f;
              fz += f * 0.3;
            }
          }

          this.vx[slot] += fx * dt;
          this.vy[slot] += fy * dt;
          this.vz[slot] += fz * dt;
          this.px[slot] += this.vx[slot] * dt;
          this.py[slot] += this.vy[slot] * dt;
          this.pz[slot] += this.vz[slot] * dt;
        }
      } else {
        const s = (t - this.t0[slot]) / this.dur[slot];
        if (s >= 1) {
          if (mode === EMERGE && hasHome) {
            // Land with the speed it arrived at, and let the spring settle it.
            this.mode[slot] = HOME;
            this.vx[slot] = (home.x - this.bx[slot]) * 0.3;
            this.vy[slot] = (home.y - this.by[slot]) * 0.3;
            this.vz[slot] = -this.bz[slot] * 0.3;
          } else {
            this.release(slot);
            continue;
          }
        } else if (s > 0) {
          let k: number;
          let ex: number;
          let ey: number;
          let ez: number;
          if (mode === EMERGE) {
            k = 1 - (1 - s) ** 3;
            ex = hasHome ? home.x : this.cx[slot];
            ey = hasHome ? home.y : this.cy[slot];
            ez = 0;
          } else {
            k = s;
            ex = this.cx[slot];
            ey = this.cy[slot];
            ez = FAR;
          }
          const u = 1 - k;
          this.px[slot] = u * u * this.ax[slot] + 2 * u * k * this.bx[slot] + k * k * ex;
          this.py[slot] = u * u * this.ay[slot] + 2 * u * k * this.by[slot] + k * k * ey;
          this.pz[slot] = u * u * this.az[slot] + 2 * u * k * this.bz[slot] + k * k * ez;
          this.spin[slot] += this.spinRate[slot] * dt;
        }
      }

      this.spin[slot] += this.spinRate[slot] * dt * 0.15;
      this.q.setFromAxisAngle(this.axis[slot], this.spin[slot]);
      this.v.set(this.px[slot], this.py[slot], this.pz[slot]);
      this.s.set(sx, sy, (sx + sy) / 2);
      this.m.compose(this.v, this.q, this.s);
      this.mesh.setMatrixAt(n++, this.m);
    }

    this.mesh.count = this.shadow.count = n;
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  /** True while beads are still flying, so a still frame can keep drawing. */
  get busy() {
    return this.free.length + this.mast.length < CAPACITY;
  }

  dispose() {
    this.round.dispose();
    this.faceted.dispose();
    this.material.dispose();
    this.shadowMaterial.dispose();
    this.mesh.dispose();
  }
}
