const knex = require('../core/knex');
const Links = require('../app/repos/Links');

beforeEach(() => {
  return knex.select().table('links').del();
})

afterAll(() => {
  return knex.destroy();
})

it('should insert new link', () => {
  const createdAt = new Date();
  const expireAt = new Date();
  expireAt.setDate(createdAt.getDate() + 7);
  expect.assertions(1);
  return Links.insert({
    sourceURL: 'https://www.test.org',
    shortURL: 'aBcDeFgH',
    createdAt: createdAt,
    expireAt: expireAt,
    options: 0
  }).then(result => {
    expect(result.length).toBe(1);
  })
  .catch(err => {
    expect(err.message).toBeUndefined();
  })
});
