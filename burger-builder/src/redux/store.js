import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { rootReducer } from "./reducers";

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
});

if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
}

export default store;