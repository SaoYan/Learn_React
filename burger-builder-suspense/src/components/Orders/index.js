import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import ErrorBoundary from "../Util/ErrorBoundary";
import OrderList from "./OrderList";
import Spinner from "../UI/Spinner";

import { clearOrders, fetchOrders } from "../../redux/actions";
import { dataErrorAlert  } from "../Util/mapErrorToAlert";
import wrapPromise from "../Util/wrapPromise";

/**
 * Shor summary of all previous orders.  
 * 
 * @param props
 * `isAuthenticated`: [redux-related prop] whether or not the current user is authenticated  
 * `token`: [redux-related prop] the auth ID token  
 * `userId`:[redux-related prop] the user ID  
 * `orders`: [redux-related prop] a JS object containing all orders, fetched from the server on mount  
 * `clearOrders`, `fetchOrders`: [redux-related prop] dispatchable actions  
 */
export class Orders extends Component {
    state = {
        processingDelete: false
    }

    dataResource = this.props.isAuthenticated ? 
        wrapPromise(
            this.props.fetchOrders({
                token: this.props.token,
                userId: this.props.userId
            })
            .then(unwrapResult)
        ) : null;

    clearOrdersHandler = () => {
        this.setState({
            processingDelete: true
        });

        this.props.clearOrders({
            token: this.props.token,
            userId: this.props.userId,
            orders: this.props.orders
        })
        .then(unwrapResult)
        .then(() => {
            this.setState({
                processingDelete: false
            });
            this.props.history.push("/dumy");
            this.props.history.replace("/orders");
        })
        .catch((error) => {
            this.setState({
                processingDelete: false
            });
            dataErrorAlert(error);
        });
    };

    viewOrderDetailHandler = (key) => {
        this.props.history.push(`${this.props.match.path}/${key}`);
    };

    render() {
        if (this.state.processingDelete) {
            return <Spinner />;
        }

        const errorMsg = (
            <React.Fragment>
                <h3>Ops, something went wrong.</h3>
                <h3>Fail to load order history.</h3>
            </React.Fragment>
        );

        return (
            <ErrorBoundary fallback={errorMsg}>
                <Suspense fallback={<h3>Retrieving order history...</h3>}>
                    <OrderList
                        dataResource={this.dataResource}
                        clearOrdersHandler={this.clearOrdersHandler}
                        viewOrderDetailHandler={this.viewOrderDetailHandler}
                    />
                </Suspense>
            </ErrorBoundary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        userId: state.auth.userId,
        orders: state.orders
    };
};

const mapDispatchToProps = {
    clearOrders,
    fetchOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);