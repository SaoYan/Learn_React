import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import Axios, { dataClient } from "../../axios";

/**
 * Plain actions
 */
export const addIngredient = createAction("ADD_INGREDIENT", (type) => {
    return {
        payload: {
            type: type
        }
    };
});

export const removeIngredient = createAction("REMOVE_INGREDIENT", (type) => {
    return {
        payload: {
            type: type
        }
    };
});

export const resetIngredients = createAction("RESET_INGREDIENTS");


/**
 * Async thunks
 */
export const fetchInitBurger = createAsyncThunk("INIT_BURGER", () => {
    return (
        Axios.all([
            dataClient.get("/ingredients.json"),
            dataClient.get("/prices.json"),
            dataClient.get("/defaultPrice.json")
        ])
        .then(Axios.spread((ingredients, prices, defaultPrice) => {
            return Promise.resolve({
                ingredients: ingredients.data,
                unitPrices: prices.data,
                totalPrice: defaultPrice.data
            });
        }))
        .catch((error) => {
            if (error.response) {
                return Promise.reject(error.response.statusText);
            }
            return Promise.reject(error.message);
        })
    );
});