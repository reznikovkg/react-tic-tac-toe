import React, { Component } from 'react';
import {Table, Icon, Loader} from 'semantic-ui-react'
import {connect} from "react-redux";

import {getUserRole} from "store/selectors/user";
import Todo from 'components/forms/TodoForm';
import { requestTodos, loadTodoForm, saveTodos, newTodo, removeTodo } from 'store/actions/todosActions';

import {
    getTodos,
    adminTodoSelector,
    getLoad,
    getId
} from "store/selectors/todos";

const mapStateToProps = state => ({
    todos: getTodos(state),
    todosAdmin: adminTodoSelector(state),
    userRole: getUserRole(state),
    load: getLoad(state),
    id: getId(state)
});

const mapDispatchToProps = dispatch => ({
    requestTodos: (payload) => dispatch(requestTodos(payload)),
    loadTodoForm: (payload) => dispatch(loadTodoForm(payload)),
    saveTodo: (payload) => dispatch(saveTodos(payload)),
    newTodo: (payload) => dispatch(newTodo(payload)),
    removeTodo: (payload) => dispatch(removeTodo(payload)),

});

class Todos extends Component {
    constructor(props){
        super(props);

        this.getTodosApi();
    }

    getTodosApi = () => {
        this.props.requestTodos();
    };

    loadToForm = (values,id) => {
        this.props.loadTodoForm({values, id});
    };

    sendTodo = (values) => {
        if (this.props.id) {
            this.props.saveTodo({values, id: this.props.id});
        } else {
            this.props.newTodo(values);
        }
    };

    removeTodo = (id) => {
        this.props.removeTodo(id);
    };

    render() {
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>User</Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                            <Table.HeaderCell>Remove</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.props.todos.map( (todo, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{ todo.createdBy }</Table.Cell>
                                    <Table.Cell>{ todo.title }</Table.Cell>
                                    <Table.Cell>{ todo.description }</Table.Cell>
                                    {
                                        (()=>{
                                            if (this.props.userRole === todo.createdBy || this.props.userRole === 'admin') {
                                                return <Table.Cell warning style={{cursor:'pointer'}} onClick={()=>{
                                                    this.loadToForm({title: todo.title, description: todo.description}, todo.id);
                                                }}>
                                                    <Icon name='edit' />
                                                    Edit
                                                </Table.Cell>
                                            } else {
                                                return <Table.Cell></Table.Cell>
                                            }
                                        })()
                                    }
                                    {
                                        (()=>{
                                            if (this.props.userRole === todo.createdBy || this.props.userRole === 'admin') {
                                                return <Table.Cell error style={{cursor:'pointer'}} onClick={()=>{this.removeTodo(todo.id);}}>
                                                    <Icon name='close' />
                                                    Remove
                                                </Table.Cell>
                                            } else {
                                                return <Table.Cell></Table.Cell>
                                            }
                                        })()
                                    }
                                </Table.Row>
                            ) )
                        }
                    </Table.Body>
                </Table>
                <Todo
                    onSubmit={this.sendTodo}
                    disabled={ this.props.load }
                />
                {
                    (()=>{
                        if (this.props.load) {
                            return <Loader active inline='centered' />
                        }
                    })()
                }


                <h2>ADMIN TODOS</h2>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                            <Table.HeaderCell>Remove</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.props.todosAdmin.map( (todo, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{ todo.title }</Table.Cell>
                                    <Table.Cell>{ todo.description }</Table.Cell>
                                    {
                                        (()=>{
                                            if (this.props.userRole === todo.createdBy || this.props.userRole === 'admin') {
                                                return <Table.Cell warning style={{cursor:'pointer'}} onClick={()=>{
                                                    this.loadToForm({title: todo.title, description: todo.description}, todo.id);
                                                }}>
                                                    <Icon name='edit' />
                                                    Edit
                                                </Table.Cell>
                                            } else {
                                                return <Table.Cell></Table.Cell>
                                            }
                                        })()
                                    }
                                    {
                                        (()=>{
                                            if (this.props.userRole === todo.createdBy || this.props.userRole === 'admin') {
                                                return <Table.Cell error style={{cursor:'pointer'}} onClick={()=>{this.removeTodo(todo.id);}}>
                                                    <Icon name='close' />
                                                    Remove
                                                </Table.Cell>
                                            } else {
                                                return <Table.Cell></Table.Cell>
                                            }
                                        })()
                                    }
                                </Table.Row>
                            ) )
                        }
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
