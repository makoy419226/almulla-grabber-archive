import { forwardRef, useEffect, useImperativeHandle, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
import { sector3DAssets } from "@/lib/sectors-3d-assets";

export type SectorsExperience3DHandle = {
  reset: () => void;
  setProgress: (progress: number) => void;
};

type SectorsExperience3DProps = {
  onAssetProgress?: (state: SectorsAssetProgress) => void;
  onError?: () => void;
  onReady?: () => void;
};

export type SectorsAssetProgress = {
  label: string;
  phase: "loading" | "ready" | "degraded";
  progress: number;
};

type LoadedSurface = {
  ao?: THREE.Texture;
  color: THREE.Texture;
  normal?: THREE.Texture;
  roughness: THREE.Texture;
};

type AuthoredModelPlacement = {
  position: [number, number, number];
  rotation?: number;
  scale?: number;
};

type SceneMaterials = {
  bronze: THREE.MeshStandardMaterial;
  cyan: THREE.MeshStandardMaterial;
  darkGlass: THREE.MeshPhysicalMaterial;
  earth: THREE.MeshStandardMaterial;
  energy: THREE.MeshStandardMaterial;
  foliage: THREE.MeshStandardMaterial;
  glass: THREE.MeshPhysicalMaterial;
  gold: THREE.MeshStandardMaterial;
  grass: THREE.MeshStandardMaterial;
  industrialWhite: THREE.MeshStandardMaterial;
  ink: THREE.MeshStandardMaterial;
  palmTrunk: THREE.MeshStandardMaterial;
  path: THREE.MeshStandardMaterial;
  red: THREE.MeshStandardMaterial;
  roadPaint: THREE.MeshStandardMaterial;
  safetyYellow: THREE.MeshStandardMaterial;
  sand: THREE.MeshStandardMaterial;
  skin: THREE.MeshStandardMaterial;
  steel: THREE.MeshStandardMaterial;
  stone: THREE.MeshStandardMaterial;
  upholstery: THREE.MeshStandardMaterial;
  vehiclePaint: THREE.MeshPhysicalMaterial;
  water: THREE.MeshPhysicalMaterial;
  warmGlass: THREE.MeshStandardMaterial;
  warmLight: THREE.MeshStandardMaterial;
  white: THREE.MeshStandardMaterial;
};

type ScenePrimitives = {
  box: THREE.BoxGeometry;
  cylinder: THREE.CylinderGeometry;
  roundedBox: RoundedBoxGeometry;
  sphere: THREE.SphereGeometry;
};

type TrafficState = {
  color: THREE.Color;
  direction: -1 | 1;
  lane: number;
  phase: number;
  speed: number;
};

type TrafficSystem = {
  bodies: THREE.InstancedMesh;
  cabins: THREE.InstancedMesh;
  dummy: THREE.Object3D;
  headlights: THREE.InstancedMesh;
  shadows: THREE.InstancedMesh;
  states: TrafficState[];
  taillights: THREE.InstancedMesh;
  trim: THREE.InstancedMesh;
  upperBodies: THREE.InstancedMesh;
  wheels: THREE.InstancedMesh;
};

type PedestrianState = {
  centerX: number;
  centerZ: number;
  color: THREE.Color;
  phase: number;
  radiusX: number;
  radiusZ: number;
  speed: number;
};

type PedestrianSystem = {
  bodies: THREE.InstancedMesh;
  dummy: THREE.Object3D;
  heads: THREE.InstancedMesh;
  legs: THREE.InstancedMesh;
  shadows: THREE.InstancedMesh;
  states: PedestrianState[];
};

type SteamPlume = {
  baseY: number;
  phase: number;
  points: THREE.Points;
};

type SlidingDoor = {
  closedLeftX: number;
  closedRightX: number;
  left: THREE.Mesh;
  phase: number;
  right: THREE.Mesh;
  travel: number;
};

type FlagState = {
  basePositions: Float32Array;
  geometry: THREE.BufferGeometry;
  phase: number;
  span: number;
};

type InteriorLightState = {
  baseIntensity: number;
  material: THREE.MeshStandardMaterial;
  phase: number;
};

type SceneAnimation = {
  clouds: THREE.InstancedMesh | null;
  flags: FlagState[];
  interiorLights: InteriorLightState[];
  pedestrians: PedestrianSystem | null;
  rotors: THREE.Group[];
  sky: THREE.Mesh;
  slidingDoors: SlidingDoor[];
  steamPlumes: SteamPlume[];
  traffic: TrafficSystem | null;
  water: THREE.MeshPhysicalMaterial | null;
};

type BoxTransform = {
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number, number];
};

const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

const addBox = (
  parent: THREE.Object3D,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  size: [number, number, number],
  position: [number, number, number],
  options: { castShadow?: boolean; receiveShadow?: boolean } = {},
) => {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.scale.set(...size);
  mesh.castShadow = options.castShadow ?? false;
  mesh.receiveShadow = options.receiveShadow ?? false;
  parent.add(mesh);
  return mesh;
};

const addCylinder = (
  parent: THREE.Object3D,
  geometry: THREE.CylinderGeometry,
  material: THREE.Material,
  size: [number, number, number],
  position: [number, number, number],
) => {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.scale.set(...size);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
};

const addBoxInstances = (
  parent: THREE.Object3D,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  transforms: BoxTransform[],
  options: { castShadow?: boolean; receiveShadow?: boolean } = {},
) => {
  if (transforms.length === 0) return null;
  const mesh = new THREE.InstancedMesh(geometry, material, transforms.length);
  const dummy = new THREE.Object3D();
  transforms.forEach((transform, index) => {
    dummy.position.set(...transform.position);
    dummy.rotation.set(...(transform.rotation ?? [0, 0, 0]));
    dummy.scale.set(...transform.size);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  });
  mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);
  mesh.instanceMatrix.needsUpdate = true;
  mesh.castShadow = options.castShadow ?? false;
  mesh.receiveShadow = options.receiveShadow ?? false;
  parent.add(mesh);
  return mesh;
};

const addWindowGrid = (
  parent: THREE.Object3D,
  primitives: ScenePrimitives,
  material: THREE.Material,
  options: {
    columns: number;
    rows: number;
    startX: number;
    startY: number;
    stepX: number;
    stepY: number;
    width: number;
    height: number;
    z: number;
  },
) => {
  const transforms: BoxTransform[] = [];
  for (let row = 0; row < options.rows; row += 1) {
    for (let column = 0; column < options.columns; column += 1) {
      transforms.push({
        position: [
          options.startX + column * options.stepX,
          options.startY + row * options.stepY,
          options.z,
        ],
        size: [options.width, options.height, 0.08],
      });
    }
  }
  addBoxInstances(parent, primitives.box, material, transforms);
};

const addFacadeReveals = (
  parent: THREE.Object3D,
  primitives: ScenePrimitives,
  material: THREE.Material,
  options: {
    centers: number[];
    floors: number;
    floorHeight: number;
    width: number;
    z: number;
  },
) => {
  const reveals: BoxTransform[] = [];
  for (const centerX of options.centers) {
    for (let floor = 1; floor < options.floors; floor += 1) {
      reveals.push({
        position: [centerX, floor * options.floorHeight, options.z],
        size: [options.width, 0.065, 0.16],
      });
    }
    for (const offset of [-0.34, 0, 0.34]) {
      reveals.push({
        position: [
          centerX + offset * options.width,
          (options.floors * options.floorHeight) / 2,
          options.z,
        ],
        size: [0.055, options.floors * options.floorHeight, 0.15],
      });
    }
  }
  addBoxInstances(parent, primitives.box, material, reveals);
};

const addMashrabiyaScreen = (
  parent: THREE.Object3D,
  primitives: ScenePrimitives,
  material: THREE.Material,
  options: {
    center: [number, number, number];
    columns: number;
    height: number;
    rows: number;
    width: number;
  },
) => {
  const [centerX, centerY, z] = options.center;
  const lattice: BoxTransform[] = [];
  lattice.push(
    {
      position: [centerX - options.width / 2, centerY, z],
      size: [0.07, options.height, 0.14],
    },
    {
      position: [centerX + options.width / 2, centerY, z],
      size: [0.07, options.height, 0.14],
    },
    {
      position: [centerX, centerY - options.height / 2, z],
      size: [options.width, 0.07, 0.14],
    },
    {
      position: [centerX, centerY + options.height / 2, z],
      size: [options.width, 0.07, 0.14],
    },
  );
  const cellWidth = options.width / options.columns;
  const cellHeight = options.height / options.rows;
  const diagonal = Math.hypot(cellWidth, cellHeight);
  const angle = Math.atan2(cellHeight, cellWidth);
  for (let column = 0; column < options.columns; column += 1) {
    for (let row = 0; row < options.rows; row += 1) {
      const x = centerX - options.width / 2 + cellWidth * (column + 0.5);
      const y = centerY - options.height / 2 + cellHeight * (row + 0.5);
      lattice.push(
        {
          position: [x, y, z],
          rotation: [0, 0, angle],
          size: [diagonal, 0.045, 0.12],
        },
        {
          position: [x, y, z + 0.01],
          rotation: [0, 0, -angle],
          size: [diagonal, 0.045, 0.12],
        },
      );
    }
  }
  addBoxInstances(parent, primitives.box, material, lattice, { castShadow: true });
};

const addAutomaticEntrance = (
  parent: THREE.Object3D,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
  animation: SceneAnimation,
  options: { phase: number; z: number },
) => {
  const width = 4.8;
  const height = 3.65;
  addBox(
    parent,
    primitives.box,
    materials.ink,
    [width + 0.62, height + 0.5, 0.42],
    [0, (height + 0.5) / 2, options.z - 0.18],
  );
  addBox(
    parent,
    primitives.box,
    materials.warmGlass,
    [width - 0.38, height - 0.28, 0.05],
    [0, height / 2, options.z - 0.38],
  );

  const panelWidth = 2.18;
  const closedLeftX = -panelWidth / 2;
  const closedRightX = panelWidth / 2;
  const left = addBox(
    parent,
    primitives.box,
    materials.glass,
    [panelWidth, height, 0.09],
    [closedLeftX, height / 2, options.z],
  );
  const right = addBox(
    parent,
    primitives.box,
    materials.glass,
    [panelWidth, height, 0.09],
    [closedRightX, height / 2, options.z],
  );
  addBoxInstances(parent, primitives.box, materials.bronze, [
    { position: [0, height + 0.04, options.z + 0.04], size: [width, 0.08, 0.12] },
    { position: [-width / 2, height / 2, options.z + 0.04], size: [0.08, height, 0.12] },
    { position: [width / 2, height / 2, options.z + 0.04], size: [0.08, height, 0.12] },
  ]);
  animation.slidingDoors.push({
    closedLeftX,
    closedRightX,
    left,
    phase: options.phase,
    right,
    travel: 1.36,
  });
};

const createPalmFrondGeometry = () => {
  const segments = 8;
  const vertices: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  for (let segment = 0; segment <= segments; segment += 1) {
    const progress = segment / segments;
    const width = Math.sin(progress * Math.PI) * (0.18 - progress * 0.035);
    const drop = -Math.pow(progress, 1.7) * 0.18;
    vertices.push(progress, drop, -width, progress, drop, width);
    uvs.push(progress, 0, progress, 1);
    if (segment < segments) {
      const offset = segment * 2;
      indices.push(offset, offset + 2, offset + 1, offset + 2, offset + 3, offset + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
};

const createUaeFlagTexture = (anisotropy: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillStyle = "#00732f";
  context.fillRect(128, 0, 384, 85.34);
  context.fillStyle = "#f7f4ea";
  context.fillRect(128, 85.34, 384, 85.34);
  context.fillStyle = "#151515";
  context.fillRect(128, 170.68, 384, 85.32);
  context.fillStyle = "#ce2435";
  context.fillRect(0, 0, 128, 256);

  const fabricShade = context.createLinearGradient(0, 0, 0, 256);
  fabricShade.addColorStop(0, "rgba(255,255,255,0.11)");
  fabricShade.addColorStop(0.5, "rgba(255,255,255,0)");
  fabricShade.addColorStop(1, "rgba(0,0,0,0.13)");
  context.fillStyle = fabricShade;
  context.fillRect(0, 0, 512, 256);
  for (let line = 0; line < 40; line += 1) {
    context.fillStyle = line % 2 === 0 ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.016)";
    context.fillRect(0, line * 6.4, 512, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = anisotropy;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const addUaeFlag = (
  parent: THREE.Object3D,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
  animation: SceneAnimation,
  flagMaterial: THREE.MeshStandardMaterial,
  position: [number, number, number],
  phase: number,
  scale = 1,
) => {
  const poleHeight = 5.4 * scale;
  addCylinder(
    parent,
    primitives.cylinder,
    materials.steel,
    [0.055 * scale, poleHeight, 0.055 * scale],
    [position[0], poleHeight / 2, position[2]],
  );
  const span = 2.35 * scale;
  const height = 1.18 * scale;
  const geometry = new THREE.PlaneGeometry(span, height, 18, 5);
  geometry.translate(span / 2, 0, 0);
  const positionAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
  positionAttribute.setUsage(THREE.DynamicDrawUsage);
  const basePositions = new Float32Array(positionAttribute.array);
  const flag = new THREE.Mesh(geometry, flagMaterial);
  flag.position.set(position[0] + 0.05, poleHeight - height * 0.62, position[2]);
  flag.castShadow = true;
  parent.add(flag);
  animation.flags.push({ basePositions, geometry, phase, span });
};

const addBrandMonument = (
  scene: THREE.Scene,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
  texture: THREE.Texture,
) => {
  const monument = new THREE.Group();
  monument.position.set(6.55, 0, 10.2);
  monument.rotation.y = 0.08;
  scene.add(monument);
  addBox(monument, primitives.box, materials.stone, [4.85, 2.45, 0.42], [0, 1.23, 0], {
    castShadow: true,
    receiveShadow: true,
  });
  addBox(monument, primitives.box, materials.bronze, [4.94, 0.1, 0.48], [0, 2.42, 0.01]);
  addBox(monument, primitives.box, materials.bronze, [4.94, 0.12, 0.62], [0, 0.06, 0.01]);
  const mark = new THREE.Mesh(
    new THREE.PlaneGeometry(3.9, 1.36),
    new THREE.MeshBasicMaterial({
      alphaTest: 0.02,
      map: texture,
      toneMapped: false,
      transparent: true,
    }),
  );
  mark.position.set(0, 1.3, 0.225);
  monument.add(mark);
};

const addPortals = (
  parent: THREE.Object3D,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
  positions: number[],
) => {
  addBoxInstances(
    parent,
    primitives.box,
    materials.stone,
    positions.flatMap((z): BoxTransform[] => [
      { position: [-5.05, 2.65, z], size: [0.7, 5.3, 1.15] },
      { position: [5.05, 2.65, z], size: [0.7, 5.3, 1.15] },
    ]),
    { castShadow: true },
  );
  addBoxInstances(
    parent,
    primitives.box,
    materials.stone,
    positions.map(
      (z): BoxTransform => ({
        position: [0, 5.12, z],
        size: [10.8, 0.38, 1.15],
      }),
    ),
    { castShadow: true },
  );
  addBoxInstances(
    parent,
    primitives.box,
    materials.bronze,
    positions.flatMap((z): BoxTransform[] => [
      { position: [-4.64, 2.68, z + 0.61], size: [0.08, 4.65, 0.08] },
      { position: [4.64, 2.68, z + 0.61], size: [0.08, 4.65, 0.08] },
      { position: [0, 4.86, z + 0.61], size: [9.35, 0.08, 0.08] },
    ]),
  );
  addBoxInstances(
    parent,
    primitives.box,
    materials.warmLight,
    positions.flatMap((z): BoxTransform[] =>
      [-2.6, 0, 2.6].map((x) => ({
        position: [x, 4.88, z + 0.31],
        size: [0.18, 0.025, 0.18],
      })),
    ),
  );
};

const addSky = (scene: THREE.Scene) => {
  const material = new THREE.ShaderMaterial({
    depthWrite: false,
    fragmentShader: `
      uniform float uTime;
      varying vec3 vDirection;

      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
              mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
          mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
              mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
          f.z
        );
      }

      float fbm(vec3 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int octave = 0; octave < 4; octave++) {
          value += amplitude * noise(p);
          p = p * 2.03 + 7.13;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec3 direction = normalize(vDirection);
        float height = direction.y;
        vec3 lower = vec3(0.31, 0.29, 0.25);
        vec3 horizon = vec3(0.72, 0.74, 0.72);
        vec3 upper = vec3(0.16, 0.39, 0.62);
        vec3 color = mix(lower, horizon, smoothstep(-0.58, 0.04, height));
        color = mix(color, upper, smoothstep(0.02, 0.9, height));

        vec3 sunDirection = normalize(vec3(-0.62, 0.31, -0.75));
        float sunDot = max(dot(direction, sunDirection), 0.0);
        float sunDisc = smoothstep(0.99915, 0.99982, sunDot);
        float sunGlow = pow(sunDot, 22.0) * 0.19;
        color += vec3(1.0, 0.79, 0.52) * sunGlow;
        color = mix(color, vec3(1.0, 0.91, 0.72), sunDisc * 0.9);

        vec3 cloudSample = direction * vec3(3.8, 5.8, 3.8);
        cloudSample.x += uTime * 0.006;
        cloudSample.z -= uTime * 0.003;
        float cloudNoise = fbm(cloudSample);
        float cloudBand = smoothstep(-0.02, 0.15, height) * (1.0 - smoothstep(0.42, 0.78, height));
        float clouds = smoothstep(0.54, 0.7, cloudNoise) * cloudBand;
        vec3 cloudColor = mix(vec3(0.68, 0.70, 0.70), vec3(0.91, 0.90, 0.85), sunDot);
        color = mix(color, cloudColor, clouds * 0.2);

        float horizonHaze = exp(-abs(height) * 18.0) * 0.24;
        color = mix(color, vec3(0.68, 0.62, 0.53), horizonHaze);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.BackSide,
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec3 vDirection;
      void main() {
        vDirection = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(58, 32, 18), material);
  sky.frustumCulled = false;
  scene.add(sky);
  return sky;
};

const seededUnit = (seed: number) => {
  const value = Math.sin(seed * 91.717 + 17.31) * 43758.5453;
  return value - Math.floor(value);
};

const createTerrainGeometry = (
  width: number,
  depth: number,
  centerX: number,
  centerZ: number,
  seed: number,
  amplitude: number,
) => {
  const geometry = new THREE.PlaneGeometry(width, depth, 12, 24);
  geometry.rotateX(-Math.PI / 2);
  const positions = geometry.getAttribute("position");
  for (let index = 0; index < positions.count; index += 1) {
    const localX = positions.getX(index);
    const localZ = positions.getZ(index);
    const worldX = localX + centerX;
    const worldZ = localZ + centerZ;
    const roadFalloff = THREE.MathUtils.smoothstep(Math.abs(worldX), 5.5, 30);
    const longWave = Math.sin(worldX * 0.17 + seed) * Math.cos(worldZ * 0.09 - seed * 0.3);
    const shortWave = Math.sin((worldX + worldZ) * 0.31 + seed * 2.1) * 0.24;
    const noise = (seededUnit(index + seed * 113) - 0.5) * 0.12;
    positions.setY(index, (longWave + shortWave + noise) * amplitude * roadFalloff - 0.04);
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
};

const addTerrainBands = (scene: THREE.Scene, materials: SceneMaterials) => {
  const districts = [
    { amplitude: 0.16, material: materials.sand, seed: 1.7, z: 0 },
    { amplitude: 0.2, material: materials.sand, seed: 3.9, z: -36 },
    { amplitude: 0.24, material: materials.sand, seed: 6.2, z: -72 },
    { amplitude: 0.28, material: materials.sand, seed: 8.8, z: -108 },
  ];
  for (const district of districts) {
    for (const side of [-1, 1]) {
      const x = side * 18.5;
      const terrain = new THREE.Mesh(
        createTerrainGeometry(28, 36, x, district.z, district.seed + side, district.amplitude),
        district.material,
      );
      terrain.position.set(x, 0, district.z);
      terrain.receiveShadow = true;
      scene.add(terrain);
    }
  }

  addBoxInstances(
    scene,
    new THREE.BoxGeometry(1, 1, 1),
    materials.stone,
    [
      { position: [-5.35, 0.08, -57], size: [2.15, 0.16, 158] },
      { position: [5.35, 0.08, -57], size: [2.15, 0.16, 158] },
    ],
    { receiveShadow: true },
  );
};

const addVegetation = (
  parent: THREE.Object3D,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
) => {
  const trunks: BoxTransform[] = [];
  const crowns: BoxTransform[] = [];
  const palmLeaves: BoxTransform[] = [];

  const palms: Array<[number, number, number]> = [
    [-14.5, 9, 1],
    [14.5, 9, 1.05],
    [-17.5, -7, 0.92],
    [17.5, -7, 1.12],
    [-14.5, -61, 1.18],
    [14.5, -61, 1],
    [-18.5, -66, 1.1],
    [18.5, -66, 1.15],
    [-14.5, -79, 0.96],
    [14.5, -79, 1.08],
    [-20.5, -84, 1.12],
    [20.5, -84, 0.98],
    [-12.5, -16, 0.9],
    [12.5, -16, 0.96],
    [-12.8, -52, 1.02],
    [12.8, -52, 0.94],
  ];
  palms.forEach(([x, z, scale], palmIndex) => {
    const trunkHeight = 4.4 * scale;
    trunks.push({
      position: [x, trunkHeight / 2, z],
      rotation: [0, 0, (seededUnit(palmIndex + 31) - 0.5) * 0.055],
      size: [0.22 * scale, trunkHeight, 0.22 * scale],
    });
    for (let leaf = 0; leaf < 10; leaf += 1) {
      const angle = (leaf / 10) * Math.PI * 2 + seededUnit(palmIndex * 11 + leaf) * 0.16;
      palmLeaves.push({
        position: [x, trunkHeight + 0.2, z],
        rotation: [0, -angle, (seededUnit(leaf + palmIndex * 17) - 0.5) * 0.16],
        size: [3.15 * scale, 1, 1.65 * scale],
      });
    }
    crowns.push({
      position: [x, trunkHeight + 0.2, z],
      size: [0.58 * scale, 0.48 * scale, 0.58 * scale],
    });
  });

  const shadeTrees: Array<[number, number, number]> = [
    [-14, -24, 1.05],
    [14, -24, 0.92],
    [-18, -29, 1.08],
    [18, -29, 1],
    [-14.5, -44, 0.95],
    [14.5, -44, 1.12],
    [-19.5, -48, 1.05],
    [19.5, -48, 0.94],
  ];
  shadeTrees.forEach(([x, z, scale], treeIndex) => {
    const trunkHeight = 3.2 * scale;
    trunks.push({
      position: [x, trunkHeight / 2, z],
      size: [0.3 * scale, trunkHeight, 0.3 * scale],
    });
    for (let cluster = 0; cluster < 3; cluster += 1) {
      const angle = (cluster / 3) * Math.PI * 2 + seededUnit(treeIndex + 7) * 0.5;
      crowns.push({
        position: [
          x + Math.cos(angle) * 0.65,
          trunkHeight + 0.65 + (cluster % 2) * 0.38,
          z + Math.sin(angle) * 0.65,
        ],
        size: [1.35 * scale, 1.15 * scale, 1.35 * scale],
      });
    }
  });

  for (let index = 0; index < 14; index += 1) {
    const side = index % 2 === 0 ? -1 : 1;
    const x = side * (18 + seededUnit(index + 70) * 7);
    const z = -94 - seededUnit(index + 91) * 30;
    crowns.push({
      position: [x, 0.42 + seededUnit(index + 4) * 0.24, z],
      size: [
        0.58 + seededUnit(index) * 0.45,
        0.4 + seededUnit(index + 1) * 0.35,
        0.58 + seededUnit(index + 2) * 0.45,
      ],
    });
  }

  addBoxInstances(parent, primitives.cylinder, materials.palmTrunk, trunks, { castShadow: true });
  addBoxInstances(parent, new THREE.IcosahedronGeometry(1, 2), materials.foliage, crowns, {
    castShadow: true,
  });
  addBoxInstances(parent, createPalmFrondGeometry(), materials.foliage, palmLeaves, {
    castShadow: true,
  });
};

const addStreetDetails = (
  scene: THREE.Scene,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
) => {
  addBoxInstances(scene, primitives.box, materials.roadPaint, [
    { position: [-3.42, 0.075, -57], size: [0.075, 0.018, 158] },
    { position: [3.42, 0.075, -57], size: [0.075, 0.018, 158] },
  ]);

  const crosswalks: BoxTransform[] = [];
  for (const crossingZ of [-15.2, -51.2, -87.2]) {
    for (let stripe = 0; stripe < 7; stripe += 1) {
      crosswalks.push({
        position: [0, 0.085, crossingZ + (stripe - 3) * 0.58],
        size: [6.55, 0.02, 0.27],
      });
    }
  }
  addBoxInstances(scene, primitives.box, materials.roadPaint, crosswalks);

  const lampArms: BoxTransform[] = [];
  const benches: BoxTransform[] = [];
  const benchBacks: BoxTransform[] = [];
  const bollards: BoxTransform[] = [];
  const lampPositions = [10, -12, -24, -48, -60, -84, -96, -118];
  lampPositions.forEach((z) => {
    lampArms.push(
      { position: [-4.95, 4.45, z], size: [0.95, 0.08, 0.08] },
      { position: [4.95, 4.45, z], size: [0.95, 0.08, 0.08] },
    );
  });
  [-8, -29, -43, -65, -79].forEach((z, index) => {
    const side = index % 2 === 0 ? -1 : 1;
    benches.push({ position: [side * 6.05, 0.48, z], size: [1.65, 0.16, 0.48] });
    benchBacks.push({ position: [side * 6.42, 0.88, z], size: [0.12, 0.82, 1.65] });
  });
  for (const z of [-17.2, -53.2, -89.2]) {
    for (const x of [-4.6, -4.15, 4.15, 4.6]) {
      bollards.push({ position: [x, 0.48, z], size: [0.11, 0.96, 0.11] });
    }
  }
  addBoxInstances(scene, primitives.box, materials.steel, lampArms);
  addBoxInstances(scene, primitives.roundedBox, materials.bronze, benches, { castShadow: true });
  addBoxInstances(scene, primitives.box, materials.stone, benchBacks, { castShadow: true });
  addBoxInstances(scene, primitives.cylinder, materials.bronze, bollards, { castShadow: true });

  const roadWear: BoxTransform[] = [];
  for (let index = 0; index < 24; index += 1) {
    roadWear.push({
      position: [(seededUnit(index + 130) - 0.5) * 5.6, 0.084, 13 - index * 6.2],
      rotation: [0, (seededUnit(index + 160) - 0.5) * 0.7, 0],
      size: [0.025 + seededUnit(index) * 0.035, 0.012, 0.8 + seededUnit(index + 14) * 1.4],
    });
  }
  addBoxInstances(scene, primitives.box, materials.ink, roadWear);
};

const addHospital = (
  scene: THREE.Scene,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
  animation: SceneAnimation,
) => {
  const group = new THREE.Group();
  group.position.z = 0;
  scene.add(group);

  addBox(group, primitives.box, materials.white, [7.2, 9.2, 12], [-8.2, 4.6, 0], {
    castShadow: true,
    receiveShadow: true,
  });
  addBox(group, primitives.box, materials.white, [7.2, 9.2, 12], [8.2, 4.6, 0], {
    castShadow: true,
    receiveShadow: true,
  });
  addBox(group, primitives.box, materials.glass, [8.6, 2.2, 4.2], [0, 8.1, 0.25], {
    castShadow: true,
  });
  addBox(group, primitives.box, materials.stone, [8.8, 0.28, 12], [0, 0.14, 0], {
    receiveShadow: true,
  });
  addBox(group, primitives.box, materials.red, [0.55, 2.7, 0.2], [0, 7.9, 2.48]);
  addBox(group, primitives.box, materials.red, [2.7, 0.55, 0.2], [0, 7.9, 2.5]);

  addWindowGrid(group, primitives, materials.glass, {
    columns: 3,
    rows: 3,
    startX: -10.35,
    startY: 2.1,
    stepX: 2.1,
    stepY: 2.05,
    width: 1.35,
    height: 1.1,
    z: 5.86,
  });
  addFacadeReveals(group, primitives, materials.bronze, {
    centers: [-8.25, 8.25],
    floors: 4,
    floorHeight: 2.05,
    width: 6.55,
    z: 6.02,
  });
  addWindowGrid(group, primitives, materials.glass, {
    columns: 3,
    rows: 3,
    startX: 6.1,
    startY: 2.1,
    stepX: 2.1,
    stepY: 2.05,
    width: 1.35,
    height: 1.1,
    z: 5.86,
  });

  addBox(group, primitives.box, materials.white, [8.4, 0.34, 3.8], [0, 4.72, 6.1], {
    castShadow: true,
  });
  addBoxInstances(
    group,
    primitives.box,
    materials.stone,
    [
      { position: [-3.9, 2.35, 7.25], size: [0.28, 4.7, 0.28] },
      { position: [3.9, 2.35, 7.25], size: [0.28, 4.7, 0.28] },
    ],
    { castShadow: true },
  );
  addAutomaticEntrance(group, primitives, materials, animation, { phase: 0.4, z: 5.74 });
  addBox(group, primitives.box, materials.white, [2.8, 1.2, 0.8], [2.65, 0.72, -1.8]);
  addBox(group, primitives.box, materials.bronze, [2.45, 0.08, 0.86], [2.65, 1.35, -1.8]);
  addBoxInstances(
    group,
    primitives.box,
    materials.warmLight,
    [-3.8, 0, 3.8].map(
      (z): BoxTransform => ({
        position: [0, 5.55, z],
        size: [2.8, 0.05, 0.48],
      }),
    ),
  );
  addBoxInstances(group, primitives.box, materials.stone, [
    { position: [-9.4, 9.85, -2.2], size: [2.3, 0.65, 1.8] },
    { position: [-6.6, 9.85, 2.2], size: [1.8, 0.65, 1.6] },
    { position: [7.1, 9.85, -2.1], size: [2.1, 0.65, 1.7] },
    { position: [9.6, 9.85, 2.1], size: [1.7, 0.65, 1.5] },
  ]);

  addBox(group, primitives.box, materials.industrialWhite, [2.7, 1.15, 4.2], [-6.1, 0.78, 8.7], {
    castShadow: true,
  });
  addBox(group, primitives.box, materials.glass, [2.25, 0.72, 1.25], [-6.1, 1.54, 7.65]);
  addBox(group, primitives.box, materials.red, [2.76, 0.18, 3.45], [-6.1, 0.88, 8.8]);
  addBoxInstances(group, primitives.box, materials.ink, [
    { position: [-7.22, 0.28, 7.35], size: [0.38, 0.55, 0.78] },
    { position: [-4.98, 0.28, 7.35], size: [0.38, 0.55, 0.78] },
    { position: [-7.22, 0.28, 10.0], size: [0.38, 0.55, 0.78] },
    { position: [-4.98, 0.28, 10.0], size: [0.38, 0.55, 0.78] },
  ]);

  for (const side of [-1, 1]) {
    addBox(group, primitives.box, materials.bronze, [0.16, 8.6, 0.26], [side * 4.7, 4.55, 6.08]);
    addBox(group, primitives.box, materials.stone, [0.22, 5.8, 0.3], [side * 3.75, 2.9, 0]);
  }
};

const addSchool = (
  scene: THREE.Scene,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
  animation: SceneAnimation,
) => {
  const group = new THREE.Group();
  group.position.z = -36;
  scene.add(group);

  addBox(group, primitives.box, materials.white, [8.2, 7.6, 11], [-8.2, 3.8, 0], {
    castShadow: true,
    receiveShadow: true,
  });
  addBox(group, primitives.box, materials.white, [8.2, 7.6, 11], [8.2, 3.8, 0], {
    castShadow: true,
    receiveShadow: true,
  });
  addBox(group, primitives.box, materials.stone, [8.4, 1.1, 3.5], [0, 7, -0.4], {
    castShadow: true,
  });
  addBox(group, primitives.box, materials.stone, [8.6, 0.25, 11], [0, 0.125, 0], {
    receiveShadow: true,
  });

  addWindowGrid(group, primitives, materials.darkGlass, {
    columns: 4,
    rows: 2,
    startX: -11.1,
    startY: 2.1,
    stepX: 1.75,
    stepY: 2.3,
    width: 1.05,
    height: 1.35,
    z: 5.38,
  });
  addFacadeReveals(group, primitives, materials.bronze, {
    centers: [-8.2, 8.2],
    floors: 3,
    floorHeight: 2.3,
    width: 7.45,
    z: 5.53,
  });
  addWindowGrid(group, primitives, materials.darkGlass, {
    columns: 4,
    rows: 2,
    startX: 5.35,
    startY: 2.1,
    stepX: 1.75,
    stepY: 2.3,
    width: 1.05,
    height: 1.35,
    z: 5.38,
  });

  addBox(group, primitives.box, materials.stone, [8.8, 0.3, 3.4], [0, 4.5, 5.85], {
    castShadow: true,
  });
  addBoxInstances(
    group,
    primitives.cylinder,
    materials.white,
    [
      { position: [-3.9, 2.2, 6.8], size: [0.23, 4.4, 0.23] },
      { position: [3.9, 2.2, 6.8], size: [0.23, 4.4, 0.23] },
    ],
    { castShadow: true },
  );
  addAutomaticEntrance(group, primitives, materials, animation, { phase: 2.2, z: 5.54 });
  addBoxInstances(
    group,
    primitives.box,
    materials.bronze,
    [-3.4, -1.7, 0, 1.7, 3.4].flatMap((z): BoxTransform[] => [
      { position: [-3.76, 1.2, z], size: [0.12, 1.9, 1.35] },
      { position: [3.76, 1.2, z], size: [0.12, 1.9, 1.35] },
    ]),
  );
  addBoxInstances(group, primitives.box, materials.bronze, [
    { position: [-2.85, 0.52, -2.4], size: [1.7, 0.18, 0.72] },
    { position: [2.85, 0.52, 2.4], size: [1.7, 0.18, 0.72] },
  ]);
  addBoxInstances(
    group,
    primitives.box,
    materials.warmLight,
    [-3.6, 0, 3.6].map(
      (z): BoxTransform => ({
        position: [0, 5.45, z],
        size: [2.6, 0.05, 0.42],
      }),
    ),
  );

  const shadeFins: BoxTransform[] = [];
  for (const side of [-1, 1]) {
    for (let index = 0; index < 4; index += 1) {
      shadeFins.push({
        position: [side * (5.1 + index * 1.55), 3.25, 5.66],
        size: [0.14, 6.2, 0.42],
      });
    }

    const trunk = addCylinder(
      group,
      primitives.cylinder,
      materials.bronze,
      [0.24, 3.4, 0.24],
      [side * 12.7, 1.7, 7.8],
    );
    trunk.castShadow = false;
    const crown = new THREE.Mesh(primitives.sphere, materials.foliage);
    crown.position.set(side * 12.7, 4, 7.8);
    crown.scale.set(1.5, 2.1, 1.5);
    group.add(crown);
  }
  addBoxInstances(group, primitives.box, materials.bronze, shadeFins, { castShadow: true });
  addMashrabiyaScreen(group, primitives, materials.bronze, {
    center: [-8.2, 3.8, 5.78],
    columns: 4,
    height: 6.25,
    rows: 4,
    width: 6.8,
  });
  addMashrabiyaScreen(group, primitives, materials.bronze, {
    center: [8.2, 3.8, 5.78],
    columns: 4,
    height: 6.25,
    rows: 4,
    width: 6.8,
  });
};

const addHotel = (
  scene: THREE.Scene,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
  animation: SceneAnimation,
) => {
  const group = new THREE.Group();
  group.position.z = -72;
  scene.add(group);

  addBox(group, primitives.box, materials.ink, [7.4, 15.5, 10.5], [-7.7, 7.75, 0], {
    castShadow: true,
    receiveShadow: true,
  });
  addBox(group, primitives.box, materials.ink, [7.4, 15.5, 10.5], [7.7, 7.75, 0], {
    castShadow: true,
    receiveShadow: true,
  });
  addBox(group, primitives.box, materials.darkGlass, [8.2, 2.2, 3.8], [0, 13.2, 0], {
    castShadow: true,
  });
  addBox(group, primitives.box, materials.bronze, [9.4, 0.25, 4.6], [0, 6.4, 3.05], {
    castShadow: true,
  });
  addBox(group, primitives.box, materials.stone, [8.5, 0.2, 10], [0, 0.1, 0], {
    receiveShadow: true,
  });

  const warmWindows: BoxTransform[] = [];
  const coolWindows: BoxTransform[] = [];
  const facadeFins: BoxTransform[] = [];
  const balconySlabs: BoxTransform[] = [];
  for (const side of [-1, 1]) {
    for (let row = 0; row < 6; row += 1) {
      for (let column = 0; column < 3; column += 1) {
        const window: BoxTransform = {
          position: [side * 7.7 + (column - 1) * 1.65, 2.05 + row * 2.15, 5.24],
          size: [1.16, 1.14, 0.11],
        };
        ((row + column + (side > 0 ? 1 : 0)) % 3 === 0 ? coolWindows : warmWindows).push(window);
      }
      balconySlabs.push({
        position: [side * 7.7, 1.28 + row * 2.15, 5.67],
        size: [6.35, 0.11, 0.9],
      });
    }
    for (let column = 0; column < 4; column += 1) {
      facadeFins.push({
        position: [side * (5.2 + column * 1.7), 7.6, 5.4],
        size: [0.09, 14.4, 0.16],
      });
    }
  }
  const occupiedHotelGlass = materials.warmGlass.clone();
  occupiedHotelGlass.emissiveIntensity = 0.44;
  animation.interiorLights.push({
    baseIntensity: occupiedHotelGlass.emissiveIntensity,
    material: occupiedHotelGlass,
    phase: 1.7,
  });
  addBoxInstances(group, primitives.box, occupiedHotelGlass, warmWindows);
  addBoxInstances(group, primitives.box, materials.darkGlass, coolWindows);
  addBoxInstances(group, primitives.box, materials.bronze, facadeFins, { castShadow: true });
  addBoxInstances(group, primitives.box, materials.stone, balconySlabs, {
    castShadow: true,
  });

  addBox(group, primitives.box, materials.bronze, [8.8, 0.32, 4.1], [0, 4.65, 6.15], {
    castShadow: true,
  });
  addBoxInstances(
    group,
    primitives.cylinder,
    materials.bronze,
    [
      { position: [-3.8, 2.3, 7.25], size: [0.24, 4.6, 0.24] },
      { position: [3.8, 2.3, 7.25], size: [0.24, 4.6, 0.24] },
    ],
    { castShadow: true },
  );
  addAutomaticEntrance(group, primitives, materials, animation, { phase: 4.1, z: 5.43 });
  addBox(group, primitives.box, materials.red, [3.15, 0.06, 10], [0, 0.18, -0.1]);
  addBox(group, primitives.box, materials.bronze, [2.8, 1.05, 0.85], [-2.7, 0.66, -1.9]);
  addBox(group, primitives.box, materials.warmLight, [2.4, 0.06, 0.92], [-2.7, 1.22, -1.9]);
  addBoxInstances(
    group,
    primitives.box,
    materials.warmLight,
    [-3.4, 0, 3.4].flatMap((z): BoxTransform[] => [
      { position: [-3.75, 2.55, z], size: [0.08, 0.62, 0.28] },
      { position: [3.75, 2.55, z], size: [0.08, 0.62, 0.28] },
    ]),
  );

  for (const side of [-1, 1]) {
    addCylinder(
      group,
      primitives.cylinder,
      materials.bronze,
      [0.65, 1.1, 0.65],
      [side * 5.1, 0.55, 8.1],
    );
    const plant = new THREE.Mesh(primitives.sphere, materials.foliage);
    plant.position.set(side * 5.1, 1.55, 8.1);
    plant.scale.set(0.82, 1.15, 0.82);
    group.add(plant);
  }

  for (let index = 0; index < 3; index += 1) {
    const chandelier = new THREE.Mesh(primitives.sphere, materials.warmLight);
    chandelier.position.set(0, 5.1 - index * 1.35, 0.5);
    chandelier.scale.setScalar(0.28 + index * 0.08);
    group.add(chandelier);
  }
};

const addWindTurbine = (
  parent: THREE.Object3D,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
  animation: SceneAnimation,
  x: number,
  z: number,
) => {
  addCylinder(
    parent,
    primitives.cylinder,
    materials.industrialWhite,
    [0.28, 13.6, 0.28],
    [x, 6.8, z],
  );
  const rotor = new THREE.Group();
  rotor.position.set(x, 13.2, z + 0.25);
  parent.add(rotor);
  const hub = new THREE.Mesh(primitives.sphere, materials.gold);
  hub.scale.setScalar(0.42);
  rotor.add(hub);
  for (let bladeIndex = 0; bladeIndex < 3; bladeIndex += 1) {
    const blade = addBox(
      rotor,
      primitives.box,
      materials.industrialWhite,
      [0.23, 3.2, 0.12],
      [0, 1.72, 0],
    );
    blade.rotation.z = (bladeIndex * Math.PI * 2) / 3;
  }
  animation.rotors.push(rotor);
};

const addEnergy = (
  scene: THREE.Scene,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
  animation: SceneAnimation,
) => {
  const group = new THREE.Group();
  group.position.z = -108;
  scene.add(group);

  addBox(group, primitives.box, materials.white, [9.4, 5.6, 5.8], [0, 2.8, -5.1], {
    castShadow: true,
    receiveShadow: true,
  });
  addBox(group, primitives.box, materials.stone, [9.8, 0.28, 6.2], [0, 5.72, -5.1], {
    castShadow: true,
  });
  addWindowGrid(group, primitives, materials.darkGlass, {
    columns: 4,
    rows: 2,
    startX: -3.3,
    startY: 1.6,
    stepX: 2.2,
    stepY: 2.05,
    width: 1.28,
    height: 1.02,
    z: -2.17,
  });
  addAutomaticEntrance(group, primitives, materials, animation, { phase: 5.8, z: -2.02 });

  for (const side of [-1, 1]) {
    addCylinder(
      group,
      primitives.cylinder,
      materials.industrialWhite,
      [2.45, 13, 2.45],
      [side * 8.4, 6.5, 0],
    );
    const tankDome = new THREE.Mesh(primitives.sphere, materials.industrialWhite);
    tankDome.position.set(side * 8.4, 12.9, 0);
    tankDome.scale.set(2.42, 0.82, 2.42);
    tankDome.castShadow = true;
    group.add(tankDome);
    addCylinder(
      group,
      primitives.cylinder,
      materials.steel,
      [2.75, 0.18, 2.75],
      [side * 8.4, 2.3, 0],
    );
    addCylinder(
      group,
      primitives.cylinder,
      materials.steel,
      [2.75, 0.18, 2.75],
      [side * 8.4, 10.4, 0],
    );
    addBox(group, primitives.box, materials.bronze, [5.9, 0.42, 0.42], [side * 5.1, 6.5, 0]);
  }

  addBoxInstances(
    group,
    primitives.cylinder,
    materials.bronze,
    [
      { position: [0, 1.15, 3.2], rotation: [0, 0, Math.PI / 2], size: [0.28, 11.6, 0.28] },
      { position: [0, 1.9, 4.1], rotation: [0, 0, Math.PI / 2], size: [0.18, 10.8, 0.18] },
      { position: [0, 2.55, 3.2], rotation: [0, 0, Math.PI / 2], size: [0.15, 10, 0.15] },
    ],
    { castShadow: true },
  );
  addBoxInstances(group, primitives.box, materials.steel, [
    { position: [-5.5, 1.15, 3.2], size: [0.3, 2.3, 0.3] },
    { position: [0, 1.15, 3.2], size: [0.3, 2.3, 0.3] },
    { position: [5.5, 1.15, 3.2], size: [0.3, 2.3, 0.3] },
  ]);

  addBox(group, primitives.box, materials.steel, [11.5, 0.18, 2.2], [0, 5.35, 4.15], {
    castShadow: true,
  });
  addBoxInstances(group, primitives.box, materials.safetyYellow, [
    { position: [-5.55, 6.05, 3.15], size: [0.08, 1.25, 0.08] },
    { position: [5.55, 6.05, 3.15], size: [0.08, 1.25, 0.08] },
    { position: [0, 6.65, 3.15], size: [11.2, 0.08, 0.08] },
  ]);

  addCylinder(group, primitives.cylinder, materials.steel, [0.82, 14.6, 0.82], [13.4, 7.3, 3.3]);
  addBoxInstances(group, primitives.cylinder, materials.safetyYellow, [
    { position: [13.4, 3.2, 3.3], size: [0.9, 0.16, 0.9] },
    { position: [13.4, 7.1, 3.3], size: [0.9, 0.16, 0.9] },
    { position: [13.4, 11.0, 3.3], size: [0.9, 0.16, 0.9] },
  ]);
  addBox(group, primitives.box, materials.warmLight, [1.2, 0.2, 1.2], [13.4, 14.7, 3.3]);

  const valveGeometry = new THREE.TorusGeometry(0.48, 0.08, 8, 28);
  addBoxInstances(group, valveGeometry, materials.safetyYellow, [
    { position: [-3.8, 1.18, 3.2], rotation: [0, Math.PI / 2, 0], size: [1, 1, 1] },
    { position: [3.8, 1.18, 3.2], rotation: [0, Math.PI / 2, 0], size: [1, 1, 1] },
  ]);

  const solarPanels: BoxTransform[] = [];
  const solarHighlights: BoxTransform[] = [];
  for (let side = -1; side <= 1; side += 2) {
    for (let row = 0; row < 2; row += 1) {
      for (let column = 0; column < 3; column += 1) {
        solarPanels.push({
          position: [side * (12.5 + column * 3.5), 1.1 + row * 0.08, -3 + row * 3.4],
          rotation: [-0.32, 0, 0],
          size: [3.2, 0.12, 1.55],
        });
        solarHighlights.push({
          position: [side * (12.5 + column * 3.5), 1.2 + row * 0.08, -3 + row * 3.4],
          rotation: [-0.32, 0, 0],
          size: [3.24, 0.035, 0.05],
        });
      }
    }
  }
  addBoxInstances(group, primitives.box, materials.darkGlass, solarPanels);
  addBoxInstances(group, primitives.box, materials.steel, solarHighlights);

  addWindTurbine(group, primitives, materials, animation, -17, -7);
  addWindTurbine(group, primitives, materials, animation, 17, -7);
};

const addDistantCity = (
  scene: THREE.Scene,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
) => {
  const towers: BoxTransform[] = [];
  const towerCrowns: BoxTransform[] = [];
  const windows: BoxTransform[] = [];
  const warmWindows: BoxTransform[] = [];
  for (let index = 0; index < 22; index += 1) {
    const z = 16 - index * 7.1;
    for (const side of [-1, 1]) {
      const seed = index * 2 + (side > 0 ? 1 : 0);
      const width = 3.8 + seededUnit(seed + 11) * 4.3;
      const depth = 4.5 + seededUnit(seed + 29) * 4.5;
      const height = 5 + seededUnit(seed + 47) * 15;
      const x = side * (23.5 + seededUnit(seed + 63) * 8.5);
      towers.push({ position: [x, height / 2 - 0.15, z], size: [width, height, depth] });
      if (seed % 4 === 0) {
        towerCrowns.push({
          position: [x, height + 0.38, z],
          size: [width * 0.62, 0.76, depth * 0.62],
        });
      }
      const columns = Math.max(2, Math.floor(width / 1.5));
      const rows = Math.max(2, Math.floor(height / 2.35));
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          if ((row * 3 + column + seed) % 4 === 0) continue;
          const transform: BoxTransform = {
            position: [
              x + (column - (columns - 1) / 2) * Math.min(1.35, width / columns),
              1.35 + row * 2.05,
              z + depth / 2 + 0.035,
            ],
            size: [0.56, 0.74, 0.045],
          };
          ((row + column + seed) % 7 === 0 ? warmWindows : windows).push(transform);
        }
      }
    }
  }
  addBoxInstances(scene, primitives.box, materials.stone, towers, { receiveShadow: true });
  addBoxInstances(scene, primitives.box, materials.steel, towerCrowns);
  addBoxInstances(scene, primitives.box, materials.darkGlass, windows);
  addBoxInstances(scene, primitives.box, materials.warmGlass, warmWindows);

  const endStructures: BoxTransform[] = [];
  for (let index = 0; index < 9; index += 1) {
    const x = (index - 4) * 5.8;
    const height = 5.5 + ((index * 5) % 9);
    endStructures.push({
      position: [x, height / 2, -139 - Math.abs(index - 4) * 0.9],
      size: [4.7, height, 4.8],
    });
  }
  addBoxInstances(scene, primitives.box, materials.steel, endStructures);
};

const addParkedVehicles = (
  parent: THREE.Object3D,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
) => {
  const vehicles: Array<{
    color: "gold" | "red" | "steel" | "white";
    position: [number, number];
    rotation: number;
    scale?: number;
  }> = [
    { color: "white", position: [-18.5, 6.5], rotation: Math.PI / 2 },
    { color: "steel", position: [18.3, 5.5], rotation: -Math.PI / 2 },
    { color: "red", position: [-18.5, -4], rotation: Math.PI / 2 },
    { color: "white", position: [18.2, -46], rotation: -Math.PI / 2 },
    { color: "gold", position: [-18, -65], rotation: Math.PI / 2 },
    { color: "steel", position: [18.2, -81], rotation: -Math.PI / 2 },
    { color: "white", position: [20.5, -104], rotation: 0, scale: 1.15 },
  ];
  const bodies: Record<"gold" | "red" | "steel" | "white", BoxTransform[]> = {
    gold: [],
    red: [],
    steel: [],
    white: [],
  };
  const cabins: BoxTransform[] = [];
  const wheels: BoxTransform[] = [];
  vehicles.forEach((vehicle) => {
    const [x, z] = vehicle.position;
    const scale = vehicle.scale ?? 1;
    bodies[vehicle.color].push({
      position: [x, 0.52 * scale, z],
      rotation: [0, vehicle.rotation, 0],
      size: [1.82 * scale, 0.62 * scale, 4.18 * scale],
    });
    cabins.push({
      position: [x, 1.02 * scale, z - Math.cos(vehicle.rotation) * 0.18],
      rotation: [0, vehicle.rotation, 0],
      size: [1.48 * scale, 0.54 * scale, 1.72 * scale],
    });
    for (const localX of [-0.82, 0.82]) {
      for (const localZ of [-1.32, 1.32]) {
        const offsetX = localX * Math.cos(vehicle.rotation) + localZ * Math.sin(vehicle.rotation);
        const offsetZ = -localX * Math.sin(vehicle.rotation) + localZ * Math.cos(vehicle.rotation);
        wheels.push({
          position: [x + offsetX * scale, 0.29 * scale, z + offsetZ * scale],
          rotation: [0, vehicle.rotation, Math.PI / 2],
          size: [0.29 * scale, 0.18 * scale, 0.29 * scale],
        });
      }
    }
  });
  addBoxInstances(parent, primitives.roundedBox, materials.gold, bodies.gold, { castShadow: true });
  addBoxInstances(parent, primitives.roundedBox, materials.red, bodies.red, { castShadow: true });
  addBoxInstances(parent, primitives.roundedBox, materials.steel, bodies.steel, {
    castShadow: true,
  });
  addBoxInstances(parent, primitives.roundedBox, materials.vehiclePaint, bodies.white, {
    castShadow: true,
  });
  addBoxInstances(parent, primitives.roundedBox, materials.darkGlass, cabins);
  addBoxInstances(parent, primitives.cylinder, materials.ink, wheels);
};

const addSteamPlume = (
  parent: THREE.Object3D,
  animation: SceneAnimation,
  position: [number, number, number],
  phase: number,
  color = 0xdce5e6,
) => {
  const count = 46;
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const height = seededUnit(index + phase * 97) * 7.5;
    const spread = 0.15 + height * 0.1;
    const angle = seededUnit(index + phase * 173) * Math.PI * 2;
    positions[index * 3] = Math.cos(angle) * spread * seededUnit(index + 4);
    positions[index * 3 + 1] = height;
    positions[index * 3 + 2] = Math.sin(angle) * spread * seededUnit(index + 19);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color,
    depthWrite: false,
    opacity: 0.22,
    size: 0.62,
    sizeAttenuation: true,
    transparent: true,
  });
  const points = new THREE.Points(geometry, material);
  points.position.set(...position);
  parent.add(points);
  animation.steamPlumes.push({ baseY: position[1], phase, points });
};

const addSectorEnvironments = (
  scene: THREE.Scene,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
  animation: SceneAnimation,
) => {
  const environment = new THREE.Group();
  scene.add(environment);

  // Hospital forecourt, parking geometry and rooftop emergency marker.
  addBoxInstances(
    environment,
    primitives.box,
    materials.path,
    [
      { position: [-18, 0.02, 1], size: [10.5, 0.08, 25] },
      { position: [18, 0.02, 1], size: [10.5, 0.08, 25] },
    ],
    { receiveShadow: true },
  );
  const parkingLines: BoxTransform[] = [];
  for (const side of [-1, 1]) {
    for (let bay = 0; bay < 7; bay += 1) {
      parkingLines.push({
        position: [side * (13.7 + bay * 1.42), 0.074, 1],
        size: [0.045, 0.014, 4.6],
      });
    }
  }
  addBoxInstances(environment, primitives.box, materials.roadPaint, parkingLines);
  const helipad = addCylinder(
    environment,
    primitives.cylinder,
    materials.roadPaint,
    [2.25, 0.05, 2.25],
    [-8.2, 9.25, 0],
  );
  helipad.castShadow = false;
  addBoxInstances(environment, primitives.box, materials.red, [
    { position: [-8.65, 9.31, 0], size: [0.22, 0.035, 1.45] },
    { position: [-7.75, 9.31, 0], size: [0.22, 0.035, 1.45] },
    { position: [-8.2, 9.31, 0], size: [0.92, 0.035, 0.2] },
  ]);

  // School sports court and shaded activity space.
  addBox(environment, primitives.box, materials.grass, [11.5, 0.09, 17], [18.5, 0.05, -36], {
    receiveShadow: true,
  });
  addBoxInstances(environment, primitives.box, materials.roadPaint, [
    { position: [18.5, 0.105, -27.65], size: [11.1, 0.018, 0.07] },
    { position: [18.5, 0.105, -44.35], size: [11.1, 0.018, 0.07] },
    { position: [12.95, 0.105, -36], size: [0.07, 0.018, 16.7] },
    { position: [24.05, 0.105, -36], size: [0.07, 0.018, 16.7] },
    { position: [18.5, 0.105, -36], size: [0.07, 0.018, 16.7] },
  ]);
  addBox(
    environment,
    primitives.roundedBox,
    materials.bronze,
    [9.5, 0.28, 5.7],
    [-18.5, 3.6, -36],
    {
      castShadow: true,
    },
  );
  addBoxInstances(
    environment,
    primitives.cylinder,
    materials.steel,
    [
      { position: [-22.4, 1.75, -38.2], size: [0.14, 3.5, 0.14] },
      { position: [-14.6, 1.75, -38.2], size: [0.14, 3.5, 0.14] },
      { position: [-22.4, 1.75, -33.8], size: [0.14, 3.5, 0.14] },
      { position: [-14.6, 1.75, -33.8], size: [0.14, 3.5, 0.14] },
    ],
    { castShadow: true },
  );
  addBox(
    environment,
    primitives.roundedBox,
    materials.safetyYellow,
    [2.35, 2.25, 7.2],
    [-18, 1.25, -28],
    {
      castShadow: true,
    },
  );
  addBox(
    environment,
    primitives.roundedBox,
    materials.industrialWhite,
    [2.45, 0.18, 7.3],
    [-18, 2.43, -28],
  );
  addBoxInstances(environment, primitives.box, materials.darkGlass, [
    { position: [-19.19, 1.58, -28], size: [0.04, 0.78, 5.1] },
    { position: [-16.81, 1.58, -28], size: [0.04, 0.78, 5.1] },
    { position: [-18, 1.58, -24.37], size: [2.05, 0.78, 0.05] },
  ]);
  addBoxInstances(
    environment,
    primitives.cylinder,
    materials.ink,
    [-2.25, 2.25].flatMap((offsetZ): BoxTransform[] => [
      {
        position: [-19.18, 0.55, -28 + offsetZ],
        rotation: [0, 0, Math.PI / 2],
        size: [0.38, 0.24, 0.38],
      },
      {
        position: [-16.82, 0.55, -28 + offsetZ],
        rotation: [0, 0, Math.PI / 2],
        size: [0.38, 0.24, 0.38],
      },
    ]),
  );

  // Hotel pool garden, reflective water, deck furniture and umbrellas.
  addBox(environment, primitives.roundedBox, materials.stone, [12.8, 0.2, 18.6], [19, 0.06, -72], {
    receiveShadow: true,
  });
  addBox(environment, primitives.roundedBox, materials.water, [11.6, 0.12, 17.4], [19, 0.19, -72]);
  animation.water = materials.water;
  const loungers: BoxTransform[] = [];
  const loungerPads: BoxTransform[] = [];
  for (let index = 0; index < 5; index += 1) {
    const z = -78 + index * 3;
    loungers.push({
      position: [11.8, 0.35, z],
      rotation: [0, 0.1, -0.13],
      size: [1.05, 0.14, 2.05],
    });
    loungerPads.push({
      position: [11.8, 0.47, z],
      rotation: [0, 0.1, -0.13],
      size: [0.9, 0.09, 1.86],
    });
  }
  addBoxInstances(environment, primitives.roundedBox, materials.bronze, loungers, {
    castShadow: true,
  });
  addBoxInstances(environment, primitives.roundedBox, materials.upholstery, loungerPads);
  addBoxInstances(environment, primitives.cylinder, materials.bronze, [
    { position: [26.4, 1.15, -77], size: [0.08, 2.3, 0.08] },
    { position: [26.4, 1.15, -70.5], size: [0.08, 2.3, 0.08] },
    { position: [26.4, 1.15, -64], size: [0.08, 2.3, 0.08] },
  ]);
  addBoxInstances(environment, primitives.sphere, materials.red, [
    { position: [26.4, 2.25, -77], size: [2.1, 0.18, 2.1] },
    { position: [26.4, 2.25, -70.5], size: [2.1, 0.18, 2.1] },
    { position: [26.4, 2.25, -64], size: [2.1, 0.18, 2.1] },
  ]);

  // Energy perimeter, substation modules, hazard rails and visible vapor plumes.
  addBoxInstances(
    environment,
    primitives.box,
    materials.earth,
    [
      { position: [-19, 0.03, -108], size: [13, 0.1, 30] },
      { position: [19, 0.03, -108], size: [13, 0.1, 30] },
    ],
    { receiveShadow: true },
  );
  const fencePosts: BoxTransform[] = [];
  const fenceRails: BoxTransform[] = [];
  for (let index = 0; index < 14; index += 1) {
    const z = -94 - index * 2.35;
    fencePosts.push(
      { position: [-26, 1.15, z], size: [0.07, 2.3, 0.07] },
      { position: [26, 1.15, z], size: [0.07, 2.3, 0.07] },
    );
  }
  fenceRails.push(
    { position: [-26, 0.72, -109.3], size: [0.06, 0.06, 30.6] },
    { position: [-26, 1.55, -109.3], size: [0.06, 0.06, 30.6] },
    { position: [26, 0.72, -109.3], size: [0.06, 0.06, 30.6] },
    { position: [26, 1.55, -109.3], size: [0.06, 0.06, 30.6] },
  );
  addBoxInstances(environment, primitives.box, materials.steel, fencePosts);
  addBoxInstances(environment, primitives.box, materials.steel, fenceRails);
  addBoxInstances(
    environment,
    primitives.roundedBox,
    materials.steel,
    [
      { position: [-20, 1.1, -102], size: [4.2, 2.2, 3.2] },
      { position: [-20, 1.1, -110], size: [4.2, 2.2, 3.2] },
      { position: [-20, 1.1, -118], size: [4.2, 2.2, 3.2] },
    ],
    { castShadow: true },
  );
  addBoxInstances(environment, primitives.box, materials.safetyYellow, [
    { position: [-20, 2.22, -102], size: [4.3, 0.1, 3.3] },
    { position: [-20, 2.22, -110], size: [4.3, 0.1, 3.3] },
    { position: [-20, 2.22, -118], size: [4.3, 0.1, 3.3] },
  ]);
  addSteamPlume(environment, animation, [13.4, 14.8, -104.7], 0.1);
  addSteamPlume(environment, animation, [-8.4, 13.2, -108], 0.55, 0xcdd9da);

  addParkedVehicles(environment, primitives, materials);
};

const setInstanceTransform = (
  mesh: THREE.InstancedMesh,
  index: number,
  dummy: THREE.Object3D,
  position: [number, number, number],
  scale: [number, number, number],
  rotation: [number, number, number] = [0, 0, 0],
) => {
  dummy.position.set(...position);
  dummy.rotation.set(...rotation);
  dummy.scale.set(...scale);
  dummy.updateMatrix();
  mesh.setMatrixAt(index, dummy.matrix);
};

const updateTraffic = (traffic: TrafficSystem, elapsed: number) => {
  const dummy = traffic.dummy;
  const routeLength = 164;
  traffic.states.forEach((vehicle, index) => {
    const travel = (elapsed * vehicle.speed + vehicle.phase * routeLength) % routeLength;
    const z = vehicle.direction === 1 ? 20 - travel : -144 + travel;
    const yaw = vehicle.direction === 1 ? Math.PI : 0;
    setInstanceTransform(
      traffic.bodies,
      index,
      dummy,
      [vehicle.lane, 0.54, z],
      [1.82, 0.62, 4.22],
      [0, yaw, 0],
    );
    setInstanceTransform(
      traffic.cabins,
      index,
      dummy,
      [vehicle.lane, 1.02, z],
      [1.48, 0.54, 1.74],
      [0, yaw, 0],
    );
    setInstanceTransform(
      traffic.upperBodies,
      index * 2,
      dummy,
      [vehicle.lane, 0.72, z - vehicle.direction * 1.34],
      [1.68, 0.18, 1.12],
      [0, yaw, 0],
    );
    setInstanceTransform(
      traffic.upperBodies,
      index * 2 + 1,
      dummy,
      [vehicle.lane, 0.7, z + vehicle.direction * 1.55],
      [1.64, 0.16, 0.72],
      [0, yaw, 0],
    );
    const frontZ = z - vehicle.direction * 2.1;
    const rearZ = z + vehicle.direction * 2.1;
    for (let lamp = 0; lamp < 2; lamp += 1) {
      setInstanceTransform(
        traffic.headlights,
        index * 2 + lamp,
        dummy,
        [vehicle.lane + (lamp === 0 ? -0.61 : 0.61), 0.56, frontZ],
        [0.18, 0.12, 0.055],
        [0, yaw, 0],
      );
      setInstanceTransform(
        traffic.taillights,
        index * 2 + lamp,
        dummy,
        [vehicle.lane + (lamp === 0 ? -0.61 : 0.61), 0.55, rearZ],
        [0.2, 0.12, 0.055],
        [0, yaw, 0],
      );
    }
    setInstanceTransform(
      traffic.trim,
      index * 2,
      dummy,
      [vehicle.lane, 0.38, frontZ - vehicle.direction * 0.02],
      [1.68, 0.11, 0.08],
      [0, yaw, 0],
    );
    setInstanceTransform(
      traffic.trim,
      index * 2 + 1,
      dummy,
      [vehicle.lane, 0.38, rearZ + vehicle.direction * 0.02],
      [1.68, 0.11, 0.08],
      [0, yaw, 0],
    );
    setInstanceTransform(
      traffic.shadows,
      index,
      dummy,
      [vehicle.lane, 0.087, z],
      [1.52, 1, 2.72],
      [0, yaw, 0],
    );
    let wheelIndex = index * 4;
    for (const localX of [-0.82, 0.82]) {
      for (const localZ of [-1.32, 1.32]) {
        const offsetX = localX * Math.cos(yaw) + localZ * Math.sin(yaw);
        const offsetZ = -localX * Math.sin(yaw) + localZ * Math.cos(yaw);
        setInstanceTransform(
          traffic.wheels,
          wheelIndex,
          dummy,
          [vehicle.lane + offsetX, 0.29, z + offsetZ],
          [0.29, 0.18, 0.29],
          [0, yaw, Math.PI / 2],
        );
        wheelIndex += 1;
      }
    }
  });
  traffic.bodies.instanceMatrix.needsUpdate = true;
  traffic.cabins.instanceMatrix.needsUpdate = true;
  traffic.headlights.instanceMatrix.needsUpdate = true;
  traffic.shadows.instanceMatrix.needsUpdate = true;
  traffic.taillights.instanceMatrix.needsUpdate = true;
  traffic.trim.instanceMatrix.needsUpdate = true;
  traffic.upperBodies.instanceMatrix.needsUpdate = true;
  traffic.wheels.instanceMatrix.needsUpdate = true;
};

const createTrafficSystem = (
  scene: THREE.Scene,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
) => {
  const states: TrafficState[] = [
    { color: new THREE.Color(0xe8e9e5), direction: 1, lane: -2.15, phase: 0.02, speed: 3.2 },
    { color: new THREE.Color(0x9a783c), direction: -1, lane: 2.15, phase: 0.14, speed: 2.7 },
    { color: new THREE.Color(0x26364a), direction: 1, lane: -2.15, phase: 0.28, speed: 3.6 },
    { color: new THREE.Color(0xb01f30), direction: -1, lane: 2.15, phase: 0.4, speed: 2.9 },
    { color: new THREE.Color(0xd6d1c7), direction: 1, lane: -2.15, phase: 0.54, speed: 3.1 },
    { color: new THREE.Color(0x5d6972), direction: -1, lane: 2.15, phase: 0.66, speed: 3.4 },
    { color: new THREE.Color(0x1d4b5c), direction: 1, lane: -2.15, phase: 0.79, speed: 2.8 },
    { color: new THREE.Color(0xc5a35f), direction: -1, lane: 2.15, phase: 0.91, speed: 3.25 },
  ];
  const bodies = new THREE.InstancedMesh(
    primitives.roundedBox,
    materials.vehiclePaint,
    states.length,
  );
  const cabins = new THREE.InstancedMesh(primitives.roundedBox, materials.darkGlass, states.length);
  const headlights = new THREE.InstancedMesh(
    primitives.box,
    materials.warmLight,
    states.length * 2,
  );
  const taillights = new THREE.InstancedMesh(primitives.box, materials.red, states.length * 2);
  const trim = new THREE.InstancedMesh(primitives.box, materials.steel, states.length * 2);
  const upperBodies = new THREE.InstancedMesh(
    primitives.roundedBox,
    materials.vehiclePaint,
    states.length * 2,
  );
  const wheels = new THREE.InstancedMesh(primitives.cylinder, materials.ink, states.length * 4);
  const shadowGeometry = new THREE.CircleGeometry(1, 16);
  shadowGeometry.rotateX(-Math.PI / 2);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    depthWrite: false,
    opacity: 0.1,
    transparent: true,
  });
  const shadows = new THREE.InstancedMesh(shadowGeometry, shadowMaterial, states.length);
  for (const mesh of [bodies, cabins, headlights, taillights, trim, upperBodies, wheels, shadows]) {
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    scene.add(mesh);
  }
  states.forEach((state, index) => {
    bodies.setColorAt(index, state.color);
    upperBodies.setColorAt(index * 2, state.color);
    upperBodies.setColorAt(index * 2 + 1, state.color);
  });
  if (bodies.instanceColor) bodies.instanceColor.needsUpdate = true;
  if (upperBodies.instanceColor) upperBodies.instanceColor.needsUpdate = true;
  const traffic = {
    bodies,
    cabins,
    dummy: new THREE.Object3D(),
    headlights,
    shadows,
    states,
    taillights,
    trim,
    upperBodies,
    wheels,
  };
  updateTraffic(traffic, 0);
  return traffic;
};

const updatePedestrians = (pedestrians: PedestrianSystem, elapsed: number) => {
  const dummy = pedestrians.dummy;
  pedestrians.states.forEach((person, index) => {
    const angle = elapsed * person.speed + person.phase * Math.PI * 2;
    const x = person.centerX + Math.cos(angle) * person.radiusX;
    const z = person.centerZ + Math.sin(angle) * person.radiusZ;
    const bob = Math.sin(angle * 2.1) * 0.012;
    const yaw = Math.atan2(-Math.sin(angle) * person.radiusX, Math.cos(angle) * person.radiusZ);
    setInstanceTransform(
      pedestrians.bodies,
      index,
      dummy,
      [x, 1.08 + bob, z],
      [0.17, 0.8, 0.17],
      [0, yaw, 0],
    );
    setInstanceTransform(pedestrians.heads, index, dummy, [x, 1.65 + bob, z], [0.14, 0.17, 0.14]);
    setInstanceTransform(pedestrians.shadows, index, dummy, [x, 0.086, z], [0.28, 1, 0.2]);
    for (let leg = 0; leg < 2; leg += 1) {
      const stride = Math.sin(angle * 2.1 + leg * Math.PI) * 0.09;
      setInstanceTransform(
        pedestrians.legs,
        index * 2 + leg,
        dummy,
        [x + (leg === 0 ? -0.065 : 0.065), 0.47, z + stride],
        [0.06, 0.68, 0.07],
        [stride * 0.24, yaw, 0],
      );
    }
  });
  pedestrians.bodies.instanceMatrix.needsUpdate = true;
  pedestrians.heads.instanceMatrix.needsUpdate = true;
  pedestrians.legs.instanceMatrix.needsUpdate = true;
  pedestrians.shadows.instanceMatrix.needsUpdate = true;
};

const createPedestrianSystem = (
  scene: THREE.Scene,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
) => {
  const palette = [0x24384a, 0xc3a15c, 0xe8e5dc, 0x386679, 0x793340, 0x4f5b42];
  const centers: Array<[number, number, number, number]> = [
    [-6.1, 2, 0.22, 3.2],
    [6.1, -3, 0.2, 3.6],
    [-13.4, 7, 0.55, 2.5],
    [13.8, -7, 0.5, 2.8],
    [-6.1, -33, 0.22, 4.2],
    [6.1, -40, 0.18, 3.3],
    [13.8, -34, 0.7, 4.5],
    [20.5, -39, 0.8, 3.6],
    [-6.1, -68, 0.18, 3.4],
    [6.1, -76, 0.22, 3.8],
    [12.5, -69, 0.7, 3.8],
    [25.5, -73, 0.5, 4.6],
    [-6.1, -104, 0.15, 3.2],
    [6.1, -112, 0.15, 3.6],
    [-18.5, -106, 0.45, 2.8],
    [18.5, -116, 0.45, 2.6],
  ];
  const states: PedestrianState[] = centers.map(([centerX, centerZ, radiusX, radiusZ], index) => ({
    centerX,
    centerZ,
    color: new THREE.Color(palette[index % palette.length]),
    phase: seededUnit(index + 212),
    radiusX,
    radiusZ,
    speed: 0.22 + seededUnit(index + 230) * 0.22,
  }));
  const bodies = new THREE.InstancedMesh(primitives.cylinder, materials.upholstery, states.length);
  const heads = new THREE.InstancedMesh(primitives.sphere, materials.skin, states.length);
  const legs = new THREE.InstancedMesh(primitives.box, materials.ink, states.length * 2);
  const shadowGeometry = new THREE.CircleGeometry(1, 12);
  shadowGeometry.rotateX(-Math.PI / 2);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    depthWrite: false,
    opacity: 0.08,
    transparent: true,
  });
  const shadows = new THREE.InstancedMesh(shadowGeometry, shadowMaterial, states.length);
  for (const mesh of [bodies, heads, legs, shadows]) {
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    scene.add(mesh);
  }
  states.forEach((state, index) => bodies.setColorAt(index, state.color));
  if (bodies.instanceColor) bodies.instanceColor.needsUpdate = true;
  const pedestrians = {
    bodies,
    dummy: new THREE.Object3D(),
    heads,
    legs,
    shadows,
    states,
  };
  updatePedestrians(pedestrians, 0);
  return pedestrians;
};

const addWorld = (
  scene: THREE.Scene,
  primitives: ScenePrimitives,
  materials: SceneMaterials,
  animation: SceneAnimation,
) => {
  addBox(scene, primitives.box, materials.ink, [56, 0.35, 158], [0, -0.2, -57], {
    receiveShadow: true,
  });
  addBox(scene, primitives.box, materials.path, [7.8, 0.08, 158], [0, 0.02, -57], {
    receiveShadow: true,
  });
  addTerrainBands(scene, materials);
  addBoxInstances(
    scene,
    primitives.box,
    materials.stone,
    [
      { position: [-4.05, 0.13, -57], size: [0.2, 0.26, 158] },
      { position: [4.05, 0.13, -57], size: [0.2, 0.26, 158] },
    ],
    { receiveShadow: true },
  );

  const lampPositions = [10, -12, -24, -48, -60, -84, -96, -118];
  addBoxInstances(
    scene,
    primitives.box,
    materials.steel,
    lampPositions.flatMap((z): BoxTransform[] => [
      { position: [-5.4, 2.25, z], size: [0.09, 4.5, 0.09] },
      { position: [5.4, 2.25, z], size: [0.09, 4.5, 0.09] },
    ]),
  );
  addBoxInstances(
    scene,
    primitives.box,
    materials.warmLight,
    lampPositions.flatMap((z): BoxTransform[] => [
      { position: [-5.4, 4.52, z], size: [0.55, 0.14, 0.55] },
      { position: [5.4, 4.52, z], size: [0.55, 0.14, 0.55] },
    ]),
  );

  addBoxInstances(
    scene,
    primitives.box,
    materials.roadPaint,
    Array.from(
      { length: 27 },
      (_, marker): BoxTransform => ({
        position: [0, 0.08, 13 - marker * 5.4],
        size: [0.06, 0.02, 2.1],
      }),
    ),
  );

  addPortals(scene, primitives, materials, [-18, -54, -90]);
  addStreetDetails(scene, primitives, materials);
  addDistantCity(scene, primitives, materials);
  addVegetation(scene, primitives, materials);

  addHospital(scene, primitives, materials, animation);
  addSchool(scene, primitives, materials, animation);
  addHotel(scene, primitives, materials, animation);
  addEnergy(scene, primitives, materials, animation);
  addSectorEnvironments(scene, primitives, materials, animation);
  animation.traffic = createTrafficSystem(scene, primitives, materials);
  animation.pedestrians = createPedestrianSystem(scene, primitives, materials);

  const flagTexture = createUaeFlagTexture(4);
  if (flagTexture) {
    const flagMaterial = new THREE.MeshStandardMaterial({
      map: flagTexture,
      metalness: 0,
      roughness: 0.78,
      side: THREE.DoubleSide,
    });
    addUaeFlag(scene, primitives, materials, animation, flagMaterial, [12.2, 0, -27.8], 0.2, 1);
    addUaeFlag(scene, primitives, materials, animation, flagMaterial, [12.3, 0, -64.4], 1.8, 1.06);
  }

  const particles = 90;
  const positions = new Float32Array(particles * 3);
  for (let index = 0; index < particles; index += 1) {
    const seed = Math.sin(index * 91.717) * 43758.5453;
    const unit = seed - Math.floor(seed);
    positions[index * 3] = (unit - 0.5) * 52;
    positions[index * 3 + 1] = 0.7 + ((index * 17) % 85) / 10;
    positions[index * 3 + 2] = 16 - ((index * 31) % 155);
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xd8cab1,
    depthWrite: false,
    opacity: 0.1,
    size: 0.032,
    sizeAttenuation: true,
    transparent: true,
  });
  scene.add(new THREE.Points(particleGeometry, particleMaterial));
};

const createSurfaceTexture = (
  base: number,
  variation: number,
  repeat: number,
  streak = 0,
  colorSpace: THREE.ColorSpace = THREE.SRGBColorSpace,
) => {
  const size = 256;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = y * size + x;
      const seed = Math.sin(index * 12.9898 + x * 4.1414) * 43758.5453;
      const noise = seed - Math.floor(seed);
      const band = Math.sin(y * 0.31 + Math.sin(x * 0.08)) * streak;
      const speck = (x * 19 + y * 37) % 109 === 0 ? -variation * 0.7 : 0;
      const value = Math.min(255, Math.max(0, base + (noise - 0.5) * variation + band + speck));
      data[index * 4] = value;
      data[index * 4 + 1] = value;
      data[index * 4 + 2] = value;
      data[index * 4 + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.anisotropy = 8;
  texture.colorSpace = colorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.repeat.set(repeat, repeat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
};

const createMaterials = (): SceneMaterials => {
  const concreteMap = createSurfaceTexture(224, 24, 3, 1.5);
  const sandstoneMap = createSurfaceTexture(218, 34, 3, 4);
  const stoneMap = createSurfaceTexture(208, 36, 4, 1);
  const asphaltMap = createSurfaceTexture(202, 48, 7, 0.5);
  const earthMap = createSurfaceTexture(176, 54, 5, 2.4);
  const grassMap = createSurfaceTexture(172, 42, 7, 3.2);
  const surfaceDetail = createSurfaceTexture(138, 86, 5, 0, THREE.NoColorSpace);

  return {
    bronze: new THREE.MeshStandardMaterial({
      color: 0x8e7046,
      envMapIntensity: 1.12,
      metalness: 0.9,
      roughness: 0.44,
    }),
    cyan: new THREE.MeshStandardMaterial({
      color: 0x66828a,
      emissive: 0x20383d,
      emissiveIntensity: 0.12,
      metalness: 0,
      roughness: 0.55,
    }),
    darkGlass: new THREE.MeshPhysicalMaterial({
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      color: 0x334b52,
      envMapIntensity: 1.38,
      metalness: 0,
      roughness: 0.16,
    }),
    earth: new THREE.MeshStandardMaterial({
      bumpMap: surfaceDetail,
      bumpScale: 0.035,
      color: 0x8a7358,
      map: earthMap,
      metalness: 0,
      roughness: 0.94,
    }),
    energy: new THREE.MeshStandardMaterial({
      color: 0x4f6659,
      emissive: 0x1f2923,
      emissiveIntensity: 0.08,
      metalness: 0,
      roughness: 0.62,
    }),
    foliage: new THREE.MeshStandardMaterial({
      color: 0x536044,
      metalness: 0,
      roughness: 0.9,
      side: THREE.DoubleSide,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      color: 0x54727b,
      depthWrite: false,
      envMapIntensity: 1.46,
      metalness: 0,
      opacity: 0.8,
      roughness: 0.1,
      transparent: true,
    }),
    gold: new THREE.MeshStandardMaterial({
      color: 0xbca269,
      envMapIntensity: 1.18,
      metalness: 0.88,
      roughness: 0.46,
    }),
    grass: new THREE.MeshStandardMaterial({
      bumpMap: surfaceDetail,
      bumpScale: 0.028,
      color: 0x65705b,
      map: grassMap,
      metalness: 0,
      roughness: 0.92,
    }),
    industrialWhite: new THREE.MeshStandardMaterial({
      color: 0xd8dbd6,
      envMapIntensity: 1.05,
      metalness: 0.02,
      roughness: 0.46,
    }),
    ink: new THREE.MeshStandardMaterial({
      bumpMap: surfaceDetail,
      bumpScale: 0.012,
      color: 0x24282b,
      envMapIntensity: 0.82,
      metalness: 0,
      roughness: 0.74,
    }),
    palmTrunk: new THREE.MeshStandardMaterial({
      color: 0x80684d,
      metalness: 0,
      roughness: 0.94,
    }),
    path: new THREE.MeshStandardMaterial({
      bumpMap: surfaceDetail,
      bumpScale: 0.025,
      color: 0x292c2c,
      map: asphaltMap,
      metalness: 0,
      roughness: 0.9,
    }),
    red: new THREE.MeshStandardMaterial({
      color: 0x771c25,
      metalness: 0,
      roughness: 0.52,
    }),
    roadPaint: new THREE.MeshStandardMaterial({
      color: 0xe9e7df,
      metalness: 0,
      roughness: 0.72,
    }),
    safetyYellow: new THREE.MeshStandardMaterial({
      color: 0xe3b341,
      metalness: 0,
      roughness: 0.58,
    }),
    sand: new THREE.MeshStandardMaterial({
      bumpMap: surfaceDetail,
      bumpScale: 0.022,
      color: 0xc8ae86,
      map: sandstoneMap,
      metalness: 0,
      roughness: 0.88,
    }),
    skin: new THREE.MeshStandardMaterial({
      color: 0xb98568,
      metalness: 0,
      roughness: 0.82,
    }),
    steel: new THREE.MeshStandardMaterial({
      color: 0x7a8385,
      envMapIntensity: 1.1,
      metalness: 0.82,
      roughness: 0.43,
    }),
    stone: new THREE.MeshStandardMaterial({
      bumpMap: surfaceDetail,
      bumpScale: 0.02,
      color: 0xd8c7a5,
      map: stoneMap,
      metalness: 0,
      roughness: 0.82,
    }),
    upholstery: new THREE.MeshStandardMaterial({
      color: 0xe3ddd0,
      metalness: 0,
      roughness: 0.88,
    }),
    vehiclePaint: new THREE.MeshPhysicalMaterial({
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      color: 0xe6e4df,
      envMapIntensity: 1.32,
      metalness: 0,
      roughness: 0.26,
    }),
    water: new THREE.MeshPhysicalMaterial({
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      color: 0x167b91,
      depthWrite: false,
      envMapIntensity: 1.9,
      ior: 1.333,
      metalness: 0,
      opacity: 0.88,
      roughness: 0.09,
      thickness: 0.55,
      transmission: 0.12,
      transparent: true,
    }),
    warmGlass: new THREE.MeshStandardMaterial({
      color: 0x9c754e,
      emissive: 0xc47a3c,
      emissiveIntensity: 0.48,
      metalness: 0,
      roughness: 0.48,
    }),
    warmLight: new THREE.MeshStandardMaterial({
      color: 0xffddb0,
      emissive: 0xffb15d,
      emissiveIntensity: 0.82,
      metalness: 0,
      roughness: 0.38,
    }),
    white: new THREE.MeshStandardMaterial({
      bumpMap: surfaceDetail,
      bumpScale: 0.012,
      color: 0xf0f2f1,
      map: concreteMap,
      metalness: 0,
      roughness: 0.72,
    }),
  };
};

const configurePbrTexture = (
  texture: THREE.Texture,
  options: {
    anisotropy: number;
    colorSpace?: THREE.ColorSpace;
    repeat: [number, number];
  },
) => {
  texture.anisotropy = options.anisotropy;
  texture.colorSpace = options.colorSpace ?? THREE.NoColorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.repeat.set(...options.repeat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
};

const applySurface = (
  material: THREE.MeshStandardMaterial,
  surface: LoadedSurface,
  normalStrength: number,
) => {
  const previousColor = material.map;
  material.map = surface.color;
  if (previousColor && previousColor !== surface.color) previousColor.dispose();

  material.normalMap = surface.normal ?? null;
  material.normalScale.setScalar(normalStrength);
  material.roughnessMap = surface.roughness;
  material.roughness = 1;
  if (surface.ao) {
    surface.ao.channel = 0;
    material.aoMap = surface.ao;
    material.aoMapIntensity = 0.75;
  }
  material.bumpMap = null;
  material.needsUpdate = true;
};

const prepareAuthoredModel = (
  root: THREE.Object3D,
  targetHeight: number,
  placements: readonly AuthoredModelPlacement[],
) => {
  root.updateMatrixWorld(true);
  const sourceBounds = new THREE.Box3().setFromObject(root);
  const sourceHeight = Math.max(sourceBounds.max.y - sourceBounds.min.y, 0.001);
  root.scale.multiplyScalar(targetHeight / sourceHeight);
  root.updateMatrixWorld(true);
  const scaledBounds = new THREE.Box3().setFromObject(root);
  root.position.y -= scaledBounds.min.y;

  const normalized = new THREE.Group();
  normalized.add(root);
  const cluster = new THREE.Group();
  for (let index = 0; index < placements.length; index += 1) {
    const placement = placements[index];
    const instance = index === 0 ? normalized : normalized.clone(true);
    instance.position.set(...placement.position);
    instance.rotation.y = placement.rotation ?? 0;
    instance.scale.setScalar(placement.scale ?? 1);
    cluster.add(instance);
  }
  return cluster;
};

const disposeScene = (scene: THREE.Object3D) => {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh || object instanceof THREE.Points)) return;
    geometries.add(object.geometry);
    const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of objectMaterials) materials.add(material);
  });
  for (const material of materials) {
    for (const value of Object.values(material)) {
      if (value instanceof THREE.Texture) textures.add(value);
    }
  }
  for (const geometry of geometries) geometry.dispose();
  for (const texture of textures) {
    const source = texture.source.data as { close?: () => void } | null;
    source?.close?.();
    texture.dispose();
  }
  for (const material of materials) material.dispose();
};

const updateCallbackRef = <T,>(ref: MutableRefObject<T | undefined>, callback: T | undefined) => {
  ref.current = callback;
};

export const SectorsExperience3D = forwardRef<SectorsExperience3DHandle, SectorsExperience3DProps>(
  function SectorsExperience3D({ onAssetProgress, onError, onReady }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lastScrollInputAtRef = useRef(0);
    const progressRef = useRef(0);
    const invalidateRef = useRef<() => void>(() => undefined);
    const onAssetProgressRef = useRef(onAssetProgress);
    const onErrorRef = useRef(onError);
    const onReadyRef = useRef(onReady);

    updateCallbackRef(onAssetProgressRef, onAssetProgress);
    updateCallbackRef(onErrorRef, onError);
    updateCallbackRef(onReadyRef, onReady);

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          progressRef.current = 0;
          invalidateRef.current();
        },
        setProgress: (progress: number) => {
          lastScrollInputAtRef.current = performance.now();
          progressRef.current = clampProgress(progress);
          invalidateRef.current();
        },
      }),
      [],
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      let renderer: THREE.WebGLRenderer | null = null;
      let animationFrame = 0;
      let assetHydrationTimer: number | null = null;
      let hasStartedAssetHydration = false;
      let hasAnnouncedReady = false;
      let isDisposed = false;
      const assetAbortControllers = new Set<AbortController>();

      try {
        renderer = new THREE.WebGLRenderer({
          alpha: false,
          antialias: window.innerWidth >= 720,
          canvas,
          powerPreference: "high-performance",
        });
      } catch {
        onErrorRef.current?.();
        return;
      }

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.98;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.shadowMap.autoUpdate = false;
      renderer.shadowMap.needsUpdate = true;

      const gltfLoader = new GLTFLoader();
      const hdrLoader = new HDRLoader();
      const textureLoader = new THREE.TextureLoader();
      const textureAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x91a7b2);
      scene.fog = new THREE.FogExp2(0xb5a78e, 0.0072);

      let environmentTarget: THREE.WebGLRenderTarget | null = null;
      let environmentGenerator: THREE.PMREMGenerator | null = null;
      let environmentScene: THREE.Scene | null = null;
      try {
        environmentGenerator = new THREE.PMREMGenerator(renderer);
        environmentScene = new RoomEnvironment();
        environmentTarget = environmentGenerator.fromScene(environmentScene, 0.035);
        scene.environment = environmentTarget.texture;
      } catch {
        environmentTarget = null;
      } finally {
        if (environmentScene) disposeScene(environmentScene);
        environmentGenerator?.dispose();
      }

      const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 180);
      camera.up.set(0, 1, 0);
      const materials = createMaterials();
      const primitives: ScenePrimitives = {
        box: new THREE.BoxGeometry(1, 1, 1),
        cylinder: new THREE.CylinderGeometry(1, 1, 1, 24),
        roundedBox: new RoundedBoxGeometry(1, 1, 1, 3, 0.08),
        sphere: new THREE.SphereGeometry(1, 20, 14),
      };
      const animation: SceneAnimation = {
        clouds: null,
        flags: [],
        interiorLights: [],
        pedestrians: null,
        rotors: [],
        sky: addSky(scene),
        slidingDoors: [],
        steamPlumes: [],
        traffic: null,
        water: null,
      };

      const hemisphere = new THREE.HemisphereLight(0xddebf0, 0x88745b, 1.28);
      scene.add(hemisphere);
      const sun = new THREE.DirectionalLight(0xffe4bd, 3.25);
      sun.position.set(-18, 26, 18);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      sun.shadow.bias = -0.00035;
      sun.shadow.normalBias = 0.025;
      sun.shadow.camera.left = -25;
      sun.shadow.camera.right = 25;
      sun.shadow.camera.top = 23;
      sun.shadow.camera.bottom = -8;
      sun.shadow.camera.near = 1;
      sun.shadow.camera.far = 80;
      const lightTarget = new THREE.Object3D();
      sun.target = lightTarget;
      scene.add(lightTarget);
      scene.add(sun);
      const rim = new THREE.DirectionalLight(0xc6d9dc, 0.42);
      rim.position.set(18, 14, -40);
      rim.target = lightTarget;
      scene.add(rim);
      const sectorLight = new THREE.PointLight(0xffdfb8, 2.8, 24, 2);
      scene.add(sectorLight);

      addWorld(scene, primitives, materials, animation);

      const cameraCurve = new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 2.08, 27),
          new THREE.Vector3(-0.32, 1.84, 14),
          new THREE.Vector3(0.34, 1.82, -5),
          new THREE.Vector3(0.38, 1.94, -17),
          new THREE.Vector3(-0.3, 1.86, -43),
          new THREE.Vector3(-0.4, 1.96, -53),
          new THREE.Vector3(0.32, 1.86, -80),
          new THREE.Vector3(0.28, 1.92, -90),
          new THREE.Vector3(0, 1.88, -119),
        ],
        false,
        "catmullrom",
        0.52,
      );
      const cameraLookCurve = new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 3, 2),
          new THREE.Vector3(-0.72, 2.45, 1),
          new THREE.Vector3(0.78, 2.5, -20),
          new THREE.Vector3(0, 2.42, -30),
          new THREE.Vector3(-0.76, 2.55, -56),
          new THREE.Vector3(0.72, 2.55, -67),
          new THREE.Vector3(0.8, 2.55, -93),
          new THREE.Vector3(0, 2.7, -105),
          new THREE.Vector3(0, 2.75, -136),
        ],
        false,
        "catmullrom",
        0.48,
      );

      const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      let reducedMotion = reducedMotionQuery.matches;
      let compactRenderer = canvas.clientWidth < 720;

      const resize = () => {
        if (!renderer) return;
        const width = Math.max(1, canvas.clientWidth);
        const height = Math.max(1, canvas.clientHeight);
        const compact = width < 720;
        compactRenderer = compact;
        const pixelBudget = compact ? 1_400_000 : 3_200_000;
        const budgetRatio = Math.sqrt(pixelBudget / (width * height));
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.2 : 1.5, budgetRatio));
        renderer.setSize(width, height, false);
        renderer.shadowMap.enabled = !compact;
        renderer.shadowMap.needsUpdate = !compact;
        camera.aspect = width / height;
        camera.fov = compact ? 55 : 44;
        camera.updateProjectionMatrix();
      };

      const resizeObserver =
        typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
      resizeObserver?.observe(canvas);
      window.addEventListener("resize", resize);
      resize();

      const reportAssetProgress = (
        progress: number,
        label: string,
        phase: SectorsAssetProgress["phase"] = "loading",
      ) => {
        if (isDisposed) return;
        onAssetProgressRef.current?.({
          label,
          phase,
          progress: clampProgress(progress),
        });
      };

      const loadSceneTexture = (url: string, timeoutMs = 6500) =>
        new Promise<THREE.Texture>((resolve, reject) => {
          let settled = false;
          const timeout = window.setTimeout(() => {
            settled = true;
            reject(new Error("Scene texture timed out"));
          }, timeoutMs);
          textureLoader.load(
            url,
            (texture) => {
              if (settled) {
                texture.dispose();
                return;
              }
              settled = true;
              window.clearTimeout(timeout);
              resolve(texture);
            },
            undefined,
            (error) => {
              if (settled) return;
              settled = true;
              window.clearTimeout(timeout);
              reject(error);
            },
          );
        });

      const loadTexture = async (
        url: string,
        repeat: [number, number],
        colorSpace: THREE.ColorSpace = THREE.NoColorSpace,
      ) => {
        const texture = await loadSceneTexture(url);
        if (isDisposed) {
          texture.dispose();
          throw new Error("Scene disposed while loading a texture");
        }
        return configurePbrTexture(texture, {
          anisotropy: textureAnisotropy,
          colorSpace,
          repeat,
        });
      };

      const loadHdrEnvironment = (url: string, timeoutMs = 6500) =>
        new Promise<THREE.DataTexture>((resolve, reject) => {
          let settled = false;
          const timeout = window.setTimeout(() => {
            settled = true;
            reject(new Error("Lighting environment timed out"));
          }, timeoutMs);
          hdrLoader.load(
            url,
            (texture) => {
              if (settled) {
                texture.dispose();
                return;
              }
              settled = true;
              window.clearTimeout(timeout);
              resolve(texture);
            },
            undefined,
            (error) => {
              if (settled) return;
              settled = true;
              window.clearTimeout(timeout);
              reject(error);
            },
          );
        });

      const loadSurface = async (
        source: {
          ao?: string;
          color: string;
          normal: string;
          roughness: string;
        },
        repeat: [number, number],
        includeNormalDetail: boolean,
      ) => {
        const loaded: THREE.Texture[] = [];
        try {
          const color = await loadTexture(source.color, repeat, THREE.SRGBColorSpace);
          loaded.push(color);
          const roughness = await loadTexture(source.roughness, repeat);
          loaded.push(roughness);
          const normal = includeNormalDetail ? await loadTexture(source.normal, repeat) : undefined;
          if (normal) loaded.push(normal);
          const ao =
            includeNormalDetail && source.ao ? await loadTexture(source.ao, repeat) : undefined;
          if (ao) loaded.push(ao);
          return { ao, color, normal, roughness } satisfies LoadedSurface;
        } catch (error) {
          for (const texture of loaded) texture.dispose();
          throw error;
        }
      };

      const fetchArrayBuffer = async (url: string) => {
        const controller = new AbortController();
        assetAbortControllers.add(controller);
        try {
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) throw new Error(`Unable to load 3D asset (${response.status})`);
          return await response.arrayBuffer();
        } finally {
          assetAbortControllers.delete(controller);
        }
      };

      const waitForScrollIdle = async () => {
        const remaining = 140 - (performance.now() - lastScrollInputAtRef.current);
        if (remaining > 0) {
          await new Promise<void>((resolve) => window.setTimeout(resolve, remaining));
        }
      };

      const configureAuthoredModel = (root: THREE.Object3D, castShadows: boolean) => {
        root.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          const objectMaterials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          const canCastShadow = objectMaterials.every((material) => !material.transparent);
          object.castShadow = castShadows && canCastShadow;
          object.receiveShadow = castShadows;
          object.frustumCulled = true;

          for (const material of objectMaterials) {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.envMapIntensity = 1.2;
              material.needsUpdate = true;
            }
            for (const value of Object.values(material)) {
              if (!(value instanceof THREE.Texture)) continue;
              value.anisotropy = textureAnisotropy;
              value.needsUpdate = true;
              renderer?.initTexture(value);
            }
          }
        });
      };

      const loadAuthoredModel = async (options: {
        name: string;
        placements: readonly AuthoredModelPlacement[];
        targetHeight: number;
        url: string;
      }) => {
        await waitForScrollIdle();
        if (isDisposed || !renderer) return false;
        const buffer = await fetchArrayBuffer(options.url);
        if (isDisposed) return false;
        const gltf = await gltfLoader.parseAsync(buffer, "");
        if (isDisposed) {
          disposeScene(gltf.scene);
          return false;
        }

        gltf.scene.name = `${options.name} authored PBR model`;
        configureAuthoredModel(gltf.scene, !compactRenderer);
        const cluster = prepareAuthoredModel(gltf.scene, options.targetHeight, options.placements);
        cluster.name = `${options.name} authored detail`;

        await renderer.compileAsync(cluster, camera, scene);
        if (isDisposed) {
          disposeScene(cluster);
          return false;
        }

        scene.add(cluster);
        renderer.shadowMap.needsUpdate = renderer.shadowMap.enabled;
        scheduleFrame();
        return true;
      };

      const hydrateProductionAssets = async () => {
        type NavigatorWithHints = Navigator & {
          connection?: { effectiveType?: string; saveData?: boolean };
          deviceMemory?: number;
        };
        const navigatorWithHints = navigator as NavigatorWithHints;
        const connection = navigatorWithHints.connection;
        const constrainedNetwork =
          connection?.saveData === true ||
          connection?.effectiveType === "slow-2g" ||
          connection?.effectiveType === "2g";
        const lowMemory = (navigatorWithHints.deviceMemory ?? 8) <= 4;
        const includeNormalDetail = !compactRenderer && !lowMemory;
        const includeAuthoredModels = !compactRenderer && !lowMemory && !constrainedNetwork;
        let failures = 0;

        reportAssetProgress(0.02, "Applying Al Mulla identity");
        try {
          const brandTexture = await loadSceneTexture(sector3DAssets.brandMark, 4500);
          if (isDisposed) {
            brandTexture.dispose();
            return;
          }
          brandTexture.anisotropy = textureAnisotropy;
          brandTexture.colorSpace = THREE.SRGBColorSpace;
          brandTexture.needsUpdate = true;
          addBrandMonument(scene, primitives, materials, brandTexture);
          scheduleFrame();
        } catch {
          failures += 1;
        }

        reportAssetProgress(0.04, "Preparing production lighting");
        if (constrainedNetwork) {
          reportAssetProgress(
            1,
            failures > 0 ? "Optimized scene active" : "Optimized scene ready",
            failures > 0 ? "degraded" : "ready",
          );
          return;
        }

        try {
          const hdrTexture = await loadHdrEnvironment(sector3DAssets.environment);
          if (isDisposed || !renderer) {
            hdrTexture.dispose();
            return;
          }
          hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
          const pmremGenerator = new THREE.PMREMGenerator(renderer);
          pmremGenerator.compileEquirectangularShader();
          const nextEnvironmentTarget = pmremGenerator.fromEquirectangular(hdrTexture);
          hdrTexture.dispose();
          pmremGenerator.dispose();
          if (isDisposed) {
            nextEnvironmentTarget.dispose();
            return;
          }
          const previousEnvironmentTarget = environmentTarget;
          environmentTarget = nextEnvironmentTarget;
          scene.environment = nextEnvironmentTarget.texture;
          previousEnvironmentTarget?.dispose();
          scheduleFrame();
        } catch {
          failures += 1;
        }
        reportAssetProgress(0.16, "Lighting environment ready");

        try {
          const asphalt = await loadSurface(
            sector3DAssets.materials.asphalt,
            [7, 5],
            includeNormalDetail,
          );
          applySurface(materials.path, asphalt, 0.72);
          materials.path.color.setHex(0xffffff);
          scheduleFrame();
        } catch {
          failures += 1;
        }
        reportAssetProgress(0.28, "Laying authored asphalt");

        try {
          const concrete = await loadSurface(
            sector3DAssets.materials.concrete,
            [4, 2],
            includeNormalDetail,
          );
          applySurface(materials.white, concrete, 0.58);
          applySurface(materials.stone, concrete, 0.46);
          materials.white.color.setHex(0xf4eee4);
          materials.stone.color.setHex(0xf0dfc6);
          scheduleFrame();
        } catch {
          failures += 1;
        }
        reportAssetProgress(0.4, "Refining architectural surfaces");

        try {
          const sand = await loadSurface(
            sector3DAssets.materials.sand,
            [5, 5],
            includeNormalDetail,
          );
          applySurface(materials.sand, sand, 0.62);
          applySurface(materials.earth, sand, 0.5);
          materials.sand.color.setHex(0xffffff);
          materials.earth.color.setHex(0xe5d4bd);
          scheduleFrame();
        } catch {
          failures += 1;
        }
        reportAssetProgress(0.52, "Ground materials ready");

        if (isDisposed) return;
        if (!includeAuthoredModels) {
          reportAssetProgress(
            1,
            failures > 0 ? "Optimized scene active" : "Production materials ready",
            failures > 0 ? "degraded" : "ready",
          );
          return;
        }

        const authoredModels = [
          {
            name: "Hospital wheelchair",
            placements: [
              { position: [4.75, 0.16, 6.5], rotation: -0.62 },
              { position: [-4.7, 0.16, 6.05], rotation: 0.5, scale: 0.94 },
            ],
            targetHeight: 1.12,
            url: sector3DAssets.models.hospital,
          },
          {
            name: "School desk",
            placements: [
              { position: [-4.85, 0.16, -29.65], rotation: 0.3 },
              { position: [4.9, 0.16, -30.2], rotation: -0.32, scale: 0.96 },
            ],
            targetHeight: 0.9,
            url: sector3DAssets.models.school,
          },
          {
            name: "Hotel table",
            placements: [
              { position: [-4.95, 0.16, -64.2], rotation: 0.2 },
              { position: [5.05, 0.16, -64.7], rotation: -0.24, scale: 0.92 },
            ],
            targetHeight: 0.72,
            url: sector3DAssets.models.hotel,
          },
          {
            name: "Energy barrels",
            placements: [
              { position: [-5.1, 0.16, -101.7], rotation: 0.16 },
              { position: [5.15, 0.16, -102.15], rotation: -0.2 },
              { position: [6.18, 0.16, -101.7], rotation: 0.08, scale: 0.96 },
            ],
            targetHeight: 1.04,
            url: sector3DAssets.models.energy,
          },
        ] satisfies Array<{
          name: string;
          placements: AuthoredModelPlacement[];
          targetHeight: number;
          url: string;
        }>;

        for (let index = 0; index < authoredModels.length; index += 1) {
          if (isDisposed) return;
          const model = authoredModels[index];
          reportAssetProgress(0.52 + index * 0.12, `Adding ${model.name.toLowerCase()}`);
          try {
            await loadAuthoredModel(model);
          } catch {
            failures += 1;
          }
          reportAssetProgress(0.52 + (index + 1) * 0.12, `${model.name} ready`);
        }

        reportAssetProgress(
          1,
          failures > 0 ? "Optimized scene active" : "Production assets ready",
          failures > 0 ? "degraded" : "ready",
        );
      };

      const startAssetHydration = () => {
        if (hasStartedAssetHydration || isDisposed) return;
        hasStartedAssetHydration = true;
        assetHydrationTimer = window.setTimeout(() => {
          assetHydrationTimer = null;
          void hydrateProductionAssets();
        }, 120);
      };

      const clock = new THREE.Clock();
      const cameraPosition = new THREE.Vector3();
      const cameraTarget = new THREE.Vector3();
      const lighting = [
        { color: 0xffe4c3, exposure: 0.98, fog: 0xb7aa93, intensity: 2.6, z: 0 },
        { color: 0xffdfb8, exposure: 0.99, fog: 0xb8aa91, intensity: 2.5, z: -36 },
        { color: 0xffd8ab, exposure: 0.99, fog: 0xb6a68c, intensity: 2.7, z: -72 },
        { color: 0xffe2bd, exposure: 0.98, fog: 0xb5a88f, intensity: 2.55, z: -108 },
      ];
      const blendedLightColor = new THREE.Color();
      const blendedFogColor = new THREE.Color();
      const nextColor = new THREE.Color();
      let activeLightingIndex = -1;
      let documentVisible = !document.hidden;
      let sceneVisible = true;
      let lastRenderTime = 0;

      const render = (time: number) => {
        if (!renderer || isDisposed) return;
        animationFrame = 0;
        if (compactRenderer && time - lastRenderTime < 32) {
          scheduleFrame();
          return;
        }
        lastRenderTime = time;
        const delta = Math.min(clock.getDelta(), 0.05);
        const elapsed = clock.elapsedTime;

        cameraCurve.getPoint(progressRef.current, cameraPosition);
        cameraLookCurve.getPoint(progressRef.current, cameraTarget);
        camera.position.copy(cameraPosition);
        camera.lookAt(cameraTarget);
        animation.sky.position.copy(cameraPosition);
        const desiredFov = compactRenderer ? 55 : 44;
        if (Math.abs(camera.fov - desiredFov) > 0.01) {
          camera.fov = desiredFov;
          camera.updateProjectionMatrix();
        }

        const nextLightingIndex = Math.min(3, Math.floor(progressRef.current * 4));
        if (nextLightingIndex !== activeLightingIndex) {
          activeLightingIndex = nextLightingIndex;
          const setting = lighting[nextLightingIndex];
          lightTarget.position.set(0, 2.5, setting.z);
          sun.position.set(-18, 26, setting.z + 18);
          rim.position.set(18, 14, setting.z - 32);
          renderer.shadowMap.needsUpdate = renderer.shadowMap.enabled;
        }
        const lightingProgress = Math.min(3, progressRef.current * 4);
        const lightingFromIndex = Math.min(3, Math.floor(lightingProgress));
        const lightingToIndex = Math.min(3, lightingFromIndex + 1);
        const lightingMix = THREE.MathUtils.smoothstep(lightingProgress - lightingFromIndex, 0, 1);
        const lightingFrom = lighting[lightingFromIndex];
        const lightingTo = lighting[lightingToIndex];
        blendedLightColor
          .setHex(lightingFrom.color)
          .lerp(nextColor.setHex(lightingTo.color), lightingMix);
        blendedFogColor
          .setHex(lightingFrom.fog)
          .lerp(nextColor.setHex(lightingTo.fog), lightingMix);
        sectorLight.color.copy(blendedLightColor);
        sectorLight.intensity = THREE.MathUtils.lerp(
          lightingFrom.intensity,
          lightingTo.intensity,
          lightingMix,
        );
        sectorLight.position.set(
          0,
          5.2,
          THREE.MathUtils.lerp(lightingFrom.z, lightingTo.z, lightingMix) + 1.5,
        );
        renderer.toneMappingExposure = THREE.MathUtils.lerp(
          lightingFrom.exposure,
          lightingTo.exposure,
          lightingMix,
        );
        if (scene.fog instanceof THREE.FogExp2) scene.fog.color.copy(blendedFogColor);

        if (!reducedMotion) {
          const skyMaterial = animation.sky.material;
          if (skyMaterial instanceof THREE.ShaderMaterial)
            skyMaterial.uniforms.uTime.value = elapsed;
          for (let index = 0; index < animation.rotors.length; index += 1) {
            animation.rotors[index].rotation.z = elapsed * (0.3 + index * 0.04);
          }
          for (const door of animation.slidingDoors) {
            const cycle = (elapsed + door.phase) % 9.2;
            const opening = THREE.MathUtils.smoothstep(cycle, 0.7, 1.8);
            const closing = 1 - THREE.MathUtils.smoothstep(cycle, 6.4, 7.6);
            const openness = Math.min(opening, closing);
            door.left.position.x = THREE.MathUtils.damp(
              door.left.position.x,
              door.closedLeftX - door.travel * openness,
              7,
              delta,
            );
            door.right.position.x = THREE.MathUtils.damp(
              door.right.position.x,
              door.closedRightX + door.travel * openness,
              7,
              delta,
            );
          }
          for (const flag of animation.flags) {
            const positions = flag.geometry.getAttribute("position");
            for (let vertex = 0; vertex < positions.count; vertex += 1) {
              const offset = vertex * 3;
              const baseX = flag.basePositions[offset];
              const baseY = flag.basePositions[offset + 1];
              const baseZ = flag.basePositions[offset + 2];
              const freeEdge = THREE.MathUtils.clamp(baseX / flag.span, 0, 1);
              const wave = Math.sin(baseX * 3.5 + elapsed * 2.05 + flag.phase) * freeEdge;
              positions.setXYZ(
                vertex,
                baseX,
                baseY + Math.sin(baseX * 2.1 + elapsed * 1.35 + flag.phase) * 0.018 * freeEdge,
                baseZ + wave * 0.065,
              );
            }
            positions.needsUpdate = true;
          }
          for (const interior of animation.interiorLights) {
            interior.material.emissiveIntensity =
              interior.baseIntensity * (0.96 + Math.sin(elapsed * 0.34 + interior.phase) * 0.04);
          }
          if (animation.traffic) updateTraffic(animation.traffic, elapsed);
          if (animation.pedestrians) updatePedestrians(animation.pedestrians, elapsed);
          for (const plume of animation.steamPlumes) {
            plume.points.position.y =
              plume.baseY + Math.sin(elapsed * 0.42 + plume.phase * 8) * 0.18;
            plume.points.rotation.y = elapsed * 0.035 + plume.phase;
            const plumeMaterial = plume.points.material;
            if (plumeMaterial instanceof THREE.PointsMaterial) {
              plumeMaterial.opacity = 0.18 + Math.sin(elapsed * 0.31 + plume.phase) * 0.045;
            }
          }
          if (animation.water) {
            animation.water.roughness = 0.075 + Math.sin(elapsed * 0.7) * 0.018;
            animation.water.clearcoatRoughness = 0.035 + Math.sin(elapsed * 0.43) * 0.012;
          }
        }

        try {
          renderer.render(scene, camera);
        } catch {
          isDisposed = true;
          onErrorRef.current?.();
          return;
        }
        if (!hasAnnouncedReady) {
          hasAnnouncedReady = true;
          onReadyRef.current?.();
          startAssetHydration();
        }
        if (!reducedMotion) scheduleFrame();
      };

      function scheduleFrame() {
        if (animationFrame !== 0 || isDisposed || !documentVisible || !sceneVisible) return;
        animationFrame = window.requestAnimationFrame(render);
      }

      const handleReducedMotionChange = (event: MediaQueryListEvent) => {
        reducedMotion = event.matches;
        scheduleFrame();
      };
      reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
      invalidateRef.current = scheduleFrame;

      const visibilityObserver =
        typeof IntersectionObserver === "undefined"
          ? null
          : new IntersectionObserver(
              ([entry]) => {
                sceneVisible = entry?.isIntersecting ?? true;
                if (sceneVisible) {
                  clock.getDelta();
                  scheduleFrame();
                }
              },
              { threshold: 0.01 },
            );
      visibilityObserver?.observe(canvas);
      const handleVisibilityChange = () => {
        documentVisible = !document.hidden;
        if (documentVisible) {
          clock.getDelta();
          scheduleFrame();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      const handleContextLost = (event: Event) => {
        event.preventDefault();
        onErrorRef.current?.();
      };
      canvas.addEventListener("webglcontextlost", handleContextLost);
      scheduleFrame();

      return () => {
        isDisposed = true;
        invalidateRef.current = () => undefined;
        if (assetHydrationTimer !== null) window.clearTimeout(assetHydrationTimer);
        for (const controller of assetAbortControllers) controller.abort();
        assetAbortControllers.clear();
        window.cancelAnimationFrame(animationFrame);
        visibilityObserver?.disconnect();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        resizeObserver?.disconnect();
        window.removeEventListener("resize", resize);
        reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        disposeScene(scene);
        environmentTarget?.dispose();
        renderer?.dispose();
        renderer?.forceContextLoss();
        renderer = null;
      };
    }, []);

    return <canvas ref={canvasRef} className="sectors-experience-webgl" aria-hidden="true" />;
  },
);
