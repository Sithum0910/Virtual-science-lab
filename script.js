// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3d-container").appendChild(renderer.domElement);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Load the 3D model when the button is clicked
const loader = new THREE.GLTFLoader();
document.getElementById("start-experiment").addEventListener("click", () => {
  console.log("Experiment started!");
  loader.load(
    "models/beaker.glb", // Path to your 3D model
    (gltf) => {
      console.log("3D model loaded successfully!");
      const model = gltf.scene;
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error("Error loading 3D model:", error);
    }
  );
});

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Debugging: Check if Three.js is loaded
console.log("Three.js loaded:", THREE);
