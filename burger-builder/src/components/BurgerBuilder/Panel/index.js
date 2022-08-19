import React from "react";

import PanelElement from "./PanelElement";

import classes from "./Panel.module.css";

/**
 * The control panel.  
 * The user can add/remove ingredients.
 * 
 * @param props
 * `ingredients`: a JS object { ingredientName: theNumberOfIt }  
 * `canCheckout`: whether the user is allowd to checkout (burger must have either meat of bacon)  
 * `addIngredientHandler`, `removeIngredientHandler`, `purchaseHandler`: event handlers
 */
const Panel = (props) => {
    const ingredientList = Object.keys(props.ingredients).map((ingre) => {
        return (
            <PanelElement
                key={ingre}
                label={ingre}
                disabled={props.ingredients[ingre] <= 0}
                num={props.ingredients[ingre]}
                addIngredientHandler={() => props.addIngredientHandler(ingre)}
                removeIngredientHandler={() => props.removeIngredientHandler(ingre)}
            />
        );
    });

    return(
        <div className={classes.panel}>
            {ingredientList}
            <div className={classes.buttonGroup}>
                <button
                    className={classes.button}
                    onClick={props.resetIngredientsHandler}
                >
                    Reset
                </button>
                <button
                    className={classes.button}
                    disabled={!props.canCheckout}
                    onClick={props.purchaseHandler}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Panel;