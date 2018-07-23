const fs = require('fs-extra');
const path = require('path');
const logger = require('rear-logger')('create-template', {
  levels: { created: 'green' }
});

module.exports = (templates) => {
  const cwd = process.cwd();

  templates.forEach(template => {
    fs.ensureDirSync(path.dirname(template.file));
    fs.writeFileSync(template.file, template.data.trim());
    logger.created('./' + path.relative(cwd, template.file));
  });
}
