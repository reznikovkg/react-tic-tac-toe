/* global location */
/* eslint no-restricted-globals: ["off", "history"] */


import React, { Component } from 'react';

import RouteList from './../RouteList';

import Link from './router/Link';
import Route from './router/Route';


class App extends Component {
    constructor(props) {
        super(props);

        window.addEventListener('popstate', event => {
            this.setState({
                path: window.location.pathname
            });
        }, true);

        this.state = {
            path: window.location.pathname
        };
    }

    toRoute = (path) => {
        this.setState({
            path: path
        })
    };

    navDefault = ( route ) => {
        if (route.toNav) {
            return <Link href={ route.path } key={ route.path } children={ route.title } toRoute={ this.toRoute }/>
        }
    };

    routeDefault = ( route ) => {
        return <Route path={ route.path } key={ route.path } component={ route.component } pathApp={ this.state.path }/>
    };

    render() {
        return (
            <div className="App">
                <span>route: { this.state.path }</span>

                <nav>
                    {
                        Object.values(RouteList).map( this.navDefault )
                    }
                </nav>
                <hr/>
                {
                    Object.values(RouteList).map( this.routeDefault )
                }
            </div>
        );
    }
}

export default App;
