import { createReducer } from "@reduxjs/toolkit";

import {
    authenticateUser,
    logoutUser,
    resumeSession,
    updateToken
} from "../actions";

const initState = {
    token: null,
    userId: null
};

export const authenticationReducers = createReducer(initState, {
    [authenticateUser.fulfilled]: (state, action) => {
        state.token = action.payload.idToken;
        state.userId = action.payload.localId;

        localStorage.setItem("idToken", action.payload.idToken);
        localStorage.setItem("userId", action.payload.localId);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("expiresAt", new Date().getTime() + action.payload.expiresIn * 1000);
    },
    [authenticateUser.rejected]: (state, action) => {
        state.token = null;
        state.userId = null;
    },
    [logoutUser]: (state, action) => {
        state.token = null;
        state.userId = null;

        localStorage.clear();
    },
    [resumeSession.fulfilled]: (state, action) => {
        state.token = action.payload.idToken;
        state.userId = action.payload.localId;
    },
    [updateToken.fulfilled]: (state, action) => {
        state.token = action.payload.id_token;
        state.userId = action.payload.user_id;

        localStorage.setItem("idToken", action.payload.id_token);
        localStorage.setItem("userId", action.payload.user_id);
        localStorage.setItem("refreshToken", action.payload.refresh_token);
        localStorage.setItem("expiresAt", new Date().getTime() + action.payload.expires_in * 1000);
    },
    [updateToken.rejected]: (state, action) => {
        state.token = null;
        state.userId = null;
    }
});