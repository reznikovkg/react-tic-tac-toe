export const setRoute = payload => dispatch => {
    dispatch({ type: 'SET_ROUTE', payload });
    return null;
};
