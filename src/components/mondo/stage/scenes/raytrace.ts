import * as THREE from "three";
import { chromeMatcap, mix, rgb, smoothstep } from "../matcap";
import type { SceneFactory } from "../types";
import { aim } from "../view";

const ZENITH = 0x1546c8;
const HORIZON = 0xc6e6ff;
const CHECK_A = 0xe9e86c;
const CHECK_B = 0x23439c;
/** Where the horizon sits, from the top of the screen: just under the masthead. */
const HORIZON_Y = 0.3;
const TILE = 4;

const zenith = rgb(ZENITH);
const horizon = rgb(HORIZON);
const checkA = rgb(CHECK_A);
const checkB = rgb(CHECK_B);
const white = rgb(0xffffff);

// A chrome ball over the checkerboard: cobalt sky on top, the floor's
// checks curving round underneath, and a hard sun.
const raytraced = (x: number, y: number, z: number) => {
  const sun = Math.max(0, x * -0.35 + y * 0.75 + z * 0.56) ** 90;
  if (y > 0) return mix(mix(horizon, zenith, y ** 0.45), white, sun);
  const t = 1 / Math.max(-y, 1e-3);
  const check = (Math.floor(x * t * 0.8) + Math.floor(z * t * 0.8)) & 1;
  return mix(check ? checkA : checkB, horizon, smoothstep(2, 14, t));
};

const SKY_VERTEX = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_FRAGMENT = /* glsl */ `
  uniform vec3 zenith;
  uniform vec3 horizon;
  varying vec3 vDir;
  void main() {
    gl_FragColor = vec4(mix(horizon, zenith, pow(clamp(vDir.y, 0.0, 1.0), 0.45)), 1.0);
    #include <colorspace_fragment>
  }
`;

const FLOOR_VERTEX = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

// A box-filtered checkerboard, so it stays crisp without crawling at the horizon.
const FLOOR_FRAGMENT = /* glsl */ `
  uniform vec3 a;
  uniform vec3 b;
  uniform vec3 horizon;
  uniform float travel;
  uniform float tile;
  uniform vec3 eye;
  varying vec3 vWorld;
  void main() {
    vec2 p = vec2(vWorld.x, vWorld.z - travel) / tile;
    vec2 w = fwidth(p) + 1e-4;
    vec2 i = 2.0 * (abs(fract((p - 0.5 * w) * 0.5) - 0.5) - abs(fract((p + 0.5 * w) * 0.5) - 0.5)) / w;
    vec3 color = mix(a, b, 0.5 - 0.5 * i.x * i.y);
    float far = length(vWorld.xz - eye.xz);
    gl_FragColor = vec4(mix(color, horizon, smoothstep(30.0, 240.0, far)), 1.0);
    #include <colorspace_fragment>
  }
`;

type Ball = {
  mesh: THREE.Mesh;
  shadow: THREE.Mesh;
  radius: number;
  height: number;
  rate: number;
  phase: number;
};

/**
 * Issue: Raytrace. Every early raytracer demo, played straight: chrome
 * balls bouncing on an endless yellow-and-cobalt checkerboard under a cobalt
 * sky, reflecting it live, with a necklace of beads orbiting overhead.
 * Scrolling glides you forward over the floor.
 */
export const raytrace: SceneFactory = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1200);
  const eye = new THREE.Vector3(0, 3.2, 12);

  const skyGeometry = new THREE.SphereGeometry(900, 32, 16);
  const skyMaterial = new THREE.ShaderMaterial({
    uniforms: {
      zenith: { value: new THREE.Color(ZENITH) },
      horizon: { value: new THREE.Color(HORIZON) },
    },
    vertexShader: SKY_VERTEX,
    fragmentShader: SKY_FRAGMENT,
    side: THREE.BackSide,
    depthWrite: false,
  });
  scene.add(new THREE.Mesh(skyGeometry, skyMaterial));

  const floorGeometry = new THREE.PlaneGeometry(1600, 1600);
  floorGeometry.rotateX(-Math.PI / 2);
  const floorMaterial = new THREE.ShaderMaterial({
    uniforms: {
      a: { value: new THREE.Color(CHECK_A) },
      b: { value: new THREE.Color(CHECK_B) },
      horizon: { value: new THREE.Color(HORIZON) },
      travel: { value: 0 },
      tile: { value: TILE },
      eye: { value: eye },
    },
    vertexShader: FLOOR_VERTEX,
    fragmentShader: FLOOR_FRAGMENT,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  scene.add(floor);

  // Live reflections: the sky and floor rendered into a cube map each frame.
  const cubeTarget = new THREE.WebGLCubeRenderTarget(128, { type: THREE.HalfFloatType });
  const cubeCamera = new THREE.CubeCamera(0.5, 1000, cubeTarget);
  cubeCamera.position.set(0, 2.5, -10);
  const chrome = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.03,
    envMap: cubeTarget.texture,
  });

  // Soft round shadows, the way every demo faked them.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 64;
  const ctx = shadowCanvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(0, 0, 20, 0.75)");
  gradient.addColorStop(1, "rgba(0, 0, 20, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowGeometry = new THREE.PlaneGeometry(1, 1);
  shadowGeometry.rotateX(-Math.PI / 2);

  const ballGeometry = new THREE.SphereGeometry(1, 48, 32);
  // In the margins either side of the page: the panel covers the middle ~55%.
  const balls: Ball[] = [
    { x: -6.4, z: -1, radius: 1.4, height: 2.2, rate: 2.3, phase: 0 },
    { x: 7, z: -4, radius: 1.7, height: 2.6, rate: 1.9, phase: 1.9 },
    { x: -15, z: -26, radius: 2.6, height: 4, rate: 1.5, phase: 3.1 },
    { x: 17, z: -34, radius: 2.4, height: 3.6, rate: 1.7, phase: 4.4 },
  ].map(({ x, z, radius, height, rate, phase }) => {
    const mesh = new THREE.Mesh(ballGeometry, chrome);
    mesh.scale.setScalar(radius);
    mesh.position.set(x, radius, z);
    const shadow = new THREE.Mesh(
      shadowGeometry,
      new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }),
    );
    shadow.position.set(x, 0.02, z);
    scene.add(mesh, shadow);
    return { mesh, shadow, radius, height, rate, phase };
  });

  // A necklace of red and pink beads ringing the right-hand ball like a planet.
  const NECKLACE = 22;
  const beadGeometry = new THREE.SphereGeometry(1, 20, 14);
  const beadMaterials = [0xff2a4a, 0xff4fa8].map(
    (color) => new THREE.MeshStandardMaterial({ color, metalness: 0.25, roughness: 0.15, envMap: cubeTarget.texture }),
  );
  const necklace = new THREE.Group();
  for (let i = 0; i < NECKLACE; i++) {
    const material = i % 3 === 2 ? chrome : beadMaterials[i % 2];
    const bead = new THREE.Mesh(beadGeometry, material);
    const a = (i / NECKLACE) * Math.PI * 2;
    bead.position.set(Math.cos(a) * 3.1, Math.sin(a) * 3.1, 0);
    bead.scale.setScalar(0.24);
    necklace.add(bead);
  }
  scene.add(necklace);

  const matcap = chromeMatcap(raytraced);
  let travel = 0;
  let frames = 0;

  return {
    pixelSize: 2,
    look: { matcap, idle: "wave", shadow: 0x0a1f6e },
    resize(width, height) {
      // The horizon sits high, so the prose panel stands on the floor.
      aim(camera, width, height, 0.5, HORIZON_Y);
    },
    render(renderer, f) {
      const speed = 3 + Math.min(Math.abs(f.scrollSpeed) * 0.01, 20) + f.warp * 90;
      travel = (travel + f.delta * speed) % (TILE * 200);
      floorMaterial.uniforms.travel.value = travel + f.scroll * 0.02;

      camera.fov = 60 + f.warp * 30;
      camera.position.set(eye.x + f.pointer.x * 1.6, eye.y + f.pointer.y * 0.8, eye.z);
      camera.rotation.set(0, -f.pointer.x * 0.12, 0);
      camera.updateProjectionMatrix();

      const roll = (travel + f.scroll * 0.02) * 0.9;
      for (const ball of balls) {
        const bounce = Math.abs(Math.sin(f.time * ball.rate + ball.phase));
        ball.mesh.position.y = ball.radius + bounce * ball.height;
        ball.mesh.rotation.x = roll / ball.radius;
        ball.shadow.scale.setScalar(ball.radius * (2.6 - bounce * 0.9));
        (ball.shadow.material as THREE.MeshBasicMaterial).opacity = 1 - bounce * 0.6;
      }
      necklace.position.copy(balls[1].mesh.position);
      necklace.rotation.set(1.25, 0.3, f.time * 0.8);

      // Reflections see the floor and sky only, which is all a ball needs,
      // and refreshing them every other frame is plenty.
      if (frames++ % 2 === 0 || !f.motion) {
        for (const ball of balls) ball.mesh.visible = false;
        necklace.visible = false;
        cubeCamera.update(renderer, scene);
        for (const ball of balls) ball.mesh.visible = true;
        necklace.visible = true;
      }

      renderer.render(scene, camera);
    },
    dispose() {
      skyGeometry.dispose();
      skyMaterial.dispose();
      floorGeometry.dispose();
      floorMaterial.dispose();
      cubeTarget.dispose();
      chrome.dispose();
      shadowTexture.dispose();
      shadowGeometry.dispose();
      for (const ball of balls) (ball.shadow.material as THREE.Material).dispose();
      ballGeometry.dispose();
      beadGeometry.dispose();
      for (const material of beadMaterials) material.dispose();
      matcap.dispose();
    },
  };
};
