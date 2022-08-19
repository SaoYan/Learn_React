import axios from "axios";
import React, { Component } from "react";

import "./FullPost.css";

class FullPost extends Component {
    state = {
        loadedPost: null,
        getError: false
    };

    componentDidMount() {
        this.loadPost();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadPost();
        }
    }

    deletePostHandler = () => {
        axios.delete("/posts/" + this.props.match.params.id)
            .then(() => {
                this.props.history.replace("/dumy");
                this.props.history.replace("/posts");
                alert("Post deleted.");
            })
            .catch(() => {
                alert("Delete fails! Something went wrong.");
            });
    }

    loadPost = () => {
        axios.get("/posts/" + this.props.match.params.id)
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

    render () {
        if (this.state.getError) {
            return (
                <div className="fullPost" style={{textAlign: "left"}}>
                    <p>Error occurs when loading the content of the selected post!</p>
                </div>
            );
        }

        let post = <p className="fullPost">Loading...</p>;
        if (this.state.loadedPost) {
            post = (
                <div className="fullPost">
                    <h3>{this.state.loadedPost.title}</h3>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="edit">
                        <button onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }

        return post;
    }
};

export default FullPost;