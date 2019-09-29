const receiveServerSideRendedTestImageBase64 = (onProgreessCallback) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/renderer/renderTestCubeImage');
        xhr.responseType = "arraybuffer";
        xhr.onload = () => {
            if (xhr.status != 200) {
                reject(new Error(`An error occurred while server-side rendering of test image: ${xhr.status}: ${xhr.statusText}`));
            } else {
                const buffer = xhr.response;
                let binary = '';
                const bytes = new Uint8Array(buffer);
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                const b64String = window.btoa(binary);
                resolve("data:image/png;base64," + b64String);
            }
        };
        if (onProgreessCallback) {
            xhr.onprogress = (event) => {
                onProgreessCallback({
                    loaded: event.loaded,
                    total: event.total
                });
            };
        }
        xhr.onerror = function (err) {
            reject(err);
        };
        xhr.send();
    })
};

export {
    receiveServerSideRendedTestImageBase64
}