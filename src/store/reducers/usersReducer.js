import initialState from 'store/initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, users: action.payload };
        case "REMOVE_USERS":
            return { ...state, users: [] };


        case "FETCH_USERS":
            return { ...state, load: true };
        case "FETCH_USERS_SUCCESS":
            return { ...state, users: action.payload, load: false};
        case "FETCH_USERS_ERROR":
            return { ...state, users: [], load: false };

        default:
            return state;
    }
};