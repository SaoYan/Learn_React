import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
    refreshTokenClient,
    resetPasswordClient,
    signInClient,
    signUpClient
} from "../../axios";

import {
    INVALID_LOCAL_STORAGE,
    LOCAL_SESSION_EXPIRED
} from "../../components/Util/ErrorCodes";

/**
 * Plain actions
 */
export const logoutUser = createAction("LOGOUT_USER");

/**
 * Async thunks
 */
export const authenticateUser = createAsyncThunk("AUTH_USER", (user, thunkApi) => {
    let client = signInClient;
    if (user.isSignup) {
        client = signUpClient;
    }
    
    return (
        client.post("", {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
        .then((response) => {
            thunkApi.dispatch(checkAuthExpiration(response.data.expiresIn * 1000));
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            if (error.response) {
                return Promise.reject(error.response.data.error.message);
            }
            return Promise.reject(error.message);
        })
    );
});

export const resetPassword = createAsyncThunk("RESET_PASSWORD", (user) => {
    return (
        resetPasswordClient.post("", {
            requestType: "PASSWORD_RESET",
            email: user.email
        })
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            if (error.response) {
                return Promise.reject(error.response.data.error.message);
            }
            return Promise.reject(error.message);
        })
    );
});

export const resumeSession = createAsyncThunk("RESUME_SESSION", () => {
    const idToken = localStorage.getItem("idToken");
    const userId = localStorage.getItem("userId");
    const refreshToken = localStorage.getItem("refreshToken");
    const expiresAt = localStorage.getItem("expiresAt");

    if ((!idToken) || (!userId) || (!refreshToken) || (!expiresAt)) {
        return Promise.reject({message: INVALID_LOCAL_STORAGE});
    } else {
        if (new Date().getTime() >= expiresAt) {
            return Promise.reject({message: LOCAL_SESSION_EXPIRED});
        } else {
            return Promise.resolve({
                idToken: idToken,
                localId: userId
            });
        }
    }
});

export const updateToken = createAsyncThunk("REFRESH_TOKEN", (refreshToken, thunkApi) => {
    return (
        refreshTokenClient.post("", {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        })
        .then((response) => {
            thunkApi.dispatch(checkAuthExpiration(response.data.expires_in * 1000));
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            if (error.response) {
                return Promise.reject(error.response.data.error.message);
            }
            return Promise.reject(error.message);
        })
    );
});

/**
 * Thunk middlewares
 */
export const checkAuthExpiration = (timeout) => dispatch => {
    setTimeout(() => {
        alert("Session expired. Please reload the page.");
        // dispatch(logoutUser());
    }, timeout);
};