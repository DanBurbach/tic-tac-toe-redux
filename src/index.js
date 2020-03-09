import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import gameReducer from './reducers/game-reducer';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import './assets/css/index.css';

const initialState = {
    history: [{squares: [null, null, null, null, null, null, null, null, null]}],
    xIsNext: true
}

const store = createStore(gameReducer, initialState);

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
