import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import  { connect } from 'react-redux';

import LoginForm from './../forms/LoginForm'

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
    setApiMessage: (payload) => dispatch({ type:'SET_API_MESSAGE', payload }),
    removeApiMessage: (payload) => dispatch({ type:'REMOVE_API_MESSAGE', payload }),
    sendRequest: (payload) => dispatch({ type:'SENT_REQUEST', payload }),
    receivedResponse: (payload) => dispatch({ type:'RECEIVED_RESPONSE', payload }),
    pushRouter
});



class Login extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = props;
    }

    submit = values => {
        this.props.sendRequest();

        ApiRequest('POST', ApiList.login, {
            login: values.username,
            password: values.password
        }).then((response) => {
            Cookies.set('user_name', response.data.name, 30);
            this.props.removeApiMessage();
            this.props.receivedResponse();
            this.props.setUser(response.data);
            history.push(RouteList.homepage.path);

        }).catch((errorMessage)=> {
            this.props.receivedResponse();
            this.props.setApiMessage(errorMessage);
        })
    };

    render() {
        return (
            <div>
                <LoginForm
                    onSubmit={this.submit}
                    disabled={ this.props.ApiReducer.waitResponse }
                    message={this.props.ApiReducer.message}/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
