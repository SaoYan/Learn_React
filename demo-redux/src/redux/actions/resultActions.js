import { createAction } from "@reduxjs/toolkit";

export const addResult = createAction("ADD_RESULT", (value) => {
    return {
        payload: {
            value: value
        }
    };
});

export const deleteResult = createAction("DELETE_RESULT", (id) => {
    return {
        payload: {
            id: id
        }
    };
});