const redux = require("redux");

const initState = {
    counter: 0
};

/**
 * Reducer
 */
const reducer = (state = initState, action) => {
    const updatedState = {...state};
    switch (action.type) {
        case "INC_COUNTER":
            updatedState.counter += 1;
            break;
        case "ADD_COUNTER":
            updatedState.counter += action.addition;
            break;
    }

    return updatedState
};

/**
 * Store
 * reducer is the only thing that can manipulate states in the store
 */
const store = redux.createStore(reducer);

/**
 * Subscription
 * get triggered whenever the state is updated
 */
store.subscribe(() => {
    console.log("[Subscribtion] ", store.getState());
});

/**
 * Dispatching action
 */
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({
    type: "ADD_COUNTER",
    addition: 10
});