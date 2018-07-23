const fs = require('fs-extra');
const path = require('path');
const logger = require('rear-logger')('check-dir');

const VALID_FILES = [
 '.DS_Store',
 'Thumbs.db',
 '.git',
 '.gitignore',
 '.idea',
 'README.md',
 'LICENSE',
 'web.iml',
 '.hg',
 '.hgignore',
 '.hgcheck',
];

module.exports = (targetPath) => {
  let conflicts;

  try {
    conflicts = fs.readdirSync(targetPath)
      .filter(file => !VALID_FILES.includes(file));
  } catch (err) {
    if (err.code === 'ENOENT') {
      return true;
    }
    throw err;
  }

  if (conflicts.length === 0) return true;

  const relativeDir = path.relative(process.cwd(), targetPath);
  
  logger.log('Aborting:')
  logger.log(
    `  %cThe directory ./${relativeDir} contains files that could conflict.\n`,
    'red'
  );
  
  return false;
}
