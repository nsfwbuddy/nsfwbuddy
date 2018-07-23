const fs = require('fs');
const path = require('path');

module.exports = rootDir => {
  const config = {
    collectCoverageFrom: ['**/*.{js,jsx,mjs}'],
    // ignore tests in nsfwbuddy-webapp package since
    // this package is tested with react-scripts test utility
    modulePathIgnorePatterns: ['nsfwbuddy-webapp', 'nsfwbuddy-scripts'],
    testMatch: [
      '**/__tests__/**/*.{js,jsx,mjs}',
      '**/?(*.)(spec|test).{js,jsx,mjs}',
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost'
  };

  if (rootDir) {
    config.rootDir = rootDir;
  }

  return config;
};