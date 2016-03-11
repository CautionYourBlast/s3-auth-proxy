'use strict';

const basicAuth = require('basic-auth');
const config = require('config');
const configureRoutes = require('./routes');
const express = require('express');
const log4js = require('log4js');
const path = require('path');

log4js.configure(config.get('logging'));

const logger = log4js.getLogger('server');
const app = express();

app.disable('x-powered-by');
app.disable('etag');

app.set('trust proxy', true);

app.use((req, res, next) => {

  let user = basicAuth(req);
  let auth = config.get('authentication');

  if (!!user && user.name === auth.username && user.pass === auth.password) {
    return next();
  }

  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  res.send(401);
});

configureRoutes(app);

app.use((err, req, res, next) => {
  logger.error('Error handling request for', req.method, req.url, req.body, '\n', err.stack);
  res.sendStatus(500);
});

if (require.main === module) {
  let server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;
    logger.info(`S3 Auth Proxy listening at http://${host}:${port}`);
  });
}

module.exports = app;
