import initialState from '../initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_TODOS":
            return { ...state, todos: action.payload };
        case "REMOVE_TODOS":
            return { ...state, todos: [] };
        default:
            return state;
    }
};