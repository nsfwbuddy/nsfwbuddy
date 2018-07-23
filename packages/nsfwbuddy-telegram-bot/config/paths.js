const path = require('path');
const fs = require('fs-extra');

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd())

function resolveApp (relativePath) {
  return path.resolve(appDirectory, relativePath)
}

const Paths = {
  appBinScript: resolveApp('bin/server'),
  testDir: resolveApp('__tests__'),
  envFile: resolveApp('.env')
};

module.exports = Paths;
