import axios from "axios";
import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import FullPost from "../FullPost";
import Post from "../Post";

import "./Posts.css";

class Posts extends Component {
    state = {
        posts: [],
        loading: true,
        getError: false,
        selected: null
    };

    componentDidMount() {
        axios.get("/posts")
            .then((response) => {
                const postsToShow = response.data.slice(0, 8).map((post) => {
                    return {
                        ...post,
                        author: "Harry"
                    };
                });

                this.setState({
                    posts: postsToShow,
                    loading: false
                });
            })
            .catch(() => {
                this.setState({
                    getError: true
                });
            });
    }

    render() {
        if (this.state.getError) {
            return <p>Error occurs when fetching posts!</p>;
        }

        let posts = <p>Loading...</p>;
        if (!this.state.loading) {
            posts = this.state.posts.map((post) => {
                return (
                    <Link
                        key={post.id}
                        to={this.props.match.url + "/" + post.id}
                    >
                        <Post
                            title={post.title}
                            author={post.author}
                        />
                    </Link>
                );
            });
        }

        return (
            <section className="posts">
                {posts}
                <Route
                    path={this.props.match.path + "/:id"}
                    component={FullPost}
                />
            </section>
        );
    }
}

export default Posts;