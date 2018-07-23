const { createStore, combineReducers, applyMiddleware, compose } = require('redux');
const api = require('./api-middleware');
const reducers = require('../reducers');

module.exports = () => createStore(
  combineReducers({
    reducers
  }),
  compose(
    applyMiddleware(api)
  )
);

