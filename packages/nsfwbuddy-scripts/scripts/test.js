process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const jest = require('jest');
let argv = process.argv.slice(2);

// Watch unless on CI, in coverage mode, or explicitly running all tests
if (
  !process.env.CI &&
  argv.indexOf('--coverage') === -1 &&
  argv.indexOf('--watchAll') === -1
) {
  argv.push('--watchAll');
}

const createJestConfig = require('./utils/create-jest-config');
const path = require('path');
const fs = require('fs');

argv.push(
  '--config',
  JSON.stringify(
    createJestConfig(path.resolve( fs.realpathSync(process.cwd()) ))
  )
);

jest.run(argv);
