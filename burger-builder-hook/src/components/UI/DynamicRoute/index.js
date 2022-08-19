import React from "react";
import { Redirect, Route } from "react-router-dom";

/**
 * Route or Redirect depending on the `redirect` prop.  
 * 
 * @param props 
 * `redirect`: boolean value, redirect or not  
 * `exact`: the same as the `exact` prop in <Route> or <Redirect>  
 * `path`: the route path; if `redirect` is true, redirect from this path  
 * `component`: the component that is mounted when not redirect  
 * `alt`: the redirected destination path   
 */
const DynamicRoute = (props) => {
    if (props.redirect) {
        return (
            <Redirect
                exact={props.exact}
                from={props.path}
                to={props.alt}
            />
        );
    } else {
        return (
            <Route
                exact={props.exact}
                path={props.path}
                component={props.component}
            />
        );
    }
};

export default DynamicRoute;