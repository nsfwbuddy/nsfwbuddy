const moment = require('moment');
const { expiration } = require('nsfwbuddy-shared');
const getExpirationDate = require('../core/get-expiration-date');

it('should get a 1 hour expiration date', () => {
  const expected = moment.utc().add(1, 'hour').toDate().getHours();
  const expiryDate = getExpirationDate(expiration.flags.oneHour);
  const result = expiryDate.getHours();

  expect(result).toEqual(expected)
});

it('should get a 1 day expiration date', () => {
  const expected = moment.utc().add(1, 'day').toDate().getDate();
  const expiryDate = getExpirationDate(expiration.flags.oneDay);
  const result = expiryDate.getDate();

  expect(result).toEqual(expected)
});

it('should get a 1 week expiration date', () => {
  const expected = moment.utc().add(1, 'week').toDate().getDate();
  const expiryDate = getExpirationDate(expiration.flags.oneWeek);
  const result = expiryDate.getDate();

  expect(result).toEqual(expected)
});

it('should get a 1 month expiration date', () => {
  const expected = moment.utc().add(1, 'month').toDate().getMonth();
  const expiryDate = getExpirationDate(expiration.flags.oneMonth);
  const result = expiryDate.getMonth();

  expect(result).toEqual(expected)
});

it('should get a 1 year expiration date', () => {
  const expected = moment.utc().add(1, 'year').toDate().getYear();
  const expiryDate = getExpirationDate(expiration.flags.oneYear);
  const result = expiryDate.getYear();

  expect(result).toEqual(expected)
});

it('should get a "never expire date" of 100 years', () => {
  const expected = moment.utc().add(100, 'year').toDate().getYear();
  const expiryDate = getExpirationDate(expiration.flags.never);
  const result = expiryDate.getYear();

  expect(result).toEqual(expected)
});
