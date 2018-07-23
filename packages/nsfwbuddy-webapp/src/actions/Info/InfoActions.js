import { InfoActionType as ActionType } from './InfoActionType';

function getInfoAction() {
  return({
    API_CALL: {
      types: [
        ActionType.getInfoRequest,
        ActionType.getInfoSuccess,
        ActionType.getInfoFailure
      ],
      endpoint: 'info'
    }
  })
}

export const getInfo = () =>
  dispatch => dispatch(getInfoAction());
