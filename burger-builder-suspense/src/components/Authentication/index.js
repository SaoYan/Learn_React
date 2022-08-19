import React, { Component } from "react";
import { connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import FormItem from "../UI/FormItem";
import Spinner from "../UI/Spinner";

import { authenticateUser, resetPassword } from "../../redux/actions";
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
export class Authentication extends Component {
    state = {
        signup: true,
        forgetPassword: false,
        loading: false,
        form: {
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
        }
    }

    inputElement = React.createRef();

    componentDidMount() {
        if (this.inputElement.current) {
            this.inputElement.current.focus();
        }
    }

    authenticateUserHandler = (event) => {
        event.preventDefault();
        this.startLoading();

        /**
         * Caveat: do not do `.then(() => { this.endLoading() })`
         * When authenticateUser is fulfilled, the global state `token` will be set,
         * and the page will be redirected to "/home" (see `/src/App.js`),
         * which means <Authentication> will be unmounted.
         * React state update on an unmounted components indicates memory leak risks.
         */
        this.props.authenticateUser({
            signup: this.state.signup,
            email: this.state.form.email.value,
            password: this.state.form.password.value
        })
        .then(unwrapResult)
        .catch((error) => {
            this.endLoading();
            authenticationErrorAlert(error);
        });
    };

    forgetPassworHandler = () => {
        this.setState({
            forgetPassword: true
        })
    };

    updateFormHandler = (event, key) => {
        const value = event.target.value;

        this.setState((prevState) => {
            const updatedItem = {...prevState.form[key]};
            updatedItem.value = value;
            return {
                form: {
                    ...prevState.form,
                    [key]: updatedItem
                }
            };
        });
    };

    resetPasswordHandler = (event) => {
        event.preventDefault();
        this.startLoading();

        this.props.resetPassword({
            email: this.state.form.email.value
        })
        .then(unwrapResult)
        .then(() => {
            this.endLoading({ forgetPassword: false });
            alert("An email has been sent to your email.");
        })
        .catch((error) => {
            this.endLoading({ forgetPassword: true });
            authenticationErrorAlert(error);
        });
    };

    switchToSignInHandler = () => {
        this.setState((prevState) => {
            return {
                signup: !prevState.signup
            };
        })
    };

    startLoading = (extraSetState) => {
        this.setState({
            ...extraSetState,
            loading: true
        });
    }

    endLoading = (extraSetState) => {
        this.setState({
            ...extraSetState,
            loading: false
        });
    }

    render () {
        if (this.state.loading) {
            return <Spinner />;
        }

        /**
         * Form items
         */
        let formItems = Object.keys(this.state.form).map((key) => {
            const formItem = this.state.form[key];
            if (this.state.forgetPassword && key !== "email") {
                return null;
            }
            return (
                <FormItem caption={formItem.caption} key={key}>
                    <input
                        type={formItem.type}
                        ref={formItem.useRef ? this.inputElement : null}
                        required={formItem.required}
                        pattern={formItem.pattern}
                        value={formItem.value}
                        onChange={(event) => this.updateFormHandler(event, key)}
                    />
                </FormItem>
            );
        });

        /**
         * The input form
         */
        const onSubmitHandler = this.state.forgetPassword ? 
            this.resetPasswordHandler : this.authenticateUserHandler;
        const inputValue = this.state.forgetPassword ? "Reset" : (
            this.state.signup ? "Sign up" : "Sign in"
        );
        const form = (
            <form onSubmit={onSubmitHandler}>
                {formItems}
                <input
                    className={classes.submit}
                    type="submit"
                    value={inputValue}
                />
            </form>
        )

        /**
         * The helper button (below the sign-up/in button)
         */
        let helperButton = (
            <button
                className={classes.switch}
                onClick={this.state.signup ? this.switchToSignInHandler : this.forgetPassworHandler}
            >
                {this.state.signup ? "Already signed up?" : "Forget password?"}
            </button>
        );
        if (this.state.forgetPassword) {
            helperButton = null;
        }

        return(
            <div className={classes.auth}>
                {form}
                {helperButton}
            </div>
        );
    }
}

const mapDispatchToProps = {
    authenticateUser,
    resetPassword
};

export default connect(null, mapDispatchToProps)(Authentication);