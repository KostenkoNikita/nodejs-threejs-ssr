import React from 'react';

function getServerSideRenderedImageContainer() {
    const { ssr3dImageBase64, ssr3dImageLoading } = this.state;
    let imageContent;
    let btnClassName = "load-ssr-test-image-button";
    if (ssr3dImageLoading) {
        imageContent = (
            <div className={"ss3-3d-image-loading-message-wrapper"}>
                <span>Loading...</span>
            </div>
        );
        btnClassName += " loading";
    } else if (ssr3dImageBase64) {
        imageContent = (
            <img className={"ss3-3d-image"} src={ssr3dImageBase64} />
        )
    } else {
        imageContent = (
            <div className={"ss3-3d-image-not-loaded-message-wrapper"}>
                <span>Press "Load Test Image" button to load server-side sendered test cube</span>
            </div>
        )
    }
    return (
        <div className="load-ssr-3d-image-wrapper">
            {imageContent}
            <div className={btnClassName} onClick={this.handleLoadTestImageButtonClick.bind(this)}>
                <span>Load Test Image</span>
            </div>
        </div>
    )
}

export default function () {
    return (
        <div id="ssr-3d-viewer-page-root">
            <div id="ssr-3d-viewer-page-header">

            </div>
            <div id="ssr-3d-viewer-page-body">
                {getServerSideRenderedImageContainer.call(this)}
            </div>
            <div id="ssr-3d-viewer-page-footer">

            </div>
        </div>
    )
};