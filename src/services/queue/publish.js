'use strict';

const logFunctionFactory = require('../logFunctionFactory');
const closeOnError = require('./closeOnError');

const writeError = logFunctionFactory.getErrorLogger('Queue Publish');

function publish(params) {
  const {
    channel,
    offlineQueue,
    exchange,
    routingKey,
    content,
  } = params;

  try {
    channel.publish(exchange, routingKey, content, { persistent: true },
      (publishError) => {
        if (publishError) {
          offlineQueue.push({ exchange, routingKey, content });
          closeOnError(channel.connection, publishError);
        }
      });
  } catch (err) {
    writeError(err.message);
    offlineQueue.push({ exchange, routingKey, content });
  }
}

module.exports = publish;
