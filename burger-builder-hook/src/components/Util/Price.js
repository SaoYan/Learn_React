import React from "react";
import PropTypes from "prop-types";

const Price = (props) => {  
    return <strong>{props.children.toFixed(2)}</strong>
};

Price.propTypes = {
    children: PropTypes.number.isRequired
};

export default Price;