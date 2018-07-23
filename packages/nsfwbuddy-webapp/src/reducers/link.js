import deepmerge from 'deepmerge'
import { LinkActionType as ActionType } from '../actions/Link';

const initialState = {
  options: 0
}

let internalState = Object.assign({}, initialState);

function updateState (state: Object) {
  internalState = deepmerge(internalState, state.data[0]);
  return internalState;
}

export default (state = {}, action) => {
  switch (action.type) {
    case ActionType.createLinkSuccess:
    case ActionType.getFullLinkSuccess:
      return updateState(action.response)
    default:
      return state;
  }
}
