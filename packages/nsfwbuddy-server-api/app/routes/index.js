const links = require('./links');
const info = require('./info');
const apiV1 = '/api/v1';

module.exports = configureRoutes;

//////////////////////////////////

function configureRoutes(app) {
  app.use(`${apiV1}/info`, info);
  app.use(`${apiV1}/links`, links);
}
