import * as THREE from 'three';  
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/*START function for title effect*/
var text = document.getElementById('title');
var shadow = '';

for (var i = 0; i < 30; i++ ) {
  shadow +=(shadow? ',':'')+ i*(-1)+ 'px ' + i*1+'px 0 #2d88f0';
}
text.style.textShadow = shadow;
/*END function for title effect*/

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); /*field of view based on 360deg, aspect ratio, stuff camera can see (almost everything)*/

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
;

renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry(13, 1, 100, 10, 1, 2);
/*const geometry = new THREE.TorusGeometry(10, 3, 16, 100);*/
const material = new THREE.MeshStandardMaterial({color: 'slategrey'});
const torus = new THREE.Mesh(geometry, material);
 torus.position.z = -5;
 torus.position.x = 5
 torus.position.y = -10

scene.add(torus);

const geometry2 = new THREE.RingGeometry(6, 5.5, 42);
/*const geometry = new THREE.TorusGeometry(10, 3, 16, 100);*/
const material2 = new THREE.MeshStandardMaterial({color: 'darkblue'});
const bigring = new THREE.Mesh(geometry2, material2);
bigring.rotation.x = Math.PI/1.75;
bigring.position.z = 30;
bigring.position.x = -10;
bigring.position.y = 0;

 scene.add(bigring);

 const secondgeometry = new THREE.RingGeometry(5, 4.5, 42);
 const secondmaterial = new THREE.MeshStandardMaterial({color: "purple"});
 const secondring = new THREE.Mesh(secondgeometry, secondmaterial);
 secondring.rotation.x = Math.PI/1.9;
 secondring.position.z = 30;
 secondring.position.x = -10;
 scene.add(secondring);

const pointLight = new THREE.PointLight('grey');
pointLight.position.set(-20, 15, 5);
scene.add(pointLight);

const pointLightSide = new THREE.PointLight('mediumorchid');
pointLightSide.position.set(10, -10, 5);
scene.add(pointLightSide);

const ambientLight = new THREE.AmbientLight('midnightblue');
ambientLight.position.set(-30);
scene.add(ambientLight);

/* const lightHelper = new THREE.PointLightHelper(pointLight);
const lightHelperSide = new THREE.PointLightHelper(pointLightSide)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, lightHelperSide, gridHelper)  */

//const controls = new OrbitControls(camera, renderer.domElement); /*be sure to call in animation loop*/


function addStar() {
  const geometry = new THREE.SphereGeometry(.25, 23, 23);
  const material = new THREE.MeshStandardMaterial({color: "white"});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon)

moon.position.z = 30;
moon.position.x = -10;

/*renderer.render(scene, camera); */
function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.005;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.005;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

}
document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.002;
  torus.rotation.y += .0005;
  torus.rotation.z += .0001;

  

  //controls.update();

  renderer.render( scene, camera );
}

animate();
 