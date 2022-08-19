import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./NewPost.css";

class NewPost extends Component {
    state = {
        title: "",
        content: "",
        author: "Harry",
        submitted: false
    }

    newPostHandler = () => {
        if (this.state.title === "" || this.state.content === "" || this.state.author === "") {
            alert("Please fill in all blanks!");
            return;
        }

        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };

        axios.post("/posts", post)
            .then(() => {
                alert("Post succeed!");

                this.setState({
                    title: "",
                    content: "",
                    author: "Harry",
                    submitted: true
                });
            })
            .catch(() => {
                alert("Post fails!");
            });
    };

    render () {
        let newPost = (
            <div className="newPost">
                <h3>Add a Post</h3>
                <label>Title</label>
                <input
                    type="text"
                    value={this.state.title}
                    onChange={(event) => this.setState({title: event.target.value})}
                />
                <label>Content</label>
                <textarea
                    rows="4"
                    value={this.state.content}
                    onChange={(event) => this.setState({content: event.target.value})}
                />
                <label>Author</label>
                <select
                    value={this.state.author}
                    onChange={(event) => this.setState({author: event.target.value})}
                >
                    <option value="Harry">Harry</option>
                    <option value="Tom">Tom</option>
                </select>
                <button onClick={this.newPostHandler}>Add Post</button>
            </div>
        );

        if (this.state.submitted) {
            newPost = <Redirect push to="/posts"/>;
        }

        return newPost;
    }
}

export default NewPost;