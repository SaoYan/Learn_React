import React, { Component } from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

import Posts from "./Posts";
import withCodeSplitting from "../HOC/withCodeSplitting";

import "./Blog.css";

const NewPost = withCodeSplitting(() => {
    return import("./NewPost");
});

class Blog extends Component {
    render () {
        return (
            <div className="blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/posts">Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to="/new-post">New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Redirect
                        exact
                        from="/"
                        to="/posts"
                    />
                    <Route
                        path="/posts"
                        component={Posts}
                    />
                    <Route 
                        path="/new-post"
                        component={NewPost}
                    />
                    <Route
                        render={() => <h1>404</h1>}
                    />
                </Switch>
                
            </div>
        );
    }
}

export default Blog;