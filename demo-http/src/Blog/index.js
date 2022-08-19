import axios from "axios";
import React, { Component } from "react";

import FullPost from "./FullPost";
import NewPost from "./NewPost";
import Post from "./Post";

import "./Blog.css";

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        getError: false
    };

    componentDidMount() {
        axios.get("/posts")
            .then((response) => {
                const postsToShow = response.data.slice(0, 4).map((post) => {
                    return {
                        ...post,
                        author: "Harry"
                    };
                });

                this.setState({
                    posts: postsToShow
                });
            })
            .catch(() => {
                this.setState({
                    getError: true
                });
            });
    }

    deletePostHandler = () => {
        axios.delete("/posts/" + this.state.selectedPostId)
            .then(() => {
                const indexToDelete = this.state.posts.findIndex((post) => {
                    return post.id === this.state.selectedPostId;
                });
                if (indexToDelete < 0) {
                    return;
                }
        
                const updatedPosts = [...this.state.posts];
                updatedPosts.splice(indexToDelete, 1);
        
                this.setState({
                    posts: updatedPosts,
                    selectedPostId: null
                });
            })
            .catch(() => {
                alert("Delete fails! Something went wrong.");
            });
    }

    selectPostHandler = (id) => {
        this.setState({
            selectedPostId: id
        });
    };

    render () {
        let posts = <p>Error occurs when fetching posts!</p>;

        if (!this.state.getError) {
            posts = this.state.posts.map((post) => {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clickHandler={() => this.selectPostHandler(post.id)}
                    />
                );
            });
        }
        
        return (
            <div>
                <section className="posts">
                    {posts}
                </section>
                <section>
                    <FullPost
                        id={this.state.selectedPostId}
                        deleteHandler={this.deletePostHandler}
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;