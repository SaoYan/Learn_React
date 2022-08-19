import React from "react";

import Price from "../../Util/Price";

import classes from "./OrderSummary.module.css";

/**
 * Display the summary of the current user-customized burger.  
 * This component is displayed within a modal.  
 * The user can choose to (1) go to checkout OR (2) cancel and continue building the burger.  
 * 
 * @param props
 * `ingredients`: a JS object { ingredientName: theNumberOfIt }  
 * `price`: the price calculated based on the `ingredients`  
 * `clikCancel`, `clickOk`: event handler
 */
const OrderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients).map((ingre) => {
        return (
            <li key={ingre}>
                <span className={classes.label}>{ingre}</span> {"x" + props.ingredients[ingre]}
            </li>
        );
    });

    return (
        <React.Fragment>
            <h2>Order Summary</h2>
            <div className={classes.summary}>
                <p>Your burger:</p>
                <ul>
                    {ingredients}
                </ul>
                <p>Total price: $<Price>{props.price}</Price> + tax</p>
            </div>
            <button
                className={classes.button}
                onClick={props.clickCancel}
            >
                Cancel
            </button>
            <button
                className={classes.button}
                onClick={props.clickOk}
            >
                Go for it
            </button>
        </React.Fragment>
    );
}

export default OrderSummary;