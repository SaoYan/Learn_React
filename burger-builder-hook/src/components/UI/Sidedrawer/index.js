import React from "react";

import Backdrop from "../Backdrop";
import Logo from "../Logo";
import Navigation from "../Navigation";

import classes from "./Sidedrawer.module.css";

const Sidedrawer = (props) => {
    const className = [
        classes.sidedrawer,
        props.display ? classes.open : classes.close
    ].join(" ");

    return (
        <React.Fragment>
            <Backdrop
                display={props.display}
                clicked={props.clickBackdrop}
            />
            <div className={className}>
                <div className={classes.logo}>
                    <Logo />
                </div>
                <nav>
                    <Navigation clickNavHandler={props.clickNavHandler} />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default Sidedrawer;