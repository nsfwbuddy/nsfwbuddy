import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import api from './api-middleware';

export default (history) => createStore(
  combineReducers({
    reducers,
    router: routerReducer,
  }),
  compose(
    applyMiddleware(thunk, history, api)
  )
);