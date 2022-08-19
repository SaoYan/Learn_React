import React, { useCallback, useEffect, useRef, useState } from "react";
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
export const Contact = (props) => {
    /**
     * state hooks
     */
    const [processingOrder, setProcessingOrder] = useState(false);
    const [form, setForm] = useState(formTemplate);
    const [fees, setFees] = useState({
        tax: {
            GST_HST: 0,
            PST: 0
        },
        deliveryFee: 0,
        finalPrice: props.price
    });

    /**
     * effect hook
     */
    const inputElementRef = useRef(null);
    useEffect(() => {
        if (inputElementRef.current) {
            inputElementRef.current.focus();
        }
    }, []);

    const updateFormHandler = useCallback(
        (event, key) => {
            const value = event.target.value;
    
            setForm((prevForm) => {
                const newFormItem = {...prevForm[key]};
                newFormItem.value = value;
                return {
                    ...prevForm,
                    [key]: newFormItem
                };
            });
    
            if (key === "province") {
                const rate = taxRate[value];
                let taxState = { GST_HST: 0, PST: 0 };
                if (rate.type === "HST") {
                    taxState = {
                        GST_HST: props.price * rate.value,
                        PST: 0
                    };
                } else if (rate.type === "PST") {
                    taxState = {
                        GST_HST: props.price * 0.05,
                        PST: props.price * rate.value
                    };
                }
    
                setFees((prevFees) => {
                    return {
                        tax: taxState,
                        deliveryFee: prevFees.deliveryFee,
                        finalPrice: props.price + taxState.GST_HST + taxState.PST + prevFees.deliveryFee
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
    
                setFees((prevFees) => {
                    return {
                        tax: prevFees.tax,
                        deliveryFee: deliveryFee,
                        finalPrice: props.price + prevFees.tax.GST_HST + prevFees.tax.PST + deliveryFee
                    };
                });
            }
        },
        [props.price]
    );

    const placeOrderHandler = (event) => {
        event.preventDefault();
        setProcessingOrder(true);

        props.placeOrder({
            token: props.token,
            summary: {
                userId: props.userId,
                ingredients: props.ingredients,
                price: parseFloat(fees.finalPrice.toFixed(2)),
                customer: {
                    name: form.name.value,
                    address: {
                        street: form.street.value,
                        province: form.province.value,
                        city: form.city.value,
                        postalCode: form.postalCode.value
                    },
                    email: form.email.value,
                    phone: form.phone.value
                },
                timeStamp: new Date().toUTCString(),
                delivery: form.delivery.value
            }
        })
        .then(unwrapResult)
        .then(() => {
            alert("Order confirmed!");
            props.history.push("/home");
        })
        .catch((error) => {
            setProcessingOrder(false);
            dataErrorAlert(error);
        });
    };

    if (processingOrder) {
        return <Spinner />;
    }

    const formCmp = Object.keys(form).map((key) => {
        const formItem = form[key];
        let content;

        if (formItem.type === "select") {
            content = (
                <select
                    required={formItem.required}
                    onChange={(event) => updateFormHandler(event, key)}
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
                    ref={formItem.useRef ? inputElementRef : null}
                    required={formItem.required}
                    pattern={formItem.pattern}
                    placeholder={formItem.placeholder}
                    value={formItem.value}
                    onChange={(event) => updateFormHandler(event, key)}
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
            <form onSubmit={placeOrderHandler}>
                {formCmp}
                <div>
                    <p>Price: $<Price>{props.price}</Price></p>
                    <p>GST/HST: $<Price>{fees.tax.GST_HST}</Price></p>
                    <p>PST: $<Price>{fees.tax.PST}</Price></p>
                    <p>Delivery: $<Price>{fees.deliveryFee}</Price></p>
                    <p>Total: $<Price>{fees.finalPrice}</Price></p>
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

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        ingredients: state.burger.ingredients,
        price: state.burger.totalPrice
    };
};

export default withRouter(connect(mapStateToProps)(Contact));