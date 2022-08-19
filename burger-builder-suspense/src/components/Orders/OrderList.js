import React from "react";

import OrderItem from "./OrderItem";

import classes from "./OrderList.module.css";

const OrderList = (props) => {
    if (!props.dataResource) {
        return null;
    }

    const orders = props.dataResource.read();
    if (!orders || Object.keys(orders).length === 0) {
        return <h3>No order history found.</h3>;
    }

    return (
        <div className={classes.orderList}>
            <button onClick={props.clearOrdersHandler}>Clear</button>
            <div className={classes.orders}>
                {
                    Object.keys(orders).map((key) => {
                        return (
                            <OrderItem
                                key={key}
                                time={orders[key].timeStamp}
                                ingredients={orders[key].ingredients}
                                price={orders[key].price}
                                clickHandler={() => props.viewOrderDetailHandler(key)}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default OrderList;