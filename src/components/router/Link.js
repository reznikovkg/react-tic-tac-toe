/* global location */
/* eslint no-restricted-globals: ["off", "history"] */

import React, { Component } from 'react';

class Link extends Component {
    render() {
        return (
            <a
                href={ this.props.href }
                onClick={ event => {
                    event.preventDefault();
                    history.pushState(null, '',  this.props.href);
                    this.props.toRoute(this.props.href);
                }}
            >
                <div>
                    { this.props.children }
                </div>
            </a>
        );
    }
}

export default Link;
