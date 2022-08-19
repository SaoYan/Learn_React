import { authenticationReducers } from "./authenticationReducers";
import {
    authenticateUser,
    logoutUser,
    resumeSession,
    updateToken
} from "../actions";

describe("authenticationReducers", () => {
    it("authenticateUser.fulfilled", () => {
        const state = {
            token: null,
            userId: null
        };

        const action = {
            type: authenticateUser.fulfilled,
            payload: {
                idToken: "TOKEN",
                localId: "USER_ID"
            }
        };

        const nextState = authenticationReducers(state, action);
        expect(nextState.token).toEqual("TOKEN");
        expect(nextState.userId).toEqual("USER_ID");
    });

    it("authenticateUser.rejected", () => {
        const state = {
            token: "TOKEN",
            userId: "USER_ID"
        };

        const action = {
            type: authenticateUser.rejected
        }

        const nextState = authenticationReducers(state, action);
        expect(nextState.token).toBeNull();
        expect(nextState.userId).toBeNull();
    });

    it("logoutUser", () => {
        const state = {
            token: "TOKEN",
            userId: "USER_ID"
        };

        const action = {
            type: logoutUser
        }

        const nextState = authenticationReducers(state, action);
        expect(nextState.token).toBeNull();
        expect(nextState.userId).toBeNull();
    });

    it("resumeSession.fulfilled", () => {
        const state = {
            token: null,
            userId: null
        };

        const action = {
            type: resumeSession.fulfilled,
            payload: {
                idToken: "TOKEN",
                localId: "USER_ID"
            }
        }

        const nextState = authenticationReducers(state, action);
        expect(nextState.token).toEqual("TOKEN");
        expect(nextState.userId).toEqual("USER_ID");
    });

    it("updateToken.fulfilled", () => {
        const state = {
            token: null,
            userId: null
        };

        const action = {
            type: updateToken.fulfilled,
            payload: {
                id_token: "TOKEN",
                user_id: "USER_ID"
            }
        }

        const nextState = authenticationReducers(state, action);
        expect(nextState.token).toEqual("TOKEN");
        expect(nextState.userId).toEqual("USER_ID");
    });
    
    it("updateToken.rejected", () => {
        const state = {
            token: "TOKEN",
            userId: "USER_ID"
        };

        const action = {
            type: updateToken.rejected
        }

        const nextState = authenticationReducers(state, action);
        expect(nextState.token).toBeNull();
        expect(nextState.userId).toBeNull();
    });
})