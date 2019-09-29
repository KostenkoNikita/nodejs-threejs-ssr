import express from "express";
import { createDubugCube } from "../../lib/debug-cube.js";
import { PerspectiveCamera, Scene } from 'three';
import * as uuid from 'uuid';
import { ServerSideRendererData } from '../../lib/server-side-renderer-data.js';

const router = express.Router();

router.get("/renderTestCubeImage", function (req, res) {
    const w = 200;
    const h = 200;
    const ssrDataId = uuid.v4();
    const ssrRendererData = new ServerSideRendererData(ssrDataId, w, h, { alpha: true }, { rendererClearColor: 0xFFFFFF, rendererClearAlpha: 0 });

    const scene = new Scene();

    const camera = new PerspectiveCamera(70, 1, 1, 10000);
    camera.position.y = 150;
    camera.position.z = 400;

    scene.add(createDubugCube());

    ssrRendererData.render(scene, camera, res);
});

export { router as rendererRouter }