'use strict';

const log4js = require('log4js');

const logger = log4js.getLogger('routes/ping');

module.exports = function configureRoutes(router) {
  router.all('/ping', ping);
};

// ELB expects a 200 OK response :'(
function ping(req, res) {
  res.sendStatus(200);
}
