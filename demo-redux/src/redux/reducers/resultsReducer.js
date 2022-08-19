import { createReducer } from "@reduxjs/toolkit"

import { addResult, deleteResult } from "../actions";

const resultsReducer = createReducer([], {
    [addResult]: (state, action) => {
        state.push({
            id: new Date().toUTCString(),
            value: action.payload.value
        });
    },
    [deleteResult]: (state, action) => {
        const index = state.findIndex(el => el.id === action.payload.id);
        state.splice(index, 1);
    }
});

export default resultsReducer;