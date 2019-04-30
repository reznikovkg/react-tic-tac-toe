import React, { Component } from 'react';
import { createStore } from 'redux';
import  { Provider, connect } from 'react-redux';


const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const initialState = {
    wallet: 10
};

const incrementAction = (payload) => {
    return {
        type: INCREMENT,
        payload
    }
};

const decrementAction = (payload) => {
    return {
        type: DECREMENT,
        payload
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case INCREMENT:
            let wallet = state.wallet + action.payload;
            return { ...state, wallet };
        case DECREMENT:
            wallet = state.wallet - action.payload;
            return { ...state, wallet };
        default:
            return state;
    }
};

const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__());

const next = store.dispatch;

store.dispatch = (action) => {
    console.log('store before: ', store.getState());
    console.log('action: ', action);
    next(action);
    console.log('store after: ', store.getState());
    console.log('\n');
};

const mapDispatchToProps = (dispatch) => ({
    onIncrement: (payload) => dispatch(incrementAction(payload)),
    onDecrement: (payload) => dispatch(decrementAction(payload))
});

const mapStateToProps = state => ({
    wallet: state.wallet
});

class Wallet extends Component {
    render() {
        return (
            <div>
                <div>Wallet: { this.props.wallet }</div>
                <button onClick={ () => this.props.onIncrement(10) }>Increment</button>
                <button onClick={ () => this.props.onDecrement(10) }>Decrement</button>
            </div>
        );
    }
}

const WalletConnect = connect(mapStateToProps, mapDispatchToProps)(Wallet);

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <WalletConnect/>
            </Provider>
        );
    }
}

export default App;
