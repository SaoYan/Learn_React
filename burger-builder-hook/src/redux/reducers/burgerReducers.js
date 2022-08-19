import { createReducer } from "@reduxjs/toolkit";

import {
    addIngredient,
    fetchInitBurger,
    removeIngredient,
    resetIngredients
} from "../actions";

const initState = {
    ingredients: {},
    unitPrices: {},
    totalPrice: 0,
    defaultIngredients: {},
    defaultPrice: 0
};

export const burgerReducers = createReducer(initState, {
    [addIngredient]: (state, action) => {
        state.ingredients[action.payload.type] += 1;
        state.totalPrice += state.unitPrices[action.payload.type];
        state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
    },
    [fetchInitBurger.fulfilled]: (state, action) => {
        /**
         * Recommended pratice: reducers should own the state shape.  
         * https://redux.js.org/style-guide/style-guide#reducers-should-own-the-state-shape
         * (More code, indeed; but safer.)
         */
        for (let key of ["ingredients", "unitPrices", "totalPrice"]) {
            if (!action.payload[key]) {
                console.warn(`Got null when fetching ${key} from the server.`);
            }
        }

        return {
            ingredients: action.payload.ingredients ? action.payload.ingredients : {},
            unitPrices: action.payload.unitPrices ? action.payload.unitPrices : {},
            totalPrice: action.payload.totalPrice ? action.payload.totalPrice : 0,
            defaultIngredients: action.payload.ingredients ? action.payload.ingredients : {},
            defaultPrice: action.payload.totalPrice ? action.payload.totalPrice : 0
        };
    },
    [removeIngredient]: (state, action) => {
        state.ingredients[action.payload.type] -= 1;
        state.totalPrice -= state.unitPrices[action.payload.type];
        state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
    },
    [resetIngredients]: (state, action) => {
        state.ingredients = state.defaultIngredients;
        state.totalPrice = state.defaultPrice;
    }
});