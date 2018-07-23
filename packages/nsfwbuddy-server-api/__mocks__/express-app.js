const express = require('express');

module.exports = createMockApp;

////////////////////////////

function createMockApp() {
  const app = express();
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  return app;
}