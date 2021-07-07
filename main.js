import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ------Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// ------Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe:true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
//renderer.render(scene, camera);

// ------Point Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

// ------Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);


// ------Helper
const lightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(lightHelper);

// ------Controllers
const controls = new OrbitControls(camera, renderer.domElement);


// ------Add stars
function addStar() {
  const geometry = new THREE.SphereGeometry(1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//Background
const spaceTexture = new THREE.TextureLoader().load('./img/space.jpeg');
scene.background = spaceTexture;

// ------Moon
// const moonTexture = new THREE.TextureLoader().load('./img/moon.jpeg');
// const normalTexture = new THREE.TextureLoader().load('./img/moonNM.jpeg');

// const moon = new THREE.SphereGeometry (3, 32, 32);
// const moonMaterial = new THREE.MeshStandardMaterial;
// moonMaterial.map = moonTexture;
// moonMaterial.normalMap = normalTexture;

// const moonMesh = new THREE.Mesh(moon, moonMaterial);
// scene.add(moonMesh);


// ------Earth
const earthGeometry = new THREE.SphereGeometry(10,32,32);
const earthMaterial = new THREE.MeshStandardMaterial;
earthMaterial.map = new THREE.TextureLoader().load('./img/earth.jpeg')

const earth = new THREE.Mesh(earthGeometry,earthMaterial);
earth.rotation.z = 0.5;
scene.add(earth);


// ------Animation Loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
    //add value 0.01 to the rotation each animation frame
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.005;

  
  earth.rotation.y += 0.005;

  controls.update();

  renderer.render(scene, camera);
}

animate();














