import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import BurgerPreview from "../BurgerPreview";
import Modal from "../UI/Modal";
import OrderSummary from "./OrderSummary";
import Panel from "./Panel";
import Price from "../Util/Price";
import Spinner from "../UI/Spinner";

import {
    addIngredient,
    fetchInitBurger,
    removeIngredient,
    resetIngredients
} from "../../redux/actions";

/**
 * The user customizes burger at this page.  
 * This page contains: (1) a panel where the user can add/remove ingredients (2) the preview of the burger  
 * 
 * @param props  
 * `isAuthenticated`: [redux-related prop] whether or not the current user is authenticated  
 * `ingredients`: [redux-related prop] a JS object { ingredientName: theNumberOfIt }; the initial(default) `ingredients` are fetched from the server on mount  
 * `totalPrice`: [redux-related prop] the price calculated according to `ingredients`  
 * `addIngredient`, `fetchInitBurger`, `removeIngredient`, `resetIngredients`: [redux-related prop] dispatchable actions  
 */
export const BurgerBuilder = (props) => {
    /**
     * state hooks
     */
    const [purchaseIntention, setPurchaseIntention] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mountError, setMountError] = useState(false);

    /**
     * effect hook
     */
    const isAuthenticated = props.isAuthenticated;
    const fetchInitBurger = props.fetchInitBurger;
    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        fetchInitBurger()
            .then(unwrapResult)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setMountError(true);
            });
    }, [isAuthenticated, fetchInitBurger]);

    if (!props.isAuthenticated) {
        return null;
    }

    if (mountError) {
        return (
            <React.Fragment>
                <h3>Ops, something went wrong.</h3>
                <h3>Fail to load the APP.</h3>
            </React.Fragment>
        );
    }

    if (loading) {
        return <Spinner />;
    }

    const canCheckout = !(props.ingredients.meat === 0 && props.ingredients.bacon === 0);
    return (
        <React.Fragment>
            <Modal
                animation
                display={purchaseIntention}
                clickBackdrop={() => setPurchaseIntention(false)}
            >
                <OrderSummary
                    ingredients={props.ingredients}
                    price={props.totalPrice}
                    clickCancel={() => setPurchaseIntention(false)}
                    clickOk={() => props.history.push("/checkout")}
                />
            </Modal>
            <BurgerPreview ingredients={props.ingredients}/>
            <p>Total price: $<Price>{props.totalPrice}</Price> + tax</p>
            <Panel
                ingredients={props.ingredients}
                canCheckout={canCheckout}
                addIngredientHandler={props.addIngredient}
                removeIngredientHandler={props.removeIngredient}
                resetIngredientsHandler={props.resetIngredients}
                purchaseHandler={() => setPurchaseIntention(true)}
            />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice
    };
};

const mapDispatchToProps = {
    addIngredient,
    fetchInitBurger,
    removeIngredient,
    resetIngredients
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);