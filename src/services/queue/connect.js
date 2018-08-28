'use strict';

const amqp = require('amqplib/callback_api');
const config = require('../../config');
const logFunctionFactory = require('../logFunctionFactory');
const startPublisher = require('./startPublisher');

const logName = 'Queue';
const writeError = logFunctionFactory.getErrorLogger(logName);
const writeInfo = logFunctionFactory.getInfoLogger(logName);

function connect() {
  const url = `${config.amqpUrl}?heartbeat=${config.amqpHeartbeat}`;
  amqp.connect(url, (err, connection) => {
    if (err) {
      writeError(err);
      return setTimeout(connect(), config.amqpRestartInterval);
    }

    connection.on('error', (connectionError) => {
      if (connectionError.message !== 'Connection closing') {
        writeError(connectionError.message);
      }
    });

    connection.on('close', () => {
      writeInfo('Connection closing');
      return setTimeout(connect(), config.amqpRestartInterval);
    });

    startPublisher(connection);
    return connection;
  });
}

module.exports = connect;
