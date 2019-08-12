import initialState from 'store/initialState';

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

        case "SET_ROUTE":
            return { ...state, toRoute: action.payload };
        case "REMOVE_ROUTE":
            return { ...state, toRoute: '/' };





        default:
            return state;
    }
};