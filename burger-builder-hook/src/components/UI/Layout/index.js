import React, { useState } from "react";
import { connect } from "react-redux";

import Toolbar from "../Toolbar";
import Sidedrawer from "../Sidedrawer";

import { logoutUser } from "../../../redux/actions";

import classes from "./Layout.module.css"

const AuthenticationContext = React.createContext({
    isAuthenticated: false
});
AuthenticationContext.displayName = "AuthenticationContext";

/**
 * The "main" component defining the framework of the APP, containing a toolbar, a sidedrawer, and the body.  
 */
const Layout = (props) => {
    /**
     * state hook
     */
    const [showMenu, setShowMenu] = useState(false);

    const logoutHandler = () => {
        props.logoutUser();
        setShowMenu(false);
    };

    return (
        <React.Fragment>
            <AuthenticationContext.Provider
                value={{
                    isAuthenticated: props.isAuthenticated,
                    logoutHandler: logoutHandler
                }}
            >
                <Toolbar clickMenu={() => setShowMenu(true)}/>
                <Sidedrawer
                    display={showMenu}
                    clickBackdrop={() => setShowMenu(false)}
                    clickNavHandler={() => setShowMenu(false)}
                />
            </AuthenticationContext.Provider>
            <main className={classes.body}>
                {props.children}
            </main>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = {
    logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

export { AuthenticationContext };