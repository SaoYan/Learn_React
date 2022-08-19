import React, { Component } from "react";
import "./App.css";

import Pic from "./Pic";
import withMouse from "./HOC/withMouse";

class App extends Component {
    constructor(props) {
        super(props);
        this.PicWithMouse = withMouse(Pic);
    }

    render() {
        return (
            <div className="App">
                <this.PicWithMouse />
            </div>
        );
    }
}

export default App;