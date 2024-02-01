import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { OBJLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/OBJLoader.js';


async function initCanSatVisualization() {
    const container = document.getElementById('cansatContainer');

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 200;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);
    renderer.setClearColor(0xffffff); // Set to white or any contrasting color

    let cansatModel;

    // OBJ Model loading
    const loader = new OBJLoader();
    loader.load(
        // Resource URL
        'models/demo.obj',
        // called when resource is loaded
        function (obj) {
            cansatModel = obj; // Assign the loaded model to the higher scope variable
            scene.add(cansatModel);
            cansatModel.position.set(0, 0, 0); // Adjust position if necessary
        },
        // called when loading is in progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.error('An error happened', error);
        }
    );

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        if (cansatModel) {
            cansatModel.rotation.x += 0.01;
            cansatModel.rotation.y += 0.01;
        }

        renderer.render(scene, camera);
    }

    animate();
}

initCanSatVisualization().catch(error => console.error(error));
