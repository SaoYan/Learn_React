import axios from "axios";
import React, { Component } from "react";

import "./FullPost.css";

class FullPost extends Component {
    state = {
        loadedPost: null,
        getError: false
    };

    componentDidUpdate(prevProps) {
        if (this.props.id && this.props.id !== prevProps.id) {
            axios.get("/posts/" + this.props.id)
                .then((response) => {
                    this.setState({
                        loadedPost: response.data
                    });
                })
                .catch(() => {
                    this.setState({
                        getError: true
                    });
                });
        }
    }

    render () {
        if (this.state.getError) {
            return (
                <div className="fullPost" style={{textAlign: "left"}}>
                    <p>Error occurs when loading the content of the selected post!</p>
                </div>
            );
        }

        let post = <p className="fullPost">Please select a post above.</p>;
        if (this.props.id) {
            if (this.state.loadedPost) {
                post = (
                    <div className="fullPost">
                        <h3>{this.state.loadedPost.title}</h3>
                        <p>{this.state.loadedPost.body}</p>
                        <div className="edit">
                            <button onClick={this.props.deleteHandler}>Delete</button>
                        </div>
                    </div>
                );
            } else {
                post = <p className="fullPost">Loading...</p>;
            }
        }

        return post;
    }
};

export default FullPost;