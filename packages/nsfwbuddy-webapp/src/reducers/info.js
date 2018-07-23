import deepmerge from 'deepmerge'
import { InfoActionType as ActionType } from '../actions/Info';
import { enMessages } from '../l10n/en';
import { itMessages } from '../l10n/it';

const initialState = {
  messages: {}
}

let internalState = Object.assign({}, initialState);

function getMessages(l10n) {
  switch (l10n) {
    case 'it':
      return itMessages;
    case 'en':
      return enMessages;
    default:
      return {};
  }
}

function updateState (state: Object) {
  const prevL10n = internalState.l10n;
  internalState = deepmerge(internalState, state.data);
  if (internalState.l10n !== prevL10n) {
    internalState.messages = getMessages(internalState.l10n)
  }
  return internalState;
}

export default (state = {}, action) => {
  switch (action.type) {
    case ActionType.getInfoSuccess:
      return updateState(action.response)
    default:
      return state;
  }
}
