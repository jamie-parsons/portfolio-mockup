import './style.css';
import * as THREE from 'three';  

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); /*field of view based on 360deg, aspect ratio, stuff camera can see (almost everything)*/

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 'turquoise'});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(100, 5, 5);
scene.add(pointLight);

const pointLightSide = new THREE.PointLight("magenta");
pointLightSide.position.set(5, 50, 10);
scene.add(pointLightSide);

/*renderer.render(scene, camera); */

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += .005;
  torus.rotation.z += .01;

  renderer.render( scene, camera );
}

animate();