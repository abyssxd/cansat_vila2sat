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
    camera.position.z = 230;
    camera.position.y = 30;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xFF6900, 0.9);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);
    renderer.setClearColor(0xABB8C3); // Set to white or any contrasting color

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
            cansatModel.position.set(0, 0, 0);
            cansatModel.rotation.x = 200;
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
    
    let targetRotation = { x: 0, y: 0, z: 0 }; // Target rotation in radians

    ws.onmessage = (event) => {
        const csvData = parseCSV(event.data);
        const latestData = csvData[csvData.length - 1];
    
        // Assuming the gyro provides degrees, convert to radians
        targetRotation.x = THREE.MathUtils.degToRad(Number(latestData[6]));
        targetRotation.y = THREE.MathUtils.degToRad(Number(latestData[7]));
        targetRotation.z = THREE.MathUtils.degToRad(Number(latestData[8]));
    
        console.log("Target rotation updated");
    };
    
    function animate() {
        requestAnimationFrame(animate);
    
        if (cansatModel) {
            // Use lerp (Linear Interpolation) for a smoother transition
            cansatModel.rotation.x += (targetRotation.x - cansatModel.rotation.x) * 0.05;
            cansatModel.rotation.y += (targetRotation.y - cansatModel.rotation.y) * 0.05;
            cansatModel.rotation.z += (targetRotation.z - cansatModel.rotation.z) * 0.05;
        }
    
        renderer.render(scene, camera);
    }
    animate();
    
}

//Websocket connection ---- START
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = function() {
    console.log('WebSocket connection established');
};

ws.onerror = function(error) {
    console.error('WebSocket Error:', error);
};

ws.onclose = function(event) {
    console.log('WebSocket connection closed', event.code, event.reason);
};
//Websocket connection ---- END


initCanSatVisualization().catch(error => console.error(error));



//Function to parse the CSV & tirm the values. This should work both on windows and linux.
function parseCSV(csvString) {
    const rows = csvString.trim().split(/\r?\n/);
    return rows.map(row => row.split(',').map(cell => cell.trim()));
}
