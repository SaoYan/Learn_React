import App from "next/app";
import React from "react";

import Layout from "../components/UI/Layout";
import { wrapper } from "../redux/store";

// global style
import "../style/style.css";

class MyApp extends App {
    static async getInitialProps({ Component, contex }) {
        const pageProps = Component.getInitialProps ?
            await Component.getInitialProps(contex) :
            {};
        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <div className="App">
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
            </div>
        );
    }
}

export default wrapper.withRedux(MyApp);