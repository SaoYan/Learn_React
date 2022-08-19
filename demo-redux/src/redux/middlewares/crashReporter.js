const crashReporter = store => next => action => {
    try {
        return next(action);
    } catch (error) {
        console.error("Caught an exception\n", error);
        throw error;
    }
};

export default crashReporter;