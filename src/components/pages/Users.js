import React, { Component } from 'react';
import ApiRequest from "../../ApiRequest";
import ApiList from "../../ApiList";

import {getUsers} from "../../store/getters/usersGetters";
import {Loader, Table} from 'semantic-ui-react'
import {connect} from "react-redux";

const mapStateToProps = state => ({
    users: getUsers(state),

});

const mapDispatchToProps = dispatch => ({
    setUsers: (payload) => dispatch({ type:'SET_USERS', payload })
});

class Users extends Component {
    constructor(props){
        super(props);

        this.getUsersApi();

        this.state = {
            load: true
        }
    }

    getUsersApi = () => {

        ApiRequest('GET', ApiList.users, {
        }).then((response) => {
            this.props.setUsers(response.data);
            this.setState({load:false})
        });
    };



    render() {
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Login</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.props.users.map( (user, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{ user.login }</Table.Cell>
                                    <Table.Cell>{ user.role }</Table.Cell>
                                    <Table.Cell>{ user.name }</Table.Cell>
                                </Table.Row>
                            ) )
                        }
                    </Table.Body>
                </Table>
                {
                    (()=>{
                        if (this.state.load) {
                            return <Loader active inline='centered' />
                        }
                    })()
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
