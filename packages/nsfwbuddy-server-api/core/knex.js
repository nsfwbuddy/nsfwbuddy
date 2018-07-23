const knex = require('knex');
const env = require('../config/env');
const config = require('../knexfile.js');

module.exports = knex(config[env.NODE_ENV]);
