import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

axios.interceptors.request.use((request) => {
    console.log(request);
    /* modify request, for example
        header, authentication, etc.
    */
   return request;
}, (error) => {
    // do something
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    console.log(response);
    return response;
}, (error) => {
    // do something
    return Promise.reject(error);
});

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();