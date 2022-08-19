import React from "react";
import Link from "next/link";

import classes from "./NavigationItem.module.css";

const NavigationItem = (props) => {
    return (
        <li className={classes.item}>
            <Link href={props.to}>
                <a onClick={props.clickNavHandler}>
                    {props.children}
                </a>
            </Link>
            {/* <NavLink
                exact={props.exact}
                to={props.to}
                activeClassName={classes.active}
                onClick={props.clickNavHandler}
            >
                {props.children}
            </NavLink> */}
        </li>
    );
};

export default NavigationItem;