import React, { useCallback, useEffect, useState } from "react";
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
export const Orders = (props) => {
    /**
     * state hooks 
     */
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);
    const [processingDelete, setProcessingDelete] = useState(false);

    /**
     * effect hook
     */
    const isAuthenticated = props.isAuthenticated;
    const fetchOrders = props.fetchOrders;
    const token = props.token;
    const userId = props.userId;
    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        fetchOrders({
            token: token,
            userId: userId
        })
        .then(unwrapResult)
        .then(() => {
            setLoading(false)
        })
        .catch((error) => {
            setLoading(false);
            setLoadingError(true);
            dataErrorAlert(error);
        });
    }, [isAuthenticated, fetchOrders, token, userId]);

    /**
     * callback hook
     */
    const clearOrders = props.clearOrders;
    const clearParams = {
        token: props.token,
        userId: props.userId,
        orders: props.orders
    };
    const clearOrdersHandler = useCallback(
        () => {
            setProcessingDelete(true);
    
            clearOrders(clearParams)
            .then(unwrapResult)
            .then(() => {
                setProcessingDelete(false);
            })
            .catch((error) => {
                setProcessingDelete(false);
                dataErrorAlert(error);
            });
        },
        [clearOrders, clearParams]
    );

    if (loading) {
        return <Spinner />;;
    }
    
    if (loadingError) {
        return (
            <React.Fragment>
                <h3>Ops, something went wrong.</h3>
                <h3>Fail to load order history.</h3>
            </React.Fragment>
        );
    }
    
    if (!props.orders || Object.keys(props.orders).length === 0) {
        return <h3>No order history found.</h3>;
    }

    if (processingDelete) {
        return <Spinner />;
    }
    
    return (
        <div className={classes.body}>
            <button onClick={clearOrdersHandler}>Clear</button>
            <div className={classes.orders}>
                {
                    Object.keys(props.orders).map((key) => {
                        return (
                            <OrderItem
                                key={key}
                                time={props.orders[key].timeStamp}
                                ingredients={props.orders[key].ingredients}
                                price={props.orders[key].price}
                                clickHandler={() => props.history.push(`${props.match.path}/${key}`)}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
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