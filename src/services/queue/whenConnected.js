'use strict';

const startPublisher = require('./startPublisher');
const startWorker = require('./startWorker');

function whenConnected(connection) {
  startPublisher(connection);
  startWorker(connection);
}

module.exports = whenConnected;
