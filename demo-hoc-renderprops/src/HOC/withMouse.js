import React, { Component } from "react";

import Mouse from "../Mouse";

const withMouse = (WrappedComponent) => {
    return class extends Component {
        static displayName = `withMouse(
            ${WrappedComponent.displayName || WrappedComponent.name || 'Component'}
        )`;

        render() {
            return (
                <Mouse
                    render={mouseLoc => <WrappedComponent {...this.props} mouseLoc={mouseLoc} />}
                />
            );
        }
    }
};

export default withMouse;