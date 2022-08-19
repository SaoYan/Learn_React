import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { Authentication } from ".";
import FormItem from "../UI/FormItem";
import * as mapErrorToAlert from "../Util/mapErrorToAlert";

configure({ adapter: new Adapter() });

describe("Authentication", () => {
    let mockProps;
    let mockState;
    let wrapper;

    beforeEach(() => {
        jest.spyOn(mapErrorToAlert, "authenticationErrorAlert")
            .mockImplementation((error) => {});
        
        mockProps = {
            authenticateUser: jest.fn().mockImplementation(() => Promise.resolve()),
            resetPassword: jest.fn().mockImplementation(() => Promise.resolve())
        };

        mockState = {
            signup: true,
            forgetPassword: false,
            loading: false,
            form: {
                email: {
                    type: "email",
                    useRef: true,
                    required: true,
                    value: "emailValue",
                    caption: "Email"
                },
                password: {
                    type: "password",
                    useRef: false,
                    required: true,
                    value: "passwordValue",
                    caption: "Password"
                }
            }
        }

        wrapper = shallow(
            <Authentication
                authenticateUser={mockProps.authenticateUser}
                resetPassword={mockProps.resetPassword}
            />
        );
        wrapper.setState(mockState);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should handle form change event", () => {
        wrapper.find("input[type='email']").simulate("change", {
            target: {
                value: "MOCK_VALUE_UPDATE"
            }
        });
        expect(wrapper.state("form").email.value).toEqual("MOCK_VALUE_UPDATE");
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
            wrapper.find("form").simulate("submit", { preventDefault: () => {} });

            expect(mockProps.authenticateUser).toHaveBeenCalledTimes(1);
            expect(mockProps.authenticateUser).toBeCalledWith({
                signup: true,
                email: mockState.form.email.value,
                password: mockState.form.password.value
            });
        });

        it("Shold switch to sign-in mode as ecpected", () => {
            wrapper.find("button[children='Already signed up?']").simulate("click");
            expect(wrapper.state("signup")).toEqual(false);
        });
    });

    describe("Sign-in mode - state.signup: false; state.forgetPassword: false", () => {
        beforeEach(() => {
            wrapper.setState({ signup: false });
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
            wrapper.find("form").simulate("submit", { preventDefault: () => {} });

            expect(mockProps.authenticateUser).toHaveBeenCalledTimes(1);
            expect(mockProps.authenticateUser).toBeCalledWith({
                signup: false,
                email: mockState.form.email.value,
                password: mockState.form.password.value
            });
        });

        it("Shold switch to reset-password mode as ecpected", () => {
            wrapper.find("button[children='Forget password?']").simulate("click");
            expect(wrapper.state("forgetPassword")).toEqual(true);
        });
    });

    describe("Reset-password mode - state.signup: false; state.forgetPassword: true", () => {
        beforeEach(() => {
            wrapper.setState({
                signup: false,
                forgetPassword: true
            });
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
            wrapper.find("form").simulate("submit", { preventDefault: () => {} });

            expect(mockProps.resetPassword).toHaveBeenCalledTimes(1);
            expect(mockProps.resetPassword).toBeCalledWith({
                email: mockState.form.email.value
            });
        });
    });
});