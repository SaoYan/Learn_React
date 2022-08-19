import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios, { dataClient } from "../../axios";

export const clearOrders = createAsyncThunk("CLEAR_ORDERS", (params) => {
    const promises = [];
    for (let orderId of Object.keys(params.orders)) {
        promises.push(dataClient.delete(`/orders/${orderId}.json?auth=${params.token}`))
    }
    // dataClient.delete(`/orders.json?auth=${params.token}&orderBy="userId"&equalTo="${params.userId}"`)

    return (
        Axios.all(promises)
            .then(() => {
                return Promise.resolve();
            })
            .catch((error) => {
                if (error.response) {
                    return Promise.reject(error.response.statusText);
                }
                return Promise.reject(error.message);
            })
    );
});

export const deleteOrder = createAsyncThunk("DELETE_ORDER", (params) => {
    return (
        dataClient.delete(`/orders/${params.orderId}.json?auth=${params.token}`)
            .then(() => {
                return Promise.resolve({orderId: params.orderId});
            })
            .catch((error) => {
                if (error.response) {
                    return Promise.reject(error.response.statusText);
                }
                return Promise.reject(error.message);
            })
    );
});

export const fetchOrders = createAsyncThunk("FETCH_ORDERS", (params) => {
    return (
        dataClient.get(`/orders.json?auth=${params.token}&orderBy="userId"&equalTo="${params.userId}"`)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    return Promise.reject(error.response.statusText);
                }
                return Promise.reject(error.message);
            })
    );
});

export const placeOrder = createAsyncThunk("PLACE_ORDER", (orderInfo) => {
    return (
        dataClient.post(`/orders.json?auth=${orderInfo.token}`, orderInfo.summary)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    return Promise.reject(error.response.statusText);
                }
                return Promise.reject(error.message);
            })
    );
});