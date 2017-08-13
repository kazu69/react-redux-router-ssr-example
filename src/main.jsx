import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware} from 'redux'
import reducers from './reducers/'

import thunkMiddleware from 'redux-thunk'
import awesomeActionMiddleware from './middlewear/awesome_action'
import loggerMIddlewear from './middlewear/logger'
import * as bookActions from './actions/bookActions';

import App from './containers/Client'
import styles from './main.css'

const createStoreWithMiddleware = applyMiddleware(
    awesomeActionMiddleware,
    loggerMIddlewear,
    thunkMiddleware,
)(createStore)

// initial state from global
const preloadedState = window.__PRELOADED_STATE__
const Store = createStoreWithMiddleware(reducers, preloadedState)
render(
    <Provider store={Store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)
