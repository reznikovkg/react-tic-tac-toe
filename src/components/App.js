import React, { Component } from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import RouteList from 'RouteList';

import  { connect } from 'react-redux';

import { getUser } from 'store/selectors/user';
import { getRouter } from 'store/selectors/router';
import { getRouteTo } from 'store/selectors/Api';


import { Menu } from 'semantic-ui-react';

import { fetchMe } from 'store/actions/userActions';
import { setRoute } from 'store/actions/ApiActions';

import {history} from "store/store";

const mapStateToProps = state => ({
    user: getUser(state),
    router: getRouter(state),
    routeTo: getRouteTo(state)
});

const mapDispatchToProps = dispatch => ({
    setRoute: (payload) => dispatch(setRoute(payload)),
    fetchMe: (payload) => dispatch(fetchMe())
});

class App extends Component {
    constructor(props) {
        super(props);
        this.checkUser();
    }

    checkUser = () => {
        this.props.fetchMe().then((response)=>{
            history.push(this.props.routeTo);
        });
    };

    routeDefault = ( route ) =>
        <Route exact path={ route.path } key={ route.path } render={() => {
            if (this.props.user) {
                if (this.props.router.location.pathname === RouteList.login.path) {
                    return <Redirect to={RouteList.homepage.path}/>
                }
                return <route.component/>
            } else {
                if (route.auth) {
                    this.props.setRoute(this.props.router.location.pathname);
                    return <Redirect to={RouteList.login.path}/>
                }
                return <route.component/>
            }
        }}/>;

    render() {
        return (
            <div className="App">
                <Menu inverted>
                    {
                        Object.values(RouteList).map( (t)=> {
                            const link = <Link to={t.path} key={t.path}>
                                <Menu.Item name={t.title}
                                           active={t.path === this.props.router.location.pathname}/>
                            </Link>

                            switch (t.role) {
                                case "admin":
                                    if (this.props.user && this.props.user.role === 'admin') {
                                        return link;
                                    } else {
                                        return '';
                                    }
                                case "user":
                                    if (this.props.user && (this.props.user.role === 'user' || this.props.user.role === 'admin')) {
                                        return link;
                                    } else {
                                        return '';
                                    }
                                case "nouser":
                                    if (!this.props.user) {
                                        return link;
                                    } else {
                                        return '';
                                    }
                                default:
                                    return '';
                            }
                        })
                    }
                </Menu>
                <Switch>
                {
                    Object.values(RouteList).map( this.routeDefault )
                }
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
