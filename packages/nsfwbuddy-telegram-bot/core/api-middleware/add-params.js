const param = require('../lib/param');

module.exports = (url, params) => {
  Object.keys(params).forEach((key) => {
   if (typeof params[key] === 'undefined') delete params[key]
  })

  return url + '?' + param(params)
}
