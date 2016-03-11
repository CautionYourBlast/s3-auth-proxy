'use strict';

const aws = require('aws-sdk');
const co = require('co');
const config = require('config');
const log4js = require('log4js');

const logger = log4js.getLogger('routes/proxy');
const s3 = new aws.S3(config.get('aws'));

module.exports = function configureRoutes(router) {

  router.get('*', proxyToS3);
};

function proxyToS3(req, res, next) {
  logger.debug('Proxying request to S3', req.method, req.path);

  co(function* () {

    let file = req.path.substr(1);
    if (file === '') {
      file = 'index.html';
    }

    let params = {
      Bucket: config.get('s3.bucket'),
      Key: file
    };

    return new Promise((resolve, reject) => {
      s3.getObject(params, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  })
  .then(response => {
    if (response['ContentType']) {
      res.set('Content-Type', response['ContentType']);
    }
    if (response['ContentEncoding']) {
      res.set('Content-Encoding', response['ContentEncoding']);
    }
    res.send(response['Body']);
  })
  .catch(next);
}
