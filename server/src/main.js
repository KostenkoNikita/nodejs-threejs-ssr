import fs from 'fs';
import { createDubugCube } from "./debug-cube.js";
import { PerspectiveCamera, Scene } from 'three';
import * as uuid from 'uuid';
import { ServerSideRendererData } from './server-side-renderer-data.js';

const w = 200;
const h = 200;
const ssrDataId = uuid.v4();
const ssrRendererData = new ServerSideRendererData(ssrDataId, w, h, { alpha: true }, { rendererClearColor: 0xFFFFFF, rendererClearAlpha: 0 });

const scene = new Scene();

const camera = new PerspectiveCamera(70, 1, 1, 10000);
camera.position.y = 150;
camera.position.z = 400;

scene.add(createDubugCube());

const writable = fs.createWriteStream('./bin/out.png');

ssrRendererData.render(scene, camera, writable);