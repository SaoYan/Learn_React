import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import * as react from "react";

import { Authentication } from ".";
import FormItem from "../UI/FormItem";
import * as mapErrorToAlert from "../Util/mapErrorToAlert";

configure({ adapter: new Adapter() });

const changeForm = (wrapper) => {
    wrapper.find("input[type='email']").simulate("change", {
        target: {
            value: "EMAIL_VALUE"
        }
    });

    const passwordInput = wrapper.find("input[type='password']");
    if (passwordInput.exists()) {
        passwordInput.simulate("change", {
            target: {
                value: "PASSWORD_VALUE"
            }
        });
    }
};

const mockUseState = () => {
    /**
     * the set-state functions will be pushed to the list;
     * the functions are (in order):
     * setIsSignup, setForgetPassword, setLoading, setForm
     */
    const setStateSpys = [];
    const useStateSpy = jest.spyOn(react, "useState").mockImplementation((initState) => {
        const setState = jest.fn();
        setStateSpys.push(setState);
        return [initState, setState];
    });
    return [useStateSpy, setStateSpys];
};

describe("Authentication", () => {
    let mockProps;
    let wrapper;
    let useStateSpy;
    let setStateSpys;

    beforeEach(() => {
        jest.spyOn(mapErrorToAlert, "authenticationErrorAlert")
            .mockImplementation((error) => {});

        mockProps = {
            authenticateUser: jest.fn().mockImplementation(() => Promise.resolve()),
            resetPassword: jest.fn().mockImplementation(() => Promise.resolve())
        };

        wrapper = shallow(
            <Authentication
                authenticateUser={mockProps.authenticateUser}
                resetPassword={mockProps.resetPassword}
            />
        );
    });

    afterEach(() => {
        useStateSpy.mockRestore();
        jest.clearAllMocks();
    });

    it("Shoule handle the form onChange event", () => {
        [useStateSpy, setStateSpys] = mockUseState(setStateSpys);
        wrapper = shallow(
            <Authentication
                authenticateUser={mockProps.authenticateUser}
                resetPassword={mockProps.resetPassword}
            />
        );

        changeForm(wrapper);
        expect(setStateSpys[3]).toHaveBeenCalledTimes(2);
    });

    describe("Sign-up mode - state.signup: true; state.forgetPassword: false", () => {
        it("Should display correct content", () => {
            expect(wrapper.find(FormItem)).toHaveLength(2);
            expect(wrapper.find("FormItem[caption='Email']")).toHaveLength(1);
            expect(wrapper.find("FormItem[caption='Password']")).toHaveLength(1);

            expect(wrapper.find("input[value='Sign up']").exists()).toEqual(true);
            expect(wrapper.find("input[value='Sign in']").exists()).toEqual(false);
            expect(wrapper.find("input[value='Reset']").exists()).toEqual(false);

            expect(wrapper.find("button[children='Already signed up?']").exists()).toEqual(true);
            expect(wrapper.find("button[children='Forget password?']").exists()).toEqual(false);
        });

        it("Should correctly handle the click event: sign up", () => {
            changeForm(wrapper);
            wrapper.find("form").simulate("submit", { preventDefault: () => {} });

            expect(mockProps.authenticateUser).toHaveBeenCalledTimes(1);
            expect(mockProps.authenticateUser).toBeCalledWith({
                signup: true,
                email: "EMAIL_VALUE",
                password: "PASSWORD_VALUE"
            });
        });

        it("Should be able to switch to the sign-in mode", () => {
            [useStateSpy, setStateSpys] = mockUseState(setStateSpys);
            wrapper = shallow(
                <Authentication
                    authenticateUser={mockProps.authenticateUser}
                    resetPassword={mockProps.resetPassword}
                />
            );

            wrapper.find("button[children='Already signed up?']").simulate("click");
            expect(setStateSpys[0]).toHaveBeenCalledTimes(1);
            expect(setStateSpys[0]).toBeCalledWith(false);
        });
    });

    describe("Sign-in mode - state.signup: false; state.forgetPassword: false", () => {
        beforeEach(() => {
            wrapper.find("button[children='Already signed up?']").simulate("click");
        });

        it("Should display correct content", () => {
            expect(wrapper.find(FormItem)).toHaveLength(2);
            expect(wrapper.find("FormItem[caption='Email']")).toHaveLength(1);
            expect(wrapper.find("FormItem[caption='Password']")).toHaveLength(1);

            expect(wrapper.find("input[value='Sign up']").exists()).toEqual(false);
            expect(wrapper.find("input[value='Sign in']").exists()).toEqual(true);

            expect(wrapper.find("button[children='Already signed up?']").exists()).toEqual(false);
            expect(wrapper.find("button[children='Forget password?']").exists()).toEqual(true);
        });

        it("Should correctly handle the click event: sign in", () => {
            changeForm(wrapper);
            wrapper.find("form").simulate("submit", { preventDefault: () => {} });

            expect(mockProps.authenticateUser).toHaveBeenCalledTimes(1);
            expect(mockProps.authenticateUser).toBeCalledWith({
                signup: false,
                email: "EMAIL_VALUE",
                password: "PASSWORD_VALUE"
            });
        });
    });

    describe("Reset-password mode - state.signup: false; state.forgetPassword: true", () => {
        beforeEach(() => {
            wrapper.find("button[children='Already signed up?']").simulate("click");
            wrapper.find("button[children='Forget password?']").simulate("click");
        });

        it("Should display correct content", () => {
            expect(wrapper.find(FormItem)).toHaveLength(1);
            expect(wrapper.find("FormItem[caption='Email']")).toHaveLength(1);
            expect(wrapper.find("FormItem[caption='Password']").exists()).toEqual(false);

            expect(wrapper.find("input[value='Sign up']").exists()).toEqual(false);
            expect(wrapper.find("input[value='Sign in']").exists()).toEqual(false);
            expect(wrapper.find("input[value='Reset']").exists()).toEqual(true);

            expect(wrapper.find("button[children='Already signed up?']").exists()).toEqual(false);
            expect(wrapper.find("button[children='Forget password?']").exists()).toEqual(false);
        });

        it("Should correctly handle the click event: reset password", () => {
            changeForm(wrapper);
            wrapper.find("form").simulate("submit", { preventDefault: () => {} });

            expect(mockProps.resetPassword).toHaveBeenCalledTimes(1);
            expect(mockProps.resetPassword).toBeCalledWith({
                email: "EMAIL_VALUE"
            });
        });
    });
});