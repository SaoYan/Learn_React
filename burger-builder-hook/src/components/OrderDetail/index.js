import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import BurgerPreview from "../BurgerPreview";
import Spinner from "../UI/Spinner";

import { deleteOrder } from "../../redux/actions";
import { dataErrorAlert } from "../Util/mapErrorToAlert";

import classes from "./OrderDetail.module.css";

/**
 * Displaying the detailed info of one specific order.
 * The order ID is passed through route params.
 * 
 * @param props
 * `token`: [redux-related prop] the auth ID token  
 * `orders`: [redux-related prop] a JS object containing all orders, fetched from the server  
 * `deleteOrder`: [redux-related prop] dispatchable action  
 */
export const OrderDetail = (props) => {
    /**
     * state hook
     */
    const [processingDelete, setProcessingDelete] = useState(false);

    /**
     * callback hook
     */
    const deleteOrder = props.deleteOrder;
    const deleteParams = {
        token: props.token,
        orderId: props.match.params.key
    };
    const deleteOrderHandler = useCallback(
        () => {
            setProcessingDelete(true);
    
            deleteOrder(deleteParams)
            .then(unwrapResult)
            .then(() => {
                setProcessingDelete(false);
                props.history.replace("/orders");
            })
            .catch((error) => {
                setProcessingDelete(false);
                dataErrorAlert(error);
            });
        },
        [deleteParams, deleteOrder, props.history]
    );

    if (processingDelete) {
        return <Spinner />;
    }
    
    const order = props.orders[props.match.params.key];
    if (!order) {
        return null;
    }

    const ingredientList = (
        Object.keys(order.ingredients).map((ingre) => {
            return (
                <li key={ingre}>
                    {`${ingre}: x${order.ingredients[ingre]}`}
                </li>
            );
        })
    );

    return (
        <React.Fragment>
            <div className={classes.info}>
                <BurgerPreview ingredients={order.ingredients}/>
                <ul className={classes.summary}>
                    <li>Price: {order.price}</li>
                    <li>
                        Ingredients:
                        <ul>
                            {ingredientList}
                        </ul>
                    </li>
                    <li>
                        Ordered by:
                        <ul>
                            <li>Name: {order.customer.name}</li>
                            <li>
                                Address: {[
                                    order.customer.address.street,
                                    order.customer.address.city,
                                    order.customer.address.province,
                                    order.customer.address.postalCode
                                ].join(", ")}
                            </li>
                            <li>Email: {order.customer.email}</li>
                            <li>Phone: {order.customer.phone}</li>
                        </ul>
                    </li>
                    <li>Ordered at: {order.timeStamp}</li>
                </ul>
            </div>
            <button
                className={classes.button}
                onClick={deleteOrderHandler}
            >
                Delete
            </button>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        orders: state.orders
    };
};

const mapDispatchToProps = {
    deleteOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);