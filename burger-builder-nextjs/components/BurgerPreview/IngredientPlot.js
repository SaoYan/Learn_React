import React from "react";
import PropTypes from "prop-types";

import classes from "./IngredientPlot.module.css";

/**
 * The visualization of each type of ingredient.
 */
const IngredientPlot= (props) => {
    let plot;
    switch (props.type) {
        case ("bread-top"):
            plot = (
                <div className={classes.breadTop}>
                    <div className={classes.seeds1}></div>
                    <div className={classes.seeds2}></div>
                </div>
            )
            break;
        case ("bread-bottom"):
            plot = <div className={classes.breadBottom}></div>;
            break;
        case ("meat"):
            plot = <div className={classes.meat}></div>;
            break;
        case ("cheese"):
            plot = <div className={classes.cheese}></div>;
            break;
        case ("salad"):
            plot = <div className={classes.salad}></div>;
            break;
        case ("bacon"):
            plot = <div className={classes.bacon}></div>;
            break;
        default:
            break;
    }

    return plot;
};

IngredientPlot.propTypes = {
    type: PropTypes.oneOf([
        "bread-top",
        "bread-bottom",
        "meat",
        "cheese",
        "salad",
        "bacon"
    ]).isRequired
};

export default IngredientPlot;