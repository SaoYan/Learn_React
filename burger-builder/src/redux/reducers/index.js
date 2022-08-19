import { combineReducers } from "redux";

import { authenticationReducers } from "./authenticationReducers";
import { burgerReducers } from "./burgerReducers";
import { ordersReducers } from "./ordersReducers";

export const rootReducer = combineReducers({
    auth: authenticationReducers,
    burger: burgerReducers,
    orders: ordersReducers
});