'use strict';

const logFunctionFactory = require('../logFunctionFactory');
const closeOnError = require('./closeOnError');

const writeInfo = logFunctionFactory.getInfoLogger('Queue Process Message');

function work(message, callback) {
  writeInfo(`Processed message ${message}`);
  callback(true);
}

function processMessage(channel, message) {
  work(message, (ok) => {
    try {
      if (ok) {
        channel.ack(message);
      } else {
        channel.reject(message);
      }
    } catch (err) {
      closeOnError(err);
    }
  });
}

module.exports = processMessage;
