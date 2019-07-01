import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import  { connect } from 'react-redux';

import LoginForm from 'components/forms/LoginForm'
import { fetchLogin } from 'store/actions/userActions';
import { getApiReducer } from 'store/selectors/Api';
import RouteList from 'RouteList';
import { history } from 'store/store';

const mapStateToProps = state => ({
    ApiReducer: getApiReducer(state)
});

const mapDispatchToProps = dispatch => ({
    fetchLogin: (payload) => dispatch(fetchLogin(payload)),
});

class Login extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = props;
    }

    submit = values => {
        this.props.fetchLogin(values).then((response)=>{
            history.push(RouteList.homepage.path)
        });
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
