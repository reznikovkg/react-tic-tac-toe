import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { Provider } from 'react-redux';

import configureStore, { history } from './store/store';

import 'semantic-ui-css/semantic.min.css';


import ErrorBoundary from './ErrorBoundary';
import {ConnectedRouter} from "connected-react-router";

const store = configureStore();



ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <ConnectedRouter history={history}>
                <App history={history}/>
            </ConnectedRouter>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);
