import React from "react";
import PropTypes from "prop-types";

import Backdrop from "../Backdrop";

import classes from "./Modal.module.css";

const Modal = (props) => {
    const className = [
        classes.modal,
        props.transparent ? classes.transparent : classes.color,
        props.animation ? classes.animation : "",
        props.display ? classes.open : classes.close
    ].join(" ");

    return (
        <React.Fragment>
            <Backdrop
                display={props.display}
                clicked={props.clickBackdrop}
            />
            <div className={className}>
                {props.children}
            </div>
        </React.Fragment>
    );
};

Modal.propTypes = {
    transparent: PropTypes.bool,
    animation: PropTypes.bool,
    display: PropTypes.bool,
    clickBackdrop: PropTypes.func
};

export default React.memo(Modal, (prevProps, nextProps) => {
    return (prevProps.display === nextProps.display) &&
        (prevProps.children === nextProps.children);
});