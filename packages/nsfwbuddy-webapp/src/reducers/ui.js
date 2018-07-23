import {UIActionType as ActionType} from '../actions/UI';
import deepmerge from 'deepmerge';

const initialState = {
  progressIsActive: false
};

let currentState = Object.assign({}, initialState);

function updateState(newState) {
  if (newState.progressIsActive === undefined) return;
  currentState = deepmerge(currentState, newState);
  return currentState;
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionType.toggleProgress:
    return updateState({progressIsActive: action.progressIsActive});
    default:
      return state;
  }
}
