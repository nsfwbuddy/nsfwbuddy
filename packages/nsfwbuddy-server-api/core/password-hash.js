const bcrypt = require('bcrypt');

const defaultConfig = {
  saltRounds: 8
};

module.exports = {
  generate,
  verify
};

/////////////////////

/**
 * Generate a password hash.
 * 
 * @param  {string} password 	Password to be hashed
 * @param  {Object} opts		  BCrypt options
 * @return {Promise<string>}
 */
function generate(password, opts = {}) {
  const config = Object.assign({}, defaultConfig, opts)
  return bcrypt.genSalt(config.saltRounds)
  	.then(salt => bcrypt.hash(password, salt));
}

/**
 * Verify a password against an hashed password.
 * 
 * @param  {string} password
 * @param  {string} hashedPassword
 * @return {boolean}
 */
function verify(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
