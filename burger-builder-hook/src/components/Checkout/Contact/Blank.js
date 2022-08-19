import React from "react";

import classes from "./Blank.module.css";

const Blank = (props) => {
    return (
        <div className={classes.blank}>
            {props.caption}
            {props.children}
        </div>
    );
};

export default Blank;