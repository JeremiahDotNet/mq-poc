'use strict';

const logFunctionFactory = require('../logFunctionFactory');
const processMessage = require('./processMessage');
const closeOnError = require('./closeOnError');
const config = require('../../config');

const logName = 'Queue Worker';
const writeError = logFunctionFactory.getErrorLogger(logName);
const writeInfo = logFunctionFactory.getInfoLogger(logName);

function startWorker(connection) {
  connection.createChannel((err, channel) => {
    if (closeOnError(err)) {
      return;
    }

    channel.on('error', (channelError) => {
      writeError(channelError.message);
    });

    channel.on('close', () => {
      writeError('Channel closed');
    });

    channel.prefetch(config.amqpPrefetch);
    channel.assertQueue('jobs', { durable: true }, (assertError) => {
      if (closeOnError(assertError)) {
        return;
      }

      channel.consume('jobs', processMessage, { noAck: false });
      writeInfo('Worker has started');
    });
  });
}

module.exports = startWorker;
