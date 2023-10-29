import * as THREE from "three";
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene();

// const light = new THREE.PointLight(0x00ff83, 10000, 100);
// scene.add(light);
// light.position.set(0, 10, 10);
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
// scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({ color: '#F00' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh);


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 20);
scene.add(camera);



const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas, });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2)
renderer.render(scene, camera)
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 10; // Adjust the speed as needed
controls.enablePan = false;
controls.enableZoom = false;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth,
    sizes.height = window.innerHeight


  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height

  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()
