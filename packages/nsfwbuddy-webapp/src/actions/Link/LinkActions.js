import {LinkActionType as ActionType} from './LinkActionType';

function createLinkAction(payload) {
  return({
    API_CALL: {
      types: [
        ActionType.createLinkRequest,
        ActionType.createLinkSuccess,
        ActionType.createLinkFailure,
      ],
      endpoint: 'links',
      method: 'POST',
      payload
    }
  })
}

export const createLink = payload =>
  dispatch => dispatch(createLinkAction(payload))


function getLinkAction(shortURL) {
  return({
    API_CALL: {
      types: [
        ActionType.getFullLinkRequest,
        ActionType.getFullLinkSuccess,
        ActionType.getFullLinkFailure,
      ],
      endpoint: `links/${shortURL}`,
    }
  })
}

export const getLink = shortURL =>
  dispatch => dispatch(getLinkAction(shortURL))
