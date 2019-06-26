import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import userReducer from './userReducer';
import ApiReducer from './ApiReducer';
import todosReducer from './todosReducer';
import usersReducer from './usersReducer';

import { connectRouter } from 'connected-react-router';

export default (history) =>  combineReducers({
    router: connectRouter(history),
    userReducer,
    ApiReducer,
    todosReducer,
    usersReducer,

    form: form.plugin({
        todos: (state, action) => {
            switch(action.type) {
                case 'CLEAR_FORM':
                    return { ...state, values : { title: '', description: ''} };
                case 'CLEAR_ERRORS':
                    return { ...state, syncErrors: {} };
                case 'LOAD_FORM':
                    return { ...state, values : { title: action.payload.title, description: action.payload.description} };
                default:
                    return state;
            }
        }
    })

});