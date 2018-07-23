const generateURL = require('../core/generate-url');

it('should generate an 8 letters short url key by default', () => {
  const result = generateURL();
  expect(result.length).toBe(8);
});

it('should generate a custom 3 letters short url key', () => {
  const result = generateURL(3);
  expect(result.length).toBe(3);
});