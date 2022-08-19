import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import Axios, { dataClient } from "../../Util/axios";

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
    // return (
    //     Axios.all([
    //         dataClient.get("/ingredients.json"),
    //         dataClient.get("/prices.json"),
    //         dataClient.get("/defaultPrice.json")
    //     ])
    //     .then(Axios.spread((ingredients, prices, defaultPrice) => {
    //         return Promise.resolve({
    //             ingredients: ingredients.data,
    //             unitPrices: prices.data,
    //             totalPrice: defaultPrice.data
    //         });
    //     }))
    //     .catch((error) => {
    //         if (error.response) {
    //             return Promise.reject(error.response.statusText);
    //         }
    //         return Promise.reject(error.message);
    //     })
    // );
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                ingredients: {
                    bacon: 1,
                    cheese: 1,
                    meat: 1,
                    salad: 2
                },
                unitPrices: {
                    bacon: 1,
                    cheese: 0.7,
                    meat: 1.5,
                    salad: 0.5
                },
                totalPrice: 4.99
            });
        }, 3000);
    });
});