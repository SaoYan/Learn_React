import React, { Component } from "react";
import { connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import OrderItem from "./OrderItem";
import Spinner from "../UI/Spinner";

import { clearOrders, fetchOrders } from "../../redux/actions";
import { dataErrorAlert  } from "../Util/mapErrorToAlert";

import classes from "./Orders.module.css";

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
        loadingOrders: true,
        loadingError: false,
        processingDelete: false
    }

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        this.props.fetchOrders({
            token: this.props.token,
            userId: this.props.userId
        })
        .then(unwrapResult)
        .then(() => {
            this.setState({
                loadingOrders: false
            });
        })
        .catch((error) => {
            this.setState({
                loadingOrders: false,
                loadingError: true
            });
            dataErrorAlert(error);
        });
    }

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
        if (this.state.loadingOrders) {
            return <Spinner />;;
        }
        
        if (this.state.loadingError) {
            return (
                <React.Fragment>
                    <h3>Ops, something went wrong.</h3>
                    <h3>Fail to load order history.</h3>
                </React.Fragment>
            );
        }
        
        if (!this.props.orders || Object.keys(this.props.orders).length === 0) {
            return <h3>No order history found.</h3>;
        }

        if (this.state.processingDelete) {
            return <Spinner />;
        }
        
        return (
            <div className={classes.body}>
                <button onClick={this.clearOrdersHandler}>Clear</button>
                <div className={classes.orders}>
                    {
                        Object.keys(this.props.orders).map((key) => {
                            return (
                                <OrderItem
                                    key={key}
                                    time={this.props.orders[key].timeStamp}
                                    ingredients={this.props.orders[key].ingredients}
                                    price={this.props.orders[key].price}
                                    clickHandler={() => this.viewOrderDetailHandler(key)}
                                />
                            );
                        })
                    }
                </div>
            </div>
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