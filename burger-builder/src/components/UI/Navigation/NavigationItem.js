import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const NavigationItem = (props) => {
    return (
        <li className={classes.item}>
            <NavLink
                exact={props.exact}
                to={props.to}
                activeClassName={classes.active}
                onClick={props.clickNavHandler}
            >
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavigationItem;