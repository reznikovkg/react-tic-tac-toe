import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

import RouteList from './../RouteList';

class App extends Component {

    navDefault = ( route ) => {
        if (route.toNav) {
            return <Link to={ route.path } key={ route.path }>
                <div>
                    { route.title }
                </div>
            </Link>
        }
    };

    routeDefault = ( route ) => {
        return <Route exact path={ route.path } key={ route.path } component={ route.component }/>
    };

    render() {
        return (
            <div className="App">
                <nav>
                    {
                        Object.values(RouteList).map( this.navDefault )
                    }
                </nav>
                <hr/>
                {
                    Object.values(RouteList).map( this.routeDefault )
                }
                <hr/>
                Пользователи:
                <ul>
                    <li>
                        <Link to={ RouteList.user.pathWithParams(1) }>{ RouteList.user.titleWithParams(1) }</Link>
                    </li>
                    <li>
                        <Link to={ RouteList.user.pathWithParams(2) }>{ RouteList.user.titleWithParams(2) }</Link>
                    </li>
                    <li>
                        <Link to={ RouteList.user.pathWithParams(3) }>{ RouteList.user.titleWithParams(3) }</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default App;
