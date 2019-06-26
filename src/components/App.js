import React, { Component } from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import RouteList from './../RouteList';

import  { connect } from 'react-redux';

import { getUser } from './../store/getters/userGetters';
import { getRouter } from './../store/getters/routerGetters';


import { Menu } from 'semantic-ui-react';
import Cookies from "js-cookie";
import ApiRequest from "../ApiRequest";
import ApiList from "../ApiList";
import {history} from "../store/store";

const mapStateToProps = state => ({
    user: getUser(state),
    router: getRouter(state)
});

const mapDispatchToProps = dispatch => ({
    setUser: (payload) => dispatch({ type:'SET_USER', payload }),
    sendRequest: (payload) => dispatch({ type:'SENT_REQUEST', payload }),
    receivedResponse: (payload) => dispatch({ type:'RECEIVED_RESPONSE', payload }),
});

class App extends Component {
    constructor(props) {
        super(props);
        this.checkUser();
    }

    checkUser = () => {

        let username = Cookies.get('user_name');

        if (username) {
            this.props.sendRequest();

            ApiRequest('GET', ApiList.me).then((response) => {
                Cookies.set('user_name', response.data.name, 30);
                this.props.receivedResponse();
                this.props.setUser(response.data);
                history.push(RouteList.homepage.path);
                console.log('ok')

            }).catch((errorMessage)=> {
                if (errorMessage !== 'Internal Server Error') {
                    Cookies.remove('user_name');
                }
                this.props.receivedResponse();
                console.log(errorMessage);
            })
        }
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
