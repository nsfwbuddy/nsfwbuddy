const knex = require('../../core/knex');

const TABLE = 'links';
const FIELDS = [
  'sourceURL',
  'shortURL',
  'options',
  'expireAt'
]

/**
 * Links Database Repository.
 * Manages database operations with link models.
 */
module.exports = {
  getAll,
  getById,
  getValid,
  getBy,
  insert,
  update,
  remove,
  removeExpired,
  exists,
  count
}

////////////////////

/**
 * Get all links.
 *
 * @param {number} [limit=100]  The number of results to return
 * @param {number} offset The number of results to skip
 * @return {Promise<Array<Object>>} A collection of links
 */
function getAll(limit = 100, offset = 0) {
  return knex(TABLE)
    .select(...FIELDS)
    .limit(limit)
    .offset(offset)
}

/**
 * Get a link by its id
 *
 * @param {number} id Link's id
 * @return {Promise<Object>} A Link or undefined
 */
function getById(id) {
  return knex(TABLE)
    .where({id})
    .select(...FIELDS);
}

/**
 * Get a valid link by shortURL.
 * Expired links are not retrieved with this method.
 *
 * @param {string} shortURL The url to be searched
 * @return {Promise<Object>} A Link or undefined
 */
function getValid(shortURL) {
  return knex(TABLE)
    .whereRaw('"shortURL" = ? AND "expireAt" > ?', [shortURL, new Date()])
    .select(...FIELDS);
}

/**
 * Get a link using where parameters
 * @param  {Object} whereParams Where parameters object.
 * @return {Promise<Array<Object>>} A promise resolved with an array of results
 */
function getBy(whereParams) {
  return knex(TABLE)
    .where(whereParams)
    .select(...FIELDS);
}

/**
 * Inser a new link
 *
 * @param {Object} model Link model
 * @return {Promise}
 */
function insert(model) {
  return knex(TABLE)
    .returning('id')
    .insert(model)
    .then(res => {
      return getById(res[0]);
    });
}

/**
 * Update a link
 *
 * @param {Object} model Link model
 * @return {Promise}
 */
function update(model) {
  const now = new Date();
  return knex(TABLE)
    .where('id', model.id)
    .update(model)
    .then(res => getById(res[0]));
}

/**
 * Remove a link by its id
 *
 * @param {number} id Link's id
 * @return {Promise}
 */
function remove(id) {
  return knex(TABLE).where({id}).del();
}

/**
 * Remove all expired links
 * @return {Promise<number>} Number of affected rows
 */
function removeExpired() {
  return knex(TABLE)
    .whereRaw('"expireAt" <= ?', new Date())
    .del();
}

function exists(whereParams) {
  return knex(TABLE)
    .where(whereParams)
    .limit(1)
    .then(res => res.length > 0);
}

/**
 * Count the number of links in the database
 *
 * @return {Promise<number>} The number of links found.
 */
function count() {
  return knex(TABLE).count('id');
}
