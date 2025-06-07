import * as THREE from 'three';

export function create3DNetwork(container) {
    if (!container) return;

    // Verhindere mehrfachen Renderer
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    if (!container) {
        console.warn('Container is null, skipping 3D init.');
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        1,
        1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const centerMaterial = new THREE.MeshBasicMaterial({ color: 0x8050ce });
    const firstLayerMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const secondLayerMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb });
    const connectionLineMaterial = new THREE.LineBasicMaterial({ color: 0x80bdff });

    const centerGeometry = new THREE.SphereGeometry(1.0, 16, 16);
    const firstLayerGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const secondLayerGeometry = new THREE.SphereGeometry(0.3, 16, 16);

    const group = new THREE.Group();

    const centerPoint = new THREE.Vector3(0, 0, 0);
    const centerMesh = new THREE.Mesh(centerGeometry, centerMaterial);
    centerMesh.position.copy(centerPoint);
    group.add(centerMesh);

    const firstLayerPoints = [];
    const radius = 15;
    const firstLayerCount = 20;

    for (let i = 0; i < firstLayerCount; i++) {
        const theta = Math.acos(2 * (i / firstLayerCount) - 1);
        const phi = Math.PI * (1 + Math.sqrt(5)) * i;
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(theta);
        const point = new THREE.Vector3(x, y, z);
        firstLayerPoints.push(point);

        const mesh = new THREE.Mesh(firstLayerGeometry, firstLayerMaterial);
        mesh.position.copy(point);
        group.add(mesh);

        const geometry = new THREE.BufferGeometry().setFromPoints([centerPoint, point]);
        const line = new THREE.Line(geometry, connectionLineMaterial);
        group.add(line);
    }

    const secondLayerPoints = [];
    firstLayerPoints.forEach((firstPoint) => {
        const offset = new THREE.Vector3(
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
        ).normalize().multiplyScalar(8);
        const secondPoint = new THREE.Vector3().addVectors(firstPoint, offset);
        secondLayerPoints.push(secondPoint);

        const mesh = new THREE.Mesh(secondLayerGeometry, secondLayerMaterial);
        mesh.position.copy(secondPoint);
        group.add(mesh);

        const geometry = new THREE.BufferGeometry().setFromPoints([firstPoint, secondPoint]);
        const line = new THREE.Line(geometry, connectionLineMaterial);
        group.add(line);
    });

    const maxDistance = 8;
    for (let i = 0; i < secondLayerPoints.length; i++) {
        for (let j = i + 1; j < secondLayerPoints.length; j++) {
            const dist = secondLayerPoints[i].distanceTo(secondLayerPoints[j]);
            if (dist <= maxDistance) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    secondLayerPoints[i],
                    secondLayerPoints[j],
                ]);
                const line = new THREE.Line(geometry, connectionLineMaterial);
                group.add(line);
            }
        }
    }

    scene.add(group);

    function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        if (container) {
            renderer.setSize(container.clientWidth, container.clientHeight);
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
        }
    });

    animate();
}
