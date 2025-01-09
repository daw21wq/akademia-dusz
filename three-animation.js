// Inicjalizacja Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Dodajemy alpha: true dla przezroczystości

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Ustawiamy przezroczyste tło
document.getElementById('three-container').appendChild(renderer.domElement);

// Tworzenie geometrii i materiałów
const geometries = [];
const materials = [];
const meshes = [];

// Tworzenie kilku obiektów 3D
for (let i = 0; i < 5; i++) {
    // Losowa geometria
    const geometry = new THREE.IcosahedronGeometry(Math.random() * 0.5 + 0.5, 0);
    geometries.push(geometry);

    // Materiał z efektem świecenia
    const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(`hsl(${Math.random() * 360}, 50%, 50%)`),
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });
    materials.push(material);

    // Tworzenie mesha
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    );
    meshes.push(mesh);
    scene.add(mesh);
}

// Dodanie światła
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.z = 15;

// Animacja
function animate() {
    requestAnimationFrame(animate);

    // Animacja obiektów
    meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 * (index + 1);
        mesh.rotation.y += 0.01 * (index + 1);
        
        // Dodanie ruchu falowego
        mesh.position.y = Math.sin(Date.now() * 0.001 * (index + 1)) * 2;
    });

    // Obracanie kamery
    camera.position.x = Math.sin(Date.now() * 0.0005) * 15;
    camera.position.z = Math.cos(Date.now() * 0.0005) * 15;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Obsługa zmiany rozmiaru okna
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
});

// Start animacji
animate();
