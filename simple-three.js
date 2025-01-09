// Poczekaj na załadowanie dokumentu
document.addEventListener('DOMContentLoaded', () => {
    // Podstawowa konfiguracja Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    // Konfiguracja renderera
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('three-container').appendChild(renderer.domElement);

    // Tworzenie prostego obiektu
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x8a2be2,
        wireframe: true
    });
    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    // Ustawienie kamery
    camera.position.z = 5;

    // Funkcja animacji
    function animate() {
        requestAnimationFrame(animate);
        
        // Prosta rotacja
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
        
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

    // Dodaj logi dla debugowania
    console.log('Three.js initialized');
    console.log('Scene:', scene);
    console.log('Camera:', camera);
    console.log('Renderer:', renderer);
});
