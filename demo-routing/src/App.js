import React from "react";
import { BrowserRouter } from "react-router-dom";

import Blog from "./Blog";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Blog />
            </div>
        </BrowserRouter>
    );
}

export default App;