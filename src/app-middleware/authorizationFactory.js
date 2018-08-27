'use strict';

const { Router } = require('express');
const config = require('../config');

function authorization(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== config.authorization) {
    res.status(401);
    res.write('401 Not Authorized');
    return res.end();
  }
  return next();
}

module.exports = function authorizationFactory() {
  return Router()
    .use(authorization);
};
