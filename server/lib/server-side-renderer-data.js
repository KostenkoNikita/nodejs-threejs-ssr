import headlessGL from 'gl';
import { WebGLRenderer, Color, Scene, Camera } from 'three';
import { createHeadlessGLCanvas } from "./headless-gl-canvas";
import { isFiniteNumber } from './utils';
import { PNG } from 'pngjs';
import { Buffer } from 'buffer';

const PIXEL_COLOR_ELEMENTS_SIZE = 4;

class ServerSideRendererData {

    /**
     * @param {string} id 
     * @param {number} width 
     * @param {number} height 
     * @param {{ alpha?: boolean, depth?: boolean, stencil?: boolean, antialias?: boolean, premultipliedAlpha?: boolean, preserveDrawingBuffer?: boolean, failIfMajorPerformanceCaveat?: boolean, powerPreference?: string}|null} webGLRendererParameters 
     * @param {{ rendererClearColor?: Color|number|string, rendererClearAlpha?: Color|number|string }|null} options 
     */
    constructor(id, width, height, webGLRendererParameters = null, options = null) {
        width = isFiniteNumber(width) ? +width : 0;
        height = isFiniteNumber(height) ? +height : 0;
        this._width = width;
        this._height = height;

        const parameters = webGLRendererParameters || {};
        const glContextAttributes = {
            alpha: parameters.alpha !== undefined ? parameters.alpha : false,
            depth: parameters.depth !== undefined ? parameters.depth : true,
            stencil: parameters.stencil !== undefined ? parameters.stencil : true,
            antialias: parameters.antialias !== undefined ? parameters.antialias : false,
            premultipliedAlpha: parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
            preserveDrawingBuffer: parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
            powerPreference: parameters.powerPreference !== undefined ? parameters.powerPreference : 'default',
            failIfMajorPerformanceCaveat: parameters.failIfMajorPerformanceCaveat !== undefined ? parameters.failIfMajorPerformanceCaveat : false,
            xrCompatible: true,
        };

        this._context = headlessGL(this.width, this.height, glContextAttributes);

        const rendererDataOptions = options || {};
        const canvas = rendererDataOptions.canvas !== undefined ? rendererDataOptions.canvas : createHeadlessGLCanvas(this.width, this.height);

        this._canvas = canvas;

        this._renderer = new WebGLRenderer({
            canvas: this._canvas,
            context: this._context
        });
        this._renderer.setSize(this.width, this.height);

        if ("rendererClearColor" in rendererDataOptions) {
            this._renderer.setClearColor(rendererDataOptions.rendererClearColor);
        }
        if ("rendererClearAlpha" in rendererDataOptions) {
            this._renderer.setClearAlpha(rendererDataOptions.rendererClearAlpha);
        }

        this._pngDrawerEngine = new PNG({ width: this.width, height: this.height });

        Object.defineProperty(this, "id", {
            value: id,
            enumerable: true,
        });
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get pixelsReadFormat() {
        return this._context.RGBA;
    }

    get pixelsBufferSize() {
        return this.width * this.height * PIXEL_COLOR_ELEMENTS_SIZE;
    }

    /**
     * @param {Scene} scene 
     * @param {Camera} camera 
     */
    renderToBuffer(scene, camera) {
        const pixelsBufferSize = this.pixelsBufferSize;

        const buffer = Buffer.alloc(pixelsBufferSize);
        const pixels = new Uint8Array(pixelsBufferSize);

        const renderer = this._renderer;
        renderer.render(scene, camera);

        const width = this.width;
        const height = this.height;

        const gl = this._context;
        gl.readPixels(0, 0, width, height, this.pixelsReadFormat, gl.UNSIGNED_BYTE, pixels);

        const pixelsColorElementsSize = PIXEL_COLOR_ELEMENTS_SIZE;

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const k = j * width + i;
                const r = pixels[pixelsColorElementsSize * k];
                const g = pixels[pixelsColorElementsSize * k + 1];
                const b = pixels[pixelsColorElementsSize * k + 2];
                const a = pixels[pixelsColorElementsSize * k + 3];

                const m = (height - j + 1) * width + i;
                buffer[pixelsColorElementsSize * m] = r;
                buffer[pixelsColorElementsSize * m + 1] = g;
                buffer[pixelsColorElementsSize * m + 2] = b;
                buffer[pixelsColorElementsSize * m + 3] = a;
            }
        }

        return buffer;
    }

    /**
     * @param {Scene} scene 
     * @param {Camera} camera 
     * @param {NodeJS.WritableStream} writableStream 
     */
    render(scene, camera, writableStream) {
        const buf = this.renderToBuffer(scene, camera);
        const png = this._pngDrawerEngine;
        png.data = buf;
        png.pack().pipe(writableStream);
    }

}

export {
    ServerSideRendererData
}