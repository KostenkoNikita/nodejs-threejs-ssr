import { BoxGeometry, MeshBasicMaterial, Mesh, FaceColors } from 'three';

function createDubugCube() {
    const geometry = new BoxGeometry(200, 200, 200);
    for (let i = 0; i < geometry.faces.length; i += 2) {
        const hex = Math.random() * 0xffffff;
        geometry.faces[i].color.setHex(hex);
        geometry.faces[i + 1].color.setHex(hex);
    }

    var material = new MeshBasicMaterial({ vertexColors: FaceColors, overdraw: 0.5 });

    const cube = new Mesh(geometry, material);
    cube.position.y = 150;
    cube.rotation.y = 45;
    return cube;
}

export {
    createDubugCube
}