import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";

import BurgerPreview from "../components/BurgerPreview";
import Modal from "../components/UI/Modal";
import OrderSummary from "../components/BurgerBuilder/OrderSummary";
import Panel from "../components/BurgerBuilder/Panel";
import Price from "../Util/Price";

import {
    addIngredient,
    fetchInitBurger,
    removeIngredient,
    resetIngredients
} from "../redux/actions";
import { wrapper } from "../redux/store";

export const getServerSideProps = wrapper.getServerSideProps(
    async (context) => {
        await context.store.dispatch(fetchInitBurger());
    }
);

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
class BurgerBuilder extends Component {
    state = {
        purchaseIntention: false
    };

    cancelPurchaseHandler = () => {
        this.setState({
            purchaseIntention: false
        });
    };

    confirmPurchaseHandler = () => {
        Router.push("/checkout");
    };

    purchaseHandler = () => {
        this.setState({
            purchaseIntention: true
        });
    }

    render() {
        // if (!this.props.isAuthenticated) {
        //     return null;
        // }

        if (this.props.loadingError) {
            return (
                <React.Fragment>
                    <h3>Ops, something went wrong.</h3>
                    <h3>Fail to load the APP.</h3>
                </React.Fragment>
            );
        }

        const canCheckout = !(this.props.ingredients.meat === 0 && this.props.ingredients.bacon === 0);
        return (
            <React.Fragment>
                <Modal
                    animation
                    display={this.state.purchaseIntention}
                    clickBackdrop={this.cancelPurchaseHandler}
                >
                    <OrderSummary
                        ingredients={this.props.ingredients}
                        price={this.props.totalPrice}
                        clickCancel={this.cancelPurchaseHandler}
                        clickOk={this.confirmPurchaseHandler}
                    />
                </Modal>
                <BurgerPreview ingredients={this.props.ingredients}/>
                <p>Total price: $<Price>{this.props.totalPrice}</Price> + tax</p>
                <Panel
                    ingredients={this.props.ingredients}
                    canCheckout={canCheckout}
                    addIngredientHandler={this.props.addIngredient}
                    removeIngredientHandler={this.props.removeIngredient}
                    resetIngredientsHandler={this.props.resetIngredients}
                    purchaseHandler={this.purchaseHandler}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loadingError: state.burger.loadingError
    };
};

const mapDispatchToProps = {
    addIngredient,
    fetchInitBurger,
    removeIngredient,
    resetIngredients
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);