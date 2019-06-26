import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import initialState from './initialState';
import mainReducer from './reducers';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (state = initialState) => {
    return createStore(
        mainReducer(history),
        state,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history)
            )
        ));
};

export default configureStore;
