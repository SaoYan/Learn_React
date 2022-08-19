import React from "react";

import Logo from "../Logo";
import Navigation from "../Navigation";

import classes from "./Toolbar.module.css";

const Toolbar = (props) => {
    return (
        <header className={classes.toolbar}>
            <div
                className={classes.menuButton}
                onClick={props.clickMenu}
            >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={classes.logo}>
                <Logo />
            </div>
            <nav className={classes.desktopOnly}>
                <Navigation />
            </nav>
        </header>
    );
};

export default Toolbar;