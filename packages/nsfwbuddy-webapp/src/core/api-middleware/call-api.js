import {apiURL} from '../site-url';
import addParams from './add-params';
import 'whatwg-fetch';
import Nsfw from 'nsfwbuddy-shared';

export default(
  endpoint,
  method = 'GET',
  params = {},
  payload,
  dataType = 'JSON'
) => {
  const url = Nsfw.utils.url.hasHttpProtocol(endpoint)
    ? endpoint : `${apiURL}/${endpoint}`;

  // add an _underscore_ param to the request in order to force
  // the api endpoint to respond with non cached data
  params._ = new Date().getTime();

  // append given parameters to the endpoint URL
  const fullURL = addParams(url, params);

  const options = {
    method,
    credentials: 'include',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  }

  // append the payload to the request body and change
  // the request method accordingly if necessary
  if (payload) {
    if (options.method === 'GET') options.method = 'POST';
    if (payload instanceof FormData) {
      options.body = payload
    } else {
      options.body = JSON.stringify(payload)
      options.headers['Content-Type'] = 'application/json';
    }
  }

  return fetch(fullURL, options).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    // Handle response error.
    // Customize this part to suite your needs.
    return response.json()
      .then(json => {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      })
      .catch(error => {
        throw new Error(response.statusText);
      });
  })
  .then(response => {
    return response.json().then(json => ({json, response}))
  })
  .then(({json, response}) => {
    return response.ok
      ? Object.assign({}, json)
      : Promise.reject(json);
  })
}
