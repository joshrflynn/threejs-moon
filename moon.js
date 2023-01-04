import * as THREE from "three";

const sphereGeo = new THREE.SphereGeometry(10);
const torusTexture = new THREE.TextureLoader().load("moon.jpg");
const bumpTexture = new THREE.TextureLoader().load("normal.jpg");
const material = new THREE.MeshStandardMaterial({
  map: torusTexture,
  normalMap: bumpTexture,
  transparent: false,
});

//this is the actual object displayed on the screen
export const moon = new THREE.Mesh(sphereGeo, material);
