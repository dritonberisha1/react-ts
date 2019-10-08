import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired
    }

    state = {
        title: '',
        body: ''
    }

    componentDidMount() {
        this.setState({ ...this.props });
    }

    switchTitleWithBody = () => {
        this.setState({
            title: this.state.body,
            body: this.state.title
        })
    }

    render() {
        return (
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title text-capitalize">{this.state.title}</h5>
                    <p className="card-text">{this.state.body}</p>
                    <button className="btn btn-primary" onClick={this.switchTitleWithBody}>Update</button>
                </div>
            </div>
        )
    }
}

export default Card;