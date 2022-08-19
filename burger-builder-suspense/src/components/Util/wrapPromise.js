const wrapPromise = (promise) => {
    let status = "pending";
    let result;

    const suspender = promise
        .then((res) => {
            status = "success";
            result = res;
        })
        .catch((err) => {
            status = "error";
            result = err;
        });

    return {
        read: () => {
            switch (status) {
                case "pending":
                    throw suspender;
                case "error":
                    throw result;
                case "success":
                default:
                    return result;
            }
        }
    };
};

export default wrapPromise;