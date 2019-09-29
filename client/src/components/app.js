import React, { Component } from 'react';
import Ssr3dViewer from "./ssr-3d-viewer/component";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Route path="/" component={Ssr3dViewer} />
            </Router>
        );
    }

}

export default App;