'use strict';

const publish = require('./publish');
const logFunctionFactory = require('../logFunctionFactory');
const closeOnError = require('./closeOnError');

const writeError = logFunctionFactory.getErrorLogger('Queue Channel');
const writeInfo = logFunctionFactory.getInfoLogger('Queue Channel');
const offlineQueue = [];

function startPublisher(connection) {
  connection.createConfirmChannel((connectionError, channel) => {
    if (closeOnError(connection, connectionError)) {
      return;
    }

    channel.on('error', (channelError) => {
      writeError(channelError.message);
    });

    channel.on('close', () => {
      writeInfo('Channel closed');
    });

    while (true) {
      const m = offlineQueue.shift();
      if (!m) {
        break;
      }

      const params = {
        channel,
        offlineQueue,
        exchange: m.exchange,
        routingKey: m.routingKey,
        content: m.content,
      };

      publish(params);
    }
  });
}

module.exports = startPublisher;
