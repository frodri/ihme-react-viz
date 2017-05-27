
// Polyfills to make the bar graphs IE11 compatible.
import 'core-js/fn/array/find';
import 'core-js/fn/array/from';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import * as reducers from './reducers'

import createHistory from 'history/createHashHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import './index.css';

const history = createHistory()
const middleware = [ thunk, routerMiddleware(history) ]

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(...middleware)
)


ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'));
registerServiceWorker();
