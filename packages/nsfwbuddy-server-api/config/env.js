const fs = require('fs-extra');
const paths = require('./paths');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.DEBUG = process.env.NODE_ENV !== 'production' ? 'nsfwbuddy:*' : '';

// read ".env" files with "NODE_ENV" and ".local" naming convention
// (i.e. ".env.production" or ".env.development.local")
// were local files have precedence over non-local.
const nodeEnvFile = `${paths.envFile}.${process.env.NODE_ENV}`;
const nodeEnvLocalFile = `${nodeEnvFile}.local`;
const envLocalFile = `${paths.envFile}.local`;

let envFile;
if (fs.pathExistsSync(nodeEnvLocalFile)) {
  envFile = nodeEnvLocalFile;
}
else if (fs.pathExistsSync(nodeEnvFile)) {
  envFile = nodeEnvFile;
}
else if (fs.pathExistsSync(envLocalFile)) {
  envFile = envLocalFile;
}
else {
  envFile = paths.envFile;
}

// Load environment variables defined in a .env file
// into process.env
require('dotenv').config({
  silent: process.env.NODE_ENV !== 'production',
  path: envFile
});

process.env.PORT = process.env.PORT || 3001;
process.env.HOST = process.env.HOST || '0.0.0.0';
process.env.SSL = process.env.SSL || false;
process.env.CERT = process.env.CERT || paths.cert;
process.env.KEY = process.env.KEY || paths.key;

module.exports = Object.assign({}, process.env);
