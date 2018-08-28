'use strict';

const logFunctionFactory = require('../logFunctionFactory');

const writeError = logFunctionFactory.getErrorLogger('Queue Close-On-Error');

function closeOnError(connection, error) {
  if (!error) {
    return false;
  }

  writeError(error.message);
  connection.close();
  return true;
}

module.exports = closeOnError;
