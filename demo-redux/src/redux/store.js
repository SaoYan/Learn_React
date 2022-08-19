import { reduxBatch } from '@manaflair/redux-batch'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { logger, crashReporter } from "./middlewares";
import { counterReducer, resultsReducer } from "./reducers";

const reducer = {
    counter: counterReducer,
    results: resultsReducer
};

const middleware = [
    ...getDefaultMiddleware(),
    crashReporter,
    logger
];

const preloadedState = {
    counter: 0,
    results: []
};

const store = configureStore({
    reducer: reducer,
    middleware: middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState,
    enhancers: [reduxBatch]
});

export default store;