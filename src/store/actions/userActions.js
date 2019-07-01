import ApiRequest from "../../ApiRequest";
import ApiList from "../../ApiList";


export const fetchMe = payload => dispatch => {
    dispatch({ type: 'SENT_REQUEST', payload: null });
    dispatch({ type: 'FETCH_ME'});

    return ApiRequest('GET', ApiList.me, null, true).then((response) => {
        dispatch({ type: 'FETCH_ME_SUCCESS', payload: response.data});
        dispatch({ type: 'RECEIVED_RESPONSE', payload: null });
    }).catch((errorMessage)=> {
        dispatch({ type: 'FETCH_ME_ERROR', payload: errorMessage });
        dispatch({ type: 'RECEIVED_RESPONSE', payload: null });
    });
};


export const fetchLogin = payload => dispatch => {
    dispatch({ type: 'SENT_REQUEST', payload: null });

    return ApiRequest('POST', ApiList.login, {
        login: payload.username,
        password: payload.password
    }).then((response) => {
        dispatch({ type: 'RECEIVED_RESPONSE', payload: null });
        dispatch({ type: 'SET_USER', payload: response.data });
        dispatch({ type: 'REMOVE_API_MESSAGE', payload: null });
    }).catch((errorMessage)=> {
        dispatch({ type: 'RECEIVED_RESPONSE', payload: null });
        dispatch({ type: 'SET_API_MESSAGE', payload: errorMessage });
    })
};



export const fetchLogout = payload => dispatch => {
    return ApiRequest('POST', ApiList.logout, {
    }).then((response) => {
        dispatch({ type: 'RECEIVED_RESPONSE', payload: null });
        dispatch({ type: 'REMOVE_USER'});
        this.props.receivedResponse();
    }).catch((errorMessage)=> {

    })
};