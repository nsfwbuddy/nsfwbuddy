const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd())

function resolveApp (relativePath) {
  return path.resolve(appDirectory, relativePath)
}

const Paths = {
  appBinScript: resolveApp('bin/www'),
  testDir: resolveApp('__tests__'),
  envFile: resolveApp('.env'),
  cert: resolveApp('cert.pem'),
  key: resolveApp('key.pem'),
};

module.exports = Paths;
