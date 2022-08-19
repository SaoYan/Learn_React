import { burgerReducers } from "./burgerReducers";
import {
    addIngredient,
    fetchInitBurger,
    removeIngredient,
    resetIngredients
} from "../actions";

describe("burgerReducers", () => {
    let state;

    beforeEach(() => {
        state = {
            ingredients: {
                ing: 1
            },
            unitPrices: {
                ing: 0.99
            },
            totalPrice: 1,
            defaultIngredients: {
                defaultIng: 1
            },
            defaultPrice: 0.75
        };
    });

    it("addIngredient", () => {
        const action = {
            type: addIngredient,
            payload: {
                type: "ing"
            }
        };

        const nextState = burgerReducers(state, action);
        expect(nextState.ingredients).toEqual({ ing: 2 });
        expect(nextState.totalPrice).toEqual(1.99);
    });

    it("fetchInitBurger.fulfilled", () => {
        const action = {
            type: fetchInitBurger.fulfilled,
            payload: {
                ingredients: { ing1: 1 },
                unitPrices: {ing1: 0.5},
                totalPrice: 2.5
            }
        };

        const nextState = burgerReducers(state, action);
        expect(nextState).toEqual({
            ingredients: { ing1: 1 },
            unitPrices: { ing1: 0.5 },
            totalPrice: 2.5,
            defaultIngredients: { ing1: 1 },
            defaultPrice: 2.5
        });
    });

    it("fetchInitBurger.fulfilled - when the server returns null/undefined", () => {
        const action = {
            type: fetchInitBurger.fulfilled,
            payload: {
                ingredients: null,
                totalPrice: 2.5
            }
        };

        const nextState = burgerReducers(state, action);
        expect(nextState).toEqual({
            ingredients: {},
            unitPrices: {},
            totalPrice: 2.5,
            defaultIngredients: {},
            defaultPrice: 2.5
        });
    });

    it("removeIngredient", () => {
        const action = {
            type: removeIngredient,
            payload: {
                type: "ing"
            }
        };

        const nextState = burgerReducers(state, action);
        expect(nextState.ingredients).toEqual({ ing: 0 });
        expect(nextState.totalPrice).toEqual(0.01);
    });

    it("resetIngredients", () => {
        const action = {
            type: resetIngredients
        };

        const nextState = burgerReducers(state, action);
        expect(nextState.ingredients).toEqual({ defaultIng: 1 });
        expect(nextState.totalPrice).toEqual(0.75);
    });
});