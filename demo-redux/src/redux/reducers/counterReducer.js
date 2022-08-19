import { createReducer } from "@reduxjs/toolkit"

import { add, decrement, increment, sub } from "../actions";

const counterReducer = createReducer(0, {
    [add]: (state, action) => {
        return state + action.payload.value;
    },
    [decrement]: (state, action) => {
        return state - 1;
    },
    [increment]: (state, action) => {
        return state + 1;
    },
    [sub]: (state, action) => {
        return state - action.payload.value;
    }
});

export default counterReducer;