import { isFiniteNumber } from './utils';

function createHeadlessGLCanvas(width, height) {
    width = isFiniteNumber(width) ? width : 0;
    height = isFiniteNumber(height) ? height : 0;
    return {
        addEventListener: () => { },
        style: {
            width: `${width.toFixed(0)}px`,
            height: `${height.toFixed(0)}px`
        },
        width: width,
        height: height,
    }
}

export {
    createHeadlessGLCanvas
}