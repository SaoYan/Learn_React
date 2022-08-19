import React from "react";
import PropTypes from "prop-types";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
    return (
        props.display ?
        <div className={classes.backdrop} onClick={props.clicked}></div> :
        null
    )
};

Backdrop.propTypes = {
    display: PropTypes.bool
};

Backdrop.defaultProps = {
    display: false
};

export default Backdrop;