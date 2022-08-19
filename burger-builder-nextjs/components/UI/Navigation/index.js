import React from "react";

import { AuthenticationContext } from "../Layout";
import NavigationItem from "./NavigationItem";

import classes from "./Navigation.module.css";

const Navigation = (props) => {
    return (
        <ul className={classes.navigation}>
            <NavigationItem
                to="/builder"
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
            <AuthenticationContext.Consumer>
                {(context) => {
                    if(context.isAuthenticated) {
                        return (
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
                    return null;
                }}
            </AuthenticationContext.Consumer>
        </ul>
    );
};

export default Navigation;