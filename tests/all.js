'use strict';

const app = require('../server/server.js');

const chai = require('chai');
chai.should();

before(done => {
  app.isReady
    .then(() => {
      done();
    })
    .catch(done);
});

after(() => {
});

