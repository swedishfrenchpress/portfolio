import * as THREE from "three";
import { chromeMatcap, mix, rgb, smoothstep } from "../matcap";
import type { SceneFactory } from "../types";
import { aim } from "../view";

const RADIUS = 10;
const SPOKES = 24;
const RING_GAP = 4;
const RINGS = 26;
const BEADS_PER_RING = 14;
/** Beads alternate colour and stagger every other ring, so the tunnel repeats every two rings. */
const PERIOD = RING_GAP * 2;

const CYAN = 0x45c2ee;
const MAGENTA = 0xf0369c;
const YELLOW = 0xd6d23c;

const cyan = rgb(CYAN);
const yellow = rgb(YELLOW);
const white = rgb(0xffffff);
/** Where the tunnel converges, from the top of the screen: behind the masthead. */
const VANISH_Y = 0.15;

// A low-poly crystal bead, like the white R at the end of The Rage's
// tunnel: a pale sky, a cyan horizon and a hot pink floor, so every facet
// catches a different one.
const crystal = (x: number, y: number, z: number) => {
  const sky = mix(rgb(0xc4ecff), white, smoothstep(0.05, 0.75, y));
  const floor = mix(rgb(0xff5cb6), rgb(0x4a0b4e), smoothstep(-0.05, -0.85, y));
  let c = y > 0 ? sky : floor;
  c = mix(c, cyan, smoothstep(0.14, 0, Math.abs(y)) * 0.9);
  c = mix(c, yellow, smoothstep(0.55, 0.95, -x) * 0.35);
  return mix(c, white, Math.max(0, x * -0.45 + y * 0.6 + z * 0.66) ** 24);
};

/**
 * Issue: Cyberspace. An early-VR fly-through down a wireframe tunnel lined
 * with rings of faceted beads, depth-cued into black, with the MONDO globe
 * turning low-poly at the vanishing point. Scrolling flies you deeper; scroll
 * fast and it goes to warp.
 */
export const cyberspace: SceneFactory = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  // Depth-cued hard into black, so the far end is a void the masthead floats in.
  scene.fog = new THREE.Fog(0x000000, 6, 70);
  const camera = new THREE.PerspectiveCamera(90, 1, 0.1, 400);

  const world = new THREE.Group();
  scene.add(world);

  // Wireframe: rings, and spokes running the length of the tunnel.
  const points: number[] = [];
  const SEGMENTS = 48;
  for (let r = 0; r < RINGS; r++) {
    const z = -r * RING_GAP;
    for (let s = 0; s < SEGMENTS; s++) {
      const a0 = (s / SEGMENTS) * Math.PI * 2;
      const a1 = ((s + 1) / SEGMENTS) * Math.PI * 2;
      points.push(Math.cos(a0) * RADIUS, Math.sin(a0) * RADIUS, z, Math.cos(a1) * RADIUS, Math.sin(a1) * RADIUS, z);
    }
  }
  for (let s = 0; s < SPOKES; s++) {
    const a = (s / SPOKES) * Math.PI * 2;
    points.push(Math.cos(a) * RADIUS, Math.sin(a) * RADIUS, PERIOD, Math.cos(a) * RADIUS, Math.sin(a) * RADIUS, -RING_GAP * RINGS);
  }
  const wireGeometry = new THREE.BufferGeometry();
  wireGeometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  const wireMaterial = new THREE.LineBasicMaterial({ color: CYAN });
  world.add(new THREE.LineSegments(wireGeometry, wireMaterial));

  // Faceted beads hugging the walls, magenta and yellow rings in turn.
  const beadGeometry = new THREE.IcosahedronGeometry(1, 0);
  const beadMaterial = new THREE.MeshLambertMaterial({ flatShading: true });
  const count = RINGS * BEADS_PER_RING;
  const beads = new THREE.InstancedMesh(beadGeometry, beadMaterial, count);
  beads.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const spots: { pos: THREE.Vector3; size: number; axis: THREE.Vector3; rate: number }[] = [];
  const color = new THREE.Color();
  for (let r = 0; r < RINGS; r++) {
    const pink = r % 2 === 0;
    for (let b = 0; b < BEADS_PER_RING; b++) {
      const a = ((b + (pink ? 0 : 0.5)) / BEADS_PER_RING) * Math.PI * 2;
      const inset = pink ? 8.2 : 8.9;
      spots.push({
        pos: new THREE.Vector3(Math.cos(a) * inset, Math.sin(a) * inset, -r * RING_GAP - (pink ? 0 : RING_GAP / 2)),
        size: pink ? 0.85 : 0.7,
        axis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        rate: 0.6 + Math.random() * 1.4,
      });
      beads.setColorAt(spots.length - 1, color.set(pink ? MAGENTA : YELLOW));
    }
  }
  world.add(beads);

  // The globe at the vanishing point: an icosphere, ocean and land by face.
  const globeGeometry = new THREE.IcosahedronGeometry(3.2, 1).toNonIndexed();
  const faceColors: number[] = [];
  const position = globeGeometry.getAttribute("position");
  for (let f = 0; f < position.count; f += 3) {
    const y = (position.getY(f) + position.getY(f + 1) + position.getY(f + 2)) / 3;
    const land = Math.sin(f * 1.7) + Math.sin(f * 0.37) > 0.6;
    color.set(Math.abs(y) > 2.6 ? 0xf2f6ff : land ? 0x3fa34d : f % 2 ? 0x1360c2 : 0x1b74d8);
    for (let k = 0; k < 3; k++) faceColors.push(color.r, color.g, color.b);
  }
  globeGeometry.setAttribute("color", new THREE.Float32BufferAttribute(faceColors, 3));
  const globeMaterial = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, fog: false });
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globe);

  scene.add(new THREE.AmbientLight(0xffffff, 1.1));
  const sun = new THREE.DirectionalLight(0xffffff, 2.4);
  sun.position.set(-0.5, 1, 0.6);
  scene.add(sun);

  const matcap = chromeMatcap(crystal);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  let travel = 0;

  return {
    pixelSize: 3,
    look: { matcap, faceted: true, idle: "spin" },
    resize(width, height) {
      aim(camera, width, height, 0.5, VANISH_Y);
    },
    render(renderer, f) {
      const speed = 5 + Math.min(Math.abs(f.scrollSpeed) * 0.012, 30) + f.warp * 110;
      travel += f.delta * speed;
      const depth = travel + f.scroll * 0.025;
      const z = -(depth % PERIOD);

      camera.fov = 90 + f.warp * 40;
      camera.updateProjectionMatrix();
      camera.position.set(f.pointer.x * 2.6, f.pointer.y * 1.8, z);
      camera.rotation.set(f.pointer.y * 0.16, -f.pointer.x * 0.22, f.time * 0.05);
      world.rotation.z = f.time * 0.07 + f.scroll * 0.0006;

      for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        q.setFromAxisAngle(spot.axis, f.time * spot.rate);
        s.setScalar(spot.size);
        m.compose(spot.pos, q, s);
        beads.setMatrixAt(i, m);
      }
      beads.instanceMatrix.needsUpdate = true;

      globe.position.set(0, 0, z - 40);
      globe.rotation.set(0.35, f.time * 0.6, 0);

      renderer.render(scene, camera);
    },
    dispose() {
      wireGeometry.dispose();
      wireMaterial.dispose();
      beadGeometry.dispose();
      beadMaterial.dispose();
      beads.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      matcap.dispose();
    },
  };
};
