const mockApp = require('../__mocks__/express-app')();
const info = require('../app/routes/info');
const request = require('supertest');

mockApp.use('/api/v1/info', info);

it('should get info', done => {
  const expected = { ok: true, status: 200, code: 'OK', data: { l10n: 'en' } }
  request(mockApp)
    .get('/api/v1/info')
    .set('Accept', 'application/json')
    .expect(200, expected, done)
});