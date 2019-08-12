import initialState from 'store/initialState';

export default (state = initialState, action) => {
    switch (action.type) {

        case "FETCH_ME":
            return state;
        case "FETCH_ME_SUCCESS":
            return { ...state, user: action.payload };
        case "FETCH_ME_ERROR":
            return state;



        case "SET_USER":
            return { ...state, user: action.payload };
        case "REMOVE_USER":
            return { ...state, user: null };
        default:
            return state;
    }
};