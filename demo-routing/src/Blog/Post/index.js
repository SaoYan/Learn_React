import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "./Post.css";

const Post = (props) => {
    return (
        <article className="post" onClick={props.clickHandler}>
            <h1>{props.title}</h1>
            <div className="info">
                <div className="author">{props.author}</div>
            </div>
        </article>
    );
};

Post.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    clickHandler: PropTypes.func
};

export default withRouter(Post);