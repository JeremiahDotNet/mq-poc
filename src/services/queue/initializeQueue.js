'use strict';

const amqp = require('amqplib/callback_api');
const config = require('../../config');
const logFunctionFactory = require('../logFunctionFactory');
const whenConnected = require('./whenConnected');

const logName = 'Queue';
const writeError = logFunctionFactory.getErrorLogger(logName);
const writeInfo = logFunctionFactory.getInfoLogger(logName);

function initializeQueue() {
  const url = `${config.amqpUrl}?heartbeat=${config.amqpHeartbeat}`;
  amqp.connect(url, (err, connection) => {
    if (err) {
      writeError(err);
      return setTimeout(initializeQueue(), config.amqpRestartInterval);
    }

    connection.on('error', (connectionError) => {
      if (connectionError.message !== 'Connection closing') {
        writeError(connectionError.message);
      }
    });

    connection.on('close', () => {
      writeInfo('Connection closing');
      return setTimeout(initializeQueue(), config.amqpRestartInterval);
    });

    writeInfo('Connected');
    return whenConnected(connection);
  });
}

module.exports = initializeQueue;
