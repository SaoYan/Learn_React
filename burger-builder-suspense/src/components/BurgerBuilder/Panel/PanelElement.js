import React from "react";

import classes from "./PanelElement.module.css";

/**
 * The basic building block of the control panel.
 */
const PanelElement = (props) => {
    return (
        <div className={classes.panelElement}>
            <div className={classes.label}>
                {`${props.label} x${props.num}`}
            </div>
            <button
                className={classes.more}
                onClick={props.addIngredientHandler}
            >
                +
            </button>
            <button
                className={classes.less}
                disabled={props.disabled}
                onClick={props.removeIngredientHandler}
            >
                -
            </button>
        </div>
    );
};

export default PanelElement;