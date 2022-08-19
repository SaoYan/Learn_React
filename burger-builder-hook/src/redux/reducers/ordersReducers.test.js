import { ordersReducers } from "./ordersReducers";
import {
    clearOrders,
    deleteOrder,
    fetchOrders,
} from "../actions";

describe("ordersReducers", () => {
    let state;

    beforeEach(() => {
        state = {
            order1: {},
            order2: {}
        };
    });

    it("clearOrders.fulfilled", () => {
        const action = {
            type: clearOrders.fulfilled
        };

        const nextState = ordersReducers(state, action);
        expect(nextState).toEqual({});
    });

    it("deleteOrder.fulfilled", () => {
        const action = {
            type: deleteOrder.fulfilled,
            payload: {
                orderId: "order1"
            }
        };

        const nextState = ordersReducers(state, action);
        expect(nextState).toEqual({ order2: {} });
    });

    it("fetchOrders.fulfilled", () => {
        state = {};

        const action = {
            type: fetchOrders.fulfilled,
            payload: {
                order3: {},
                order4: {}
            }
        };

        const nextState = ordersReducers(state, action);
        expect(nextState).toEqual({
            order3: {},
            order4: {}
        });
    });

    it("fetchOrders.fulfilled - server returns null", () => {
        state = {};

        const action = {
            type: fetchOrders.fulfilled,
            payload: null
        };

        const nextState = ordersReducers(state, action);
        expect(nextState).toEqual({});
    });

    it("fetchOrders.fulfilled - server returns undefined", () => {
        state = {};

        const action = {
            type: fetchOrders.fulfilled
        };

        const nextState = ordersReducers(state, action);
        expect(nextState).toEqual({});
    });
});