import { createAction } from "@reduxjs/toolkit";

export const add = createAction("ADD", (value) => {
    return {
        payload: {
            value: value
        }
    };
});

export const decrement = createAction("DECREMENT", () => ({}));

export const increment = createAction("INCREMENT", () => ({}));

export const sub = createAction("SUB", (value) => {
    return {
        payload: {
            value: value
        }
    };
});