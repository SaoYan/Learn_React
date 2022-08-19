import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import { authenticationReducers } from "./authenticationReducers";
import { burgerReducers } from "./burgerReducers";
import { ordersReducers } from "./ordersReducers";

const combinedReducer = combineReducers({
    auth: authenticationReducers,
    burger: burgerReducers,
    orders: ordersReducers
});

export const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
        console.log("[HYDRATE]");
        const nextState = {
            ...state,
            ...action.payload
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
}