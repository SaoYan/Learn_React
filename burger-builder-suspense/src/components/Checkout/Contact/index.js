import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import FormItem from "../../UI/FormItem";
import Price from "../../Util/Price";
import Spinner from "../../UI/Spinner"

import { formTemplate } from "./formTemplate";
import { taxRate } from "./taxRate";
import { dataErrorAlert } from "../../Util/mapErrorToAlert";

import classes from "./Contact.module.css";

/**
 * The contact form, including name, address, email, phone, etc.
 * The user must fill in all fileds to be able to submit the order.
 * 
 * @param props
 * `token`: [redux-related prop] the auth ID token used for sending the order to the server  
 * `ingredients`: [redux-related prop] a JS object { ingredientName: theNumberOfIt }  
 * `price`: [redux-related prop] the price before tax  
 * `placeOrderHandler`: event handler  
 */
export class Contact extends Component {
    state = {
        processingOrder: false,
        form: formTemplate,
        tax: {
            GST_HST: 0,
            PST: 0
        },
        deliveryFee: 0,
        finalPrice: this.props.price
    };

    inputElement = React.createRef();

    componentDidMount() {
        if (this.inputElement.current) {
            this.inputElement.current.focus();
        }
    }

    updateFormHandler(event, key) {
        const value = event.target.value;

        this.setState((prevState) => {
            const newForm = {...prevState.form};
            const newFormItem = {...newForm[key]};
            newFormItem.value = value;
            newForm[key] = newFormItem;
            return {
                form: newForm
            };
        });

        if (key === "province") {
            const rate = taxRate[value];
            let taxState = { GST_HST: 0, PST: 0 };
            if (rate.type === "HST") {
                taxState = {
                    GST_HST: this.props.price * rate.value,
                    PST: 0
                };
            } else if (rate.type === "PST") {
                taxState = {
                    GST_HST: this.props.price * 0.05,
                    PST: this.props.price * rate.value
                };
            }

            this.setState((prevState) => {
                return {
                    tax: taxState,
                    finalPrice: this.props.price + taxState.GST_HST + taxState.PST + prevState.deliveryFee
                };
            });
        }

        if (key === "delivery") {
            let deliveryFee = 0;
            if (value === "express") {
                deliveryFee = 1;
            } else if (value === "priority") {
                deliveryFee = 2.5;
            }

            this.setState((prevState) => {
                return {
                    deliveryFee: deliveryFee,
                    finalPrice: this.props.price + prevState.tax.GST_HST + prevState.tax.PST + deliveryFee
                };
            });
        }
    }

    placeOrderHandler = (event) => {
        event.preventDefault();
        this.setState({
            processingOrder: true
        });

        this.props.placeOrder({
            token: this.props.token,
            summary: {
                userId: this.props.userId,
                ingredients: this.props.ingredients,
                price: parseFloat(this.state.finalPrice.toFixed(2)),
                customer: {
                    name: this.state.form.name.value,
                    address: {
                        street: this.state.form.street.value,
                        province: this.state.form.province.value,
                        city: this.state.form.city.value,
                        postalCode: this.state.form.postalCode.value
                    },
                    email: this.state.form.email.value,
                    phone: this.state.form.phone.value
                },
                timeStamp: new Date().toUTCString(),
                delivery: this.state.form.delivery.value
            }
        })
        .then(unwrapResult)
        .then(() => {
            alert("Order confirmed!");
            this.props.history.push("/home");
        })
        .catch((error) => {
            this.setState({
                processingOrder: false
            });
            dataErrorAlert(error);
        });
    };

    render () {
        if (this.state.processingOrder) {
            return <Spinner />;
        }

        const form = Object.keys(this.state.form).map((key) => {
            const formItem = this.state.form[key];
            let content;

            if (formItem.type === "select") {
                content = (
                    <select
                        required={formItem.required}
                        onChange={(event) => this.updateFormHandler(event, key)}
                    >
                        {
                            formItem.options.map((option) => {
                                return (
                                    <option value={option.value} key={option.displayName}>
                                        {option.displayName}
                                    </option>
                                );
                            })
                        }
                    </select>
                );
            } else {
                content = (
                    <input
                        type={formItem.type}
                        ref={formItem.useRef ? this.inputElement : null}
                        required={formItem.required}
                        pattern={formItem.pattern}
                        placeholder={formItem.placeholder}
                        value={formItem.value}
                        onChange={(event) => this.updateFormHandler(event, key)}
                    />
                );
            }

            return (
                <FormItem caption={formItem.caption} key={key}>
                    {content}
                </FormItem>
            );
        });

        return (
            <div className={classes.contact}>
                <form onSubmit={this.placeOrderHandler}>
                    {form}
                    <div>
                        <p>Price: $<Price>{this.props.price}</Price></p>
                        <p>GST/HST: $<Price>{this.state.tax.GST_HST}</Price></p>
                        <p>PST: $<Price>{this.state.tax.PST}</Price></p>
                        <p>Delivery: $<Price>{this.state.deliveryFee}</Price></p>
                        <p>Total: $<Price>{this.state.finalPrice}</Price></p>
                    </div>
                    <input
                        className={classes.submit}
                        type="submit"
                        value="Place Order"
                    />
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        ingredients: state.burger.ingredients,
        price: state.burger.totalPrice
    };
};

export default withRouter(connect(mapStateToProps)(Contact));