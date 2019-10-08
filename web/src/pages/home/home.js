import React, { Component, Fragment } from 'react';
import postService from '../../services/post-service';
import Card from './_card';

const PAGE_SIZE = 20;
class Home extends Component {

    state = {
        posts: [],
        numberOfPosts: PAGE_SIZE
    }
    componentDidMount() {
        postService.fetchPosts()
            .then(results => {
                this.setState({ posts: results });
            });
    }

    loadMore = () => {
        this.setState({
            numberOfPosts: this.state.numberOfPosts + PAGE_SIZE
        });
    }

    render() {
        return (
            <div className="d-flex flex-wrap justify-content-center">
                {this.state.posts.map((post, index) => (
                    <Fragment key={post.id}>
                        {index < this.state.numberOfPosts && (
                            <div className="col-6 p-3">
                                <Card {...post} />
                            </div>
                        )}
                    </Fragment>
                ))}
                {this.state.numberOfPosts < this.state.posts.length && (
                    <button className="btn btn-secondary" onClick={this.loadMore}>Load More</button>
                )}
            </div>
        );
    }
}

export default Home;