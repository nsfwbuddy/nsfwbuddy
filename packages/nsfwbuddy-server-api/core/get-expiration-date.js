const moment = require('moment');
const Nsfw = require('nsfwbuddy-shared');

module.exports = getExpirationDate;

/////////////////////////////////////

function getExpirationDate(mask) {
  const expiration = parseInt(mask, 10);
  const hours = Nsfw.expiration.getExpirationHours(expiration);
  return moment.utc().add(hours, 'hours').toDate();
}