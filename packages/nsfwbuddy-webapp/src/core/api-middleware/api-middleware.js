import callApi from './call-api';

/**
 * A Redux middleware to dispatch actions that calls an api endpoint
 * @param {Object} store  The redux store object
 */
export default (store) => next => action => {
  const API_CALL = action.API_CALL;
  if (!API_CALL) return next(action);

  let { endpoint } = API_CALL
  const { method, types, params, payload } = API_CALL;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string enpoint URL')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types')
  }

  if (!types.every((type) => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = (data: Object): Function => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction.API_CALL;
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, method, params, payload)
    .then(
      response => next(actionWith({
        response,
        type: successType
      })),
      error => next(actionWith({
        type: failureType,
        error: error.message || 'An unexpected API error occurred'
      }))
    )
}
