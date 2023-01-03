import "./style.css";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 40;

const sphereGeo = new THREE.SphereGeometry(10);
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusTexture = new THREE.TextureLoader().load("moon.jpg");
const bumpTexture = new THREE.TextureLoader().load("normal.jpg");
const material = new THREE.MeshStandardMaterial({
  map: torusTexture,
  normalMap: bumpTexture,
});

//this is the actual object displayed on the screen
const moon = new THREE.Mesh(sphereGeo, material);
scene.add(moon);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 20;
controls.maxDistance = 50;

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color("rgba(255,255,255,.2)"),
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);

  // torus.rotateX(0.005);
  moon.rotateY(0.0025);
  // torus.rotateZ(0.005);

  controls.update();

  renderer.render(scene, camera);
}
animate();
