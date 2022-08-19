import { createReducer } from "@reduxjs/toolkit";

import {
    clearOrders,
    deleteOrder,
    fetchOrders,
} from "../actions";

export const ordersReducers = createReducer({}, {
    [clearOrders.fulfilled]: (state, action) => {
        return {};
    },
    [deleteOrder.fulfilled]: (state, action) => {
        delete state[action.payload.orderId];
    },
    [fetchOrders.fulfilled]: (state, action) => {
        return action.payload ? action.payload : {};
    }
});