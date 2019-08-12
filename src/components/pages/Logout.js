import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import RouteList from 'RouteList';
import { fetchLogout } from 'store/actions/userActions';
import { history } from 'store/store';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    requestLogout: (payload) => dispatch(fetchLogout()),
});

class Logout extends Component{
    constructor(props) {
        super(props);

        this.logout()
    }

    logout = () => {
        this.props.requestLogout().then((response) => {
            history.push(RouteList.login.path);
        });
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
