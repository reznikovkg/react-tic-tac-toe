import initialState from '../initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, users: action.payload };
        case "REMOVE_USERS":
            return { ...state, users: [] };
        default:
            return state;
    }
};