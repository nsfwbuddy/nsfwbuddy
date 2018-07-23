const isUrl = require('./lib/is-url');
const noop = require('./lib/noop');
const randomInt = require('./lib/random-int');
const bitmask = require('./lib/bitmask');
const expiration = require('./lib/expiration-flags');
const options = require('./lib/option-masks');
module.exports = {
  utils: {
    noop: noop,
    url: isUrl,
    randomInt: randomInt
  },
  bitmask: bitmask,
  expiration: {
    flags: expiration.ExpirationFlags,
    labels: expiration.ExpirationLabels,
    values: expiration.ExpirationValues,
    byHours: expiration.ExpirationByHours,
    getExpirationLabel: expiration.getExpirationLabel,
    getExpirationMasks: expiration.getExpirationMasks,
    getExpirationHours: expiration.getExpirationHours,
  },
  options: {
    flags: options.AdvancedOptionFlags,
    labels: options.AdvancedOptionLables,
    getRequiredAge: options.getRequiredAge,
    getMaskLabel: options.getMaskLabel,
    getMasks: options.getMasks,
    getFlags: options.getFlags
  }
}