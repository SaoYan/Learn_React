import React from "react";

import classes from "./FormItem.module.css";

/**
 * The basic element for contructing <form>.  
 */
const FormItem = (props) => {
    return (
        <div className={classes.formItem}>
            {props.caption}
            {props.children}
        </div>
    );
};

export default FormItem;