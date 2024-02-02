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

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

initCanSatVisualization().catch(error => console.error(error));
animate();

ws.onmessage = (event) => {
    // Assuming parseCSV function is correctly implemented and returns an array of arrays
    const csvData = parseCSV(event.data);

    // Assuming the latest rotation data is in the last row of csvData
    const latestData = csvData[csvData.length - 1];

    // Get the rotation values from the latest row
    const xRotation = Number(latestData[6]);
    const yRotation = Number(latestData[7]);
    const zRotation = Number(latestData[8]);

    // Update the cansatModel's rotation
    if (cansatModel) {
//idk if the value sent by the gyro is in radions or degrees yet, incase its in degrees use this-> THREE.MathUtils.degToRad(xRotation);
        cansatModel.rotation.x = xRotation;
        cansatModel.rotation.y = yRotation;
        cansatModel.rotation.z = zRotation;
    }
};

//Function to parse the CSV & tirm the values. This should work both on windows and linux.
function parseCSV(csvString) {
    const rows = csvString.trim().split(/\r?\n/);
    return rows.map(row => row.split(',').map(cell => cell.trim()));
}
