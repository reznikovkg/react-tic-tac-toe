import initialState from 'store/initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_TODOS":
            return { ...state, todos: action.payload };
        case "REMOVE_TODOS":
            return { ...state, todos: [] };



        case "FETCH_TODOS":
            return { ...state, load: true, todos: [] };
        case "FETCH_TODOS_SUCCESS":
            return { ...state, load: false, todos: action.payload};
        case "FETCH_TODOS_ERROR":
            return { ...state, load: false };


        case "SAVE_TODO":
            return { ...state, load: true, id: action.payload };
        case "SAVE_TODO_SUCCESS":
            return { ...state, load: false };
        case "SAVE_TODO_ERROR":
            return { ...state, load: false };

        case "NEW_TODO":
            return { ...state, load: true };
        case "NEW_TODO_SUCCESS":
            return { ...state, load: false };
        case "NEW_TODO_ERROR":
            return { ...state, load: false };

        case "SET_ID_TODO":
            return { ...state, id: action.payload };
        case "REMOVE_ID_TODO":
            return { ...state, id: null };

        default:
            return state;
    }
};