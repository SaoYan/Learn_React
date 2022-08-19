import React, { Component } from "react";
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
class Layout extends Component {
    state = {
        showMenu: false
    };

    openMenu = () => {
        this.setState({
            showMenu: true
        });
    };

    closeMenu = () => {
        this.setState({
            showMenu: false
        });
    };

    logoutHandler = () => {
        this.props.logoutUser();
        this.closeMenu();
    };

    render() {
        return (
            <React.Fragment>
                <AuthenticationContext.Provider
                    value={{
                        isAuthenticated: this.props.isAuthenticated,
                        logoutHandler: this.logoutHandler
                    }}
                >
                    <Toolbar clickMenu={this.openMenu}/>
                    <Sidedrawer
                        display={this.state.showMenu}
                        clickBackdrop={this.closeMenu}
                        clickNavHandler={this.closeMenu}
                    />
                </AuthenticationContext.Provider>
                <main className={classes.body}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
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