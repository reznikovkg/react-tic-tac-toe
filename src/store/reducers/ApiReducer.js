import initialState from '../initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case "SENT_REQUEST":
            return { ...state, waitResponse: true };
        case "RECEIVED_RESPONSE":
            return { ...state, waitResponse: false };
        case "SET_API_MESSAGE":
            return { ...state, message: action.payload };
        case "REMOVE_API_MESSAGE":
            return { ...state, message: null };
        default:
            return state;
    }
};