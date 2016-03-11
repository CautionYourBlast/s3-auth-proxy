'use strict';

const app = require('../../server/server.js');
const supertest = require('supertest');

describe('/ping', () => {

  let api;

  before(done => {
    done();
  });

  beforeEach(() => {
    api = supertest.agent(app);
  });

  describe('GET', () => {

    it('responds with a 200', done => {
      api
        .get('/ping')
        .expect(200, done);
    });
  });
});

