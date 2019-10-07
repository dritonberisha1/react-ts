import React, { Component } from 'react';
import postService from '../services/post-service';

class Home extends Component {

    state = {
        posts: []
    }
    componentDidMount() {
        postService.fetchPosts()
            .then(results => {
                console.log("RESULTS", results);
                this.setState({ posts: results });
            });
    }
    render() {
        return (
            <div className="d-flex flex-wrap">
                {this.state.posts.map((post, index) => (
                    <div className="col-6" key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Home;