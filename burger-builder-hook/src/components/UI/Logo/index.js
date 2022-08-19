import React from "react";

import logo from "../../../assets/images/logo.png";

import classes from "./Logo.module.css";

const Logo = () => {
    return (
        <div className={classes.logo}>
            <img alt="logo" src={logo}/>
        </div>
    );
};

export default Logo;