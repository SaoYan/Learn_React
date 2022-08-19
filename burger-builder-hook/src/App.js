import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import Authentication from "./components/Authentication";
import BurgerBuilder from "./components/BurgerBuilder";
import Checkout from "./components/Checkout";
import DynamicRoute from "./components/UI/DynamicRoute";
import Layout from "./components/UI/Layout";
import OrderDetail from "./components/OrderDetail";
import Orders from "./components/Orders";
import Spinner from "./components/UI/Spinner";

import { logoutUser, resumeSession, updateToken } from "./redux/actions";
import { INVALID_LOCAL_STORAGE, LOCAL_SESSION_EXPIRED } from "./components/Util/ErrorCodes";
import { authenticationErrorAlert } from "./components/Util/mapErrorToAlert";

import "./App.css";

const App = (props) => {
    /**
     * state hook
     */
    const [loading, setLoading] = useState(true);

    /**
     * effect hook
     */
    const resumeSession = props.resumeSession;
    const logoutUser = props.logoutUser;
    const updateToken = props.updateToken;
    useEffect(() => {
        resumeSession()
            .then(unwrapResult)
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                switch (error.message) {
                    case INVALID_LOCAL_STORAGE:
                        logoutUser();
                        setLoading(false);
                        break;
                    case LOCAL_SESSION_EXPIRED:
                        updateToken(localStorage.getItem("refreshToken"))
                            .then(unwrapResult)
                            .then(() => {
                                setLoading(false);
                            })
                            .catch((error) =>{
                                setLoading(false);
                                authenticationErrorAlert(error);
                            });
                            break;
                    default:
                        break;
                }
            });
    }, [resumeSession, logoutUser, updateToken]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <DynamicRoute
                            redirect={true}
                            exact
                            path="/"
                            alt={props.isAuthenticated ? "/home" : "/auth"}
                        />
                        <DynamicRoute
                            redirect={props.isAuthenticated}
                            exact
                            path="/auth"
                            alt="/home"
                            component={Authentication}
                        />
                        <DynamicRoute
                            redirect={!props.isAuthenticated}
                            exact
                            path="/home"
                            alt="/auth"
                            component={BurgerBuilder}
                        />
                        <DynamicRoute
                            redirect={!props.isAuthenticated}
                            path="/checkout"
                            alt="/auth"
                            component={Checkout}
                        />
                        <DynamicRoute
                            redirect={!props.isAuthenticated}
                            exact
                            path="/orders"
                            alt="/auth"
                            component={Orders}
                        />
                        <DynamicRoute
                            redirect={!props.isAuthenticated}
                            path="/orders/:key"
                            alt="/auth"
                            component={OrderDetail}
                        />
                        <Route
                            render={() => {
                                return (
                                    <div>
                                        <h1>404</h1>
                                        <h2>Please check the URL</h2>
                                    </div>
                                );
                            }}
                        />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = {
    logoutUser,
    resumeSession,
    updateToken
};

export default connect(mapStateToProps, mapDispatchToProps)(App);