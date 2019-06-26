import React, { Component } from 'react';
import ApiRequest from "../../ApiRequest";
import ApiList from "../../ApiList";

import {getTodos} from "../../store/getters/todosGetters";
import {Table, Icon, Loader} from 'semantic-ui-react'

import {connect} from "react-redux";

import Todo from '../forms/TodoForm';

import { adminTodoSelector } from './../../selectors';

const mapStateToProps = state => ({
    todos: getTodos(state),
    todosAdmin: adminTodoSelector(state)

});

const mapDispatchToProps = dispatch => ({
    setTodos: (payload) => dispatch({ type:'SET_TODOS', payload }),
    removeTodos: (payload) => dispatch({ type:'REMOVE_TODOS', payload }),
    clearTodoForm: (payload) => dispatch({type:'CLEAR_FORM', payload}),
    clearTodoFormErrors: (payload) => dispatch({type:'CLEAR_ERRORS', payload}),
    loadTodoForm: (payload) => dispatch({type:'LOAD_FORM', payload})
});

class Todos extends Component {
    constructor(props){
        super(props);

        this.state = {
            load: true,
            id: null
        };

        this.getTodosApi(false);
    }

    getTodosApi = (load = true) => {
        if (load) {
            this.setState({load});
            this.props.removeTodos();
        }
        ApiRequest('GET', ApiList.todos, {
        }).then((response) => {
            this.props.setTodos(response.data);
            this.setState({load:false})
        }).catch(()=>{
            this.setState({load:false});
        });
    };

    removeTodo = (id) => {
        this.setState({load:true});
        ApiRequest('DELETE', `${ApiList.todos}/${ id}`, {
        }).then((response) => {
            this.getTodosApi();
            this.setState({load:false});
        }).catch(()=>{
            this.setState({load:false});
        });
    };

    sendTodo = (values) => {
        this.setState({load:true});
        if (this.state.id) {
            ApiRequest('PUT', `${ApiList.todos}/${this.state.id}`, values).then((response) => {
                this.props.clearTodoForm();
                this.props.clearTodoFormErrors();
                this.setState({id: null,load:false});
                this.getTodosApi();
            }).catch(()=>{
                this.setState({load:false});
            });
        } else {
            ApiRequest('POST', `${ApiList.todos}`, values).then((response) => {
                this.props.clearTodoForm();
                this.props.clearTodoFormErrors();
                this.setState({load:false});
                this.getTodosApi();
            }).catch(()=>{
                this.setState({load:false});
            });
        }
    };

    loadToForm = (values,id) => {
        this.setState({id});
        this.props.loadTodoForm(values);
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
                                    <Table.Cell warning style={{cursor:'pointer'}} onClick={()=>{
                                        this.loadToForm({title: todo.title, description: todo.description}, todo.id);
                                    }}>
                                        <Icon name='edit' />
                                        Edit
                                    </Table.Cell>
                                    <Table.Cell error style={{cursor:'pointer'}} onClick={()=>{this.removeTodo(todo.id);}}>
                                        <Icon name='close' />
                                        Remove
                                    </Table.Cell>
                                </Table.Row>
                            ) )
                        }
                    </Table.Body>
                </Table>
                <Todo
                    onSubmit={this.sendTodo}
                    disabled={ this.state.load }
                />
                {
                    (()=>{
                        if (this.state.load) {
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
                                    <Table.Cell warning style={{cursor:'pointer'}} onClick={()=>{
                                        this.loadToForm({title: todo.title, description: todo.description}, todo.id);
                                    }}>
                                        <Icon name='edit' />
                                        Edit
                                    </Table.Cell>
                                    <Table.Cell error style={{cursor:'pointer'}} onClick={()=>{this.removeTodo(todo.id);}}>
                                        <Icon name='close' />
                                        Remove
                                    </Table.Cell>
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
