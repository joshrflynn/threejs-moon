import "./style.css";
import * as THREE from "three";
import { moon } from "./moon";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 40;

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

scene.add(moon);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 20;
controls.maxDistance = 50;

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

const amount = 100000;
const radius = 300;

const positions = new Float32Array(amount * 3);
const colors = new Float32Array(amount * 3);
const sizes = new Float32Array(amount);

const vertex = new THREE.Vector3();
const color = new THREE.Color(0xffffff);

for (let i = 0; i < amount; i++) {
  vertex.x = (Math.random() * 2 - 1) * radius;
  vertex.y = (Math.random() * 2 - 1) * radius;
  vertex.z = (Math.random() * 2 - 1) * radius;
  vertex.toArray(positions, i * 3);

  color.toArray(colors, i * 3);

  sizes[i] = 2;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

//

const material = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color(0xffffff) },
    pointTexture: {
      value: new THREE.TextureLoader().load("spark1.png"),
    },
  },
  vertexShader: document.getElementById("vertexshader").textContent,
  fragmentShader: document.getElementById("fragmentshader").textContent,

  blending: THREE.AdditiveBlending,
  depthTest: false,
  transparent: true,
});

//

const sphere = new THREE.Points(geometry, material);
scene.add(sphere);
let sizeCount = 0;
function animate() {
  requestAnimationFrame(animate);

  // torus.rotateX(0.005);
  moon.rotateY(0.0025);
  // torus.rotateZ(0.005);

  controls.update();

  renderer.render(scene, camera);
}
animate();
