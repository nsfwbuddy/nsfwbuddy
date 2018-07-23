const mockApp = require('../__mocks__/express-app')();
const links = require('../app/routes/links');
const request = require('supertest');

mockApp.use('/api/v1/links', links);

it('should get 404 not found for non existing shortURL', done => {
  const expected = {
    ok: false,
    status: 404,
    code: 'Not Found',
    error: 'A link with shortURL not-existing cannot be found.'
  }

  request(mockApp)
    .get('/api/v1/links/not-existing')
    .set('Accept', 'application/json')
    .expect(404, expected, done)
});

it('should create a new short url', done => {
  const model = {
    sourceURL: "http://www.example.org",
    options: 0,
    expiration: 1
  }

  expect.assertions(5);

  request(mockApp)
    .post('/api/v1/links')
    .send(model)
    .set('Accept', 'application/json')
    .expect(res => {
      expect(Array.isArray(res.body.data)).toBeTruthy();
      expect(res.body.data[0].shortURL).toBeDefined();
      expect(res.body.data[0].sourceURL).toEqual(model.sourceURL);
      expect(res.body.data[0].expireAt).toBeDefined();
      expect(res.body.data[0].options).toBe(0);
    })
    .expect(201, done)
});

it('should prepend protocol for missing protocol in sourceURL', done => {
  const sourceURL = "example.org";
  const expectedURL = "http://example.org";
  const model = { sourceURL: sourceURL, options: 0, expiration: 1 };

  expect.assertions(5);

  request(mockApp)
    .post('/api/v1/links')
    .send(model)
    .set('Accept', 'application/json')
    .expect(res => {
      expect(Array.isArray(res.body.data)).toBeTruthy();
      expect(res.body.data[0].shortURL).toBeDefined();
      expect(res.body.data[0].sourceURL).toEqual(expectedURL);
      expect(res.body.data[0].expireAt).toBeDefined();
      expect(res.body.data[0].options).toBe(0);
    })
    .expect(201, done)
});