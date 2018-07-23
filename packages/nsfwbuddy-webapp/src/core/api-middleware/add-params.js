import param from '../lib/param';

export default (url, params) => {
  Object.keys(params).forEach((key) => {
   if (typeof params[key] === 'undefined') delete params[key]
  })

  return url + '?' + param(params)
}
