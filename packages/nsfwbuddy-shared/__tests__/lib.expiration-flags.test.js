const { expiration } = require('../index');

it('should get the related expiration label', () => {
  const { getExpirationLabel } = expiration;
  expect(getExpirationLabel(expiration.flags.oneHour)).toBe('1 hour');
  expect(getExpirationLabel(expiration.flags.oneDay)).toBe('1 day');
  expect(getExpirationLabel(expiration.flags.oneWeek)).toBe('1 week');
  expect(getExpirationLabel(expiration.flags.oneMonth)).toBe('1 month');
  expect(getExpirationLabel(expiration.flags.oneYear)).toBe('1 year');
  expect(getExpirationLabel(expiration.flags.never)).toBe('never');
});

it('should get the expiration flags as an array', () => {
  const result = expiration.getExpirationMasks();
  expect(Array.isArray(result)).toBeTruthy();
  expect(result.length).toBe(6);
});

it('should retrieve the corresponding expiraton time in hours', () => {
  const { getExpirationHours } = expiration;
  expect(getExpirationHours(expiration.flags.oneHour)).toBe(1);
  expect(getExpirationHours(expiration.flags.oneDay)).toBe(24);
  expect(getExpirationHours(expiration.flags.oneWeek)).toBe(168);
  expect(getExpirationHours(expiration.flags.oneMonth)).toBe(720);
  expect(getExpirationHours(expiration.flags.oneYear)).toBe(8760);

  // default value for `never` is 100 year.
  expect(getExpirationHours(expiration.flags.never)).toBe(876000);
})