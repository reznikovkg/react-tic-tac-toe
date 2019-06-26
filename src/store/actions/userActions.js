export const setUser = payload => dispatch => {
    dispatch({ type: 'SET_USER', payload });

    return null;
};