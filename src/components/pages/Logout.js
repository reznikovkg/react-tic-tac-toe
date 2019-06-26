import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import  { connect } from 'react-redux';

import ApiList from '../../ApiList';
import ApiRequest from './../../ApiRequest';
import { getUser } from '../../store/getters/userGetters';
import { getApiReducer } from '../../store/getters/ApiGetters';
import { getRouter } from "../../store/getters/routerGetters";
import { push as pushRouter } from 'connected-react-router';
import RouteList from '../../RouteList';
import Cookies from 'js-cookie';


import { history } from './../../store/store';

const mapStateToProps = state => ({
    user: getUser(state),
    ApiReducer: getApiReducer(state),
    router: getRouter(state)
});

const mapDispatchToProps = dispatch => ({
    setUser: (payload) => dispatch({ type:'SET_USER', payload }),
    removeUser: (payload) => dispatch({ type:'REMOVE_USER', payload }),
    setApiMessage: (payload) => dispatch({ type:'SET_API_MESSAGE', payload }),
    removeApiMessage: (payload) => dispatch({ type:'REMOVE_API_MESSAGE', payload }),
    sendRequest: (payload) => dispatch({ type:'SENT_REQUEST', payload }),
    receivedResponse: (payload) => dispatch({ type:'RECEIVED_RESPONSE', payload }),
    pushRouter
});



class Logout extends Component{
    constructor(props) {
        super(props);

        this.logout()
    }

    logout = () => {
        this.props.sendRequest();

        ApiRequest('POST', ApiList.logout, {
        }).then((response) => {
            Cookies.remove('user_name');
            history.push(RouteList.login.path);
            this.props.removeUser();
            this.props.receivedResponse();
        }).catch((errorMessage)=> {
            this.props.setApiMessage(errorMessage);
        })
    };

    render() {

        return (
            <div>
                Logout
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
