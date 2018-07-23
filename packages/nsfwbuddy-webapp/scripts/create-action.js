#!/usr/bin/env node
const path = require('path');
const humps = require('humps');
const logger = require('rear-logger')('create-container');
const checkDir = require('./lib/check-dir');
const createTemplates = require('./lib/create-templates');

const ACTIONS_TEMPLATE = `
import {$1ActionType as ActionType} from './$1ActionType';

/*
function myAction() {
  return({
    API_CALL: {
      types: [
        ActionType.MY_ACTION_REQUEST,
        ActionType.MY_ACTION_SUCCESS,
        ActionType.MY_ACTION_FAILURE
      ],
      endpoint: 'myendpoint.json'
    }
  })
}

export const myAction = () => dispatch => dispatch(myAction());
*/
`;

const ACTIONTYPE_TEMPLATE = `
export const $1ActionType = {
  // 'MY_ACTION_REQUEST': 'MY_ACTION_REQUEST',
  // 'MY_ACTION_SUCCESS': 'MY_ACTION_SUCCESS',
  // 'MY_ACTION_FAILURE': 'MY_ACTION_FAILURE'
};
`;

const ACTION_INDEX_TEMPLATE = `
export {$1ActionType} from './$1ActionType';
export * from './$1Actions';
`;

const REDUCER_TEMPLATE = `
import {$1ActionType as ActionType} from '../actions/$1';
import deepmerge from 'deepmerge';

const initialState = {
  // define your initial state here
};

let currentState = Object.assign({}, initialState);

function updateState(newState) {
  currentState = deepmerge(currentState, newState);
  return currentState;
}

export default (state = initialState, action) => {
  switch (action.type) {
    // case ActionType.MY_ACTION_SUCCESS:
    //   return updateState(action.response);
    default:
      return state;
  }
}
`;

const PATTERN = /\$1/g;

if (require.main === module) {
  Main(process.argv.slice(2));
}

/////////////////////////////////

function Main(args) {
  const actionsPath = path.resolve(__dirname, '..', 'src', 'actions');
  const reducersPath = path.resolve(__dirname, '..', 'src', 'reducers');
  const actionName = humps.pascalize(args.join('_'));
  const reducerName = humps.camelize(args.join('_'));
  const actionsDir = path.join(actionsPath, actionName);

  logger.log(`Creating new actions in %c${actionsPath}\n`, 'green');

  if (!checkDir(actionsDir)) return;

  createTemplates([{
    file: path.join(actionsDir, `${actionName}Actions.js`),
    data: ACTIONS_TEMPLATE.replace(PATTERN, actionName)
  }, {
    file: path.join(actionsDir, `${actionName}ActionType.js`),
    data: ACTIONTYPE_TEMPLATE.replace(PATTERN, actionName)
  }, {
    file: path.join(actionsDir, `index.js`),
    data: ACTION_INDEX_TEMPLATE.replace(PATTERN, actionName)
  }, {
    file: path.join(reducersPath, `${reducerName}.js`),
    data: REDUCER_TEMPLATE.replace(PATTERN, actionName)
  }]);

  logger.log();
}
