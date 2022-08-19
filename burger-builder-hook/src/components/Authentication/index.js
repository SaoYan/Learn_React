import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import FormItem from "../UI/FormItem";
import Spinner from "../UI/Spinner";

import { authenticateUser, resetPassword } from "../../redux/actions/authenticationActions";
import { authenticationErrorAlert } from "../Util/mapErrorToAlert";

import classes from "./Authentication.module.css";

/**
 * The sign-up/sign-in page.
 * The default view is sign-up;
 * User can switch to the sign-in view, where they can reset password.
 * 
 * @param props
 * `authenticateUser`: [redux-related prop] dispatchable action;  
 * `resetPassword`: [redux-related prop] dispatchable action
 */
export const Authentication = (props) =>  {
    /**
     * state hooks
     */
    const [isSignup, setIsSignup] = useState(true);
    const [forgetPassword, setForgetPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: {
            type: "email",
            useRef: true,
            required: true,
            value: "",
            caption: "Email"
        },
        password: {
            type: "password",
            useRef: false,
            required: true,
            value: "",
            caption: "Password"
        }
    });

    /**
     * effect hook 
     */
    const inputElementRef = useRef(null);
    useEffect(() => {
        if (inputElementRef.current) {
            inputElementRef.current.focus();
        }
    }, [isSignup, forgetPassword]);

    /**
     * callback hook
     */
    const authenticateUser = props.authenticateUser;
    const authParams = {
        signup: isSignup,
        email: form.email.value,
        password: form.password.value
    };
    const authenticateUserHandler = useCallback(
        (event) => {
            event.preventDefault();
            setLoading(true);
    
            /**
             * Caveat: do not do `.then(() => { setLoading(false) })`
             * When authenticateUser is fulfilled, the global state `token` will be set,
             * and the page will be redirected to "/home" (see `/src/App.js`),
             * which means <Authentication> will be unmounted.
             * React state update on an unmounted components indicates memory leak risks.
             */
            authenticateUser(authParams)
            .then(unwrapResult)
            .catch((error) => {
                setLoading(false);
                authenticationErrorAlert(error);
            });
        },
        [authParams, authenticateUser]
    );

    /**
     * callback hook
     */
    const updateFormHandler = useCallback(
        (event, key) => {
            const value = event.target.value;
            setForm((prevForm) => {
                const updatedItem = prevForm[key];
                updatedItem.value = value;
                return {
                    ...prevForm,
                    [key]: updatedItem
                };
            });
        },
        []
    );

    /**
     * callback hook
     */
    const resetPassword = props.resetPassword;
    const resetPasswordHandler = useCallback(
        (event) => {
            event.preventDefault();
            setLoading(true);
    
            resetPassword({
                email: form.email.value
            })
            .then(unwrapResult)
            .then(() => {
                setLoading(false);
                setForgetPassword(false);
                alert("An email has been sent to your email.");
            })
            .catch((error) => {
                setLoading(false);
                setForgetPassword(true);
                authenticationErrorAlert(error);
            });
        },
        [form.email.value, resetPassword]
    );

    if (loading) {
        return <Spinner />;
    }

    /**
     * Form items
     */
    let formItems = Object.keys(form).map((key) => {
        const formItem = form[key];
        if (forgetPassword && key !== "email") {
            return null;
        }
        return (
            <FormItem caption={formItem.caption} key={key}>
                <input
                    type={formItem.type}
                    ref={formItem.useRef ? inputElementRef : null}
                    required={formItem.required}
                    pattern={formItem.pattern}
                    value={formItem.value}
                    onChange={(event) => updateFormHandler(event, key)}
                />
            </FormItem>
        );
    });

    /**
     * The input form
     */
    const onSubmitHandler = forgetPassword ? resetPasswordHandler : authenticateUserHandler;
    const submitBtnValue = forgetPassword ? "Reset" : (
        isSignup ? "Sign up" : "Sign in"
    );
    const formCmp = (
        <form onSubmit={onSubmitHandler}>
            {formItems}
            <input
                className={classes.submit}
                type="submit"
                value={submitBtnValue}
            />
        </form>
    );

    /**
     * The helper button (below the sign-up/in button)
     */
    let helperButton = (
        <button
            className={classes.switch}
            onClick={
                isSignup ? () => setIsSignup(false) : 
                () => setForgetPassword(true)
            }
        >
            {isSignup ? "Already signed up?" : "Forget password?"}
        </button>
    );
    if (forgetPassword) {
        helperButton = null;
    }

    return(
        <div className={classes.auth}>
            {formCmp}
            {helperButton}
        </div>
    );
}

const mapDispatchToProps = {
    authenticateUser,
    resetPassword
};

export default connect(null, mapDispatchToProps)(Authentication);