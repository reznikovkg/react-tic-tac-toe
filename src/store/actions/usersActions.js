import ApiRequest from "../../ApiRequest";
import ApiList from "../../ApiList";

export const setUser = payload => dispatch => {
    dispatch({ type: 'SET_USER', payload });
    return null;
};



export const requestUsers = payload => dispatch => {
    dispatch({ type: 'FETCH_USERS', payload: null });

    return ApiRequest('GET', ApiList.users, {
    }).then((response) => {
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data  });
    }).catch((errorMessage)=> {
        dispatch({ type: 'FETCH_USERS_ERROR', payload: errorMessage });
    })
};