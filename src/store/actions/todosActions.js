import ApiRequest from "../../ApiRequest";
import ApiList from "../../ApiList";



export const requestTodos = payload => dispatch => {
    dispatch({ type:'REMOVE_TODOS'});
    dispatch({type:'CLEAR_FORM'});
    dispatch({type:'CLEAR_ERRORS'});

    dispatch({ type: 'FETCH_TODOS'});

    return ApiRequest('GET', ApiList.todos, {
    }).then((response) => {
        dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: response.data });
    }).catch((errorMessage) => {
        dispatch({ type: 'FETCH_TODOS_ERROR', payload: errorMessage });
    });
};

export const loadTodoForm = payload => dispatch => {
    dispatch({type:'LOAD_FORM', payload: payload.values });
    dispatch({type:'SET_ID_TODO', payload: payload.id });
    return null;
};



export const newTodo = payload => dispatch => {
    dispatch({ type: 'NEW_TODO'});

    return ApiRequest('POST', `${ApiList.todos}`, payload).then((response) => {
        dispatch({type:'NEW_TODO_SUCCESS'});
        dispatch(requestTodos(payload));
    }).catch(()=>{
        dispatch({type:'NEW_TODO_ERROR'});
    });
};

export const saveTodos = payload => dispatch => {
    dispatch({ type: 'SAVE_TODO'});

    return ApiRequest('PUT', `${ApiList.todos}/${payload.id}`, payload.values).then((response) => {
        dispatch({type:'SAVE_TODO_SUCCESS'});
        dispatch({type:'REMOVE_ID_TODO'});
        dispatch(requestTodos(payload));
    }).catch(()=>{
        dispatch({type:'SAVE_TODO_ERROR'});
    });
};


export const removeTodo = payload => dispatch => {
    dispatch({ type: 'REMOVE_TODO', payload});

    return ApiRequest('DELETE', `${ApiList.todos}/${ payload }`, {
    }).then((response) => {
        dispatch({type:'REMOVE_TODO_SUCCESS'});
        dispatch(requestTodos(payload));
    }).catch(()=>{
        dispatch({type:'REMOVE_TODO_ERROR'});
    });
};
