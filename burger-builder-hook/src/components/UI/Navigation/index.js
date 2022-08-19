import React, { useContext } from "react";

import { AuthenticationContext } from "../Layout";
import NavigationItem from "./NavigationItem";

import classes from "./Navigation.module.css";

const Navigation = (props) => {
    const context = useContext(AuthenticationContext);
    
    let logoutBtn = null;
    if (context.isAuthenticated) {
        logoutBtn = (
            <div
                className={classes.logoutBtn}
                onClick={context.logoutHandler}
            >
                <div className={classes.rect} />
                <div className={classes.arrowright} />
                <div className={classes.arrowright} />
                <div className={classes.logout}>Logout</div>
            </div>
        );
    }

    return (
        <ul className={classes.navigation}>
            <NavigationItem
                to="/home"
                clickNavHandler={props.clickNavHandler}
            >
                Home
            </NavigationItem>
            <NavigationItem
                to="/orders"
                clickNavHandler={props.clickNavHandler}
            >
                Orders
            </NavigationItem>
            {logoutBtn}
        </ul>
    );
};

export default Navigation;