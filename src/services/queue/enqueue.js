'use strict';

const connection = require('./connection');
const config = require('../../config');
const logFunctionFactory = require('../logFunctionFactory');

const logName = 'Publish Queue';
const writeError = logFunctionFactory.getErrorLogger(logName);
const writeInfo = logFunctionFactory.getInfoLogger(logName);

const qName = 'jobs';
const offlineQueue = [];

function enqueue(message) {
  const channelWrapper = connection.createChannel({
    json: true,
    setup: channel => channel.assertQueue(qName, { durable: true }),
  });

  channelWrapper.sendToQueue(qName, message)
    .then(writeInfo(`Queued message: ${JSON.stringify(message)}`))
    .catch((error) => {
      writeError(error.message);
      // Close the connection, a new connection will be created on next try
      connection.close();

      channelWrapper.nack(message, false, true);

      const maxRetries = 10;
      let i = 0;
      while (i < maxRetries) {
        const msg = offlineQueue.shift();
        if (!msg) {
          break;
        }

        setTimeout(enqueue(msg), config.amqpHeartbeat);
        i += 1;
      }
    });
}

module.exports = enqueue;
