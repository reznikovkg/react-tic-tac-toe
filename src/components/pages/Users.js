import React, { Component } from 'react';

import { getUsers, getLoad} from "store/selectors/users";
import {Loader, Table} from 'semantic-ui-react'
import {connect} from "react-redux";
import { requestUsers } from 'store/actions/usersActions';

const mapStateToProps = state => ({
    users: getUsers(state),
    load: getLoad(state)
});

const mapDispatchToProps = dispatch => ({
    requestUsers: (payload) => dispatch(requestUsers())
});

class Users extends Component {
    constructor(props){
        super(props);

        this.getUsers();
    }

    getUsers = () => {
        this.props.requestUsers();
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
                        if (this.props.load) {
                            return <Loader active inline='centered' />
                        }
                    })()
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
