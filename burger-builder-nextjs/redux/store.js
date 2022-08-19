import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createWrapper } from "next-redux-wrapper";

import { rootReducer } from "./reducers";

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware(),
        devTools: process.env.NODE_ENV !== 'production'
    });
};

export const wrapper = createWrapper(makeStore);