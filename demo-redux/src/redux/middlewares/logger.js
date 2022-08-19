const logger = store => next => action => {
    console.log("dispatching", action);
    console.log("current state", store.getState());
    const result = next(action);
    console.log("next state", store.getState());
    return result;
};

export default logger;