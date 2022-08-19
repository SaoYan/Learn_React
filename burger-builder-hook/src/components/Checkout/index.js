import React, { useState } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import BurgerPreview from "../BurgerPreview";
import Contact from "./Contact";

import { placeOrder } from "../../redux/actions";

import classes from "./Checkout.module.css";

/**
 * The checkout page containing the summary and preview of the burger.
 * The user can 
 *  (1) continue: filling in contact info and place order
 *  (2) cancel: discard all current burger info and start over
 * 
 * @param props
 * `ingredients`: [redux-related prop] a JS object { ingredientName: theNumberOfIt }  
 * `placeOrder`: [redux-related prop] dispatchable action  
 */
export const Checkout = (props) => {
    /**
     * state hook
     */
    const [continueCheckout, setContinueCheckout] = useState(false);

    const clickContinueHandler = () => {
        setContinueCheckout(true);
        props.history.push("/checkout/contact");
    };

    if (!props.ingredients || Object.keys(props.ingredients).length === 0) {
        return <Redirect to="/home" />;
    }

    return (
        <React.Fragment>
            <h1>Checkout</h1>
            <div className={classes.checkout}>
                <BurgerPreview ingredients={props.ingredients}/>
                <div className={classes.buttons}>
                    <button
                        onClick={() => props.history.replace("/home")}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={continueCheckout}
                        onClick={clickContinueHandler}
                    >
                        Continue
                    </button>
                </div>
            </div>
            <Route
                exact
                path="/checkout/contact"
                render={() => {
                    return (
                        <Contact placeOrder={props.placeOrder} />
                    );
                }}
            />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients
    };
};

const mapDispatchToProp = {
    placeOrder
};

export default connect(mapStateToProps, mapDispatchToProp)(Checkout);