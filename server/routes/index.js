'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

module.exports = function configureRoutes(app) {

  let router = express.Router();

  app.use(router);

  fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => require(path.join(__dirname, file))(router));
};
