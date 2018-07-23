const { utils } = require('../index');

it('should test true for a valid urls', () => {
  const validUrls = [
    'github.com',
    'https://www.google.com/search?source=hp&ei=kZBTW7upNuS56ATLsqTQDg&q=test&oq=test',
    'ftp://ftp.funet.fi/pub/standards/RFC/rfc959.txt'
  ];

  for (let i = 0; i < validUrls.length; i++) {
    expect(utils.url.isURL(validUrls[i])).toBeTruthy();
  }
});

it('should test false for invalid urls', () => {
  const invalidUrls = [
    'greatscott@nsfwbuddy.com',
    'http:\\\\www.google.com',
    'fpt://google/pub/@standards/RFC/rfc959.txt'
  ];

  for (let i = 0; i < invalidUrls.length; i++) {
    expect(utils.url.isURL(invalidUrls[i])).toBeFalsy();
  }
});

it('should test true if string has http protocol', () => {
  const validUrls = [
    'http://www.google.com',
    'https://www.google.com'
  ];

  for (let i = 0; i < validUrls.length; i++) {
    expect(utils.url.hasHttpProtocol(validUrls[i])).toBeTruthy();
  }
})

it('should test false if string has NOT http protocol', () => {
  const validUrls = [
    'www.google.com',
    'fpt://google/pub/@standards/RFC/rfc959.txt'
  ];

  for (let i = 0; i < validUrls.length; i++) {
    expect(utils.url.hasHttpProtocol(validUrls[i])).toBeFalsy();
  }
})