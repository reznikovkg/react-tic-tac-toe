import React, { Component } from 'react';

class User extends Component {
    render() {
        return (
            <h1>
                I`m User with id = { this.props.match.params.id }
            </h1>
        );
    }
}

export default User;
