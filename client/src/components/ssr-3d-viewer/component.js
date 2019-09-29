import { Component } from 'react';
import template from "./template.js";
import { receiveServerSideRendedTestImageBase64 } from "../../api/renderer";

class Ssr3dViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ssr3dImageBase64: null,
            ssr3dImageLoading: false,
        };
    }

    handleLoadTestImageButtonClick() {
        const { ssr3dImageLoading } = this.state;
        if (ssr3dImageLoading) {
            return;
        }
        this.loadServerSideRenderedTestImage();
    }

    loadServerSideRenderedTestImage() {
        this.setState({
            ssr3dImageBase64: null,
            ssr3dImageLoading: true,
        }, () => {
            receiveServerSideRendedTestImageBase64().then(result => {
                this.setState({
                    ssr3dImageBase64: result,
                    ssr3dImageLoading: false,
                });
            }).catch(err => {
                console.log(err);
                this.setState({
                    ssr3dImageLoading: false
                });
            });
        });
    }

    render() {
        return template.call(this);
    }

}

export default Ssr3dViewer;