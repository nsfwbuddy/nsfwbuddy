import {UIActionType as ActionType} from './UIActionType';

function toggleProgressAction(isActive) {
  return({
    type: ActionType.toggleProgress,
    progressIsActive: isActive
  })
}

export const toggleProgress = isActive =>
  dispatch => dispatch(toggleProgressAction(isActive));
