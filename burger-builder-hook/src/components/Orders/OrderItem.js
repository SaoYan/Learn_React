import React from "react";

import Price from "../Util/Price";

import classes from "./OrderItem.module.css";

/**
 * Displaying short summary of one order.
 * 
 * @param props
 * `ingredients`: a JS object { ingredientName: theNumberOfIt }  
 * `time`: the timestamp of the order  
 * `price`: the price of the order  
 */
const OrderItem = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).reduce((summary, ingre) => {
        if (props.ingredients[ingre] === 0) {
            return summary;
        }
        summary.push(`${props.ingredients[ingre]} ${ingre}`);
        return summary;
    }, []).join(", ");

    return (
        <div
            className={classes.item}
            onClick={props.clickHandler}
        >
            <p>{props.time}</p>
            <p><strong>{"$"} <Price>{props.price}</Price></strong></p>
            <p>{ingredientSummary}</p>
        </div>
    );
};

export default OrderItem;