#!/usr/bin/env node
const path = require('path');
const humps = require('humps');
const logger = require('rear-logger')('create-component');
const checkDir = require('./lib/check-dir');
const createTemplates = require('./lib/create-templates');

const COMPONENT_TEMPLATE = `
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './$1.css';

class $1 extends Component {
  static propTypes = {
    // define your prop types here
  };

  static defaultProps = {
    // define your default props values here
  };
  
  render() {
    return(
      <div className="$1">
      </div>
    );
  }
}

export default $1;
`;

const INDEX_TEMPLATE = `
export { default } from './$1';
`
const CSS_TEMPLATE = `
.$1 {
  
}
`;

const PATTERN = /\$1/g;

if (require.main === module) {
  Main(process.argv.slice(2));
}

function Main(args) {
  const componentsPath = path.resolve(__dirname, '..', 'src', 'components');
  const componentName = humps.pascalize(args.join('_'));
  const componentDir = path.join(componentsPath, componentName);

  logger.log(`Creating new component in %c${componentsPath}\n`, 'green');
  
  if (!checkDir(componentDir)) return;

  createTemplates([{
    file: path.join(componentDir, `${componentName}.js`),
    data: COMPONENT_TEMPLATE.replace(PATTERN, componentName).trim()
  }, {
    file: path.join(componentDir, `${componentName}.css`),
    data: CSS_TEMPLATE.replace(PATTERN, componentName).trim()
  }, {
    file: path.join(componentDir, 'index.js'),
    data: INDEX_TEMPLATE.replace(PATTERN, componentName)
  }]);

  logger.log();
}
