/* global location */
/* eslint no-restricted-globals: ["off", "history"] */

import React, { Component } from 'react';

class Route extends Component {

    toView = () => {
        if (this.props.path === this.props.pathApp) {
            return this.props.component()
        } else {
            return ''
        }
    };

    render() {
        return (
            <div>
                { this.toView() }
            </div>
        );
    }
}

export default Route;
