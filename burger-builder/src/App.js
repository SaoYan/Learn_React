import React, { Component } from "react";
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

class App extends Component {
    state = {
        loading: true
    }

    componentDidMount() {
        this.props.resumeSession()
            .then(unwrapResult)
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((error) => {
                switch (error.message) {
                    case INVALID_LOCAL_STORAGE:
                        this.props.logoutUser();
                        this.setState({ loading: false });
                        break;
                    case LOCAL_SESSION_EXPIRED:
                        this.props.updateToken(localStorage.getItem("refreshToken"))
                            .then(unwrapResult)
                            .then(() => {
                                this.setState({ loading: false });
                            })
                            .catch((error) =>{
                                this.setState({ loading: false });
                                authenticationErrorAlert(error);
                            });
                            break;
                    default:
                        break;
                }
            });
    }

    render() {
        if (this.state.loading) {
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
                                alt={this.props.isAuthenticated ? "/home" : "/auth"}
                            />
                            <DynamicRoute
                                redirect={this.props.isAuthenticated}
                                exact
                                path="/auth"
                                alt="/home"
                                component={Authentication}
                            />
                            <DynamicRoute
                                redirect={!this.props.isAuthenticated}
                                exact
                                path="/home"
                                alt="/auth"
                                component={BurgerBuilder}
                            />
                            <DynamicRoute
                                redirect={!this.props.isAuthenticated}
                                path="/checkout"
                                alt="/auth"
                                component={Checkout}
                            />
                            <DynamicRoute
                                redirect={!this.props.isAuthenticated}
                                exact
                                path="/orders"
                                alt="/auth"
                                component={Orders}
                            />
                            <DynamicRoute
                                redirect={!this.props.isAuthenticated}
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